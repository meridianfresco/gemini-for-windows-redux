import React from 'react';
import { Download, Folder, Play, FileDown, Rocket, CheckCircle2, Github, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200 flex flex-col pt-12 items-center p-6 pb-24">
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
          <div className="h-16 w-16 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 mb-2">
            <Rocket className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white border-b border-neutral-800 pb-4 px-8">
            Gemini Electron Workspace Ready
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            This codebase has been fully prepped for open-source deployment. Follow the steps below to test locally, compile, and publish to GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Features Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
               <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                 <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" />
                 Included Features
               </h3>
               <ul className="space-y-3 text-sm text-neutral-400">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-1.5 mr-2 shrink-0"></span>
                    Zero clunky browser UI; 100% frameless
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-1.5 mr-2 shrink-0"></span>
                    Windows 11 Native shadow & rounded corners (via hidden titleBarStyle)
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-1.5 mr-2 shrink-0"></span>
                    Sleek Right-Click Context Menu Window Controls (Center, Minimize, Maximize, Close)
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-1.5 mr-2 shrink-0"></span>
                    System Tray Support (stays alive, right-click to quit)
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-1.5 mr-2 shrink-0"></span>
                    <strong>NEW:</strong> Professional README.md & MIT License generated!
                  </li>
               </ul>
            </div>

            {/* Step 1 & 2 */}
             <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                   <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                     <Download className="h-5 w-5 text-blue-400 mr-2" />
                     1. Download Codebase
                   </h3>
                   <p className="text-sm text-neutral-400 mb-6 font-medium">Use the "Export" or "Settings &gt; Download Zip" button in AI Studio to save this project to your PC.</p>
                   
                   <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                     <Folder className="h-5 w-5 text-pink-400 mr-2" />
                     2. Add Icon
                   </h3>
                   <p className="text-sm text-neutral-400">
                     Extract the ZIP on your PC. Drag your <code className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-300 border border-neutral-700">icon.ico</code> file directly into the <strong>root folder</strong> (next to main.js and package.json).
                   </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Play className="h-5 w-5 text-violet-400 mr-2" />
                  3. Run via CMD or PowerShell
              </h3>
              
              <div className="space-y-4">
                  <div>
                      <p className="text-sm text-neutral-400 mb-2">Open your terminal in the extracted folder and run:</p>
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 overflow-x-auto relative group">
                          <code className="text-sm text-emerald-400 font-mono">npm install</code>
                      </div>
                  </div>

                  <div>
                      <p className="text-sm text-neutral-400 mb-2">Test the application without compiling:</p>
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 overflow-x-auto relative group">
                          <code className="text-sm text-emerald-400 font-mono">npm start</code>
                      </div>
                  </div>
              </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileDown className="h-5 w-5 text-emerald-500 mr-2" />
                  4. Compile to .exe
              </h3>
              <p className="text-sm text-neutral-400 mb-4">
                  Once tested, build a standalone windows executable installer. The output will appear inside the <code className="bg-neutral-800 px-1 py-0.5 rounded border border-neutral-700">dist-electron</code> folder.
              </p>
              <div className="bg-neutral-950 inline-block px-4 py-3 rounded-lg border border-neutral-800 text-left">
                  <code className="text-sm text-emerald-400 font-mono">npm run build:win</code>
              </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 border-t-blue-500/50 rounded-xl p-8 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Github className="w-64 h-64" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <Globe className="h-6 w-6 text-blue-400 mr-3" />
                  5. Open Source Launch (GitHub & SEO)
              </h3>
              <p className="text-neutral-400 mb-6 max-w-2xl">
                A gorgeous, fully-featured <strong>README.md</strong> and <strong>MIT LICENSE</strong> have automatically been generated in your codebase, mirroring the clean aesthetics of top open-source projects.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-950/50 border border-neutral-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-1">✅ Pre-Configured Badges</h4>
                  <p className="text-sm text-neutral-400">The README includes dynamic Shields.io badges for Windows, Electron, and your MIT License.</p>
                </div>
                <div className="bg-neutral-950/50 border border-neutral-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-1">✅ Pre-Configured SEO keywords</h4>
                  <p className="text-sm text-neutral-400">Your `package.json` now includes the exact search terms people use: "Gemini App for PC", "Windows", etc.</p>
                </div>
              </div>
            </div>
        </div>

      </motion.div>
    </div>
  );
}
