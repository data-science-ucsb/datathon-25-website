document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");
  
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.2,
    }));
  
    function createShootingStar() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 4 + 2,
        opacity: 1,
      };
    }
  
    const shootingStars = [];
    setInterval(() => shootingStars.push(createShootingStar()), 2000);
  
    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
  
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
  
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        let star = shootingStars[i];
        ctx.beginPath();
        let grad = ctx.createLinearGradient(star.x, star.y, star.x + star.length, star.y + star.length);
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.stroke();
  
        star.x += star.speed;
        star.y += star.speed;
        star.opacity -= 0.02;
  
        if (star.opacity <= 0) {
          shootingStars.splice(i, 1);
        }
      }
  
      requestAnimationFrame(animateStars);
    }
  
    animateStars();
  });
  