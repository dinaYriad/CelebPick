#!/usr/bin/env node

/**
 * Fetch Egyptian and Arab Celebrities from Wikidata
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  userAgent: 'CelebPick/1.0 (https://github.com/dinaYriad/CelebPick)',
  imageWidth: 600,
};

// List of Egyptian and Arab celebrities to search for
const CELEBRITIES_TO_FETCH = [
  // Egyptian celebrities
  'Mohamed Salah',
  'Omar Sharif',
  'Amr Diab',
  'Tamer Hosny',
  'Mohamed Mounir',
  'Adel Imam',
  'Umm Kulthum',
  'Youssef Chahine',
  'Sherine Abdel Wahab',
  'Mona Zaki',
  'Amr Waked',
  'Nour El-Sherif',
  'Faten Hamama',
  'Soad Hosny',
  'Ahmed Zaki',
  'Mohamed Ramadan',
  'Ruby',
  'Haifa Wehbe',
  'Ahmed Helmy',
  'Maged El Kedwany',
  
  // Arab celebrities popular in Egypt (Lebanese)
  'Nancy Ajram',
  'Fairuz',
  'Elissa',
  'Najwa Karam',
  
  // Other Arab celebrities
  'Amr Khaled',
  'Bassem Youssef',
  'Rami Malek',
];

/**
 * Build SPARQL query to fetch a specific celebrity by name
 */
const buildCelebrityQuery = (name) => `
SELECT DISTINCT ?person ?personLabel ?image ?genderLabel WHERE {
  # Must be human
  ?person wdt:P31 wd:Q5.
  
  # Match name
  ?person rdfs:label "${name}"@en.
  
  # Must have an image
  ?person wdt:P18 ?image.
  
  # Get gender (optional)
  OPTIONAL { ?person wdt:P21 ?gender. }
  
  # Get English label
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en".
  }
}
LIMIT 1
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
 * Fetch a single celebrity from Wikidata
 */
const fetchCelebrity = async (name) => {
  const query = buildCelebrityQuery(name);
  const endpoint = 'https://query.wikidata.org/sparql';

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
      console.log(`   ⚠️  ${name}: HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    const results = data.results.bindings;
    
    if (results.length === 0) {
      console.log(`   ⚠️  ${name}: Not found`);
      return null;
    }

    const result = results[0];
    const personUri = result.person?.value;
    const imageValue = result.image?.value;
    const gender = result.genderLabel?.value;

    if (!personUri || !imageValue) {
      console.log(`   ⚠️  ${name}: Missing data`);
      return null;
    }

    const celebrity = {
      id: extractWikidataId(personUri),
      name: name,
      imageUrl: getImageUrl(imageValue),
      source: 'Wikidata',
    };

    if (gender) {
      celebrity.gender = gender;
    }

    console.log(`   ✅ ${name} (${celebrity.id})`);
    return celebrity;

  } catch (error) {
    console.log(`   ❌ ${name}: ${error.message}`);
    return null;
  }
};

/**
 * Main execution
 */
const main = async () => {
  console.log('🎬 Fetching Egyptian and Arab Celebrities\n');
  console.log(`📋 Searching for ${CELEBRITIES_TO_FETCH.length} celebrities...\n`);

  const celebrities = [];

  for (const name of CELEBRITIES_TO_FETCH) {
    const celebrity = await fetchCelebrity(name);
    if (celebrity) {
      celebrities.push(celebrity);
    }
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Found ${celebrities.length} out of ${CELEBRITIES_TO_FETCH.length} celebrities\n`);

  // Output JSON
  console.log('📄 Celebrity Data (copy this to celebrities.json):\n');
  console.log(JSON.stringify(celebrities, null, 2));
};

// Run the script
main();
