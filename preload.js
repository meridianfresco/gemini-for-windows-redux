// Preload script for Gemini for Windows
const { ipcRenderer } = require('electron');

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
        titlebar.style.setProperty('top', '0px');
        titlebar.style.setProperty('left', '0', 'important');
        titlebar.style.setProperty('width', '100%', 'important');
        titlebar.style.setProperty('height', '40px');
        titlebar.style.setProperty('z-index', '2147483647', 'important');
        titlebar.style.setProperty('background-color', 'var(--titlebar-bg, #1E1F22)', 'important');
        titlebar.style.setProperty('display', 'flex', 'important');
        titlebar.style.setProperty('align-items', 'center', 'important');
        titlebar.style.setProperty('box-sizing', 'border-box', 'important');
        titlebar.style.setProperty('-webkit-app-region', 'drag', 'important');
        titlebar.style.setProperty('border-bottom', '1px solid var(--titlebar-border, rgba(255, 255, 255, 0.05))', 'important');
        titlebar.style.setProperty('user-select', 'none', 'important');

        // 2. Custom Title Inline Styling
        title.style.setProperty('position', 'absolute', 'important');
        title.style.setProperty('top', '0', 'important');
        title.style.setProperty('bottom', '0', 'important');
        title.style.setProperty('display', 'flex', 'important');
        title.style.setProperty('align-items', 'center', 'important');
        if (isMac) {
            title.style.setProperty('left', '80px', 'important');
        } else {
            title.style.setProperty('left', '16px', 'important');
        }
        title.style.setProperty('color', 'var(--titlebar-color, #C4C7C5)', 'important');
        title.style.setProperty('font-size', '12px', 'important');
        title.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', 'important');
        title.style.setProperty('font-weight', '500', 'important');
        title.style.setProperty('pointer-events', 'none', 'important');

        // 3. Reload Button Inline Styling
        reloadBtn.style.setProperty('position', 'absolute', 'important');
        if (isMac) {
            reloadBtn.style.setProperty('right', '16px', 'important');
            reloadBtn.style.setProperty('width', '32px', 'important');
            reloadBtn.style.setProperty('height', '32px', 'important');
            reloadBtn.style.setProperty('border-radius', '50%', 'important');
            reloadBtn.style.setProperty('top', '4px', 'important');
        } else {
            reloadBtn.style.setProperty('right', '138px', 'important');
            reloadBtn.style.setProperty('width', '46px', 'important');
            reloadBtn.style.setProperty('height', '100%', 'important');
            reloadBtn.style.setProperty('border-radius', '0', 'important');
            reloadBtn.style.setProperty('top', '0px', 'important');
        }
        reloadBtn.style.setProperty('-webkit-app-region', 'no-drag', 'important');
        reloadBtn.style.setProperty('background-color', 'transparent', 'important');
        reloadBtn.style.setProperty('border', 'none', 'important');
        reloadBtn.style.setProperty('color', 'var(--titlebar-color, #C4C7C5)', 'important');
        reloadBtn.style.setProperty('cursor', 'pointer', 'important');
        reloadBtn.style.setProperty('display', 'flex', 'important');
        reloadBtn.style.setProperty('align-items', 'center', 'important');
        reloadBtn.style.setProperty('justify-content', 'center', 'important');

        // Interactive hover states using event listeners
        reloadBtn.addEventListener('mouseenter', () => {
            reloadBtn.style.setProperty('background-color', 'var(--titlebar-btn-hover, rgba(255, 255, 255, 0.1))', 'important');
        });
        reloadBtn.addEventListener('mouseleave', () => {
            reloadBtn.style.setProperty('background-color', 'transparent', 'important');
        });
        reloadBtn.addEventListener('mousedown', () => {
            reloadBtn.style.setProperty('background-color', 'var(--titlebar-btn-active, rgba(255, 255, 255, 0.15))', 'important');
        });
        reloadBtn.addEventListener('mouseup', () => {
            reloadBtn.style.setProperty('background-color', 'var(--titlebar-btn-hover, rgba(255, 255, 255, 0.1))', 'important');
        });

        // 4. SVG Inline Styling
        svg.style.setProperty('width', '18px', 'important');
        svg.style.setProperty('height', '18px', 'important');
        svg.style.setProperty('fill', 'currentColor', 'important');

        // 5. Create HTML Window Control Buttons on Windows/Linux
        if (!isMac) {
            const controls = document.createElement('div');
            controls.id = 'custom-titlebar-controls';
            controls.style.setProperty('position', 'absolute', 'important');
            controls.style.setProperty('right', '0', 'important');
            controls.style.setProperty('top', '0', 'important');
            controls.style.setProperty('height', '100%', 'important');
            controls.style.setProperty('display', 'flex', 'important');
            controls.style.setProperty('align-items', 'center', 'important');
            controls.style.setProperty('z-index', '2147483647', 'important');

            const createButton = (id, titleText) => {
                const btn = document.createElement('button');
                btn.id = id;
                btn.title = titleText;
                btn.style.setProperty('width', '46px', 'important');
                btn.style.setProperty('height', '100%', 'important');
                btn.style.setProperty('display', 'flex', 'important');
                btn.style.setProperty('align-items', 'center', 'important');
                btn.style.setProperty('justify-content', 'center', 'important');
                btn.style.setProperty('background', 'transparent', 'important');
                btn.style.setProperty('border', 'none', 'important');
                btn.style.setProperty('color', 'var(--titlebar-color, #C4C7C5)', 'important');
                btn.style.setProperty('cursor', 'pointer', 'important');
                btn.style.setProperty('-webkit-app-region', 'no-drag', 'important');
                btn.style.setProperty('padding', '0', 'important');
                btn.style.setProperty('margin', '0', 'important');
                return btn;
            };

            const minBtn = createButton('custom-titlebar-minimize', 'Minimize');
            const maxBtn = createButton('custom-titlebar-maximize', 'Maximize');
            const closeBtn = createButton('custom-titlebar-close', 'Close');

            // SVG styling reset helper
            const styleControlSvg = (svgEl) => {
                svgEl.style.setProperty('width', '10px', 'important');
                svgEl.style.setProperty('height', '10px', 'important');
                svgEl.style.setProperty('min-width', '10px', 'important');
                svgEl.style.setProperty('min-height', '10px', 'important');
                svgEl.style.setProperty('max-width', '10px', 'important');
                svgEl.style.setProperty('max-height', '10px', 'important');
                svgEl.style.setProperty('margin', '0', 'important');
                svgEl.style.setProperty('padding', '0', 'important');
                svgEl.style.setProperty('display', 'block', 'important');
                svgEl.style.setProperty('position', 'static', 'important');
                svgEl.style.setProperty('transform', 'none', 'important');
                svgEl.style.setProperty('overflow', 'visible', 'important');
                svgEl.style.setProperty('box-sizing', 'content-box', 'important');
                svgEl.style.setProperty('vertical-align', 'middle', 'important');
            };

            // Minimize SVG
            const minSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            minSvg.setAttribute("viewBox", "0 0 10 10");
            minSvg.setAttribute("width", "10");
            minSvg.setAttribute("height", "10");
            styleControlSvg(minSvg);
            const minPath = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            minPath.setAttribute("x", "0");
            minPath.setAttribute("y", "4.5");
            minPath.setAttribute("width", "10");
            minPath.setAttribute("height", "1");
            minPath.setAttribute("fill", "currentColor");
            minPath.style.setProperty('fill', 'currentColor', 'important');
            minPath.style.setProperty('stroke', 'none', 'important');
            minSvg.appendChild(minPath);
            minBtn.appendChild(minSvg);

            // Maximize SVG
            const maxSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            maxSvg.setAttribute("viewBox", "0 0 10 10");
            maxSvg.setAttribute("width", "10");
            maxSvg.setAttribute("height", "10");
            styleControlSvg(maxSvg);
            const maxPath = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            maxPath.setAttribute("x", "0.5");
            maxPath.setAttribute("y", "0.5");
            maxPath.setAttribute("width", "9");
            maxPath.setAttribute("height", "9");
            maxPath.setAttribute("fill", "none");
            maxPath.setAttribute("stroke", "currentColor");
            maxPath.setAttribute("stroke-width", "1");
            maxPath.style.setProperty('fill', 'none', 'important');
            maxPath.style.setProperty('stroke', 'currentColor', 'important');
            maxPath.style.setProperty('stroke-width', '1', 'important');
            maxSvg.appendChild(maxPath);

            // Restore SVG
            const restoreSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            restoreSvg.setAttribute("viewBox", "0 0 10 10");
            restoreSvg.setAttribute("width", "10");
            restoreSvg.setAttribute("height", "10");
            styleControlSvg(restoreSvg);
            const restorePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            restorePath.setAttribute("d", "M1.5,3.5 L1.5,8.5 L6.5,8.5 L6.5,3.5 Z M3.5,3.5 L3.5,1.5 L8.5,1.5 L8.5,6.5 L6.5,6.5");
            restorePath.setAttribute("fill", "none");
            restorePath.setAttribute("stroke", "currentColor");
            restorePath.setAttribute("stroke-width", "1");
            restorePath.style.setProperty('fill', 'none', 'important');
            restorePath.style.setProperty('stroke', 'currentColor', 'important');
            restorePath.style.setProperty('stroke-width', '1', 'important');
            restoreSvg.appendChild(restorePath);

            // Close SVG
            const closeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            closeSvg.setAttribute("viewBox", "0 0 10 10");
            closeSvg.setAttribute("width", "10");
            closeSvg.setAttribute("height", "10");
            styleControlSvg(closeSvg);
            const closePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            closePath.setAttribute("d", "M1 1 L9 9 M9 1 L1 9");
            closePath.setAttribute("stroke", "currentColor");
            closePath.setAttribute("stroke-width", "1");
            closePath.style.setProperty('fill', 'none', 'important');
            closePath.style.setProperty('stroke', 'currentColor', 'important');
            closePath.style.setProperty('stroke-width', '1', 'important');
            closeSvg.appendChild(closePath);
            closeBtn.appendChild(closeSvg);

            const updateMaximizeIcon = (maximized) => {
                while (maxBtn.firstChild) {
                    maxBtn.removeChild(maxBtn.firstChild);
                }
                if (maximized) {
                    maxBtn.appendChild(restoreSvg);
                } else {
                    maxBtn.appendChild(maxSvg);
                }
            };

            const initialState = ipcRenderer.sendSync('get-window-state');
            updateMaximizeIcon(initialState ? initialState.isMaximized : false);

            // Hover & Active listeners for Minimize/Maximize
            const addStandardHover = (btn) => {
                btn.addEventListener('mouseenter', () => {
                    btn.style.setProperty('background-color', 'var(--titlebar-btn-hover, rgba(255, 255, 255, 0.1))', 'important');
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.setProperty('background-color', 'transparent', 'important');
                });
                btn.addEventListener('mousedown', () => {
                    btn.style.setProperty('background-color', 'var(--titlebar-btn-active, rgba(255, 255, 255, 0.15))', 'important');
                });
                btn.addEventListener('mouseup', () => {
                    btn.style.setProperty('background-color', 'var(--titlebar-btn-hover, rgba(255, 255, 255, 0.1))', 'important');
                });
            };
            addStandardHover(minBtn);
            addStandardHover(maxBtn);

            // Hover & Active listeners for Close
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.setProperty('background-color', '#E81123', 'important');
                closeBtn.style.setProperty('color', '#FFFFFF', 'important');
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.setProperty('background-color', 'transparent', 'important');
                closeBtn.style.setProperty('color', 'var(--titlebar-color, #C4C7C5)', 'important');
            });
            closeBtn.addEventListener('mousedown', () => {
                closeBtn.style.setProperty('background-color', '#F1707A', 'important');
                closeBtn.style.setProperty('color', '#FFFFFF', 'important');
            });
            closeBtn.addEventListener('mouseup', () => {
                closeBtn.style.setProperty('background-color', '#E81123', 'important');
                closeBtn.style.setProperty('color', '#FFFFFF', 'important');
            });

            // Click listeners
            minBtn.addEventListener('click', () => {
                ipcRenderer.send('window-minimize');
            });
            maxBtn.addEventListener('click', () => {
                ipcRenderer.send('window-maximize');
            });
            closeBtn.addEventListener('click', () => {
                ipcRenderer.send('window-close');
            });

            // Handle dynamic state changes
            ipcRenderer.on('window-state', (event, state) => {
                updateMaximizeIcon(state.isMaximized);
            });

            controls.appendChild(minBtn);
            controls.appendChild(maxBtn);
            controls.appendChild(closeBtn);
            titlebar.appendChild(controls);
        }

        // 6. Shift body down immediately (since titlebar is now inserted in documentElement)
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

// Caching theme updates check to avoid style recalculations
let lastThemeState = null;
const updateTheme = () => {
    if (!document.body) return;

    const htmlClasses = document.documentElement.className;
    const bodyClasses = document.body.className;
    const bg = window.getComputedStyle(document.body).backgroundColor;

    const stateKey = `${htmlClasses}|${bodyClasses}|${bg}`;
    if (stateKey === lastThemeState) return;
    lastThemeState = stateKey;

    const htmlLower = htmlClasses.toLowerCase().replace(/titlebar-dark/g, '').replace(/titlebar-light/g, '');
    const bodyLower = bodyClasses.toLowerCase().replace(/titlebar-dark/g, '').replace(/titlebar-light/g, '');

    let isDark = true;
    if (htmlLower.includes('dark') || bodyLower.includes('dark')) {
        isDark = true;
    } else if (htmlLower.includes('light') || bodyLower.includes('light')) {
        isDark = false;
    } else if (bg) {
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            isDark = brightness < 128;
        }
    }

    if (isDark) {
        document.documentElement.classList.add('titlebar-dark');
        document.documentElement.classList.remove('titlebar-light');
    } else {
        document.documentElement.classList.add('titlebar-light');
        document.documentElement.classList.remove('titlebar-dark');
    }
};

// Check frequently during early loading
let checks = 0;
const startupInterval = setInterval(() => {
    if (document.body) {
        injectTitlebar();
        updateTheme();
    }
    checks++;
    if (checks > 100) {
        clearInterval(startupInterval);
        // Maintain a slow background check loop
        setInterval(() => {
            if (document.body) {
                if (!document.getElementById('custom-titlebar')) {
                    injectTitlebar();
                }
                updateTheme();
            }
        }, 500);
    }
}, 100);

