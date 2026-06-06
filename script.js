/* ================================================================
   DIGITAL PORTFOLIO — script.js
   Tác giả: Trần Đức Mạnh · VNU-UET
   Mô tả: Xử lý toàn bộ tương tác JS cho portfolio
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. NAVBAR — Scroll shadow + Active link highlight
   ---------------------------------------------------------------- */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

// Thêm class .scrolled khi cuộn xuống để navbar tối hơn
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveNav();
}, { passive: true });

// Tô sáng link navbar tương ứng với section đang nhìn thấy
function highlightActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}


/* ----------------------------------------------------------------
   2. MOBILE HAMBURGER MENU
   ---------------------------------------------------------------- */
const navToggle  = document.getElementById('navToggle');
const navLinksList = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksList.classList.toggle('open');
  // Cập nhật aria cho accessibility
  const isOpen = navLinksList.classList.contains('open');
  navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
});

// Tự đóng menu khi bấm vào một link (trên mobile)
navLinksList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});


/* ----------------------------------------------------------------
   3. SCROLL FADE-IN ANIMATION (Intersection Observer)
   Mọi phần tử có class .fade-in sẽ xuất hiện khi cuộn tới
   ---------------------------------------------------------------- */
const fadeEls = document.querySelectorAll('.fade-in');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px', // kích hoạt sớm hơn 60px
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Sau khi đã hiện rồi thì không cần theo dõi nữa
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => observer.observe(el));


/* ----------------------------------------------------------------
   4. SMOOTH SCROLL — Bắt mọi link #anchor để cuộn mượt
   (Dự phòng cho trình duyệt cũ không hỗ trợ CSS scroll-behavior)
   ---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // chiều cao navbar
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ----------------------------------------------------------------
   5. HERO ANIMATIONS — Kích hoạt ngay khi tải trang
   ---------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  // Hero content fade-in ngay lập tức (không cần scroll)
  const heroFadeEls = document.querySelectorAll('.hero-section .fade-in');
  heroFadeEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 + i * 120);
  });
});


/* ----------------------------------------------------------------
   6. PROJECT CARDS — Hiệu ứng delay xuất hiện theo thứ tự
   ---------------------------------------------------------------- */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Lấy vị trí thứ tự trong lưới để tính delay
      const cards = [...document.querySelectorAll('.project-card')];
      const idx   = cards.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.project-card').forEach(card => cardObserver.observe(card));


/* ----------------------------------------------------------------
   7. SUMMARY CARDS — Tương tự delay cho phần tổng kết
   ---------------------------------------------------------------- */
const summaryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = [...document.querySelectorAll('.summary-card')];
      const idx   = cards.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.12}s`;
      entry.target.classList.add('visible');
      summaryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.summary-card').forEach(card => summaryObserver.observe(card));


/* ================================================================
   ĐỂ CHÈN LINK PDF SAU NÀY:
   Tìm các thẻ <a href="#" class="btn btn-outline"> trong index.html
   và thay href="#" bằng đường dẫn PDF thực tế, ví dụ:
   href="./bai1_quan_ly_tep.pdf"     (file cùng thư mục)
   href="https://drive.google.com/..."  (Google Drive)
   ================================================================ */
