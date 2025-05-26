document.addEventListener('DOMContentLoaded', function() {
    // Toggle du menu mobile avec animation
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (navToggle && mainNav && hamburgerIcon) {
        navToggle.addEventListener('click', function() {
            // Toggle de la classe active sur le menu
            mainNav.classList.toggle('active');
            
            // Animation de l'icône hamburger
            hamburgerIcon.classList.toggle('open');
            
            // Animation du bouton toggle
            navToggle.classList.toggle('active');
        });
    }
    
    // Fermeture du menu quand on clique ailleurs
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active') && 
            !mainNav.contains(event.target) && 
            !navToggle.contains(event.target)) {
            mainNav.classList.remove('active');
            hamburgerIcon.classList.remove('open');
            navToggle.classList.remove('active');
        }
    });
    
    // Effet parallax sur le hero
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Effet de parallax avec une vitesse réduite pour un effet plus subtil
            heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        });
    }
    
    // Animation au scroll pour les éléments avec data-aos
    const animateElements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8; // Déclencher l'animation à 80% de la hauteur de la fenêtre
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Vérifier au chargement initial
    checkScroll();
    
    // Vérifier lors du défilement
    window.addEventListener('scroll', checkScroll);
    
    // Slider des formules
    const formuleSlider = document.querySelector('.formules-slider');
    const formuleItems = document.querySelectorAll('.formules-slider .formule-item');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    let currentFormuleIndex = 1; // Index de la formule active par défaut (Formule Complète)
    
    // Fonction pour mettre à jour le slider
    function updateSlider() {
        if (!formuleSlider) return;
        
        // Calcul de la position pour centrer l'élément actif
        const sliderWidth = formuleSlider.offsetWidth;
        const formuleWidth = formuleItems[0].offsetWidth;
        const gap = 16; // Équivalent à 1rem en pixels
        
        // Déplacer le slider pour centrer l'élément actif
        const offset = (currentFormuleIndex * (formuleWidth + gap)) - ((sliderWidth - formuleWidth) / 2);
        formuleSlider.style.transform = `translateX(-${offset}px)`;
        
        // Mettre à jour les classes actives
        formuleItems.forEach((item, index) => {
            if (index === currentFormuleIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Mettre à jour les indicateurs de pagination
        paginationDots.forEach((dot, index) => {
            if (index === currentFormuleIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Fonction pour naviguer vers la formule précédente en boucle
    function goToPrevFormule() {
        if (currentFormuleIndex > 0) {
            currentFormuleIndex--;
        } else {
            // Boucle - aller au dernier élément quand on est au premier
            currentFormuleIndex = formuleItems.length - 1;
        }
        updateSlider();
    }
    
    // Fonction pour naviguer vers la formule suivante en boucle
    function goToNextFormule() {
        if (currentFormuleIndex < formuleItems.length - 1) {
            currentFormuleIndex++;
        } else {
            // Boucle - revenir au premier élément quand on est au dernier
            currentFormuleIndex = 0;
        }
        updateSlider();
    }
    
    // Configurer les écouteurs d'événements
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', goToPrevFormule);
        nextButton.addEventListener('click', goToNextFormule);
    }
    
    // Configurer les points de pagination
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentFormuleIndex = index;
            updateSlider();
        });
    });
    
    // Support du toucher et de la souris pour le slider avec gestion amu00e9lioru00e9e
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    // Auto-rotation du slider
    let slideInterval;
    
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            if (currentFormuleIndex < formuleItems.length - 1) {
                currentFormuleIndex++;
            } else {
                currentFormuleIndex = 0;
            }
            updateSlider();
        }, 5000); // Change de slide toutes les 5 secondes
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    if (formuleSlider) {
        // Démarrer l'auto-rotation
        startAutoSlide();
        
        // Variables pour le support de la souris
        let isFormulesMouseDown = false;
        let startFormulesMouseX = 0;
        let currentFormulesMouseX = 0;
        
        // Gestion du toucher mobile
        formuleSlider.addEventListener('touchstart', (e) => {
            stopAutoSlide();
            touchStartX = e.changedTouches[0].screenX;
            touchStartTime = new Date().getTime(); // Enregistrer le moment du toucher
        }, { passive: true });
        
        formuleSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            startAutoSlide();
            handleSwipe();
        });
        
        // Gestion de la souris pour desktop
        formuleSlider.addEventListener('mousedown', (e) => {
            isFormulesMouseDown = true;
            startFormulesMouseX = e.pageX;
            currentFormulesMouseX = e.pageX;
            stopAutoSlide();
            formuleSlider.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        formuleSlider.addEventListener('mousemove', (e) => {
            if (!isFormulesMouseDown) return;
            currentFormulesMouseX = e.pageX;
            const moveDistance = currentFormulesMouseX - startFormulesMouseX;
            
            if (Math.abs(moveDistance) > 10) {
                e.preventDefault(); // Empêcher le défilement de la page
            }
        });
        
        formuleSlider.addEventListener('mouseup', (e) => {
            if (!isFormulesMouseDown) return;
            isFormulesMouseDown = false;
            formuleSlider.style.cursor = 'grab';
            
            const moveDistance = currentFormulesMouseX - startFormulesMouseX;
            if (moveDistance > 80) {
                goToPrevFormule();
            } else if (moveDistance < -80) {
                goToNextFormule();
            }
            
            startAutoSlide();
        });
        
        formuleSlider.addEventListener('mouseleave', () => {
            if (isFormulesMouseDown) {
                isFormulesMouseDown = false;
                formuleSlider.style.cursor = 'grab';
                startAutoSlide();
            }
        });
    }
    
    function handleSwipe() {
        const minSwipeDistance = 30; // Distance minimale réduite pour une meilleure sensibilité
        const swipeDistance = touchEndX - touchStartX;
        const swipeThreshold = window.innerWidth / 3; // Seuil adaptatif selon la taille de l'écran
        
        // Calcul de la vitesse du swipe
        const touchDuration = new Date().getTime() - touchStartTime;
        const swipeSpeed = Math.abs(swipeDistance) / touchDuration;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe vers la droite - aller à la formule précédente
                goToPrevFormule();
            } else {
                // Swipe vers la gauche - aller à la formule suivante
                goToNextFormule();
            }
            
            // Animation rapide pour donner une sensation de fluidité
            formuleSlider.style.transition = 'transform 0.3s cubic-bezier(0.215, 0.610, 0.355, 1.000)';
            
            // Réinitialiser la transition après l'animation
            setTimeout(() => {
                formuleSlider.style.transition = 'transform 0.5s ease';
            }, 300);
        }
    }
    
    // Initialiser le slider lors du chargement
    if (formuleSlider && formuleItems.length > 0) {
        // Décaler le premier rendu pour s'assurer que les largeurs sont calculées correctement
        setTimeout(updateSlider, 100);
        
        // Mettre à jour le slider lors du redimensionnement de la fenêtre
        window.addEventListener('resize', updateSlider);
    }
    
    // Slider des témoignages clients
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPaginationDots = document.querySelectorAll('.testimonial-pagination .pagination-dot');
    const testimonialPrevButton = document.querySelector('.testimonial-prev');
    const testimonialNextButton = document.querySelector('.testimonial-next');
    
    let currentTestimonialIndex = 0; // Index du témoignage actif par défaut
    
    // Fonction pour mettre à jour le slider des témoignages
    function updateTestimonialSlider() {
        if (!testimonialSlider) return;
        
        // Calcul de la position pour centrer l'élément actif
        const sliderWidth = testimonialSlider.offsetWidth;
        const testimonialWidth = testimonialItems[0].offsetWidth;
        const gap = 24; // Équivalent à 1.5rem en pixels
        
        // Déplacer le slider pour centrer l'élément actif
        const offset = (currentTestimonialIndex * (testimonialWidth + gap)) - ((sliderWidth - testimonialWidth) / 2);
        testimonialSlider.style.transform = `translateX(-${offset}px)`;
        
        // Mettre à jour les classes actives
        testimonialItems.forEach((item, index) => {
            if (index === currentTestimonialIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Mettre à jour les indicateurs de pagination
        testimonialPaginationDots.forEach((dot, index) => {
            if (index === currentTestimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Fonction pour naviguer vers le témoignage précédent en boucle
    function goToPrevTestimonial() {
        if (currentTestimonialIndex > 0) {
            currentTestimonialIndex--;
        } else {
            // Boucle - aller au dernier témoignage quand on est au premier
            currentTestimonialIndex = testimonialItems.length - 1;
        }
        updateTestimonialSlider();
    }
    
    // Fonction pour naviguer vers le témoignage suivant en boucle
    function goToNextTestimonial() {
        if (currentTestimonialIndex < testimonialItems.length - 1) {
            currentTestimonialIndex++;
        } else {
            // Boucle - revenir au premier témoignage quand on est au dernier
            currentTestimonialIndex = 0;
        }
        updateTestimonialSlider();
    }
    
    // Configurer les écouteurs d'événements pour les témoignages
    if (testimonialPrevButton && testimonialNextButton) {
        testimonialPrevButton.addEventListener('click', goToPrevTestimonial);
        testimonialNextButton.addEventListener('click', goToNextTestimonial);
    }
    
    // Configurer les points de pagination des témoignages
    testimonialPaginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonialIndex = index;
            updateTestimonialSlider();
        });
    });
    
    // Auto-rotation des témoignages
    let testimonialInterval;
    
    function startAutoTestimonial() {
        testimonialInterval = setInterval(() => {
            if (currentTestimonialIndex < testimonialItems.length - 1) {
                currentTestimonialIndex++;
            } else {
                currentTestimonialIndex = 0;
            }
            updateTestimonialSlider();
        }, 7000); // Change de témoignage toutes les 7 secondes
    }
    
    function stopAutoTestimonial() {
        clearInterval(testimonialInterval);
    }
    
    if (testimonialSlider) {
        // Démarrer l'auto-rotation
        startAutoTestimonial();
        
        // Variables pour le support de la souris
        let isMouseDown = false;
        let startMouseX = 0;
        let currentMouseX = 0;
        
        // Gestion du toucher mobile
        testimonialSlider.addEventListener('touchstart', (e) => {
            stopAutoTestimonial();
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleTestimonialSwipe();
            startAutoTestimonial(); // Redémarrer l'auto-rotation après l'interaction
        });
        
        // Gestion de la souris pour desktop
        testimonialSlider.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startMouseX = e.pageX;
            currentMouseX = e.pageX;
            stopAutoTestimonial();
            testimonialSlider.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            currentMouseX = e.pageX;
            const moveDistance = currentMouseX - startMouseX;
            
            if (Math.abs(moveDistance) > 10) {
                e.preventDefault(); // Empêcher le défilement de la page
            }
        });
        
        testimonialSlider.addEventListener('mouseup', (e) => {
            if (!isMouseDown) return;
            isMouseDown = false;
            testimonialSlider.style.cursor = 'grab';
            
            const moveDistance = currentMouseX - startMouseX;
            if (moveDistance > 80) {
                goToPrevTestimonial();
            } else if (moveDistance < -80) {
                goToNextTestimonial();
            }
            
            startAutoTestimonial();
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            if (isMouseDown) {
                isMouseDown = false;
                testimonialSlider.style.cursor = 'grab';
                startAutoTestimonial();
            }
        });
    }
    
    function handleTestimonialSwipe() {
        // Seuil de génération de 50 pixels pour déclencher l'action
        const swipeThreshold = 50;
        
        // Glisser de droite à gauche (suivant)
        if (touchEndX < touchStartX - swipeThreshold) {
            goToNextTestimonial();
        }
        
        // Glisser de gauche à droite (précédent)
        if (touchEndX > touchStartX + swipeThreshold) {
            goToPrevTestimonial();
        }
    }
    
    // Initialiser le slider des témoignages lors du chargement
    if (testimonialSlider && testimonialItems.length > 0) {
        // Décaler le premier rendu pour s'assurer que les largeurs sont calculées correctement
        setTimeout(updateTestimonialSlider, 100);
        
        // Mettre à jour le slider lors du redimensionnement de la fenêtre
        window.addEventListener('resize', updateTestimonialSlider);
    }
    
    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 114; // Hauteur header + ticker
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Fermer le menu si ouvert lors d'un clic sur un lien
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburgerIcon.classList.remove('open');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Header sticky au scroll
    const header = document.querySelector('header');
    const tickerWrap = document.querySelector('.ticker-wrap');
    
    if (header && tickerWrap) {
        const tickerHeight = tickerWrap.offsetHeight;
        window.addEventListener('scroll', function() {
            if (window.scrollY > tickerHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Animation de l'indicateur de défilement pour encourager le scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            // Si l'utilisateur a défilé au-delà de 300px, masquer l'indicateur
            if (window.scrollY > 300) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Pause du ticker au survol
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        ticker.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        ticker.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Gestion du bouton retour en haut de page
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
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
    }
    
    // Gestion des modales pour les galeries d'images
    const painsModal = document.getElementById('painsModal');
    const patisseriesModal = document.getElementById('patisseriesModal');
    const gateauxSaisonModal = document.getElementById('gateauxSaisonModal');
    const openPainsModalBtn = document.getElementById('openPainsModal');
    const openPatisseriesModalBtn = document.querySelectorAll('#openPatisseriesModal, [id="openPatisseriesModal"]');
    const openGateauxSaisonModalBtn = document.getElementById('openGateauxSaisonModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Fonction pour ouvrir une modale avec animation
    function openModal(modal) {
        document.body.style.overflow = 'hidden'; // Empêcher le défilement
        modal.style.display = 'block';
        // Déclencher le reflow pour que la transition fonctionne
        modal.offsetHeight;
        modal.classList.add('active');
    }
    
    // Fonction pour fermer une modale avec animation
    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Réactiver le défilement
        }, 300); // Correspond à la durée de transition CSS
    }
    
    // Ouvrir la modale des pains
    if (openPainsModalBtn) {
        openPainsModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(painsModal);
        });
    }
    
    // Ouvrir la modale des pâtisseries (plusieurs boutons possibles)
    if (openPatisseriesModalBtn.length > 0) {
        openPatisseriesModalBtn.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(patisseriesModal);
            });
        });
    }
    
    // Ouvrir la modale des gâteaux de saison
    if (openGateauxSaisonModalBtn) {
        openGateauxSaisonModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(gateauxSaisonModal);
        });
    }
    
    // Fermer les modales en cliquant sur le bouton X
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Fermer les modales en cliquant en dehors du contenu
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Fermer les modales avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                closeModal(modal);
            });
        }
    });
});
