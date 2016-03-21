/* global __dirname, process */

const app = require('app')
const BrowserWindow = require('browser-window')

require('crash-reporter').start()
// require('electron-debug')()

let host = 'http://localhost:9999'
let indexFile = `${host}/server/index.html`

let mainWindow

function onClosed() {
	mainWindow = null
}

function createMainWindow() {
	const window = new BrowserWindow({
		width: 600,
		height: 400
	})

	// window.toggleDevTools()

	window.loadUrl(indexFile)
	window.on('closed', onClosed)

	return window
}

app.on('windowdow-all-closed', () => {
	app.quit()
})

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow()
	}
})

app.on('ready', () => {
	mainWindow = createMainWindow()
})
