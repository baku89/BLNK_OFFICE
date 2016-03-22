/* global io */

class Server {

	constructor() {}

	init() {
		this.socket = io.connect('10.0.1.141:8989')

		$('.connect__btn').on('click', this.connect.bind(this))

		// add socket event
		this.socket.on('color', this.changeColor.bind(this))
	}

	connect() {
		let name = $('.connect__name').val()
		this.socket.emit('add-user', name)
	}

	changeColor(color) {

		let b = Math.floor(color * 0xff)
		$('body').css('background', `rgb(${b}, ${b}, ${b}`)

	}

}

new Server().init()
