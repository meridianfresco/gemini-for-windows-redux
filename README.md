<div align="left">
  <img src="media/3840px-Google_Gemini_logo_2026.png" width="350" alt="Gemini Logo" />
  <h1>Google Gemini for Windows Redux</h1>
<p align="right">
  <img src="https://img.shields.io/badge/Windows-10%2B-blue?style=for-the-badge&logo=windows" alt="Windows Support" />
  <img src="https://img.shields.io/badge/Electron-Latest-black?style=for-the-badge&logo=electron" alt="Electron Build" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p> 
  <p>A sleek, native & frameless desktop client bringing Google Gemini™ directly to your PC (Redux version with improvements).</p>
</div>

<h5>If you enjoy the project or find it useful, consider dropping a ⭐ on the repository!</h5>

## ✦ Download & Install

**[Download the latest `.exe` release here](https://github.com/meridianfresco/gemini-for-windows-redux/releases)**

1. Download the latest `Gemini Desktop Setup 1.0.0.exe` from the Releases page.
2. Run the installer.
3. Access Gemini seamlessly from your Windows App List or System Tray!

*(Note: Because this is a free, open-source project without a paid corporate certificate, Windows SmartScreen may show a 'Windows protected your PC' warning. To run the app, click More Info -> Run Anyway. You can view the full source code and build it yourself to verify its safety.).*

---

## ✦ Features

* **No Chrome, Neural Expressive:** No browser tabs, no URL bars, no window borders. Just the frameless 'Neural Expressive' Gemini UI.
* **Native Windows 11 Feel:** Hidden title bars to enable native soft drop-shadows and the rounded corners of the Windows 11 DWM (Desktop Window Manager).
* **Right-Click Controls:** Right-click anywhere to access window controls such as 'minimize, maximize, center, and close.' or use the system tray icon's menu to open or quit Gemini.
* **System Tray Integration:** Close the window and it minimizes smartly to your tray. Keeps Gemini running quietly in the background, ready when you need it.
* **Secure login:** Script-free Gemini web-app with secure PassKey Login support using a Firefox User-Agent internally to securely log-in to your Google Account.
* **Draggable Window:** Frameless-style window layout with support for direct window dragging from customized title/drag areas.
* **Redux Features:**
  * **Application Menu Improvements:** Added a standard application menu bar containing a **Help -> About** option linking to the GitHub repository.
  * **Auto-Hide Menu Bar:** The menu bar automatically hides itself unless you press the **Alt** key on your keyboard, keeping the user interface clean and frameless.
  * **Single-Instance Enforcement:** Prevents multiple instances of the application from running simultaneously. Launching a new instance will automatically restore, show, and focus the already running window instead of creating a new process.
  
### Light Theme
<img src="./media/Showcase-White.png" width="800">

### Dark Theme
<img src="./media/Showcase-Black.png" width="800">

---

## ✦ Building from Source

For Developers wanting to look into the Code:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Instructions

1. **Clone the repository** (or download the source ZIP):
   ```bash
   git clone https://github.com/meridianfresco/gemini-for-windows-redux.git
   ```
2. **Navigate to the directory**:
   ```bash
   cd gemini-for-windows-redux
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the app locally** (for testing):
   ```bash
   npm start
   ```
5. **Compile to a `.exe`**:
   ```bash
   npm run build:win
   ```
   > You will find the compiled executable installer in the `dist-electron` folder.

---

## ✦ About & Credits

This is a fork/Redux of the original [Gemini-for-Windows](https://github.com/muhammadsirajulhaq/Gemini-for-Windows) wrapper by [muhammadsirajulhaq](https://github.com/muhammadsirajulhaq).

**Redux Enhancements by [@meridianfresco](https://github.com/meridianfresco):**
* **Application Menu Improvements:** Added standard menu template with Help -> About link.
* **Auto-Hide Menu Bar:** Uses `autoHideMenuBar` configuration.
* **Single-Instance Enforcement:** Integrates Electron's single instance lock APIs.
* **Draggable Window Support:** Configured draggable region support.

This wrapper is based on Electron for a borderless PWA of *'gemini.google.com'*.

<h5> Usage Rights & License:

This project is licensed under the **MIT License**. You are free to use, modify, distribute, and build upon this code for personal and commercial purposes. </h5>

> *Disclaimer: This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Google LLC. "Gemini" is a registered trademark of Google LLC.*
