import Settings from './settings.js'
import Socket from './socket.js'
import Canvas from './canvas.js'

const WS_HOST = 'ws://10.0.1.141:8989'

class Client {

	constructor() {

		this.canvas = new Canvas()

		this.settings = new Settings()
		this.settings.on('update', this.addUser.bind(this))

		this.socket = new Socket(WS_HOST)
		this.socket.on('connect', this.onConnect.bind(this))
		this.socket.on('disconnect', this.onDisconnect.bind(this))
		this.socket.on('onmessage', this.onMessage.bind(this))
		this.socket.connect()


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

	onMessage(msg) {
		this.canvas.fill(msg)
	}

	addUser() {
		// console.log('updateName', this.settings.name)
		this.socket.send({
			'type': 'add-user',
			'name': this.settings.name
		})
	}
}

new Client()
