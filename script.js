// ===== Smooth Scroll =====
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const offset = target.offsetTop - 100;
        window.scrollTo({top: offset, behavior: 'smooth'});
    });
});

// ===== Fade-in Sections =====
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.8;
    sections.forEach(section => {
        if(scrollPos > section.offsetTop){
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
            section.style.transition = 'all 0.8s ease-out';
        }
    });
});
sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
});

// ===== Hero Background Parallax =====
const heroBg = document.querySelector('.hero-bg');
if(heroBg){
    let pos = 0;
    setInterval(()=>{ pos -= 0.05; heroBg.style.backgroundPosition = `center ${pos}px`; },20);
}

// ===== Portfolio Hover & Lightbox =====
const portfolioItems = document.querySelectorAll('.portfolio-item img');
const lightboxOverlay = document.createElement('div');
lightboxOverlay.id = 'lightbox-overlay';
document.body.appendChild(lightboxOverlay);
const lightboxImg = document.createElement('img');
lightboxOverlay.appendChild(lightboxImg);

portfolioItems.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform='scale(1.1)';
        img.style.boxShadow='0 10px 25px rgba(255,202,40,0.6)';
    });
    img.addEventListener('mouseout', () => {
        img.style.transform='scale(1)';
        img.style.boxShadow='none';
    });
    img.addEventListener('click', () => {
        lightboxImg.src = img.getAttribute('data-full');
        lightboxOverlay.style.display = 'flex';
    });
});
lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.style.display = 'none';
});

// ===== Language Switcher =====
const translations = {
    en: {
        nav_services: "Services",
        nav_portfolio: "My Works",
        nav_pricing: "Pricing",
        nav_contact: "Contact",
        hero_title: "Stand Out in Gorilla Tag VR!",
        hero_desc: "Custom thumbnails, profile pictures, and VR art designed for Gorilla Tag creators.",
        hero_btn: "Get Started",
        services_title: "My Services (FREE!)",
        service1_title: "Thumbnails",
        service1_desc: "Create eye-catching thumbnails for YouTube, VR streams, and content creators.",
        service2_title: "Profile Pictures",
        service2_desc: "Unique profile images that fit Gorilla Tag avatars perfectly and pop in VR.",
        service3_title: "Banners & Posters",
        service3_desc: "Special banners and posters to make your VR brand shine.",
        portfolio_title: "My Works",
        tooltip_fullscreen: "Click to fullscreen",
        pricing_title: "Pricing",
        price1_title: "Thumbnail",
        price1_desc: "Eye-catching thumbnails for YouTube or VR streams.",
        price2_title: "Profile Picture",
        price2_desc: "Custom Gorilla Tag profile pictures.",
        price3_title: "Banner / Poster",
        price3_desc: "Banners and posters for VR branding.",
        price_free: "Completely Free! 💛",
        hire_btn: "Request Service",
        contact_title: "Contact Me",
        contact_instructions: "Please fill in the information below when contacting me.\nRequired details: Message, Color Code (RGB or Hex), YouTube link, Cosmetics list.\n⚠️ Note: I may not have all of your cosmetics in Gorilla Tag.",
        name_placeholder: "Your Name",
        email_placeholder: "Your Email",
        message_placeholder: "Write your message here...",
        contact_btn: "Send Message"
    },
    es: {
        nav_services: "Servicios",
        nav_portfolio: "Mis Trabajos",
        nav_pricing: "Precios",
        nav_contact: "Contacto",
        hero_title: "¡Destaca en Gorilla Tag VR!",
        hero_desc: "Miniaturas personalizadas, imágenes de perfil y arte VR diseñados para creadores de Gorilla Tag.",
        hero_btn: "Comenzar",
        services_title: "Mis Servicios (¡GRATIS!)",
        service1_title: "Miniaturas",
        service1_desc: "Crea miniaturas llamativas para YouTube, transmisiones VR y creadores de contenido.",
        service2_title: "Imágenes de Perfil",
        service2_desc: "Imágenes de perfil únicas que se ajustan perfectamente a los avatares de Gorilla Tag.",
        service3_title: "Banners & Posters",
        service3_desc: "Banners y posters para destacar tu marca VR.",
        portfolio_title: "Mis Trabajos",
        tooltip_fullscreen: "Haz clic para pantalla completa",
        pricing_title: "Precios",
        price1_title: "Miniatura",
        price1_desc: "Miniaturas llamativas para YouTube o transmisiones VR.",
        price2_title: "Imagen de Perfil",
        price2_desc: "Imágenes de perfil personalizadas de Gorilla Tag.",
        price3_title: "Banner / Poster",
        price3_desc: "Banners y posters para la marca VR.",
        price_free: "¡Completamente Gratis! 💛",
        hire_btn: "Solicitar Servicio",
        contact_title: "Contáctame",
        contact_instructions: "Por favor completa la información al contactarme.\nDetalles requeridos: Mensaje, Código de Color (RGB o Hex), enlace de YouTube, lista de cosméticos.\n⚠️ Nota: Puede que no tenga todos tus cosméticos en Gorilla Tag.",
        name_placeholder: "Tu Nombre",
        email_placeholder: "Tu Correo",
        message_placeholder: "Escribe tu mensaje aquí...",
        contact_btn: "Enviar Mensaje"
    }
};

const langSelect = document.getElementById('language-select');
langSelect.addEventListener('change', () => {
    const lang = langSelect.value;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[lang][key]) el.textContent = translations[lang][key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(translations[lang][key]) el.placeholder = translations[lang][key];
    });

    // Fix tooltips inside portfolio items
    document.querySelectorAll('.portfolio-item .tooltip').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[lang][key]) el.textContent = translations[lang][key];
    });
});
