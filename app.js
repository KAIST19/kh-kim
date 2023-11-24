const scrollDown = document.querySelector('.scroll-down');
const mainContent = document.querySelector('.main-content');
const bg = document.querySelector('.fixed-background');
const sections = document.querySelectorAll('.main-content > div');
const navLinks = document.querySelectorAll('.side-navigation ul li a');

// Initialize variables
let lastKnownScrollPosition = 0;
let ticking = false;

// Function to update UI based on scroll position
function updateUI(scrollPosition) {
    // Update background brightness
    let scrollFraction = scrollPosition / window.innerHeight;
    let filterValue = Math.max(1 - 0.75 * scrollFraction, 0.25);
    bg.style.filter = `brightness(${filterValue})`;

    // Toggle visibility and text of elements
    if (scrollPosition > window.innerHeight / 10) {
        if (!scrollDown.classList.contains('visible')) {
            scrollDown.style.opacity = '0';
            setTimeout(() => {
                scrollDown.textContent = '20190051—Kanghyeon Kim';
                scrollDown.style.opacity = '1';
            }, 500); // Match this delay with CSS transition duration
            scrollDown.classList.add('visible');
        }
        mainContent.classList.add('visible');
    } else {
        if (scrollDown.classList.contains('visible')) {
            scrollDown.style.opacity = '0';
            setTimeout(() => {
                scrollDown.textContent = 'Scroll down';
                scrollDown.style.opacity = '1';
            }, 500); // Match this delay with CSS transition duration
            scrollDown.classList.remove('visible');
        }
        mainContent.classList.remove('visible');
    }

    // Determine active section and update nav links
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
}

// Scroll event listener with debounce using requestAnimationFrame
window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateUI(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});


