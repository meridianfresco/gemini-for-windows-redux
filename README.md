<div align="left">
  <img src="https://raw.githubusercontent.com/muhammadsirajulhaq/Gemini-for-Windows/86b937a31e4fd601e79937cc6b05d70221a03576/media/Google_Gemini_logo_2025.svg" width="350" alt="Gemini Logo" />
  <h1>Gemini for Windows</h1>
  <p>A sleek, native, frameless desktop client bringing Google Gemini directly to your PC.</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Windows-10%2B-blue?style=for-the-badge&logo=windows" alt="Windows Support" />
  <img src="https://img.shields.io/badge/Electron-Latest-black?style=for-the-badge&logo=electron" alt="Electron Build" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p>


If you enjoy the project or find it useful, consider dropping a ⭐ on the repository!

## ✦ Download & Install

**[Download the latest `.exe` release here](https://github.com/muhammadsirajulhaq/Gemini-for-Windows/releases)**

[![VirusTotal Score](https://img.shields.io/badge/VirusTotal-0%2F65_Clean-brightgreen?style=for-the-badge&logo=virustotal)](https://www.virustotal.com/gui/file/354e97c61e361c690346325d69474ef2b7304787ac5aa8b4d220b6d3d7c720c6/detection)

1. Download the latest `Gemini Setup.exe` from the Releases page.
2. Run the installer.
3. Access Gemini seamlessly from your Windows App List or System Tray!

*(Note: Because this is a free, open-source project without a paid corporate certificate, Windows SmartScreen may show a 'Windows protected your PC' warning. To run the app, click More Info -> Run Anyway. You can view the full source code and build it yourself to verify its safety.).*

---

## ✦ Features

* **No Chrome, Neural Expressive:** No browser tabs, no URL bars, no window borders. Just the pure, frameless 'Neural Expressive' Gemini UI
* **Native Windows 11 Feel:** Hidden title bars to retain the native soft drop-shadows and beautiful rounded corners of the Windows 11 DWM (Desktop Window Manager).
* **Right-Click Controls:** Right-click anywhere to access window controls, or use the sleek system tray menu to minimize, maximize, center, and close.
* **System Tray Integration:** Close the window and it minimizes smartly to your tray. Keeps Gemini running quietly in the background, ready when you need it.

---

## ✦ Building from Source

For Devs wanting to look into the code:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Instructions

1. **Clone the repository** (or download the source ZIP):
   ```bash
   git clone https://github.com/muhammadsirajulhaq/Gemini-for-Windows.git
   ```
2. **Navigate to the directory**:
   ```bash
   cd Gemini-for-Windows
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

## ✦ About

If you were looking for a **Gemini App for Windows** you're in the right place! This wrapper is specifically optimized for Windows 10 & 11 environments.

## ✦ Usage Rights & License

This project is licensed under the **MIT License**. You are free to use, modify, distribute, and build upon this code for personal and commercial purposes. 

> *Disclaimer: This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Google LLC. "Gemini" is a registered trademark of Google LLC.*
