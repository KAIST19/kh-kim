const scrollDown = document.querySelector('.scroll-down');
const mainContent = document.querySelector('.main-content');
const bg = document.querySelector('.fixed-background');
const sections = document.querySelectorAll('.main-content > div, .main-content > div > div, .main-content > div > div > div');
const navLinks = document.querySelectorAll('.side-navigation ul li a');

const to_be_generated = "As of 2023, the president of South Korea is".split(' ');
let wordIndex = 0;
const sentenceElement = document.getElementById('text-generation'); // Replace with your actual element

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
    sections.forEach(section => {
        var sectionTop = section.getBoundingClientRect().top;
        var sectionBottom = section.getBoundingClientRect().bottom;
    
        // Adjusted conditions for determining if the section is within the viewport
        if (sectionTop < window.innerHeight / 2 && sectionBottom >= window.innerHeight / 2) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + section.id) {
                    link.classList.add('active-link');
                }
            });
        } else {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + section.id) {
                    link.classList.remove('active-link');
                }
            });
        }
    });

    // Next token prediction simulation
    let queryHeight = window.innerHeight - sentenceElement.getBoundingClientRect().top;
    let generatedText = "Who's the president of South Korea?";

    const interval = window.innerHeight / 18;
    for (let i = 0; i < to_be_generated.length; i++) {
        if (queryHeight >= window.innerHeight / 3 + interval * i) {
            generatedText = generatedText + " " + to_be_generated[i];
        }
        else {
            break;
        }
    }
    sentenceElement.textContent = generatedText;
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