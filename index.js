// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
console.log(validator.isEmail('test@example.com'));
  // I want to make the year to always update
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const menuList = document.getElementById('main-menu');

  menuBtn.addEventListener('click', function() {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
    menuList.classList.toggle('active');
  });

  // Dark mode
  const darkBtn = document.getElementById('dark-btn');
  darkBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    darkBtn.textContent = 'Light Mode';
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        menuList.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Contact form
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!validator.isAlpha(name.replace(/\s/g, '')) || !validator.isEmail(email)) {
  msg.textContent = 'Please enter a valid full name and email!';
  msg.style.color = 'red';
  return;
}

   
    setTimeout(() => {
      form.reset();
      msg.textContent = 'Thanks! I’ll reply soon.';
      msg.style.color = 'green';
      setTimeout(() => msg.textContent = '', 3000);
    }, 800);
  });

});