const scrollDown = document.querySelector('.scroll-down');
const mainContent = document.querySelector('.main-content');
const bg = document.querySelector('.fixed-background');
const sections = document.querySelectorAll('.main-content > div, .main-content > div > div, .main-content > div > div > div');
const navLinks = document.querySelectorAll('.side-navigation ul li a');

const to_be_generated1 = "As of 2023, the president of South Korea is Yoon Suk Yeol.".split(' ');
const sentenceElement1 = document.getElementById('text-generation-1');

const to_be_generated3 = "Your father/is about to/ask me/the question./This is/the most important/...".split('/')
const to_be_generated4 = "Your/father/is/about/to/ask/me/the/question./This/is/the/most/important/...".split('/')
const sentenceElement2 = document.getElementById('text-generation-2');
const sentenceElement3 = document.getElementById('text-generation-3');
const sentenceElement4 = document.getElementById('text-generation-4');
const interval = window.innerHeight / 24;

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
                scrollDown.innerHTML = '<b>Scroll down</b>';
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
    let queryHeight = window.innerHeight - sentenceElement1.getBoundingClientRect().top;
    let generatedText = "Who's the president of South Korea?";
    let lastToken = "";

    for (let i = 0; i < to_be_generated1.length; i++) {
        if (queryHeight >= window.innerHeight / 3 + interval * i) {
            if (queryHeight >= window.innerHeight / 3 + interval * (i + 1)) {
                generatedText = generatedText + " " + to_be_generated1[i];
            } else {
                lastToken = to_be_generated1[i];
            }
        }
        else {
            break;
        }
    }
    
    if (lastToken) {
        sentenceElement1.innerHTML = generatedText + " <b><span style='color:red'>" + lastToken + "</span></b>";
    } else {
        sentenceElement1.textContent = generatedText;
    }

    sentenceElement2.innerHTML = "Heptapod: " + "<b><span style='color:red'>Your father is about to ask me the question. This is the most important ...</span></b>";

    queryHeight = window.innerHeight - sentenceElement3.getBoundingClientRect().top;
    generatedText = "Human:";

    for (let i = 0; i < to_be_generated3.length; i++) {
        if (queryHeight >= window.innerHeight / 3 + interval * i) {
            if (queryHeight >= window.innerHeight / 3 + interval * (i + 1)) {
                generatedText = generatedText + " " + to_be_generated3[i];
            } else {
                lastToken = to_be_generated3[i];
            }
        }
        else {
            break;
        }
    }
    
    if (lastToken) {
        sentenceElement3.innerHTML = generatedText + " <b><span style='color:red'>" + lastToken + "</span></b>";
    } else {
        sentenceElement3.textContent = generatedText;
    }


    generatedText = "Language Model:";
    for (let i = 0; i < to_be_generated4.length; i++) {
        if (queryHeight >= window.innerHeight / 3 + interval * i) {
            if (queryHeight >= window.innerHeight / 3 + interval * (i + 1)) {
                generatedText = generatedText + " " + to_be_generated4[i];
            } else {
                lastToken = to_be_generated4[i];
            }
        }
        else {
            break;
        }
    }
    
    if (lastToken) {
        sentenceElement4.innerHTML = generatedText + " <b><span style='color:red'>" + lastToken + "</span></b>";
    } else {
        sentenceElement4.textContent = generatedText;
    }

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