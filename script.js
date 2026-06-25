document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // Lucide Icons Init
  // =====================
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  // =====================
  // Navbar Scroll Effect
  // =====================
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // =====================
  // Mobile Menu Toggle
  // =====================
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    mobileBtn.innerHTML = `<i data-lucide="${
      navLinks.classList.contains('active') ? 'x' : 'menu'
    }"></i>`;

    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('active');

      mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    });
  });

  // =====================
  // Fade-in Animation
  // =====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // =====================
  // Profile Picture Upload (CURRENTLY DISABLED IF REMOVED IN HTML)
  // =====================
  const profilePic = document.getElementById('profile-pic');
  const profileInput = document.getElementById('profile-pic-input');

  if (profilePic && profileInput) {
    profilePic.addEventListener('click', () => profileInput.click());

    profileInput.addEventListener('change', e => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = ev => {
          profilePic.innerHTML = `<img src="${ev.target.result}">`;
        };

        reader.readAsDataURL(file);
      }
    });
  }

  // =====================
  // Contact Form (EmailJS / Mailto fallback)
  // =====================
  const EMAILJS_USER_ID = '9M8S5TwiwyaHc2UCm';
  const EMAILJS_SERVICE_ID = 'service_itc7s57';
  const EMAILJS_TEMPLATE_ID = 'template_153luyz';

  const contactForm = document.getElementById('contact-form');

  const isEmailJsConfigured = () => {
    return window.emailjs &&
      ![EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID]
        .some(v => v.includes('YOUR_'));
  };

  if (contactForm) {

    if (isEmailJsConfigured()) {
      emailjs.init(EMAILJS_USER_ID);

      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          this
        ).then(() => {
          alert('Message sent!');
          this.reset();
        }, err => {
          alert('Error sending message.');
          console.error(err);
        });
      });

    } else {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const name = formData.get('from_name') || '';
        const email = formData.get('reply_to') || '';
        const message = formData.get('message') || '';

        const subject = `New message from ${name || 'Portfolio visitor'}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

        window.location.href =
          `mailto:rijalunnati46@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  }

});
