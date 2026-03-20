// ========== CUSTOM CURSOR ==========
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

// ========== NAVIGATION ==========
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== HERO SLIDESHOW ==========
const slides = document.querySelectorAll('.hero-slide');
const counter = document.getElementById('slideCounter');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    counter.textContent = String(currentSlide + 1).padStart(2, '0');
}

setInterval(nextSlide, 5000);

// ========== HERO ANIMATIONS ==========
window.addEventListener('load', () => {
    document.querySelectorAll('.hero-content [data-animate]').forEach(el => {
        el.classList.add('visible');
    });
    document.querySelectorAll('.hero-line').forEach(el => {
        el.classList.add('visible');
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]:not(.hero-content [data-animate])').forEach(el => {
    observer.observe(el);
});

// ========== GALLERY FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach((item, i) => {
            const show = filter === 'all' || item.dataset.category === filter;
            if (show) {
                item.classList.remove('hidden');
                item.style.animation = `fadeInUp 0.5s ${i * 0.03}s both`;
            } else {
                item.classList.add('hidden');
                item.style.animation = '';
            }
        });
    });
});

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let lightboxIndex = 0;
let visibleItems = [];

function getVisibleItems() {
    return [...document.querySelectorAll('.gallery-item:not(.hidden)')];
}

function openLightbox(index) {
    visibleItems = getVisibleItems();
    lightboxIndex = index;
    const img = visibleItems[lightboxIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function prevImage() {
    visibleItems = getVisibleItems();
    lightboxIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
    const img = visibleItems[lightboxIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

function nextImage() {
    visibleItems = getVisibleItems();
    lightboxIndex = (lightboxIndex + 1) % visibleItems.length;
    const img = visibleItems[lightboxIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        const vis = getVisibleItems();
        const idx = vis.indexOf(item);
        openLightbox(idx >= 0 ? idx : 0);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
});

// ========== SMOOTH ANCHOR SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== PARALLAX ON QUOTE SECTION ==========
window.addEventListener('scroll', () => {
    const quoteBg = document.querySelector('.quote-bg');
    if (quoteBg) {
        const rect = quoteBg.parentElement.getBoundingClientRect();
        const speed = 0.3;
        quoteBg.style.transform = `translateY(${rect.top * speed}px)`;
    }
});
