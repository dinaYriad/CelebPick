#!/usr/bin/env node

/**
 * Wikidata Celebrity Fetcher for CelebPick
 *
 * Fetches celebrity data from Wikidata SPARQL endpoint and generates
 * a JSON file that the app can use as its celebrity dataset.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  limit: 50, // Number of celebrities to fetch
  outputPath: path.join(__dirname, '..', 'data', 'celebrities.json'),
  userAgent: 'CelebPick/1.0 (https://github.com/yourorg/celebpick; contact@example.com)',
  imageWidth: 600,
};

/**
 * SPARQL query to fetch celebrities from Wikidata
 */
const buildSPARQLQuery = (limit) => `
SELECT DISTINCT ?person ?personLabel ?image ?genderLabel WHERE {
  # Must be human
  ?person wdt:P31 wd:Q5.

  # Must have an image
  ?person wdt:P18 ?image.

  # Restrict to actors OR musicians for faster query
  VALUES ?occupation { wd:Q33999 wd:Q177220 }
  ?person wdt:P106 ?occupation.

  # Get gender (optional)
  OPTIONAL { ?person wdt:P21 ?gender. }

  # Get English label
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en".
  }
}
LIMIT ${limit}
`;

/**
 * Convert Wikimedia Commons filename to URL
 */
const getImageUrl = (wikimediaUrl, width = CONFIG.imageWidth) => {
  // Extract filename from the Wikimedia URL
  // Example: http://commons.wikimedia.org/wiki/Special:FilePath/Tom_Hanks_TIFF_2019.jpg
  const filename = wikimediaUrl.split('/').pop();
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;
};

/**
 * Extract Wikidata ID from URI
 */
const extractWikidataId = (uri) => {
  // Example: http://www.wikidata.org/entity/Q2263 -> Q2263
  return uri.split('/').pop();
};

/**
 * Fetch celebrities from Wikidata
 */
const fetchCelebrities = async () => {
  const query = buildSPARQLQuery(CONFIG.limit);
  const endpoint = 'https://query.wikidata.org/sparql';

  console.log('🔍 Fetching celebrities from Wikidata...');
  console.log(`   Limit: ${CONFIG.limit}`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/sparql-results+json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': CONFIG.userAgent,
      },
      body: `query=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results.bindings;
  } catch (error) {
    console.error('❌ Error fetching from Wikidata:', error.message);
    throw error;
  }
};

/**
 * Process and deduplicate results
 */
const processResults = (results) => {
  console.log(`📊 Processing ${results.length} raw results...`);

  const celebrities = [];
  const namesSeen = new Set();

  for (const result of results) {
    const name = result.personLabel?.value;
    const personUri = result.person?.value;
    const imageValue = result.image?.value;
    const gender = result.genderLabel?.value;

    // Skip if missing required fields
    if (!name || !personUri || !imageValue) continue;

    // De-duplicate by name (case-insensitive)
    const nameLower = name.toLowerCase();
    if (namesSeen.has(nameLower)) continue;
    namesSeen.add(nameLower);

    const celebrity = {
      id: extractWikidataId(personUri),
      name: name,
      imageUrl: getImageUrl(imageValue),
      source: 'Wikidata',
    };

    // Add gender if available
    if (gender) {
      celebrity.gender = gender;
    }

    celebrities.push(celebrity);
  }

  console.log(`✅ Processed ${celebrities.length} unique celebrities`);
  return celebrities;
};

/**
 * Save results to JSON file
 */
const saveToFile = (celebrities, outputPath) => {
  const dir = path.dirname(outputPath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }

  // Write JSON file
  fs.writeFileSync(
    outputPath,
    JSON.stringify(celebrities, null, 2),
    'utf8'
  );

  console.log(`💾 Saved to: ${outputPath}`);
};

/**
 * Main execution
 */
const main = async () => {
  console.log('🎬 CelebPick Data Fetcher\n');

  try {
    // Fetch data
    const results = await fetchCelebrities();

    // Process and deduplicate
    const celebrities = processResults(results);

    if (celebrities.length === 0) {
      console.error('❌ No celebrities found!');
      process.exit(1);
    }

    // Save to file
    saveToFile(celebrities, CONFIG.outputPath);

    // Sanity check output
    console.log('\n🔍 Sanity Check:');
    console.log(`   Total celebrities: ${celebrities.length}`);
    console.log(`   First entry: ${celebrities[0].name} (${celebrities[0].id})`);
    console.log(`   Image URL: ${celebrities[0].imageUrl}`);

    console.log('\n✨ Done! You can now use this data in your app.');
    console.log(`   Import with: import celebrities from './data/celebrities.json';`);

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
};

// Run the script
main();
