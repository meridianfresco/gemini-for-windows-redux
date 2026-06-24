// Preload script for Gemini for Windows

const injectTitlebar = () => {
    if (document.getElementById('custom-titlebar')) {
        return;
    }

    const isMac = process.platform === 'darwin';

    // 1. Create custom titlebar container
    const titlebar = document.createElement('div');
    titlebar.id = 'custom-titlebar';

    // 2. Create the window title
    const title = document.createElement('span');
    title.id = 'custom-titlebar-title';
    title.textContent = 'Gemini for Windows';

    // 3. Create the reload button
    const reloadBtn = document.createElement('button');
    reloadBtn.className = 'titlebar-reload-btn';
    reloadBtn.id = 'custom-titlebar-reload';
    reloadBtn.title = 'Reload page';

    // Trusted Types compliant SVG creation using XML Namespaces
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z");

    svg.appendChild(path);
    reloadBtn.appendChild(svg);
    
    reloadBtn.addEventListener('click', () => {
        location.reload();
    });

    titlebar.appendChild(title);
    titlebar.appendChild(reloadBtn);

    // Apply platform class to body if available
    if (document.body) {
        if (isMac) {
            document.body.classList.add('platform-darwin');
        } else {
            document.body.classList.add('platform-win32');
        }
        
        document.body.insertBefore(titlebar, document.body.firstChild);
    }
};

// Check frequently during early loading
let checks = 0;
const startupInterval = setInterval(() => {
    if (document.body) {
        injectTitlebar();
    }
    checks++;
    if (checks > 100) {
        clearInterval(startupInterval);
        // Maintain a slow background check loop
        setInterval(() => {
            if (document.body && !document.getElementById('custom-titlebar')) {
                injectTitlebar();
            }
        }, 1000);
    }
}, 100);
