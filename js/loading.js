document.addEventListener('DOMContentLoaded', function () {
    // Elements to be updated with typewriter effect
    const elements = [
        { selector: '.loading-top-left', text: 'CH 0\nPLAY\n0:00:00' },
        { selector: '.loading-top-right', text: 'TAPE\nREC\n0:00:00' },
        { selector: '.loading-bottom', text: 'Hello, real world\nSRC' },
        { selector: '.loading-center h3', text: '1991 REAL WORLD' },
        { selector: '.loading-center h1', text: 'nævis calling...' }
    ];

    // Apply typewriter effect to each element in the loading screen
    elements.forEach(({ selector, text }) => {
        const element = document.querySelector(selector);
        if (element) typeText(element, text);
    });

    // Automatically hide the loading screen after 3 seconds
    setTimeout(() => {
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        }
    }, 3000); // 3000 milliseconds = 3 seconds

    // Elements for Part 1 animation
    const part1Elements = [
        { selector: '.part_label span', text: 'Part1' },
        { selector: '.part_title span:nth-child(1)', text: 'FROM' },
        { selector: '.part_title span:nth-child(2)', text: 'KWANGYA' },
        { selector: '.part_title span:nth-child(3)', text: 'TO' },
        { selector: '.part_title span:nth-child(4)', text: 'REAL WORLD' }
    ];

    // Observer to apply typewriter effect when elements enter the viewport
    const part1Observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                part1Elements.forEach(({ selector, text }) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.textContent = ''; // Clear content to reset animation
                        typeText(element, text);
                    }
                });
                part1Observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1 });

    const part1Section = document.querySelector('.part1-title');
    if (part1Section) {
        part1Observer.observe(part1Section);
    }

    // Elements for profile section animation
    const profileElements = [
        { selector: '.profile_text', text: 'nævis calling' },
        { selector: '.profile_desc', text: 'name : naevis\nheight : 168cm\nsymbol : butterfly\norigin: Digital World "KWANGYA"\ndebut: 24.09.10 “Done”\nspecialty: Flexible Character' },
        { selector: '.profile_date', text: '2024.09.23' }
    ];

    // Observer to apply typewriter effect to profile section
    const profileObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                profileElements.forEach(({ selector, text }) => {
                    const element = document.querySelector(selector);
                    if (element) typeText(element, text);
                });
                profileObserver.disconnect(); // Stop observing once animated
            }
        });
    });

    const profileSection = document.querySelector('.profile_right');
    if (profileSection) {
        profileObserver.observe(profileSection);
    }

    // Function to apply typewriter effect
    function typeText(element, text) {
        const lines = text.split('\n');
        element.innerHTML = ''; // Clear existing text

        lines.forEach((line, lineIndex) => {
            const lineElement = document.createElement('div');
            element.appendChild(lineElement);

            const span = document.createElement('span');
            span.classList.add('typing-effect');
            lineElement.appendChild(span);

            let index = 0;
            const typingInterval = setInterval(() => {
                span.textContent += line[index];
                index++;

                if (index === line.length) {
                    clearInterval(typingInterval);

                    if (lineIndex === lines.length - 1) {
                        span.classList.remove('typing-effect');
                        span.classList.add('blinking-effect');

                        if (element.matches('.loading-center h1')) {
                            addBlinkingDots(span); // Blinking dots effect
                        }
                    }
                }
            }, 200); // Typing speed in milliseconds
        });

        // If the element is a time indicator, start time increment animation
        if (element.matches('.loading-top-left, .loading-top-right')) {
            const timeText = element.querySelector('div:last-child span');
            if (timeText) updateTime(timeText, lines[2]);
        }
    }

    function addBlinkingDots(span) {
        const textWithoutDots = span.textContent.replace(/\.*$/, '');
        span.textContent = textWithoutDots;
        const dots = document.createElement('span');
        dots.classList.add('dots');
        span.appendChild(dots);

        let dotCount = 0;
        setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            dots.textContent = '.'.repeat(dotCount);
        }, 500); // Blinking speed in milliseconds
    }

    function updateTime(timeSpan, initialTime) {
        let [hours, minutes, seconds] = initialTime.split(':').map(Number);
        setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }

            const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            const originalText = timeSpan.parentElement.textContent.split('\n')[0];
            timeSpan.textContent = originalText + '\n' + formattedTime;
        }, 1000); // Update every second
    }
});
