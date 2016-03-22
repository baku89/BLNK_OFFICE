/* global io */

// import OSC from '../../node-osc'
// import SocketIO from 'socket.io'

// let io = new SocketIO(8989)

// io.sockets.on('connection', (socket) => {

// 	console.log('connection')

// 	let addedUser = false

// 	socket.on('add-user', (name) => {
// 		if (addedUser) {
// 			return
// 		}

// 		console.log(`new user: ${name}`)

// 		addedUser = true

// 	})
// })

// console.log('start listen...')


// let oscServer = new OSC.Server(4444, '0.0.0.0')
// oscServer.on('message', (msg) => {

// 	let name = msg[0]
// 	let value = msg[1]

// 	console.log(name, value)

// 	io.emit('color', value)

// })
