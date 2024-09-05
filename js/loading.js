document.addEventListener('DOMContentLoaded', function () {
    // Elements to be updated with typewriter effect
    const elements = [
        { selector: '.loading-top-left', text: 'CH 0\nPLAY\n0:00:00' },
        { selector: '.loading-top-right', text: 'TAPE\nREC\n0:00:00' },
        { selector: '.loading-bottom', text: 'Hello, real world\nSRC' }
    ];

    // Apply typewriter effect to each element in the loading screen
    elements.forEach(({ selector, text }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = ''; // Clear content to avoid duplication
            typeText(element, text);
        }
    });

    // Automatically hide the loading screen after 3 seconds
    setTimeout(() => {
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        }
        // Start the profile typewriter effect
        startProfileTypewriter();
    }, 3000); // 3000 milliseconds = 3 seconds

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

        // Start time increment animation for time indicators
        if (element.matches('.loading-top-left, .loading-top-right')) {
            const timeText = lines[2]; // Always start from the third line (time part)
            startUpdatingTime(element, timeText); // Pass the correct time span
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

    function startUpdatingTime(element, initialTime) {
        let [hours, minutes, seconds] = initialTime.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        // Use a dedicated element to separate the static and dynamic parts
        const staticContent = element.innerHTML.split('\n').slice(0, -1).join('<br>');
        element.innerHTML = `${staticContent}<br>`; // Ensure static content remains

        // Create or find the existing dynamic time span
        let timeSpan = element.querySelector('.dynamic-time');
        if (!timeSpan) {
            timeSpan = document.createElement('span');
            timeSpan.className = 'dynamic-time';
            timeSpan.textContent = initialTime;
            element.appendChild(timeSpan);
        }

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
            timeSpan.textContent = formattedTime; // Only update the dynamic time
        }, 1000); // Update every second
    }

    // Function to start typewriter effect for profile content
    function startProfileTypewriter() {
        const profileTextElements = document.querySelectorAll('.profile_info .profile_text, .profile_info .profile_desc ul li');
        let currentIndex = 0;

        // Store the original text for each profile element in a data attribute
        profileTextElements.forEach(element => {
            const originalText = element.textContent.trim();
            element.setAttribute('data-text', originalText); // Store the text in a data attribute
            element.textContent = ''; // Clear content to start with an empty state
        });

        function typeNextProfileElement() {
            if (currentIndex < profileTextElements.length) {
                const element = profileTextElements[currentIndex];
                const text = element.getAttribute('data-text'); // Retrieve original text from data attribute
                typeProfileText(element, text, () => {
                    currentIndex++;
                    typeNextProfileElement(); // Move to the next element after typing the current one
                });
            } else {
                // Restart the typing effect from the top
                currentIndex = 0;
                setTimeout(startProfileTypewriter, 2000); // Repeat after a short delay
            }
        }

        typeNextProfileElement(); // Start the typing effect
    }

    function typeProfileText(element, text, callback) {
        let index = 0;
        const typingInterval = setInterval(() => {
            element.textContent += text[index];
            index++;

            if (index === text.length) {
                clearInterval(typingInterval);
                callback(); // Call the callback after typing is done
            }
        }, 100); // Typing speed in milliseconds
    }
});
