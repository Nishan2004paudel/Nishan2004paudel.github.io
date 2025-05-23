// DOM Elements
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const header = document.querySelector("header");
const scrollTop = document.getElementById("scroll-top");
const navLinks = document.querySelectorAll(".nav-link");
const tabBtns = document.querySelectorAll(".tab-btn");
const skillBars = document.querySelectorAll(".skill-percentage");
const sections = document.querySelectorAll("section");
const contactForm = document.getElementById("contact-form");

// Toggle menu for mobile
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Hide menu on click on nav link in mobile view
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuToggle.classList.contains("active")) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Change header background on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    scrollTop.classList.add("visible");
  } else {
    header.classList.remove("scrolled");
    scrollTop.classList.remove("visible");
  }

  // Active link based on scroll position
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Tabs functionality
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    // Update active state of tab buttons
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Update active state of tab panes
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.remove("active");
    });
    document.getElementById(target).classList.add("active");
  });
});

// Animate skill bars on scroll
function animateSkillBars() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    skillBars.forEach((bar) => {
      const percentage = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = percentage;
      }, 100);
    });

    // Remove event listener after animation
    window.removeEventListener("scroll", animateSkillBars);
  }
}

window.addEventListener("scroll", animateSkillBars);

// Form submission (example for demonstration - not functional without backend)
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<ion-icon name="hourglass-outline"></ion-icon> Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Reset form
      contactForm.reset();

      // Show success message (in a real app, you'd handle the response properly)
      alert(
        "Message sent successfully! (This is a demo - no message was actually sent)"
      );

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Animate skill bars if skills section is already in view
  animateSkillBars();
});
