#!/usr/bin/env node

/**
 * Enhanced Celebrity Fetcher for CelebPick
 * Fetches a large number of diverse celebrities from Wikidata
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  limit: 350, // Fetch more to account for deduplication
  outputPath: path.join(__dirname, '..', 'data', 'celebrities.json'),
  userAgent: 'CelebPick/1.0 (https://github.com/dinaYriad/CelebPick)',
  imageWidth: 600,
};

/**
 * SPARQL query to fetch diverse celebrities from Wikidata
 * Includes actors, musicians, athletes, directors, writers, and more
 */
const buildSPARQLQuery = (limit) => `
SELECT DISTINCT ?person ?personLabel ?image ?genderLabel WHERE {
  # Must be human
  ?person wdt:P31 wd:Q5.
  
  # Must have an image
  ?person wdt:P18 ?image.
  
  # Include diverse occupations
  VALUES ?occupation { 
    wd:Q33999      # actor
    wd:Q177220     # singer
    wd:Q639669     # musician
    wd:Q2526255    # film director
    wd:Q3282637    # film producer
    wd:Q36180      # writer
    wd:Q82955      # politician
    wd:Q937857     # football player
    wd:Q10871364   # baseball player
    wd:Q3665646    # basketball player
    wd:Q10833314   # tennis player
    wd:Q947873     # television presenter
    wd:Q245068     # comedian
    wd:Q901        # scientist
    wd:Q1930187    # journalist
    wd:Q483501     # artist
    wd:Q4610556    # model
  }
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
  const filename = wikimediaUrl.split('/').pop();
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;
};

/**
 * Extract Wikidata ID from URI
 */
const extractWikidataId = (uri) => {
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
const processResults = (results, existingCelebrities = []) => {
  console.log(`📊 Processing ${results.length} raw results...`);

  const celebrities = [];
  const namesSeen = new Set();
  const idsSeen = new Set();

  // Add existing celebrity names and IDs to seen sets
  existingCelebrities.forEach(celeb => {
    namesSeen.add(celeb.name.toLowerCase());
    idsSeen.add(celeb.id);
  });

  for (const result of results) {
    const name = result.personLabel?.value;
    const personUri = result.person?.value;
    const imageValue = result.image?.value;
    const gender = result.genderLabel?.value;

    // Skip if missing required fields
    if (!name || !personUri || !imageValue) continue;

    const id = extractWikidataId(personUri);
    const nameLower = name.toLowerCase();

    // Skip duplicates by name or ID
    if (namesSeen.has(nameLower) || idsSeen.has(id)) continue;
    
    namesSeen.add(nameLower);
    idsSeen.add(id);

    const celebrity = {
      id: id,
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

  console.log(`✅ Processed ${celebrities.length} new unique celebrities`);
  return celebrities;
};

/**
 * Load existing celebrities
 */
const loadExistingCelebrities = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('⚠️  Could not load existing celebrities:', error.message);
  }
  return [];
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
  console.log('🎬 CelebPick Enhanced Data Fetcher\n');

  try {
    // Load existing celebrities
    const existingCelebrities = loadExistingCelebrities(CONFIG.outputPath);
    console.log(`📋 Existing celebrities: ${existingCelebrities.length}\n`);

    // Fetch new data
    const results = await fetchCelebrities();

    // Process and deduplicate
    const newCelebrities = processResults(results, existingCelebrities);

    if (newCelebrities.length === 0) {
      console.error('❌ No new celebrities found!');
      process.exit(1);
    }

    // Merge with existing celebrities
    const allCelebrities = [...existingCelebrities, ...newCelebrities];

    // Save to file
    saveToFile(allCelebrities, CONFIG.outputPath);

    // Statistics
    console.log('\n📊 Statistics:');
    console.log(`   Previous: ${existingCelebrities.length}`);
    console.log(`   New: ${newCelebrities.length}`);
    console.log(`   Total: ${allCelebrities.length}`);
    
    // Gender distribution
    const male = allCelebrities.filter(c => c.gender === 'male').length;
    const female = allCelebrities.filter(c => c.gender === 'female').length;
    const noGender = allCelebrities.filter(c => !c.gender).length;
    
    console.log('\n🚻 Gender Distribution:');
    console.log(`   Male: ${male} (${Math.round(male/allCelebrities.length*100)}%)`);
    console.log(`   Female: ${female} (${Math.round(female/allCelebrities.length*100)}%)`);
    console.log(`   No gender: ${noGender}`);

    console.log('\n✨ Done! Database updated successfully.');

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
};

// Run the script
main();
