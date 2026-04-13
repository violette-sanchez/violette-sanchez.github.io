const fs = require('fs');

const files = [
  'a-propos.html',
  'contact.html',
  'galerie.html',
  'projet-P1.html',
  'projet-P10.html',
  'projet-P2.html',
  'projet-P3.html',
  'projet-P4.html',
  'projet-P5.html',
  'projet-P6.html',
  'projet-P7.html',
  'projet-P8.html',
  'projet-P9.html',
  'projets.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find start of <!-- Navigation -->
  const startIdx = content.indexOf('<!-- Navigation -->');
  // Find end of the first </nav> after startIdx
  const endIdx = content.indexOf('</nav>', startIdx);
  
  if (startIdx !== -1 && endIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx + 6); // length of '</nav>'
    
    // Check if it's the specific active link for the page
    let activeLink = '';
    if (file === 'projets.html' || file.startsWith('projet-')) activeLink = 'Projets';
    else if (file === 'galerie.html') activeLink = 'Galerie';
    else if (file === 'a-propos.html') activeLink = 'À propos';
    else if (file === 'contact.html') activeLink = 'Contact';
    
    let linksHTML = `
        <a href="projets.html" class="nav-menu-link${activeLink === 'Projets' ? ' active' : ''}">Projets</a>
        <a href="galerie.html" class="nav-menu-link${activeLink === 'Galerie' ? ' active' : ''}">Galerie</a>
        <a href="a-propos.html" class="nav-menu-link${activeLink === 'À propos' ? ' active' : ''}">À propos</a>
        <a href="contact.html" class="nav-menu-link${activeLink === 'Contact' ? ' active' : ''}">Contact</a>`;

    const newNav = `<!-- Navigation -->
  <nav class="nav-header">
    <div class="nav-container">
      <div class="flex justify-between items-center w-full md:w-auto">
        <a href="/" class="nav-logo">
          <span class="nav-logo-brand">Portfolio</span> <span class="nav-logo-name">Violette Sanchez</span>
        </a>
        <button class="mobile-menu-btn md:hidden" id="mobile-menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="nav-menu hidden md:flex items-center gap-12">${linksHTML}
      </div>
    </div>
  </nav>`;

    fs.writeFileSync(file, before + newNav + after);
    console.log(`Successfully updated ${file}`);
  } else {
    console.log(`Failed to update ${file}`);
  }
}
