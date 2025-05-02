// Simple background particle effect using Canvas

// Define classes first to prevent ReferenceError
class BackgroundParticle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.5; // Tiny radius
        this.speedX = Math.random() * 0.5 - 0.25; // Slow movement
        this.speedY = Math.random() * 0.5 - 0.25;
        // Adjusted color to use CSS variable or a soft tone matching the gradient
        this.color = 'rgba(200, 180, 210, ' + (Math.random() * 0.5 + 0.2) + ')'; // Pale grey-purpleish with opacity
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap particles around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Sakura Particle class (New logic for cherry blossoms)
class SakuraParticle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 8 + 4; // Increased size range of petals
        this.speedY = Math.random() * 1.8 + 1.5; // Increased downward speed
        this.speedX = Math.random() * 1.5 - 0.75; // Side drift (wind effect)
        // Varying pink/white colors with increased opacity
        const colorVariation = Math.random();
        if (colorVariation < 0.4) {
            this.color = 'rgba(255, 182, 193, ' + (Math.random() * 0.5 + 0.6) + ')'; // Light Pink
        } else if (colorVariation < 0.8) {
            this.color = 'rgba(255, 204, 204, ' + (Math.random() * 0.5 + 0.6) + ')'; // Lighter Pink
        } else {
             this.color = 'rgba(255, 240, 245, ' + (Math.random() * 0.5 + 0.6) + ')'; // Lavender Blush (almost white)
        }

         // Optional: Add a slight angle for variation (simplified, not full rotation)
         this.angle = Math.random() * Math.PI * 2; // Initial angle
         this.angularSpeed = Math.random() * 0.05 - 0.025; // Slight rotation speed
         this.twist = Math.random() * 0.6 + 0.4; // Factor for petal shape distortion (if needed)
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angularSpeed; // Update angle

        // Add some gentle horizontal sway based on y-position or time for more natural fall
        this.x += Math.sin(this.y * 0.02 + this.angle * 2) * 0.5; // Increased sway effect


        // Wrap petals around or reset
        if (this.y > canvas.height) {
            this.y = -this.size; // Start from top
            this.x = Math.random() * canvas.width; // Random horizontal position
             this.speedY = Math.random() * 1.8 + 1.5; // Reset speed
             this.speedX = Math.random() * 1.5 - 0.75; // Reset drift
             this.angle = Math.random() * Math.PI * 2; // Reset angle
             this.angularSpeed = Math.random() * 0.05 - 0.025; // Reset angular speed
             this.twist = Math.random() * 0.6 + 0.4; // Reset twist
        }
        if (this.x < 0) this.x = canvas.width; // Wrap left
        if (this.x > canvas.width) this.x = 0; // Wrap right
    }

    draw() {
        ctx.save(); // Save current context state
        ctx.translate(this.x, this.y); // Move context to particle center
        ctx.rotate(this.angle); // Rotate context

        ctx.fillStyle = this.color;
        // Drawing a simple shape (e.g., slightly elongated circle or path)
        // For simplicity, sticking to circle or a basic shape that looks petal-like
        ctx.beginPath();
        // Draw a simple petal shape
        ctx.ellipse(0, 0, this.size * this.twist, this.size, 0, 0, Math.PI * 2); // Using ellipse for a slightly elongated shape
        ctx.fill();

        ctx.restore(); // Restore context state
    }
}

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let backgroundParticles = []; // Renamed for clarity
let sakuraParticles = []; // New array for cherry blossoms
const backgroundParticleCount = 100;
const sakuraParticleCount = 200; // Increased number of cherry blossom petals again

// Create background particles
function initBackgroundParticles() {
    backgroundParticles = [];
    for (let i = 0; i < backgroundParticleCount; i++) {
        backgroundParticles.push(new BackgroundParticle());
    }
}

// Create sakura particles
function initSakuraParticles() {
    sakuraParticles = [];
    for (let i = 0; i < sakuraParticleCount; i++) {
        sakuraParticles.push(new SakuraParticle());
    }
}

// Resize canvas to fill window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-initialize particles on resize to fill the new dimensions
    initBackgroundParticles();
    initSakuraParticles();
}
window.addEventListener('resize', resizeCanvas);

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw connecting lines (optional, creates a net effect) - commented out as per original
    // ctx.strokeStyle = 'rgba(200, 180, 210, 0.1)'; // Light grey-purple lines
    // for (let a = 0; a < backgroundParticles.length; a++) {
    //     for (let b = a; b < backgroundParticles.length; b++) {
    //         const distance = Math.sqrt((backgroundParticles[a].x - backgroundParticles[b].x)**2 + (backgroundParticles[a].y - backgroundParticles[b].y)**2);
    //         if (distance < 80) { // Connect particles within a certain distance
    //             ctx.lineWidth = 0.5;
    //             ctx.beginPath();
    //             ctx.moveTo(backgroundParticles[a].x, backgroundParticles[a].y);
    //             ctx.lineTo(backgroundParticles[b].y);
    //             ctx.stroke();
    //         }
    //     }
    // }

    // Update and draw background particles
    for (let i = 0; i < backgroundParticles.length; i++) {
        backgroundParticles[i].update();
        backgroundParticles[i].draw();
    }

     // Update and draw sakura particles
     for (let i = 0; i < sakuraParticles.length; i++) {
         sakuraParticles[i].update();
         sakuraParticles[i].draw();
     }


    requestAnimationFrame(animateParticles);
}

// Initial setup
resizeCanvas(); // Initial resize and particle initialization
animateParticles(); // Start the animation loop

// Simple fade-in on load for elements with .fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = 0; // Ensure opacity is 0 initially if not set in CSS
        el.style.animation = 'fadeIn 1s ease-out forwards';
    });

    // Smooth scroll for navigation links and CTA button
    // This selector already covers the new navigation links as they start with #
    document.querySelectorAll('nav a[href^="#"], .scroll-to-presale').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's a hash link or the specific scroll button
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#') || this.classList.contains('scroll-to-presale')) {
                 e.preventDefault();
            }

            const targetId = this.getAttribute('href') || '#presale'; // Default to #presale for the button
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position to account for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                // Add an extra offset (e.g., 20px) to account for section padding or visual spacing
                const scrollOffset = 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - scrollOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to copy text and provide feedback
    async function copyText(textToCopy, elementToUpdate) {
         try {
             await navigator.clipboard.writeText(textToCopy);
             const originalText = elementToUpdate.innerHTML;
             const originalColor = elementToUpdate.style.color;
             const originalBackground = elementToUpdate.style.backgroundColor;
             const originalPadding = elementToUpdate.style.padding;
             const originalDisplay = elementToUpdate.style.display; // Store original display
             const originalFontWeight = elementToUpdate.style.fontWeight; // Store original font weight
             const originalTransition = elementToUpdate.style.transition; // Store original transition


             // Apply feedback style
             elementToUpdate.innerHTML = '<i class="fas fa-check"></i> Copied!';
             elementToUpdate.style.color = 'green';
             elementToUpdate.style.backgroundColor = 'rgba(144, 238, 144, 0.5)'; // Light green background
             elementToUpdate.style.padding = '5px 10px'; // Add padding to make "Copied!" visible in the small button
             elementToUpdate.style.transition = 'none'; // Prevent transition on feedback
             elementToUpdate.style.display = 'inline-flex'; // Ensure flex/inline-flex for content alignment
             elementToUpdate.style.fontWeight = 'normal'; // Reset font weight during feedback


             setTimeout(() => {
                 elementToUpdate.innerHTML = originalText; // Revert text
                 elementToUpdate.style.color = originalColor; // Revert color
                  elementToUpdate.style.backgroundColor = originalBackground; // Revert background
                 elementToUpdate.style.padding = originalPadding; // Revert padding
                 elementToUpdate.style.display = originalDisplay; // Revert display
                 elementToUpdate.style.fontWeight = originalFontWeight; // Revert font weight
                 elementToUpdate.style.transition = originalTransition; // Revert transition
             }, 2000);
         } catch (err) {
             console.error('Failed to copy address: ', err);
             const originalText = elementToUpdate.innerHTML;
              const originalColor = elementToUpdate.style.color;
              const originalBackground = elementToUpdate.style.backgroundColor;
              const originalPadding = elementToUpdate.style.padding;
               const originalDisplay = elementToUpdate.style.display; // Store original display
               const originalFontWeight = elementToUpdate.style.fontWeight; // Store original font weight
               const originalTransition = elementToUpdate.style.transition; // Store original transition


             elementToUpdate.innerHTML = '<i class="fas fa-times"></i> Failed!';
             elementToUpdate.style.color = 'red';
              elementToUpdate.style.backgroundColor = 'rgba(255, 99, 71, 0.5)'; // Tomato background
              elementToUpdate.style.padding = '5px 10px'; // Add padding
             elementToUpdate.style.transition = 'none'; // Prevent transition on feedback
              elementToUpdate.style.display = 'inline-flex'; // Ensure flex/inline-flex for content alignment
              elementToUpdate.style.fontWeight = 'normal'; // Reset font weight during feedback


             setTimeout(() => {
                 elementToUpdate.innerHTML = originalText;
                  elementToUpdate.style.color = originalColor;
                   elementToUpdate.style.backgroundColor = originalBackground;
                   elementToUpdate.style.padding = originalPadding;
                    elementToUpdate.style.display = originalDisplay; // Revert display
                    elementToUpdate.style.fontWeight = originalFontWeight; // Revert font weight
                    elementToUpdate.style.transition = originalTransition; // Revert transition
             }, 2000);
         }
    }

    // Copy wallet address button functionality
    const copyButton = document.querySelector('.copy-btn');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const address = copyButton.dataset.address; // Get address from data attribute
            copyText(address, copyButton); // Use the common copy function
        });
    }

    // Make wallet address text itself clickable for copying
    const walletAddressSpan = document.getElementById('wallet-address');
     if (walletAddressSpan) {
         // Add a class or style to indicate it's clickable
         // Moved styles to CSS: walletAddressSpan.style.cursor = 'pointer';
         // Moved styles to CSS: walletAddressSpan.style.textDecoration = 'underline';
         // Moved styles to CSS: walletAddressSpan.style.textDecorationStyle = 'dashed';


         walletAddressSpan.addEventListener('click', () => {
             const address = walletAddressSpan.dataset.address; // Get address from data attribute
              copyText(address, walletAddressSpan); // Use the common copy function
         });
     }

     // Re-add event listeners for the social buttons (already covered by generic btn class but good practice)
     // No specific JS needed for simple links unless custom tracking or effects are required.
});