// ---------------------------------------------------------------------------
// Ambient background: a sparse, slow-drifting particle constellation behind
// everything — decorative only, independent from the interactive knowledge
// graph in the foreground. Respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

(function () {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const LINK_DISTANCE = 140;
    const PARTICLE_DENSITY = 18000; // px^2 per particle

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seedParticles();
    }

    function seedParticles() {
        const count = Math.round((width * height) / PARTICLE_DENSITY);
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            r: Math.random() * 1.4 + 0.6
        }));
    }

    function step() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DISTANCE) {
                    ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / LINK_DISTANCE) * 0.18})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.fillStyle = 'rgba(168, 133, 247, 0.55)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function loop() {
        step();
        draw();
        requestAnimationFrame(loop);
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });

    resize();
    if (prefersReducedMotion) {
        draw();
    } else {
        loop();
    }
})();
