export class ParticleBackground {
    constructor() {
        this.particles = [];
        this.animationId = 0;
        this.particleCount = 50;
        this.animate = () => {
            this.updateParticles();
            this.drawParticles();
            this.animationId = requestAnimationFrame(this.animate);
        };
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.ctx = this.canvas.getContext('2d');
        // Insert canvas before backdrop-layers
        const backdropLayers = document.querySelector('.backdrop-layers');
        if (backdropLayers && backdropLayers.parentElement) {
            backdropLayers.parentElement.insertBefore(this.canvas, backdropLayers);
        }
        else {
            document.body.prepend(this.canvas);
        }
    }
    init() {
        this.setupCanvas();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.setupCanvas());
    }
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }
    }
    updateParticles() {
        this.particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            // Wrap around edges
            if (particle.x < 0)
                particle.x = this.canvas.width;
            if (particle.x > this.canvas.width)
                particle.x = 0;
            if (particle.y < 0)
                particle.y = this.canvas.height;
            if (particle.y > this.canvas.height)
                particle.y = 0;
        });
    }
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw particles
        this.particles.forEach((particle) => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(124, 108, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach((p2) => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(124, 108, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
    }
    destroy() {
        cancelAnimationFrame(this.animationId);
        this.canvas.remove();
    }
}
