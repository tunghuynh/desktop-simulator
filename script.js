// Utility for dragging elements
function makeDraggable(el, handle) {
  let offsetX = 0, offsetY = 0, dragging = false;
  handle.addEventListener('mousedown', (e) => {
    dragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
  });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
  });
  document.addEventListener('mouseup', () => {
    dragging = false;
  });
}

// Apple menu toggle
const appleIcon = document.getElementById('apple');
const appleMenu = document.getElementById('apple-menu');
appleIcon.addEventListener('click', () => {
  appleMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!appleMenu.contains(e.target) && e.target !== appleIcon) {
    appleMenu.classList.add('hidden');
  }
});

// About dialog
const aboutItem = document.getElementById('about');
const aboutDialog = document.getElementById('about-dialog');
aboutItem.addEventListener('click', () => {
  appleMenu.classList.add('hidden');
  aboutDialog.classList.remove('hidden');
});

const closeButton = aboutDialog.querySelector('.close');
closeButton.addEventListener('click', () => {
  aboutDialog.classList.add('hidden');
});
makeDraggable(aboutDialog, aboutDialog.querySelector('.title-bar'));

// Spotlight
const spotlightIcon = document.getElementById('spotlight');
const spotlight = document.getElementById('spotlight-search');
spotlightIcon.addEventListener('click', () => {
  spotlight.classList.toggle('hidden');
  spotlight.querySelector('input').focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    spotlight.classList.add('hidden');
    aboutDialog.classList.add('hidden');
  }
});

// Control Center
const controlIcon = document.getElementById('control');
const controlCenter = document.getElementById('control-center');
controlIcon.addEventListener('click', () => {
  controlCenter.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!controlCenter.contains(e.target) && e.target !== controlIcon) {
    controlCenter.classList.add('hidden');
  }
});

// Notification Center
const clock = document.getElementById('clock');
const notify = document.getElementById('notification-center');
clock.addEventListener('click', () => {
  notify.classList.toggle('hidden');
});
document.addEventListener('click', (e) => {
  if (!notify.contains(e.target) && e.target !== clock) {
    notify.classList.add('hidden');
  }
});

// Clock update
function updateClock() {
  const d = new Date();
  const h = d.getHours().toString().padStart(2,'0');
  const m = d.getMinutes().toString().padStart(2,'0');
  clock.textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();

// Dock click to open a sample window
const dockIcons = document.querySelectorAll('.dock-icon[data-app]');
let windowCount = 0;
dockIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const win = createWindow(icon.dataset.app);
    document.getElementById('desktop').appendChild(win);
  });
});

function createWindow(appName) {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.top = (150 + windowCount * 20) + 'px';
  win.style.left = (150 + windowCount * 20) + 'px';
  windowCount++;
  win.innerHTML = `
    <div class="title-bar">
      <div class="control close"></div>
      <div class="control minimize"></div>
      <div class="control maximize"></div>
      <span class="title">${appName}</span>
    </div>
    <div class="content">${appName} window</div>
  `;
  const close = win.querySelector('.close');
  close.addEventListener('click', () => win.remove());
  makeDraggable(win, win.querySelector('.title-bar'));
  return win;
}

// Drag desktop icons
const desktopIcons = document.querySelectorAll('.desktop-icon');
desktopIcons.forEach(icon => {
  icon.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', null);
  });
});

document.getElementById('desktop').addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.getElementById('desktop').addEventListener('drop', (e) => {
  e.preventDefault();
  const icon = document.querySelector('.desktop-icon.dragging');
  if (icon) {
    icon.style.position = 'absolute';
    icon.style.left = e.clientX + 'px';
    icon.style.top = e.clientY + 'px';
  }
});

desktopIcons.forEach(icon => {
  icon.addEventListener('dragstart', () => icon.classList.add('dragging'));
  icon.addEventListener('dragend', () => icon.classList.remove('dragging'));
});
