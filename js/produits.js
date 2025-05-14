// JavaScript pour la page des produits
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du bouton retour en haut de page
    const backToTopButton = document.getElementById('back-to-top');
    
    // Afficher le bouton quand l'utilisateur a scrollu00e9 un peu
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Action lors du clic sur le bouton
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Navigation rapide - Ajouter la classe active lors du scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.quick-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation au scroll pour les u00e9lu00e9ments
    const fadeElements = document.querySelectorAll('.formule-category, .section-header');
    
    // Ajouter la classe fade-in u00e0 tous les u00e9lu00e9ments
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Observer pour du00e9clencher l'animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // N'observer qu'une fois
            }
        });
    }, { threshold: 0.1 });
    
    // Observer tous les u00e9lu00e9ments avec fade-in
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Navigation douce pour les ancres
    document.querySelectorAll('.quick-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
});
