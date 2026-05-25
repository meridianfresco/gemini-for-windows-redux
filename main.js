const { app, BrowserWindow, Tray, Menu, shell, screen } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let tray;
let isQuitting = false;

// Using a Firefox User-Agent prevents Google Auth from blocking the embedded browser
const FIREFOX_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0';

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false, // Removes standard border, header
        titleBarStyle: 'hidden', // Essential on Win11 to retain native rounded corners & soft shadow
        titleBarOverlay: false, // Disables native overlay controls to allow our custom hover ones
        backgroundColor: '#1E1F22', // Match dark theme flash
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false
        },
        icon: path.join(__dirname, 'icon.ico')
    });

    // Provide the alternative user agent to the session
    mainWindow.webContents.userAgent = FIREFOX_UA;

    // Load actual Gemini
    mainWindow.loadURL('https://gemini.google.com/');

    // Secure external link handling - pop them out to actual browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https://accounts.google.com') || url.startsWith('https://gemini.google.com')) {
            return { action: 'allow' };
        }
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Strip Gemini's internal web borders and scrollbars to prevent 1px visual artifacts on the edges
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS(`
            html, body {
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            /* Target Gemini's specific wrapping elements to ensure no nested borders bleed to the edges */
            #app-root, .app-container, main, mat-sidenav-container, .side-nav-container {
                border: none !important;
                box-shadow: none !important;
                outline: none !important;
            }
            /* Hide the web scrollbar to prevent the right/bottom edge from looking like a grey border */
            ::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                background: transparent !important;
            }
        `);
    });

    // Don't quit, instead minimize/hide to tray when the frame is "closed"
    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();
            event.returnValue = false;
        }
    });

    // Right-Click Context Menu injection
    mainWindow.webContents.on('context-menu', (event, params) => {
        const contextMenuTemplate = [
            { label: 'Back', click: () => { if (mainWindow.webContents.canGoBack()) mainWindow.webContents.goBack(); } },
            { label: 'Forward', click: () => { if (mainWindow.webContents.canGoForward()) mainWindow.webContents.goForward(); } },
            { type: 'separator' },
            { label: 'Reload', click: () => mainWindow.webContents.reload() },
            { type: 'separator' },
            { label: 'Cut', role: 'cut' },
            { label: 'Copy', role: 'copy' },
            { label: 'Paste', role: 'paste' },
            { type: 'separator' },
            { label: 'Center Window', click: () => {
                if (mainWindow) {
                    const bounds = mainWindow.getBounds();
                    const display = screen.getDisplayNearestPoint({ x: bounds.x, y: bounds.y });
                    const newX = display.workArea.x + Math.floor((display.workArea.width - bounds.width) / 2);
                    const newY = display.workArea.y + Math.floor((display.workArea.height - bounds.height) / 2);
                    mainWindow.setBounds({ x: newX, y: newY, width: bounds.width, height: bounds.height });
                }
            }},
            { type: 'separator' },
            { label: 'Minimize', click: () => { if (mainWindow) mainWindow.minimize(); } },
            { label: 'Maximize / Restore', click: () => {
                if (mainWindow) {
                    if (mainWindow.isMaximized()) mainWindow.unmaximize();
                    else mainWindow.maximize();
                }
            }},
            { label: 'Close', click: () => { if (mainWindow) mainWindow.close(); } }
        ];
        Menu.buildFromTemplate(contextMenuTemplate).popup(mainWindow);
    });
}

function createTray() {
    const iconPath = path.join(__dirname, 'icon.ico');
    let trayIcon = iconPath;

    // Handle missing icon gracefully (e.g. before user places icon.ico)
    if (!fs.existsSync(iconPath)) {
        console.warn("\n[Warning] icon.ico not found in the directory! Please place it here before building.\n");
        // We'll create a completely transparent tray icon if none found so it still functions in dev
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

        // Single click system tray to restore application
        tray.on('click', () => {
           if (mainWindow) mainWindow.show();
        });
    } catch (e) {
        console.error("Failed to inject tray. Make sure icon format is correct (.ico): ", e);
    }
}

app.whenReady().then(() => {
    createWindow();
    createTray();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
