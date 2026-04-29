import os
import glob
import re

new_ga4 = """
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KMFM512MDM"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KMFM512MDM');
</script>"""

files = glob.glob('/Users/violettesanchez/Documents/portfolio/*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the old GTM script
    content = re.sub(r'\s*<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->', '', content, flags=re.DOTALL)
    
    # If the new GA4 script is not already there, add it
    if 'G-KMFM512MDM' not in content:
        head_idx = content.find('<head>')
        if head_idx != -1:
            insert_idx = head_idx + len('<head>')
            content = content[:insert_idx] + new_ga4 + content[insert_idx:]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Replaced in {filepath}')
        else:
            print(f'No <head> found in {filepath}')
    else:
        print(f'GA4 already in {filepath}')

