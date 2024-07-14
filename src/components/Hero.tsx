import React, {useEffect, useRef, useState} from 'react';
import '../styles/Hero.css';
import '../styles/Credit.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

interface CreaturePosition {
  id: number;
  x: string;
  y: string;
}

const Hero: React.FC = () => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [creatures, setCreatures] = useState<CreaturePosition[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (backgroundCanvasRef.current) {
      const ctx = backgroundCanvasRef.current.getContext('2d');
      if (ctx) {
        initStarryBackground(backgroundCanvasRef.current, ctx);
      }
    }

    // Set up particle canvas
    if (particleCanvasRef.current) {
      particleCanvasRef.current.width = window.innerWidth;
      particleCanvasRef.current.height = window.innerHeight;
    }

    // Initialize creature positions
    setCreatures(generateCreaturePositions(5));

    // Handle window resize
    const handleResize = () => {
      if (backgroundCanvasRef.current) {
        backgroundCanvasRef.current.width = window.innerWidth;
        backgroundCanvasRef.current.height = window.innerHeight;
      }
      if (particleCanvasRef.current) {
        particleCanvasRef.current.width = window.innerWidth;
        particleCanvasRef.current.height = window.innerHeight;
      }
      setCreatures(generateCreaturePositions(5));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateCreaturePositions = (count: number): CreaturePosition[] => {
    const newPositions: CreaturePosition[] = [];
    const heroElement = heroRef.current;
    const footerElement = document.querySelector('.features') as HTMLElement;

    if (heroElement && footerElement) {
      const minY = 0;
      const maxY = footerElement.offsetTop - 100; // 100px above the footer

      for (let i = 0; i < count; i++) {
        newPositions.push({
          id: Math.random(),
          x: `${Math.random() * 80 + 10}%`, // 10% to 90% of the width
          y: `${Math.random() * (maxY - minY) + minY}px`
        });
      }
    }
    return newPositions;
  };

  const handleCreatureClick = (index: number) => {
    if (particleCanvasRef.current) {
      const ctx = particleCanvasRef.current.getContext('2d');
      if (ctx) {
        const creatureElement = document.querySelector(`.creature-${index}`) as HTMLImageElement;
        if (creatureElement) {
          const rect = creatureElement.getBoundingClientRect();
          disintegrateCreature(ctx, rect.left + rect.width / 2, rect.top + rect.height / 2);

          // Fade out the clicked creature
          creatureElement.style.transition = 'opacity 0.5s';
          creatureElement.style.opacity = '0';

          // Remove the clicked creature and add a new one after the fade-out
          setTimeout(() => {
            setCreatures(prev => {
              const newCreatures = [...prev];
              newCreatures.splice(index, 1, generateCreaturePositions(1)[0]);
              return newCreatures;
            });
          }, 500);
        }
      }
    }
  };

  const handleOrbClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const orb = event.currentTarget;
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    orb.appendChild(sparkle);
    setTimeout(() => orb.removeChild(sparkle), 1000);
  };

  return (
    <section className="hero" ref={heroRef}>
      <canvas ref={backgroundCanvasRef} className="background-animation"></canvas>
      <canvas ref={particleCanvasRef} className="particle-animation"></canvas>
      <div className="hero-content">
        <h1 className="hero-title">MYTHICAL</h1>
        <p className="hero-subtitle">A Legendary Discord Adventure Bot</p>
        <p className="coming-soon">Coming Soon to Your Discord Server</p>
      </div>
      <div className="floating-creatures">
        {creatures.map((creature, index) => (
          <img
            key={creature.id}
            src={`/creature.png`}
            alt={`Mythical Creature ${index + 1}`}
            className={`creature creature-${index}`}
            style={{
              left: creature.x,
              top: creature.y,
              cursor: 'pointer',
              transition: 'opacity 0.5s'
            }}
            onClick={() => handleCreatureClick(index)}
          />
        ))}
      </div>
      <div className="credit-orb">
        <div className="orb" onClick={handleOrbClick}></div>
        <div className="credit-text">© Phearion Games 2024</div>
      </div>
    </section>
  );
};

function initStarryBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars: { x: number; y: number; size: number; speed: number }[] = [];
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawStars);
  }

  drawStars();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function disintegrateCreature(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const particles: Particle[] = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`,
      speedX: (Math.random() - 0.5) * 8,
      speedY: (Math.random() - 0.5) * 8
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.size *= 0.97;

      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      if (particle.size < 0.5) {
        particles.splice(index, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animateParticles);
    } else {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }

  animateParticles();
}

export default Hero;