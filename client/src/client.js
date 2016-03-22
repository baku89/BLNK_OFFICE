import Settings from './settings.js'
import Socket from './socket.js'
import Canvas from './canvas.js'

const WS_HOST = 'ws://10.0.1.141:8989'

class Client {

	constructor() {

		this.settings = new Settings()
		this.settings.on('update', this.addUser.bind(this))

		this.canvas = new Canvas()
		this.canvas.setDesktopSource(this.settings.desktop)


		this.socket = new Socket(WS_HOST)
		this.socket.on('connect', this.onConnect.bind(this))
		this.socket.on('disconnect', this.onDisconnect.bind(this))
		this.socket.on('onmessage', this.onMessage.bind(this))
		this.socket.connect()

		this.msgFunc = {
			color: this.canvas.fill,
			desktop: this.canvas.setDesktop
		}
	}

	onConnect() {
		this.settings.status = 'connected'
		if (this.settings.name != '') {
			this.addUser()
		}
	}

	onDisconnect() {
		this.settings.status = 'non-connected'
		this.canvas.fill('black')
	}

	onMessage(type, value) {
		this.msgFunc[type](value)
	}

	addUser() {
		this.socket.send({
			'type': 'add-user',
			'name': this.settings.name
		})
	}
}


if (window.File && window.FileReader && window.FileList && window.Blob) {
	new Client()
} else {
	alert('The File APIs are not fully supported in this browser.')
}
