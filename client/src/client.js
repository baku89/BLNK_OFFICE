import Settings from './settings.js'
import Socket from './socket.js'
import Canvas from './canvas.js'

const WS_HOST = 'ws://10.0.1.142:8989'

class Client {

	constructor() {

		this.settings = new Settings()
		this.settings.on('update', this.updateUser.bind(this))

		this.canvas = new Canvas()

		this.socket = new Socket(WS_HOST)
		this.socket.on('connect', this.onConnect.bind(this))
		this.socket.on('disconnect', this.onDisconnect.bind(this))
		this.socket.on('onmessage', this.onMessage.bind(this))
		this.socket.connect()

		this.msgFunc = {
			color: this.canvas.fill,
			desktop: this.canvas.toggleDesktop,
			opacity: this.canvas.opacity
		}
	}

	onConnect() {
		this.settings.status = 'connected'
		if (this.settings.name != '') {
			this.updateUser()
		}
	}

	onDisconnect() {
		this.settings.status = 'disconnected'
		this.canvas.toggleDesktop(false)
		this.canvas.fill('black')
	}

	onMessage(type, value) {
		this.msgFunc[type](value)
	}

	updateUser() {
		this.canvas.updateName(this.settings.name)
		this.socket.send({
			'type': 'update-user',
			'name': this.settings.name,
			'x': this.settings.x,
			'y': this.settings.y
		})
	}
}


if (window.File && window.FileReader && window.FileList && window.Blob) {
	new Client()
} else {
	alert('The File APIs are not fully supported in this browser.')
}
