// JavaScript pour la page histoire
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du bouton retour en haut de page
    const backToTopButton = document.getElementById('back-to-top');
    
    // Afficher le bouton quand l'utilisateur a défilé
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
    
    // Animation de la timeline et des cartes au scroll
    const animateElements = document.querySelectorAll('.timeline-item, .value-card, .team-member');
    
    // Observer pour déclencher l'animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ajouter un délai progressif pour les éléments de la timeline
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(document.querySelectorAll('.timeline-item')).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                }
            }
        });
    }, { threshold: 0.15 });
    
    // Observer tous les éléments à animer
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Rendre la timeline plus compacte - Ajustement en fonction des préférences utilisateur
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Réduction de l'espace vertical entre les items
        item.style.marginBottom = '-10px';
    });
    
    // Réduire les espaces entre les sections pour un design plus compact
    const sections = document.querySelectorAll('section:not(.hero-small)');
    sections.forEach(section => {
        section.style.paddingTop = '40px';
        section.style.paddingBottom = '40px';
    });
    
    // Fonction pour appliquer un effet parallaxe au scroll sur les images de fond
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Effet parallaxe sur la section citation
        const ctaSection = document.querySelector('.cta-histoire');
        if (ctaSection) {
            const speed = 0.3;
            ctaSection.style.backgroundPositionY = `${-scrollPosition * speed}px`;
        }
    });
});
