document.addEventListener('DOMContentLoaded', function () {
    const elements = [
        { selector: '.loading-top-left', text: 'CH 0\nPLAY\n0:00:00' },
        { selector: '.loading-top-right', text: 'TAPE\nREC\n0:00:00' },
        { selector: '.loading-bottom', text: 'Hello, real world\nSRC' },
        { selector: '.loading-center h3', text: '1991 REAL WORLD' },
        { selector: '.loading-center h1', text: 'nævis calling...' }
    ];

    elements.forEach(({ selector, text }) => {
        typeText(document.querySelector(selector), text);
    });

    // 3초 뒤에 loading 화면을 자동으로 숨기기
    const loadingElement = document.querySelector('.loading');
    setTimeout(() => {
        loadingElement.classList.add('hidden');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Apply typewriter effect to part1-title elements when they enter the viewport
    const part1Elements = [
        { selector: '.part_label span', text: 'Part1' },
        { selector: '.part_title span:nth-child(1)', text: 'FROM' },
        { selector: '.part_title span:nth-child(2)', text: 'KWANGYA' },
        { selector: '.part_title span:nth-child(3)', text: 'TO' },
        { selector: '.part_title span:nth-child(4)', text: 'REAL WORLD' }
    ];

    const part1Observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Restart the animation each time the section enters the viewport
                part1Elements.forEach(({ selector, text }) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        // Clear the element's content to reset the animation
                        element.textContent = '';
                        typeText(element, text);
                    }
                });
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible

    const part1Section = document.querySelector('.part1-title');
    if (part1Section) {
        part1Observer.observe(part1Section);
    }

    // Observer for profile section
    const profileElements = [
        { selector: '.profile_text', text: 'nævis calling' },
        { selector: '.profile_desc', text: 'name : naevis\nheight : 168cm\nsymbol : butterfly\norigin: Digital World "KWANGYA"\ndebut: 24.09.10 “Done”\nspecialty: Flexible Character' },
        { selector: '.profile_date', text: '2024.09.23' }
    ];

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                profileElements.forEach(({ selector, text }) => {
                    typeText(document.querySelector(selector), text);
                });
                observer.disconnect(); // Stop observing after animation starts
            }
        });
    });

    // Start observing the profile right section
    const profileSection = document.querySelector('.profile_right');
    if (profileSection) {
        observer.observe(profileSection);
    }

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

                    // Add blinking effect to all elements
                    if (lineIndex === lines.length - 1) {
                        span.classList.remove('typing-effect');
                        span.classList.add('blinking-effect');

                        // Add blinking dots if needed
                        if (element.matches('.loading-center h1')) {
                            addBlinkingDots(span); // Blinking dots effect
                        }
                    }
                }
            }, 200); // Slower typing speed in milliseconds
        });

        // Start time increment animation if it contains time
        if (element.matches('.loading-top-left, .loading-top-right')) {
            const timeText = element.querySelector('div:last-child span'); // Get the span containing the time
            if (timeText) updateTime(timeText, lines[2]);
        }
    }

    function addBlinkingDots(span) {
        const textWithoutDots = span.textContent.replace(/\.*$/, ''); // Remove trailing dots
        span.textContent = textWithoutDots;
        const dots = document.createElement('span');
        dots.classList.add('dots');
        span.appendChild(dots);

        let dotCount = 0;
        setInterval(() => {
            dotCount = (dotCount + 1) % 4; // Dots count: 0, 1, 2, 3
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
            const originalText = timeSpan.parentElement.textContent.split('\n')[0]; // Preserve original text like "TAPE" or "CH 0"
            timeSpan.textContent = originalText + '\n' + formattedTime; // Update only the time text
        }, 4444); // Update every second
    }
});
