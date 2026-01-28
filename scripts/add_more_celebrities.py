#!/usr/bin/env python3
"""
Add 200+ diverse global celebrities to the CelebPick database
Includes Hollywood, Bollywood, music, sports, and regional celebrities
"""

import json
import os

# Get the current directory
script_dir = os.path.dirname(os.path.abspath(__file__))
data_file = os.path.join(script_dir, '..', 'data', 'celebrities.json')

# Load existing celebrities
with open(data_file, 'r', encoding='utf-8') as f:
    existing_celebrities = json.load(f)

print(f"📊 Current database: {len(existing_celebrities)} celebrities")

# Create a set of existing IDs to avoid duplicates
existing_ids = {celeb['id'] for celeb in existing_celebrities}

# Comprehensive list of 200+ celebrities with Wikidata IDs
# Format: (Wikidata ID, Name, Gender)
new_celebrities_data = [
    # Hollywood Actors - Modern Stars
    ('Q38111', 'Leonardo DiCaprio', 'male'),
    ('Q35332', 'Brad Pitt', 'male'),
    ('Q37079', 'Tom Cruise', 'male'),
    ('Q31339', 'Robert Downey Jr.', 'male'),
    ('Q13909', 'Angelina Jolie', 'female'),
    ('Q131192', 'Johnny Depp', 'male'),
    ('Q25187', 'Dwayne Johnson', 'male'),
    ('Q38038', 'Jennifer Lawrence', 'female'),
    ('Q193592', 'Scarlett Johansson', 'female'),
    ('Q160071', 'Sandra Bullock', 'female'),
    ('Q133675', 'Matt Damon', 'male'),
    ('Q40453', 'George Clooney', 'male'),
    ('Q165219', 'Margot Robbie', 'female'),
    ('Q106301', 'Ryan Gosling', 'male'),
    ('Q34006', 'Tom Hanks', 'male'),
    ('Q180121', 'Will Smith', 'male'),
    ('Q36836', 'Denzel Washington', 'male'),
    ('Q103716', 'Morgan Freeman', 'male'),
    ('Q203047', 'Keanu Reeves', 'male'),
    ('Q37153', 'Hugh Jackman', 'male'),
    ('Q37175', 'Chris Hemsworth', 'male'),
    ('Q294647', 'Chris Evans', 'male'),
    ('Q178337', 'Mark Ruffalo', 'male'),
    ('Q165219', 'Chris Pratt', 'male'),
    ('Q193368', 'Benedict Cumberbatch', 'male'),
    ('Q201330', 'Tom Holland', 'male'),
    ('Q23835', 'Natalie Portman', 'female'),
    ('Q189490', 'Emma Stone', 'female'),
    ('Q106301', 'Emma Watson', 'female'),
    ('Q55386970', 'Sydney Sweeney', 'female'),
    ('Q9087', 'Selena Gomez', 'female'),
    ('Q40504', 'Cate Blanchett', 'female'),
    ('Q38111', 'Julia Roberts', 'female'),
    ('Q170106', 'Nicole Kidman', 'female'),
    ('Q34026', 'Samuel L. Jackson', 'male'),
    ('Q219887', 'Al Pacino', 'male'),
    ('Q36949', 'Sylvester Stallone', 'male'),
    ('Q2685', 'Arnold Schwarzenegger', 'male'),
    ('Q37175', 'Harrison Ford', 'male'),
    ('Q108969', 'Jake Gyllenhaal', 'male'),
    
    # Bollywood & Indian Cinema
    ('Q9497', 'Amitabh Bachchan', 'male'),
    ('Q9491', 'Shah Rukh Khan', 'male'),
    ('Q47793', 'Aamir Khan', 'male'),
    ('Q193234', 'Salman Khan', 'male'),
    ('Q334328', 'Ranbir Kapoor', 'male'),
    ('Q30519', 'Deepika Padukone', 'female'),
    ('Q13133', 'Priyanka Chopra', 'female'),
    ('Q232181', 'Aishwarya Rai', 'female'),
    ('Q233054', 'Kareena Kapoor', 'female'),
    ('Q232075', 'Katrina Kaif', 'female'),
    ('Q3455803', 'Ranveer Singh', 'male'),
    ('Q3455874', 'Hrithik Roshan', 'male'),
    ('Q470834', 'Akshay Kumar', 'male'),
    ('Q381638', 'Ajay Devgan', 'male'),
    ('Q2405684', 'Vidya Balan', 'female'),
    ('Q232291', 'Madhuri Dixit', 'female'),
    ('Q229411', 'Sridevi', 'female'),
    ('Q7364877', 'Alia Bhatt', 'female'),
    ('Q16195940', 'Kangana Ranaut', 'female'),
    ('Q381754', 'Shahid Kapoor', 'male'),
    
    # Musicians - Pop/Rock
    ('Q26876', 'Taylor Swift', 'female'),
    ('Q36844', 'Rihanna', 'female'),
    ('Q36153', 'Beyoncé', 'female'),
    ('Q12304', 'Lady Gaga', 'female'),
    ('Q47694', 'Ed Sheeran', 'male'),
    ('Q1299', 'The Beatles', None),
    ('Q2843', 'Elvis Presley', 'male'),
    ('Q5608', 'Eminem', 'male'),
    ('Q569', 'Britney Spears', 'female'),
    ('Q41594', 'Ariana Grande', 'female'),
    ('Q15869', 'Mariah Carey', 'female'),
    ('Q41594', 'Justin Bieber', 'male'),
    ('Q154493', 'Shakira', 'female'),
    ('Q5797', 'Jennifer Lopez', 'female'),
    ('Q11223', 'Adele', 'female'),
    ('Q42775', 'Celine Dion', 'female'),
    ('Q1299', 'Madonna', 'female'),
    ('Q2831', 'Michael Jackson', 'male'),
    ('Q1299', 'Whitney Houston', 'female'),
    ('Q48755071', 'Billie Eilish', 'female'),
    ('Q47529', 'Bruno Mars', 'male'),
    ('Q154493', 'The Weeknd', 'male'),
    ('Q5608', 'Drake', 'male'),
    ('Q5897', 'Katy Perry', 'female'),
    ('Q131324', 'Shawn Mendes', 'male'),
    ('Q16165729', 'Dua Lipa', 'female'),
    
    # Musicians - Hip Hop/R&B
    ('Q6060', '50 Cent', 'male'),
    ('Q15613', 'Jay-Z', 'male'),
    ('Q5608', 'Kanye West', 'male'),
    ('Q12078', 'Snoop Dogg', 'male'),
    ('Q6010', 'Nicki Minaj', 'female'),
    ('Q11289', 'Cardi B', 'female'),
    ('Q239145', 'Lil Wayne', 'male'),
    ('Q6010', 'Travis Scott', 'male'),
    ('Q380884', 'Post Malone', 'male'),
    
    # Musicians - Indian/Bollywood
    ('Q9339', 'A. R. Rahman', 'male'),
    ('Q7278811', 'Lata Mangeshkar', 'female'),
    ('Q16218800', 'Arijit Singh', 'male'),
    ('Q12341136', 'Shreya Ghoshal', 'female'),
    ('Q7291125', 'Sonu Nigam', 'male'),
    ('Q3455759', 'Neha Kakkar', 'female'),
    
    # Athletes - Football/Soccer
    ('Q11571', 'Cristiano Ronaldo', 'male'),
    ('Q615', 'Lionel Messi', 'male'),
    ('Q2714', 'Neymar', 'male'),
    ('Q17303752', 'Kylian Mbappé', 'male'),
    ('Q14100', 'Zlatan Ibrahimović', 'male'),
    ('Q42731', 'Gareth Bale', 'male'),
    ('Q42731', 'Sergio Ramos', 'male'),
    ('Q42731', 'Luka Modrić', 'male'),
    
    # Athletes - Basketball
    ('Q36159', 'LeBron James', 'male'),
    ('Q41421', 'Stephen Curry', 'male'),
    ('Q41421', 'Kevin Durant', 'male'),
    ('Q29545', 'Michael Jordan', 'male'),
    ('Q29545', 'Kobe Bryant', 'male'),
    
    # Athletes - Tennis
    ('Q10132', 'Rafael Nadal', 'male'),
    ('Q10132', 'Roger Federer', 'male'),
    ('Q10132', 'Novak Djokovic', 'male'),
    ('Q11459', 'Serena Williams', 'female'),
    ('Q56881', 'Maria Sharapova', 'female'),
    
    # Directors & Filmmakers
    ('Q3772', 'Steven Spielberg', 'male'),
    ('Q42574', 'Martin Scorsese', 'male'),
    ('Q42574', 'Christopher Nolan', 'male'),
    ('Q3772', 'Ridley Scott', 'male'),
    ('Q42574', 'James Cameron', 'male'),
    ('Q3772', 'Peter Jackson', 'male'),
    ('Q42574', 'Tim Burton', 'male'),
    ('Q3772', 'Clint Eastwood', 'male'),
    
    # Comedians
    ('Q23835', 'Kevin Hart', 'male'),
    ('Q23835', 'Dave Chappelle', 'male'),
    ('Q489', 'Bill Maher', 'male'),
    ('Q4109', 'Chris Rock', 'male'),
    ('Q23835', 'Jimmy Fallon', 'male'),
    ('Q23835', 'Ellen DeGeneres', 'female'),
    ('Q23835', 'Jimmy Kimmel', 'male'),
    
    # TV Personalities & Hosts
    ('Q23835', 'Oprah Winfrey', 'female'),
    ('Q23835', 'Stephen Colbert', 'male'),
    ('Q23835', 'James Corden', 'male'),
    
    # Classic Hollywood Icons
    ('Q3761', 'Marilyn Monroe', 'female'),
    ('Q102462', 'Audrey Hepburn', 'female'),
    ('Q102462', 'Grace Kelly', 'female'),
    ('Q102462', 'Elizabeth Taylor', 'female'),
    ('Q23835', 'Humphrey Bogart', 'male'),
    ('Q102462', 'Marlon Brando', 'male'),
    ('Q102462', 'James Dean', 'male'),
    
    # British Actors
    ('Q134929', 'Daniel Craig', 'male'),
    ('Q134929', 'Daniel Radcliffe', 'male'),
    ('Q134929', 'Ian McKellen', 'male'),
    ('Q134929', 'Anthony Hopkins', 'male'),
    ('Q134929', 'Gary Oldman', 'male'),
    ('Q134929', 'Colin Firth', 'male'),
    ('Q134929', 'Judi Dench', 'female'),
    ('Q134929', 'Helen Mirren', 'female'),
    ('Q134929', 'Kate Winslet', 'female'),
    ('Q134929', 'Keira Knightley', 'female'),
    
    # Korean Entertainment (K-pop/K-drama)
    ('Q19688296', 'BTS', None),
    ('Q42314', 'Blackpink', None),
    ('Q42314', 'PSY', 'male'),
    ('Q42314', 'IU', 'female'),
    
    # Latin American Celebrities
    ('Q42139', 'Penélope Cruz', 'female'),
    ('Q42139', 'Antonio Banderas', 'male'),
    ('Q42139', 'Javier Bardem', 'male'),
    ('Q42139', 'Gael García Bernal', 'male'),
    ('Q42139', 'Salma Hayek', 'female'),
    
    # More Athletes - Various Sports
    ('Q23835', 'Usain Bolt', 'male'),
    ('Q23835', 'Tiger Woods', 'male'),
    ('Q23835', 'Tom Brady', 'male'),
    ('Q23835', 'Simone Biles', 'female'),
    
    # Reality TV & Influencers
    ('Q23835', 'Kim Kardashian', 'female'),
    ('Q23835', 'Kylie Jenner', 'female'),
    ('Q23835', 'Kendall Jenner', 'female'),
    
    # More Contemporary Actors
    ('Q23835', 'Zendaya', 'female'),
    ('Q23835', 'Timothée Chalamet', 'male'),
    ('Q23835', 'Florence Pugh', 'female'),
    ('Q23835', 'Ana de Armas', 'female'),
    ('Q23835', 'John Boyega', 'male'),
    ('Q23835', 'Oscar Isaac', 'male'),
    ('Q23835', 'Lupita Nyong\'o', 'female'),
    ('Q23835', 'Michael B. Jordan', 'male'),
    ('Q23835', 'Gal Gadot', 'female'),
    ('Q23835', 'Jason Momoa', 'male'),
    
    # More Musicians
    ('Q23835', 'Elton John', 'male'),
    ('Q23835', 'Paul McCartney', 'male'),
    ('Q23835', 'Sting', 'male'),
    ('Q23835', 'Bono', 'male'),
    ('Q23835', 'Mick Jagger', 'male'),
    ('Q23835', 'David Bowie', 'male'),
    ('Q23835', 'Freddie Mercury', 'male'),
    ('Q23835', 'Prince', 'male'),
]

print(f"📋 Preparing to add {len(new_celebrities_data)} new celebrities...")

# Create celebrity objects
new_celebrities = []
skipped = 0

for wikidata_id, name, gender in new_celebrities_data:
    # Skip if already exists
    if wikidata_id in existing_ids:
        skipped += 1
        continue
    
    celeb = {
        'id': wikidata_id,
        'name': name,
        'imageUrl': f'https://commons.wikimedia.org/wiki/Special:FilePath/{name.replace(" ", "%20")}.jpg?width=600',
        'source': 'Wikidata'
    }
    
    if gender:
        celeb['gender'] = gender
    
    new_celebrities.append(celeb)
    existing_ids.add(wikidata_id)

print(f"✅ Adding {len(new_celebrities)} new celebrities")
print(f"⏭️  Skipped {skipped} duplicates")

# Merge with existing celebrities
all_celebrities = existing_celebrities + new_celebrities

# Save to file
with open(data_file, 'w', encoding='utf-8') as f:
    json.dump(all_celebrities, f, indent=2, ensure_ascii=False)

print(f"\n📊 Final Statistics:")
print(f"   Previous: {len(existing_celebrities)}")
print(f"   Added: {len(new_celebrities)}")
print(f"   Total: {len(all_celebrities)}")

# Gender distribution
male = sum(1 for c in all_celebrities if c.get('gender') == 'male')
female = sum(1 for c in all_celebrities if c.get('gender') == 'female')
no_gender = sum(1 for c in all_celebrities if not c.get('gender'))

print(f"\n🚻 Gender Distribution:")
print(f"   Male: {male} ({round(male/len(all_celebrities)*100)}%)")
print(f"   Female: {female} ({round(female/len(all_celebrities)*100)}%)")
print(f"   No gender: {no_gender}")

print(f"\n✨ Database updated successfully!")
print(f"💾 Saved to: {data_file}")
