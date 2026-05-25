<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" width="100" alt="Gemini Logo" />
  <h1>Gemini Desktop for Windows</h1>
  <p>A sleek, native, frameless desktop client bringing Google Gemini directly to your PC.</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Windows-10%2B-blue?style=for-the-badge&logo=windows" alt="Windows Support" />
  <img src="https://img.shields.io/badge/Electron-Latest-black?style=for-the-badge&logo=electron" alt="Electron Build" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p>

> **Important**
> **Gemini Desktop for Windows** is an unofficial, community-built Open Source wrapper for Google Gemini. It is built to provide a cleaner, more integrated, and distraction-free experience for PC users who want Gemini as a standalone app rather than a browser tab.

If you enjoy the project or find it useful, consider dropping a ⭐ on the repository!

## 📥 Download & Install

**[⬇️ Download the latest `.exe` release here](#)** *(Note: Link this to your GitHub Releases page once published)*

1. Download the latest `Gemini Desktop Setup.exe` from the Releases page.
2. Run the installer.
3. Access Gemini seamlessly from your Windows App List or System Tray!

*(Note: During the first run, Windows SmartScreen might warn you about an unrecognized app since the executable is not heavily signed yet. Click "More Info" -> "Run Anyway").*

---

## ✨ Features

* **Zero Chrome, Full Immersion:** No clunky browser tabs, no URL bars, no 1px borders. Just a pure, frameless Gemini interface.
* **Native Windows 11 Feel:** Utilizes hidden title bars to retain the native soft drop-shadows and beautiful rounded corners of the Windows 11 DWM (Desktop Window Manager).
* **Mac/Win7 Style Floating Controls:** Right-click anywhere to access window controls, or use the sleek system tray menu to minimize, maximize, center, and close.
* **System Tray Integration:** Close the window and it minimizes smartly to your tray. Keeps Gemini running quietly in the background, ready when you need it.
* **Google Auth Bypass:** Implements a custom Firefox User-Agent internally to securely log into your Google Account without triggering automated "insecure browser" blocks.

---

## 🛠️ Building from Source

Want to tinker with the code? Building it yourself is easy.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Instructions

1. **Clone the repository** (or download the source ZIP):
   ```bash
   git clone https://github.com/YourUsername/Gemini-Desktop-Windows.git
   ```
2. **Navigate to the directory**:
   ```bash
   cd Gemini-Desktop-Windows
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Place your icon:** Ensure there is an `icon.ico` file in the root directory for the app and tray icon.
5. **Run the app locally** (for testing):
   ```bash
   npm start
   ```
6. **Compile to a `.exe`**:
   ```bash
   npm run build:win
   ```
   > You will find the compiled executable installer in the `dist-electron` folder.

---

## 🔍 SEO & Discoverability Highlights
*(For users finding this page)*
If you were looking for a **Gemini App for Windows**, **Gemini on PC**, or a **Gemini Windows Client**, you're in the right place! This wrapper is specifically optimized for Windows 10 & 11 environments.

## ⚖️ Usage Rights & License

This project is licensed under the **MIT License**. You are free to use, modify, distribute, and build upon this code for personal and commercial purposes. 

> *Disclaimer: This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Google LLC. "Gemini" is a registered trademark of Google LLC.*
