import os
import re

nav_pattern = re.compile(r'(<nav class="nav-header">.*?)<div class="nav-container">.*?<a href="/" class="nav-logo">.*?<span class="nav-logo-brand">Portfolio</span> <span class="nav-logo-name">Violette Sanchez</span>.*?</a>.*?<div class="hidden md:flex items-center gap-8">.*?<a href="/projets.html" class="nav-menu-link">Projets</a>.*?<a href="/galerie.html" class="nav-menu-link">Galerie</a>.*?<a href="/a-propos.html" class="nav-menu-link">À propos</a>.*?<a href="/contact.html" class="nav-menu-link">Contact</a>.*?</div>.*?</div>', re.DOTALL)

new_nav = """<div class="nav-container">
      <a href="/" class="nav-logo">
        <span class="nav-logo-brand">Portfolio</span> <span class="nav-logo-name">Violette Sanchez</span>
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <a href="/projets.html" class="nav-menu-link">Projets</a>
        <a href="/galerie.html" class="nav-menu-link">Galerie</a>
        <a href="/a-propos.html" class="nav-menu-link">À propos</a>
        <a href="/contact.html" class="nav-menu-link">Contact</a>
      </div>

      <!-- Mobile Button -->
      <button class="mobile-menu-btn md:hidden" id="mobile-menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobile-menu-overlay">
      <nav class="mobile-nav">
        <a href="/projets.html" class="mobile-nav-link">Projets</a>
        <a href="/galerie.html" class="mobile-nav-link">Galerie</a>
        <a href="/a-propos.html" class="mobile-nav-link">À propos</a>
        <a href="/contact.html" class="mobile-nav-link">Contact</a>
      </nav>
    </div>"""

files = [f"projet-P{i}.html" for i in range(1, 11)]
for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Simplified replacement since regex might be brittle with varying whitespace
        search_str = '<div class="nav-container">'
        insertion_point = content.find(search_str)
        if insertion_point != -1:
            # Find the end of the current nav-container
            # It ends after the closing div of the menu
            end_search = '</div>\n    </div>'
            end_point = content.find(end_search, insertion_point)
            if end_point != -1:
                end_point += len(end_search)
                new_content = content[:insertion_point] + new_nav + content[end_point:]
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")
            else:
                # Try another common ending
                end_search = '</div>\n      </div>'
                end_point = content.find(end_search, insertion_point)
                if end_point != -1:
                     end_point += len(end_search)
                     new_content = content[:insertion_point] + new_nav + content[end_point:]
                     with open(filename, 'w', encoding='utf-8') as f:
                         f.write(new_content)
                     print(f"Updated {filename}")
