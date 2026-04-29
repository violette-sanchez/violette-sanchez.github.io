import os
import glob

snippet = """
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-M6FHGKKH');</script>
  <!-- End Google Tag Manager -->"""

files = glob.glob('/Users/violettesanchez/Documents/portfolio/*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'GTM-M6FHGKKH' in content:
        print(f'Already in {filepath}')
        continue
    
    head_idx = content.find('<head>')
    if head_idx != -1:
        insert_idx = head_idx + len('<head>')
        new_content = content[:insert_idx] + snippet + content[insert_idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Added to {filepath}')
    else:
        print(f'No <head> tag found in {filepath}')
