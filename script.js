document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  
  // Check for saved theme preference or OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'ph ph-sun';
    } else {
      themeIcon.className = 'ph ph-moon';
    }
  }

  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  
  function reveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', reveal);
  // Trigger once on load
  reveal();
  
  // Animated Counters
  const counters = document.querySelectorAll('.stat-num');
  const speed = 200;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };
      
      const elementTop = counter.getBoundingClientRect().top;
      if (elementTop < window.innerHeight && counter.innerText == '0') {
        updateCount();
      }
    });
  };
  
  window.addEventListener('scroll', animateCounters);
});
