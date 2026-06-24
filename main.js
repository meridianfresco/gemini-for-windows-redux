const { app, BrowserWindow, Tray, Menu, shell, screen, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let tray;
let isQuitting = false;
let hideTimeout = null;

let settingsPath = null;
function getSettingsPath() {
    if (!settingsPath) {
        settingsPath = path.join(app.getPath('userData'), 'settings.json');
    }
    return settingsPath;
}

let settings = {
    devToolsOnLaunch: false,
    startWithWindows: false
};

function loadSettings() {
    try {
        const p = getSettingsPath();
        if (fs.existsSync(p)) {
            const data = fs.readFileSync(p, 'utf8');
            const parsed = JSON.parse(data);
            settings = { ...settings, ...parsed };
        }
    } catch (e) {
        console.error('Failed to load settings:', e);
    }
}

function saveSettings() {
    try {
        const p = getSettingsPath();
        const dir = path.dirname(p);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(p, JSON.stringify(settings, null, 2), 'utf8');
    } catch (e) {
        console.error('Failed to save settings:', e);
    }
}

// Set V8 engine old space size to 4GB (4096MB) to ensure smooth performance without GC pauses
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');

// Request single instance lock
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
}

// Using a Firefox User-Agent prevents Google Auth from blocking the embedded browser
const FIREFOX_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0';

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'Gemini for Windows',
        backgroundColor: '#1E1F22',
        titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            spellcheck: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'icon.ico')
    });

    // Prevent webpage from changing the title
    mainWindow.on('page-title-updated', (event) => {
        event.preventDefault();
    });

    // Track maximized state to adjust custom titlebar alignment on Windows
    const sendWindowState = () => {
        if (mainWindow) {
            mainWindow.webContents.send('window-state', {
                isMaximized: mainWindow.isMaximized()
            });
            mainWindow.webContents.executeJavaScript(`document.documentElement.classList.add('maximized')`).catch(() => {});
        }
    };
    const sendWindowUnmaximizedState = () => {
        if (mainWindow) {
            mainWindow.webContents.send('window-state', {
                isMaximized: false
            });
            mainWindow.webContents.executeJavaScript(`document.documentElement.classList.remove('maximized')`).catch(() => {});
        }
    };
    mainWindow.on('maximize', sendWindowState);
    mainWindow.on('unmaximize', sendWindowUnmaximizedState);

    mainWindow.webContents.userAgent = FIREFOX_UA;
    mainWindow.loadURL('https://gemini.google.com/');

    // Open DevTools if enabled in settings
    if (settings.devToolsOnLaunch) {
        mainWindow.webContents.openDevTools();
    }

    // External links open in user's browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https://accounts.google.com') || url.startsWith('https://gemini.google.com')) {
            return { action: 'allow' };
        }
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Strip Gemini's internal web borders and scrollbars to prevent visual artifacts
    const injectCSS = () => {
        mainWindow.webContents.insertCSS(`
            html {
                overflow: hidden !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
            }
            body {
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
                transform: translateY(40px) !important;
                height: calc(100vh - 40px) !important;
                width: 100% !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                overflow: auto !important;
            }
            #app-root, .app-container, main, mat-sidenav-container, .side-nav-container {
                border: none !important;
                box-shadow: none !important;
                outline: none !important;
            }
            ::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                background: transparent !important;
            }

            /* Custom Titlebar Theme Variables */
            :root {
                --titlebar-bg: #1E1F22;
                --titlebar-color: #C4C7C5;
                --titlebar-border: rgba(255, 255, 255, 0.05);
                --titlebar-btn-hover: rgba(255, 255, 255, 0.1);
                --titlebar-btn-active: rgba(255, 255, 255, 0.15);
            }

            .titlebar-light {
                --titlebar-bg: #F0F4F9;
                --titlebar-color: #444746;
                --titlebar-border: rgba(0, 0, 0, 0.06);
                --titlebar-btn-hover: rgba(0, 0, 0, 0.1);
                --titlebar-btn-active: rgba(0, 0, 0, 0.18);
            }

            /* Custom Titlebar and Drag Region */
            #custom-titlebar {
                position: fixed !important;
                top: 0px !important;
                left: 0 !important;
                width: 100% !important;
                height: 40px !important;
                z-index: 2147483647 !important;
                background-color: var(--titlebar-bg) !important;
                display: flex !important;
                align-items: center !important;
                box-sizing: border-box !important;
                -webkit-app-region: drag !important;
                border-bottom: 1px solid var(--titlebar-border) !important;
                user-select: none !important;
            }

            #custom-titlebar-title {
                position: absolute !important;
                left: 16px !important;
                top: 0 !important;
                bottom: 0 !important;
                display: flex !important;
                align-items: center !important;
                color: var(--titlebar-color) !important;
                font-size: 12px !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
                font-weight: 500 !important;
                pointer-events: none !important;
            }

            .titlebar-reload-btn {
                position: absolute !important;
                right: 138px !important;
                top: 0 !important;
                -webkit-app-region: no-drag !important;
                background-color: transparent !important;
                border: none !important;
                color: var(--titlebar-color) !important;
                cursor: pointer !important;
                width: 46px !important;
                height: 100% !important;
                border-radius: 0 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            .platform-darwin #custom-titlebar-title {
                left: 80px !important;
            }

            .platform-darwin .titlebar-reload-btn {
                right: 16px !important;
                width: 32px !important;
                height: 32px !important;
                border-radius: 50% !important;
                top: 4px !important;
            }

            .titlebar-reload-btn:hover {
                background-color: var(--titlebar-btn-hover) !important;
            }

            .titlebar-reload-btn:active {
                background-color: var(--titlebar-btn-active) !important;
            }

            .titlebar-reload-btn svg {
                width: 18px !important;
                height: 18px !important;
                fill: currentColor !important;
            }

            /* Custom Titlebar Window Controls Styles */
            #custom-titlebar-controls {
                position: absolute !important;
                right: 0 !important;
                top: 0 !important;
                height: 100% !important;
                display: flex !important;
                align-items: center !important;
                z-index: 2147483647 !important;
                box-sizing: border-box !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            #custom-titlebar-controls button {
                width: 46px !important;
                height: 100% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: transparent !important;
                border: none !important;
                color: var(--titlebar-color) !important;
                cursor: pointer !important;
                -webkit-app-region: no-drag !important;
                padding: 0 !important;
                margin: 0 !important;
                box-sizing: border-box !important;
                position: relative !important;
                outline: none !important;
                box-shadow: none !important;
                transition: background-color 0.1s ease, color 0.1s ease !important;
            }

            #custom-titlebar-controls svg {
                width: 10px !important;
                height: 10px !important;
                min-width: 10px !important;
                min-height: 10px !important;
                max-width: 10px !important;
                max-height: 10px !important;
                display: block !important;
                position: static !important;
                margin: 0 !important;
                padding: 0 !important;
                transform: none !important;
                overflow: visible !important;
                box-sizing: content-box !important;
                vertical-align: middle !important;
            }

            #custom-titlebar-minimize svg rect {
                fill: currentColor !important;
                stroke: none !important;
            }

            #custom-titlebar-maximize svg rect,
            #custom-titlebar-maximize svg path {
                fill: none !important;
                stroke: currentColor !important;
                stroke-width: 1 !important;
            }

            #custom-titlebar-close svg path {
                fill: none !important;
                stroke: currentColor !important;
                stroke-width: 1 !important;
            }

            /* Adjust titlebar height and top margin on Windows when maximized */
            .platform-win32.maximized #custom-titlebar {
                height: 40px !important;
                top: 8px !important;
            }

            .platform-win32.maximized body {
                transform: translateY(48px) !important;
                height: calc(100vh - 48px) !important;
            }

            /* Hide titlebar and restore size in fullscreen */
            @media (display-mode: fullscreen) {
                body {
                    transform: none !important;
                    height: 100vh !important;
                    width: 100% !important;
                }
                #custom-titlebar {
                    display: none !important;
                }
            }
        `);
        // Sync maximized class state on Windows
        if (process.platform === 'win32') {
            if (mainWindow.isMaximized()) {
                mainWindow.webContents.executeJavaScript(`document.documentElement.classList.add('maximized')`).catch(() => {});
            } else {
                mainWindow.webContents.executeJavaScript(`document.documentElement.classList.remove('maximized')`).catch(() => {});
            }
        }
    };

    mainWindow.webContents.on('did-navigate', injectCSS);
    mainWindow.webContents.on('dom-ready', injectCSS);
    mainWindow.webContents.on('did-frame-finish-load', injectCSS);
    mainWindow.webContents.on('did-finish-load', injectCSS);

    // Minimize to tray on close
    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();

            // Clear cache to free up memory while hidden
            mainWindow.webContents.session.clearCache().catch((err) => {
                console.error('Failed to clear cache:', err);
            });

            event.returnValue = false;
        }
    });

    // Handle idle states when window is blurred (unfocused, minimized, or hidden)
    mainWindow.on('blur', () => {
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            if (mainWindow && !mainWindow.isFocused()) {
                // Check if there is any active text draft typed in the page before reloading
                mainWindow.webContents.executeJavaScript(`
                    (() => {
                        const textareas = document.querySelectorAll('textarea');
                        for (const ta of textareas) {
                            if (ta.value && ta.value.trim().length > 0) return true;
                        }
                        const editables = document.querySelectorAll('[contenteditable="true"]');
                        for (const ed of editables) {
                            if (ed.textContent && ed.textContent.trim().length > 0) return true;
                        }
                        return false;
                    })()
                `).then((hasDraft) => {
                    if (!hasDraft && mainWindow && !mainWindow.isFocused()) {
                        mainWindow.webContents.session.clearCache().then(() => {
                            if (mainWindow && !mainWindow.isFocused()) {
                                mainWindow.webContents.reload();
                            }
                        }).catch((err) => {
                            console.error('Failed to clear cache during idle:', err);
                            if (mainWindow && !mainWindow.isFocused()) {
                                mainWindow.webContents.reload();
                            }
                        });
                    }
                }).catch((err) => {
                    console.error('Failed to check for draft:', err);
                });
            }
        }, 60 * 60 * 1000); // 1 hour idle time
    });

    mainWindow.on('focus', () => {
        // Cancel background reload if window is focused before the timeout
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    });

    // Capture Alt and F10 key presses to show the application menu as a dropdown popup
    let altPressed = false;
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (process.platform !== 'win32') return;

        if (input.key === 'Alt') {
            if (input.type === 'keyDown') {
                altPressed = true;
            } else if (input.type === 'keyUp' && altPressed) {
                altPressed = false;
                event.preventDefault();
                const menu = Menu.getApplicationMenu();
                if (menu) {
                    menu.popup({
                        window: mainWindow,
                        x: 10,
                        y: 40
                    });
                }
            }
        } else if (input.key === 'F10' && input.type === 'keyUp') {
            altPressed = false;
            event.preventDefault();
            const menu = Menu.getApplicationMenu();
            if (menu) {
                menu.popup({
                    window: mainWindow,
                    x: 10,
                    y: 40
                });
            }
        } else {
            altPressed = false;
        }
    });

    // Right-click context menu
    mainWindow.webContents.on('context-menu', (event, params) => {
        const template = [];

        // 1. Add spelling suggestions if there are any
        if (params.dictionarySuggestions && params.dictionarySuggestions.length > 0) {
            for (const suggestion of params.dictionarySuggestions) {
                template.push({
                    label: suggestion,
                    click: () => mainWindow.webContents.replaceMisspelling(suggestion)
                });
            }
            template.push({ type: 'separator' });
        }

        // 2. Add 'Add to Dictionary' if the word is misspelled
        if (params.misspelledWord) {
            template.push({
                label: `Add "${params.misspelledWord}" to Dictionary`,
                click: () => mainWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
            });
            template.push({ type: 'separator' });
        }

        // 3. Edit options (Cut, Copy, Paste, etc.)
        if (params.isEditable) {
            template.push({ label: 'Undo', role: 'undo' });
            template.push({ label: 'Redo', role: 'redo' });
            template.push({ type: 'separator' });
            template.push({ label: 'Cut', role: 'cut' });
            template.push({ label: 'Copy', role: 'copy' });
            template.push({ label: 'Paste', role: 'paste' });
            template.push({ type: 'separator' });
            template.push({ label: 'Select All', role: 'selectall' });
        } else if (params.selectionText) {
            template.push({ label: 'Copy', role: 'copy' });
        }

        // 4. Navigation/Reload options (show if not clicking on editable/text selection, or just as standard default options)
        if (!params.isEditable && !params.selectionText) {
            if (template.length > 0) {
                template.push({ type: 'separator' });
            }
            template.push({ label: 'Back', click: () => { if (mainWindow.webContents.canGoBack()) mainWindow.webContents.goBack(); } });
            template.push({ label: 'Forward', click: () => { if (mainWindow.webContents.canGoForward()) mainWindow.webContents.goForward(); } });
            template.push({ type: 'separator' });
            template.push({ label: 'Reload', click: () => mainWindow.webContents.reload() });
        }

        // Clean up trailing / consecutive separators
        const filteredTemplate = [];
        for (let i = 0; i < template.length; i++) {
            const current = template[i];
            const next = template[i + 1];
            // Skip separator if it's the last item or if it's followed by another separator
            if (current.type === 'separator') {
                if (filteredTemplate.length === 0 || i === template.length - 1 || (next && next.type === 'separator')) {
                    continue;
                }
            }
            filteredTemplate.push(current);
        }

        // Only popup menu if there is at least one item
        if (filteredTemplate.length > 0) {
            Menu.buildFromTemplate(filteredTemplate).popup(mainWindow);
        }
    });
}

function createTray() {
    const iconPath = path.join(__dirname, 'icon.ico');
    let trayIcon = iconPath;

    if (!fs.existsSync(iconPath)) {
        console.warn("\n[Warning] icon.ico not found in the directory! Please place it here before building.\n");
        const { nativeImage } = require('electron');
        trayIcon = nativeImage.createEmpty();
    }

    try {
        tray = new Tray(trayIcon);
        const contextMenu = Menu.buildFromTemplate([
            { label: 'Show Gemini', click: () => mainWindow.show() },
            { type: 'separator' },
            { label: 'Quit', click: () => {
                isQuitting = true;
                app.quit();
            }}
        ]);
        tray.setToolTip('Google Gemini');
        tray.setContextMenu(contextMenu);

        tray.on('click', () => {
           if (mainWindow) mainWindow.show();
        });
    } catch (e) {
        console.error("Failed to inject tray. Make sure icon format is correct (.ico): ", e);
    }
}

function createMenu() {
    const isMac = process.platform === 'darwin';
    const menuTemplate = [
        ...(isMac ? [{
            label: app.name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []),
        {
            label: 'File',
            submenu: [
                isMac ? { role: 'close' } : { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startSpeaking' },
                            { role: 'stopSpeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
            ]
        },
        {
            label: 'Options',
            submenu: [
                {
                    label: 'Open DevTools on Launch',
                    type: 'checkbox',
                    checked: settings.devToolsOnLaunch,
                    click: (menuItem) => {
                        settings.devToolsOnLaunch = menuItem.checked;
                        saveSettings();
                    }
                },
                {
                    label: 'Start with Windows',
                    type: 'checkbox',
                    checked: settings.startWithWindows,
                    click: (menuItem) => {
                        settings.startWithWindows = menuItem.checked;
                        saveSettings();
                        try {
                            app.setLoginItemSettings({
                                openAtLogin: settings.startWithWindows,
                                path: app.getPath('exe')
                            });
                        } catch (err) {
                            console.error('Failed to set login item settings:', err);
                        }
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'About',
                    click: async () => {
                        await shell.openExternal('https://github.com/meridianfresco/gemini-for-windows-redux');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

if (gotTheLock) {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.show();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        loadSettings();

        // Sync startup setting with Windows
        try {
            app.setLoginItemSettings({
                openAtLogin: settings.startWithWindows,
                path: app.getPath('exe')
            });
        } catch (err) {
            console.error('Failed to sync login item settings:', err);
        }

        createWindow();
        createTray();
        createMenu();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });

    app.on('before-quit', () => {
        isQuitting = true;
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    // Custom window controls IPC handlers
    ipcMain.on('get-window-state', (event) => {
        event.returnValue = {
            isMaximized: mainWindow ? mainWindow.isMaximized() : false
        };
    });
    ipcMain.on('window-minimize', () => {
        if (mainWindow) mainWindow.minimize();
    });
    ipcMain.on('window-maximize', () => {
        if (mainWindow) {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            } else {
                mainWindow.maximize();
            }
        }
    });
    ipcMain.on('window-close', () => {
        if (mainWindow) mainWindow.close();
    });
}
