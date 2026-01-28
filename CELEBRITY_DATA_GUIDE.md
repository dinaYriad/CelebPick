# Celebrity Data Guide

This guide explains how to fetch real celebrity data from Wikidata for use in CelebPick.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Internet connection

### Fetch Celebrity Data

Run the data fetcher script:

```bash
node scripts/fetchCelebs.mjs
```

This will:
1. Query Wikidata SPARQL endpoint for celebrities
2. Fetch 300 celebrities (configurable) with images
3. De-duplicate by name
4. Save to `data/celebrities.json`

### Output Example

The script generates a JSON file with this structure:

```json
[
  {
    "id": "Q2263",
    "name": "Tom Hanks",
    "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Tom_Hanks_TIFF_2019.jpg?width=600",
    "source": "Wikidata",
    "gender": "male"
  },
  {
    "id": "Q4616",
    "name": "Meryl Streep",
    "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Meryl_Streep_2014.jpg?width=600",
    "source": "Wikidata",
    "gender": "female"
  }
]
```

### Expected Output

```
🎬 CelebPick Data Fetcher

🔍 Fetching celebrities from Wikidata...
   Limit: 300
📊 Processing 300 raw results...
✅ Processed 287 unique celebrities
📁 Created directory: data
💾 Saved to: /path/to/CelebPick/data/celebrities.json

🔍 Sanity Check:
   Total celebrities: 287
   First entry: Tom Hanks (Q2263)
   Image URL: https://commons.wikimedia.org/wiki/Special:FilePath/Tom_Hanks_TIFF_2019.jpg?width=600

✨ Done! You can now use this data in your app.
```

## Configuration

Edit `scripts/fetchCelebs.mjs` to customize:

```javascript
const CONFIG = {
  limit: 300,        // Number of celebrities to fetch
  imageWidth: 600,   // Image width in pixels
  // ... other options
};
```

## Optional Filters

The script includes commented-out filters in the SPARQL query. Uncomment to restrict results:

### Actors Only
```sparql
?person wdt:P106 wd:Q33999.
```

### Musicians Only
```sparql
?person wdt:P106 wd:Q177220.
```

### Actors OR Musicians
```sparql
VALUES ?occupation { wd:Q33999 wd:Q177220 }
?person wdt:P106 ?occupation.
```

## Gender Attribute

The celebrity data includes an optional `gender` field that contains the gender information from Wikidata.

### Gender Field Details

- **Property:** Wikidata property P21 (sex or gender)
- **Values:** Typically "male" or "female" (as labeled in Wikidata)
- **Optional:** Some celebrities may not have gender data
- **Use Cases:** 
  - Filter quiz questions by gender
  - Create gender-specific quizzes
  - Balance quiz options by gender
  - Track gender diversity in quiz selections

### Example Data Structure

Each celebrity object may include the gender field:

```json
{
  "id": "Q5383",
  "name": "David Bowie",
  "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/...",
  "source": "Wikidata",
  "gender": "male"
}
```

## Using the Data in Your App

### Option 1: Direct Import (Static)

Update `src/data/celebrities.ts`:

```typescript
import celebritiesData from '../../data/celebrities.json';

export const CELEBRITIES: Celebrity[] = celebritiesData.map(celeb => ({
  id: celeb.id,
  name: celeb.name,
  imageUrl: celeb.imageUrl,
  ...(celeb.gender && { gender: celeb.gender }),
}));
```

**Note:** You'll need to add `"resolveJsonModule": true` to your `tsconfig.json`.

### Filtering by Gender

The celebrity data now includes gender information that can be used for filtering:

```typescript
import { getRandomCelebritiesByGender } from './data/celebrities';

// Get 4 random male celebrities
const maleCelebs = getRandomCelebritiesByGender(4, 'male');

// Get 4 random female celebrities
const femaleCelebs = getRandomCelebritiesByGender(4, 'female');

// With exclusion list
const moreMales = getRandomCelebritiesByGender(4, 'male', ['Q2263', 'Q5383']);
```

### Option 2: Copy-Paste (Current Method)

1. Run the fetch script
2. Open `data/celebrities.json`
3. Manually update `src/data/celebrities.ts` with the real data

## Troubleshooting

### Script Fails with 504 Gateway Timeout
- Wikidata query is taking too long to process
- **Solution:** Reduce the `limit` in CONFIG (try 100-150 instead of 300)
- Or try again later when server load is lower
- Adding filters (actors only, musicians only) can also help

### Script Fails with Network Error
- Check your internet connection
- Wikidata endpoint might be temporarily down
- Try again in a few minutes

### Too Few Results
- Some celebrities may not have images in Wikidata
- Increase the `limit` in CONFIG
- Check if filters are too restrictive

### Images Not Loading in App
- Ensure image URLs are accessible
- Check React Native's network permissions
- Try reducing `imageWidth` if images are too large

## Data Quality

- **Source:** Wikidata (community-maintained)
- **License:** Images from Wikimedia Commons (various licenses)
- **Freshness:** Run script periodically for updates
- **Duplicates:** Automatically removed by name

## Advanced: Custom Queries

To fetch specific types of celebrities, modify the SPARQL query in `buildSPARQLQuery()`:

```sparql
# Example: American actors born after 1970
?person wdt:P31 wd:Q5.           # Human
?person wdt:P106 wd:Q33999.      # Occupation: Actor
?person wdt:P27 wd:Q30.          # Country: USA
?person wdt:P569 ?birthDate.     # Birth date
FILTER(YEAR(?birthDate) > 1970)  # Born after 1970
?person wdt:P18 ?image.          # Has image
```

Refer to [Wikidata Query Service](https://query.wikidata.org/) for more examples.

## Next Steps

After fetching data:
1. ✅ Run the script: `node scripts/fetchCelebs.mjs`
2. ✅ Check `data/celebrities.json` was created
3. ✅ Update `src/data/celebrities.ts` to use the data
4. ✅ Test the app with real celebrity images
5. ✅ Enjoy your quiz with real celebrities!
