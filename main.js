const { app, BrowserWindow, Tray, Menu, shell, screen } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let tray;
let isQuitting = false;

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
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'icon.ico')
    });

    // Prevent webpage from changing the title
    mainWindow.on('page-title-updated', (event) => {
        event.preventDefault();
    });

    mainWindow.webContents.userAgent = FIREFOX_UA;
    mainWindow.loadURL('https://gemini.google.com/');

    // External links open in user's browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https://accounts.google.com') || url.startsWith('https://gemini.google.com')) {
            return { action: 'allow' };
        }
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Strip Gemini's internal web borders and scrollbars to prevent visual artifacts
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS(`
            html, body {
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
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
        `);
    });

    // Minimize to tray on close
    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();
            event.returnValue = false;
        }
    });

    // Right-click context menu
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
        createWindow();
        createTray();
        createMenu();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}
