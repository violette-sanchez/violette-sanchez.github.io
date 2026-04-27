
import './index.css';

// Animation au défilement (Reveal on scroll)
const revealElements = (threshold = 150) => {
  const reveals = document.querySelectorAll('.reveal, .section-container, .project-header-grid, .project-text-block, .project-navigation-section');
  const windowHeight = window.innerHeight;

  reveals.forEach(element => {
    const revealTop = element.getBoundingClientRect().top;
    if (revealTop < windowHeight - threshold) {
      element.classList.add('opacity-100', 'translate-y-0', 'scale-100', 'translate-x-0');
      element.classList.remove('opacity-0', 'translate-y-4', 'translate-y-8', 'scale-95', 'translate-x-[-20px]');
    }
  });
};

// Back to Top Button Logic
const handleBackToTop = () => {
  const btn = document.getElementById('back-to-top');
  if (btn) {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
};

// Mobile Menu Logic
const handleMobileMenu = () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('mobile-menu-overlay');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !overlay) return;

  const toggleMenu = () => {
    menuBtn.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
};

// Global scroll event
window.addEventListener('scroll', () => {
  revealElements();
  handleBackToTop();
});

// Révèle immédiatement les éléments déjà visibles au chargement (sans seuil)
document.addEventListener('DOMContentLoaded', () => {
  revealElements(0);
});

// Global load event
window.addEventListener('load', () => {
  revealElements(0);
  handleMobileMenu();

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Contact Form Logic
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;

    submitBtn.innerText = 'Message envoyé !';
    submitBtn.classList.add('bg-green-600');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerText = originalText;
      submitBtn.classList.remove('bg-green-600');
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}
