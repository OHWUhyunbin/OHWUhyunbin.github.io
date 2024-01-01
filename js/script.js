document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
    }, 1500); 

    // Scroll to Section
    let isScrolling = false;
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;

    const scrollToSection = (index) => {
        if (isScrolling) return;
        isScrolling = true;
        window.scrollTo({
            top: sections[index].offsetTop,
            behavior: 'smooth'
        });
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    };

    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
        } else if (e.deltaY < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
        }
    });

    const updateNavLinks = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const navLinks = document.querySelectorAll('.navigation .nav-link');
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateNavLinks);
    updateNavLinks();

    // Image Slider
    const slider = document.querySelector('.image-slider');
    let index = 0;
    setInterval(() => {
        index = (index + 1) % slider.children.length;
        const newScrollLeft = index * slider.clientWidth;
        slider.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }, 2000);

    const secondSlider = document.querySelectorAll('.image-slider')[1];
    let secondIndex = 0;
    setInterval(() => {
        secondIndex = (secondIndex + 1) % secondSlider.children.length;
        const newScrollLeft = secondIndex * secondSlider.clientWidth;
        secondSlider.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }, 1500);

    const scrollPrompt = document.querySelector('.scroll-prompt');
    const lastSection = document.querySelector('section:last-of-type');

    const updateScrollPrompt = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition + window.innerHeight >= lastSection.offsetTop) {
            let opacity = 1 - (scrollPosition + window.innerHeight - lastSection.offsetTop) / window.innerHeight;
            opacity = Math.max(opacity, 0);
            scrollPrompt.style.opacity = opacity;
        } else {
            scrollPrompt.style.opacity = 1;
        }
    };

    window.addEventListener('scroll', updateScrollPrompt);
    updateScrollPrompt();
});