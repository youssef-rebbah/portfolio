const navbar = document.querySelector('.navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');
const scrollTopBtn = document.getElementById('scrollTop');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const siteHeader = document.querySelector('header');

let toastTimer;
let lastScrollY = window.scrollY;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('menu-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.textContent = isOpen ? '✕' : '☰';
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('menu-open');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.textContent = '☰';
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1200) {
    navbar.classList.remove('menu-open');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.textContent = '☰';
    }
  }
});

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }

  if (currentScrollY <= 80) {
    siteHeader.classList.remove('nav-hidden');
  } else if (currentScrollY > lastScrollY) {
    siteHeader.classList.add('nav-hidden');
  } else {
    siteHeader.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   toast.classList.add('show');
//   clearTimeout(toastTimer);
//   toastTimer = setTimeout(() => {
//     toast.classList.remove('show');
//   }, 2400);
//   contactForm.reset();
// });


if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☾' : '☼';
  });
}
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value.trim());
    formData.append('phone', document.getElementById('phone').value.trim());
    formData.append('email', document.getElementById('email').value.trim());
    formData.append('subject', document.getElementById('subject').value.trim());
    formData.append('message', document.getElementById('message').value.trim());
    formData.append('_captcha', 'false');
    formData.append('_subject', 'New Portfolio Contact Message');
    formData.append('_template', 'table');

    try {
      const response = await fetch('https://formsubmit.co/ajax/rebbahyoussef74@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Message sent',
          text: 'Your message has been sent successfully.'
        });

        contactForm.reset();
        window.location.href = '#home';
      } else {
        throw new Error('Send failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was a problem sending your message.'
      });
    }
  });
}