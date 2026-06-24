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

    // Apply platform class to html if available
    if (document.body) {
        if (isMac) {
            document.documentElement.classList.add('platform-darwin');
        } else {
            document.documentElement.classList.add('platform-win32');
        }
        
        // Style the custom titlebar and body inline immediately to prevent flash of unstyled content
        // 1. Custom Titlebar Inline Styling
        titlebar.style.setProperty('position', 'fixed', 'important');
        titlebar.style.setProperty('top', '0px', 'important');
        titlebar.style.setProperty('left', '0', 'important');
        titlebar.style.setProperty('width', '100%', 'important');
        titlebar.style.setProperty('height', '40px', 'important');
        titlebar.style.setProperty('zIndex', '2147483647', 'important');
        titlebar.style.setProperty('backgroundColor', '#1E1F22', 'important');
        titlebar.style.setProperty('display', 'flex', 'important');
        titlebar.style.setProperty('alignItems', 'center', 'important');
        titlebar.style.setProperty('boxSizing', 'border-box', 'important');
        titlebar.style.setProperty('-webkit-app-region', 'drag', 'important');
        titlebar.style.setProperty('borderBottom', '1px solid rgba(255, 255, 255, 0.05)', 'important');
        titlebar.style.setProperty('userSelect', 'none', 'important');

        // 2. Custom Title Inline Styling
        title.style.setProperty('position', 'absolute', 'important');
        if (isMac) {
            title.style.setProperty('left', '80px', 'important');
        } else {
            title.style.setProperty('left', '16px', 'important');
        }
        title.style.setProperty('color', '#C4C7C5', 'important');
        title.style.setProperty('fontSize', '12px', 'important');
        title.style.setProperty('fontFamily', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', 'important');
        title.style.setProperty('fontWeight', '500', 'important');
        title.style.setProperty('pointerEvents', 'none', 'important');

        // 3. Reload Button Inline Styling
        reloadBtn.style.setProperty('position', 'absolute', 'important');
        if (isMac) {
            reloadBtn.style.setProperty('right', '16px', 'important');
            reloadBtn.style.setProperty('width', '32px', 'important');
            reloadBtn.style.setProperty('height', '32px', 'important');
            reloadBtn.style.setProperty('borderRadius', '50%', 'important');
            reloadBtn.style.setProperty('top', '4px', 'important');
        } else {
            reloadBtn.style.setProperty('right', '138px', 'important');
            reloadBtn.style.setProperty('width', '46px', 'important');
            reloadBtn.style.setProperty('height', '40px', 'important');
            reloadBtn.style.setProperty('borderRadius', '0', 'important');
            reloadBtn.style.setProperty('top', '0px', 'important');
        }
        reloadBtn.style.setProperty('-webkit-app-region', 'no-drag', 'important');
        reloadBtn.style.setProperty('background-color', 'transparent', 'important');
        reloadBtn.style.setProperty('border', 'none', 'important');
        reloadBtn.style.setProperty('color', '#C4C7C5', 'important');
        reloadBtn.style.setProperty('cursor', 'pointer', 'important');
        reloadBtn.style.setProperty('display', 'flex', 'important');
        reloadBtn.style.setProperty('alignItems', 'center', 'important');
        reloadBtn.style.setProperty('justifyContent', 'center', 'important');

        // Interactive hover states using event listeners
        reloadBtn.addEventListener('mouseenter', () => {
            reloadBtn.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
        });
        reloadBtn.addEventListener('mouseleave', () => {
            reloadBtn.style.setProperty('background-color', 'transparent', 'important');
        });
        reloadBtn.addEventListener('mousedown', () => {
            reloadBtn.style.setProperty('background-color', 'rgba(255, 255, 255, 0.15)', 'important');
        });
        reloadBtn.addEventListener('mouseup', () => {
            reloadBtn.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
        });

        // 4. SVG Inline Styling
        svg.style.setProperty('width', '18px', 'important');
        svg.style.setProperty('height', '18px', 'important');
        svg.style.setProperty('fill', 'currentColor', 'important');

        // 5. Shift body down immediately (since titlebar is now inserted in documentElement)
        document.body.style.setProperty('transform', 'translateY(40px)', 'important');
        document.body.style.setProperty('height', 'calc(100vh - 40px)', 'important');
        document.body.style.setProperty('position', 'absolute', 'important');
        document.body.style.setProperty('width', '100%', 'important');
        document.body.style.setProperty('margin', '0', 'important');
        document.body.style.setProperty('padding', '0', 'important');
        document.body.style.setProperty('top', '0', 'important');
        document.body.style.setProperty('left', '0', 'important');

        // Insert custom-titlebar directly to documentElement (html tag) so it is outside body
        document.documentElement.insertBefore(titlebar, document.documentElement.firstChild);
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

