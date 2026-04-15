import os
import re

dir_path = os.path.dirname(os.path.realpath(__file__))
# match <a href="galerie.html"...>Galerie</a> [whitespace] <a href="a-propos.html"...>À propos</a>
pattern = re.compile(r'(<a href="galerie\.html"[^>]*>Galerie</a>)(\s*)(<a href="a-propos\.html"[^>]*>À propos</a>)')

updated_count = 0

for file in os.listdir(dir_path):
    if file.endswith('.html'):
        filepath = os.path.join(dir_path, file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content, count = pattern.subn(r'\3\2\1', content)
        
        if count > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
            updated_count += 1

print(f"Done! Updated {updated_count} HTML files.")
