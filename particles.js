(function () {
  var canvas = document.getElementById("particles");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var W, H, count, particles = [];
  var mouse = { x: null, y: null };
  var COLORS = ["#4fc3dc", "#8fd8ef", "#ffffff", "#ff2d75"];
  var LINK_DIST = 120;
  var MOUSE_DIST = 160;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    count = Math.min(100, Math.floor((W * H) / 15000));
    init();
  }

  function init() {
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = "rgba(79,195,220," + (0.22 * (1 - dist / LINK_DIST)) + ")";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    if (mouse.x !== null) {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          ctx.strokeStyle = "rgba(255,45,117," + (0.35 * (1 - dist / MOUSE_DIST)) + ")";
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseout", function () {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  draw();
})();
