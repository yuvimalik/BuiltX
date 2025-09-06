// Interactive Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.container = document.getElementById('particlesContainer');
        this.cursor = this.createCursor();
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        return cursor;
    }
    
    init() {
        this.createParticles(150);
    }
    
    createParticles(count) {
        for (let i = 0; i < count; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        const colors = ['blue', 'light-blue', 'white', 'cyan'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.classList.add(color);
        
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: parseFloat(particle.style.left),
            y: parseFloat(particle.style.top),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size,
            color: color
        });
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateCursor(e.clientX, e.clientY);
        });
        
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
            this.updateCursor(touch.clientX, touch.clientY);
        });
        
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    updateCursor(x, y) {
        this.cursor.style.left = x - 10 + 'px';
        this.cursor.style.top = y - 10 + 'px';
    }
    
    handleResize() {
        this.particles.forEach(particle => {
            if (particle.x > window.innerWidth) {
                particle.x = window.innerWidth;
            }
            if (particle.y > window.innerHeight) {
                particle.y = window.innerHeight;
            }
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const maxDistance = 200;
            const force = Math.max(0, (maxDistance - distance) / maxDistance);
            
            const angle = Math.atan2(dy, dx);
            const forceX = Math.cos(angle) * force * 0.5;
            const forceY = Math.sin(angle) * force * 0.5;
            
            particle.vx += forceX;
            particle.vy += forceY;
            
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0) {
                particle.x = 0;
                particle.vx *= -0.5;
            }
            if (particle.x > window.innerWidth) {
                particle.x = window.innerWidth;
                particle.vx *= -0.5;
            }
            if (particle.y < 0) {
                particle.y = 0;
                particle.vy *= -0.5;
            }
            if (particle.y > window.innerHeight) {
                particle.y = window.innerHeight;
                particle.vy *= -0.5;
            }
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            
            const scale = 1 + force * 0.5;
            particle.element.style.transform = `scale(${scale})`;
            
            const opacity = Math.max(0.1, 0.8 - force * 0.3);
            particle.element.style.opacity = opacity;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

document.addEventListener('DOMContentLoaded', () => {
    const keywords = document.querySelectorAll('.keyword');
    
    keywords.forEach(keyword => {
        keyword.addEventListener('click', () => {
            keyword.style.transform = 'scale(0.95)';
            setTimeout(() => {
                keyword.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

setInterval(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (Math.random() < 0.1) {
            particle.style.transition = 'all 0.5s ease';
            particle.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
            setTimeout(() => {
                particle.style.transition = 'all 0.3s ease';
            }, 500);
        }
    });
}, 1000);


// Contact Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const formButton = document.querySelector('.form-button');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Create mailto link
            const subject = 'BuiltX Application - ' + name;
            const body = `Name: ${name}\nEmail: ${email}\nWhat they want to build: ${message}`;
            const mailtoLink = `mailto:yuvmalik@seas.upenn.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            formButton.textContent = 'Email opened!';
            formButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                formButton.textContent = 'Join BuiltX';
                formButton.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)';
                form.reset();
            }, 3000);
        });
    }
});
