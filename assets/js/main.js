// Animated background particles
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  const particles = []; const MAX = 70;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.clientWidth = window.innerWidth;
    height = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn() {
    while (particles.length < MAX) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 2,
        hue: 190 + Math.random() * 140
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.6)`;
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize(); spawn(); step();
})();

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Platform detection and smart recommendation
(function platformDetect() {
  const recTitle = document.getElementById('rec-title');
  const recDesc = document.getElementById('rec-desc');
  const recActions = document.getElementById('rec-actions');
  const recIcon = document.getElementById('rec-icon');
  if (!recTitle || !recDesc || !recActions || !recIcon) return;

  const ua = navigator.userAgent || navigator.platform || '';
  const isWindows = /Windows|Win64|Win32|WOW64/i.test(ua);
  const isLinux = /Linux|X11|Ubuntu|Debian|Fedora|Arch|Manjaro|CentOS/i.test(ua);

  function button(href, label, icon, type) {
    const a = document.createElement('a');
    a.className = `btn ${type}`;
    a.href = href; a.setAttribute('download', '');
    a.innerHTML = `<i class="${icon}"></i> ${label}`;
    return a;
  }

  recActions.innerHTML = '';
  if (isWindows) {
    recTitle.textContent = '检测到 Windows 平台';
    recDesc.textContent = '建议下载并先启动服务端，再启动客户端。';
    recIcon.innerHTML = '<i class="fa-brands fa-windows"></i>';
    recActions.appendChild(button('pack/LongMarchServer.exe', '下载 Server.exe', 'fa-solid fa-server', 'primary'));
    recActions.appendChild(button('pack/LongMarchClient.exe', '下载 Client.exe', 'fa-solid fa-desktop', 'secondary'));
  } else if (isLinux) {
    recTitle.textContent = '检测到 Linux 平台';
    recDesc.textContent = '下载 tar 包并解压后按指南使用 Python 启动。';
    recIcon.innerHTML = '<i class="fa-brands fa-linux"></i>';
    recActions.appendChild(button('pack/Long_March.tar', '下载 Long_March.tar', 'fa-solid fa-file-archive', 'primary'));
  } else {
    recTitle.textContent = '未能识别平台';
    recDesc.textContent = '请根据您的系统选择下方对应版本进行下载。';
    recIcon.innerHTML = '<i class="fa-solid fa-laptop"></i>';
    recActions.appendChild(button('pack/LongMarchServer.exe', 'Windows Server.exe', 'fa-solid fa-server', 'secondary'));
    recActions.appendChild(button('pack/LongMarchClient.exe', 'Windows Client.exe', 'fa-solid fa-desktop', 'secondary'));
    recActions.appendChild(button('pack/Long_March.tar', 'Linux Long_March.tar', 'fa-solid fa-file-archive', 'secondary'));
  }
})();


