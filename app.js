window.addEventListener('scroll', function() {
    var h1 = document.querySelector('h1');
    var scrollDown = document.querySelector('.scroll-down');
    var mainContent = document.querySelector('.main-content');
    var bg = document.querySelector('.fixed-background');
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    var scrollFraction = scrollPosition / window.innerHeight;
    var filterValue = 1 - (0.75 * scrollFraction);

    bg.style.filter = 'brightness(' + Math.max(filterValue, 0.25) + ')';

    if (scrollPosition > window.innerHeight / 10) {
        if (!scrollDown.classList.contains('visible')) {
            scrollDown.style.opacity = '0';
            setTimeout(function() {
                scrollDown.textContent = '20190051—Kanghyeon Kim';
                scrollDown.style.opacity = '1';
            }, 500); // Match this delay with CSS transition duration
            scrollDown.classList.add('visible');
        }
        h1.classList.add('visible');
        mainContent.classList.add('visible');
    } else {
        if (scrollDown.classList.contains('visible')) {
            scrollDown.style.opacity = '0';
            setTimeout(function() {
                scrollDown.textContent = 'Scroll down';
                scrollDown.style.opacity = '1';
            }, 500); // Match this delay with CSS transition duration
            scrollDown.classList.remove('visible');
        }
        h1.classList.remove('visible');
        mainContent.classList.remove('visible');
    }
    var sections = document.querySelectorAll('.main-content > div');
    var navLinks = document.querySelectorAll('.side-navigation ul li a');

    let activeSection = null;
    sections.forEach(section => {
        var sectionTop = section.getBoundingClientRect().top;
        var sectionBottom = section.getBoundingClientRect().bottom;

        // Check if the section is within the viewport
        if (sectionTop <= window.innerHeight / 2 && sectionBottom >= 0) {
            activeSection = section;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (activeSection && link.getAttribute('href') === '#' + activeSection.id) {
            link.classList.add('active-link');
        }
    });
});             