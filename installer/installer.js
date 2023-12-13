const manifest = {
  "manifest_version": 2,
  "name": "Extension Installer",
  "permissions": ["accessibilityFeatures.modify", "storage", "accessibilityFeatures.read", "accessibilityPrivate", "activeTab", "activityLogPrivate", "autofillPrivate", "autotestPrivate", "background", "bookmarks", "brailleDisplayPrivate", "browsingData", "certificateProvider", "chromePrivate", "chromeosInfoPrivate", "clipboardRead", "clipboardWrite", "commandLinePrivate", "commands.accessibility", "contentSettings", "contextMenus", "cookies", "crashReportPrivate", "cryptotokenPrivate", "debugger", "declarativeContent", "desktopCapture", "desktopCapturePrivate", "developerPrivate", "documentScan", "downloads", "downloads.open", "downloads.shelf", "downloads.ui", "echoPrivate", "enterprise.deviceAttributes", "enterprise.hardwarePlatform", "enterprise.networkingAttributes", "enterprise.platformKeys", "enterprise.platformKeysPrivate", "enterprise.reportingPrivate", "experimental", "favicon", "fileBrowserHandler", "fontSettings", "gcm", "geolocation", "history", "identity", "identity.email", "identityPrivate", "idltest", "imageWriterPrivate", "input", "inputMethodPrivate", "languageSettingsPrivate", "lockWindowFullscreenPrivate", "login", "loginScreenStorage", "loginScreenUi", "loginState", "management", "mdns", "mediaPlayerPrivate", "mediaRouterPrivate", "notifications", "pageCapture", "passwordsPrivate", "platformKeys", "plugin", "printing", "printingMetrics", "privacy", "processes", "proxy", "resourcesPrivate", "rtcPrivate", "safeBrowsingPrivate", "scripting", "search", "sessions", "settingsPrivate", "sharedStoragePrivate", "sidePanel", "speechRecognitionPrivate", "systemPrivate", "tabCapture", "tabGroups", "tabs", "terminalPrivate", "topSites", "transientBackground", "tts", "ttsEngine", "usersPrivate", "wallpaper", "webAuthenticationProxy", "webNavigation", "webcamPrivate", "webrtcAudioPrivate", "webrtcDesktopCapturePrivate", "webrtcLoggingPrivate", "webrtcLoggingPrivate.audioDebug", "webstorePrivate", "wmDesksPrivate", "offscreen", "webRequest", "userScripts", "<all_urls>"],
  "version": "0.0.0"
}

function installId(id) {
  return new Promise((resolve, reject) => {
    chrome.webstorePrivate.beginInstallWithManifest3(
      {
        id: id,
        manifest: JSON.stringify(manifest)
      },
      () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError.message)
        chrome.webstorePrivate.completeInstall(id, resolve);
      }
    );
  })
}

let button = document.querySelector('button')
let input = document.querySelector('input')
let error = document.querySelector('.error')

button.addEventListener('click', () => {
  installId(input.value).then(() => {
    error.textContent = ""
  }).catch((err) => {
    error.textContent = err
  })
})

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    button.click()
  }
})
