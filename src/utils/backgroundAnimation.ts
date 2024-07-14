interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  type: 'particle' | 'egg' | 'creature';
  life: number;
}

export function initAnimation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: Particle[] = [];
  const particleCount = 100;

  function createParticle(): Particle {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      hue: Math.random() * 60 + 180, // Blue to purple range
      type: 'particle',
      life: 0,
    };
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle());
  }

  function drawParticle(particle: Particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, 0.8)`;
    ctx.fill();
  }

  function drawEgg(particle: Particle) {
    ctx.beginPath();
    ctx.ellipse(particle.x, particle.y, particle.size * 2, particle.size * 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, 0.8)`;
    ctx.fill();
  }

  function drawCreature(particle: Particle) {
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y - particle.size);
    ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
    ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
    ctx.closePath();
    ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, 0.8)`;
    ctx.fill();
  }

  function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.life += 1;

      if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
        particles[i] = createParticle();
      }

      if (particle.life > 200 && particle.type === 'particle') {
        particle.type = 'egg';
        particle.life = 0;
      } else if (particle.life > 100 && particle.type === 'egg') {
        particle.type = 'creature';
        particle.life = 0;
      } else if (particle.life > 50 && particle.type === 'creature') {
        particles[i] = createParticle();
      }

      switch (particle.type) {
        case 'particle':
          drawParticle(particle);
          break;
        case 'egg':
          drawEgg(particle);
          break;
        case 'creature':
          drawCreature(particle);
          break;
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}