// JavaScript pour la page contact
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de l'ou00f9verture/fermeture des questions FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle la classe active sur la question
            this.classList.toggle('active');
            
            // Toggle la classe active sur la ru00e9ponse
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            
            // Changement de l'icu00f4ne + en x
            const icon = this.querySelector('.faq-toggle i');
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi du formulaire
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            // Simulation du du00e9lai d'envoi
            setTimeout(() => {
                // Ajout d'un message de confirmation
                const formHeader = document.querySelector('.form-header');
                const confirmation = document.createElement('div');
                confirmation.className = 'form-confirmation';
                confirmation.innerHTML = '<i class="fas fa-check-circle"></i><p>Merci pour votre message ! Nous vous ru00e9pondrons dans les plus brefs du00e9lais.</p>';
                
                // Animation du message
                confirmation.style.opacity = '0';
                formHeader.insertAdjacentElement('afterend', confirmation);
                
                // Animation d'apparition du message
                setTimeout(() => {
                    confirmation.style.transition = 'opacity 0.5s ease';
                    confirmation.style.opacity = '1';
                }, 50);
                
                // Ru00e9initialisation du formulaire
                this.reset();
                
                // Ru00e9tablissement du bouton apru00e8s envoi
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Suppression du message apru00e8s 5 secondes
                setTimeout(() => {
                    confirmation.style.opacity = '0';
                    setTimeout(() => {
                        confirmation.remove();
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }
    
    // Animation des cartes d'information au scroll
    const infoCards = document.querySelectorAll('.info-card, .faq-item');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                // Ajouter un du00e9lai progressif
                const index = Array.from(document.querySelectorAll('.info-card, .faq-item')).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, { threshold: 0.1 });
    
    infoCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
    
    // Gestion du bouton retour en haut de page
    const backToTopButton = document.getElementById('back-to-top');
    
    // Afficher le bouton quand l'utilisateur a du00e9filu00e9
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
    
    // Design plus compact sur mobile conformu00e9ment aux pru00e9fu00e9rences de l'utilisateur
    function adjustCompactDesign() {
        if (window.innerWidth <= 768) {
            // Ru00e9duire les espaces entre les sections
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.padding = section.classList.contains('map-section') ? '0' : '25px 0';
            });
            
            // Ru00e9duire les marges entre les u00e9lu00e9ments du formulaire
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.marginBottom = '12px';
            });
            
            // Ru00e9duire les espaces dans la FAQ
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                item.style.marginBottom = '10px';
            });
        }
    }
    
    // Exu00e9cuter lors du chargement et du redimensionnement
    adjustCompactDesign();
    window.addEventListener('resize', adjustCompactDesign);
});
