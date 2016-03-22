import EventEmitter from 'eventemitter3'

export default class Socket extends EventEmitter {

	constructor(_host) {
		super()

		this.host = _host

		this.connect 			= this.connect.bind(this)
		this.onConnect 		= this.onConnect.bind(this)
		this.onDisconnect = this.onDisconnect.bind(this)
		this.onMessage 		= this.onMessage.bind(this)
	}

	connect() {
		// console.log(`Trying to connect ${WS_HOST}`)
		this.ws = new WebSocket(this.host)
		this.ws.onopen 	= this.onConnect
		this.ws.onclose = this.onDisconnect
		this.ws.oneror 	= this.onDisconnect
	}

	onDisconnect() {
		this.emit('disconnect')
		setTimeout(this.connect, 2000)
	}

	onConnect() {
		this.ws.onmessage = this.onMessage
		this.emit('connect')
	}

	onMessage(e) {
		// type:value
		const data = e.data.split(':')
		this.emit('onmessage', data[0], data[1])
	}

	send(object) {
		this.ws.send(JSON.stringify(object))
	}





}
