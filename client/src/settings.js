/* global $ */

import EventEmitter from 'eventemitter3'
import 'sisyphus'

export default class Config extends EventEmitter {

	constructor() {
		super()

		this.$form = $('.settings')
		this.$status = $('.settings__status')
		this.$name = $('.settings__name')

		this.$form.sisyphus()

		$('.settings__update').on('click', () => {
			this.emit('update')
		})

		// $(window).on('keyup', (e) => {
		// 	const key = String.fromCharCode(e.keyCode)
		// 	if (key == 'H') {
		// 		this.$form.toggleClass('hidden')
		// 	}
		// })

		$('.canvas').on('click', () => {
			this.$form.toggleClass('hidden')
		})
	}

	get status() {
		return this.$status.html()
	}
	set status(_status) {
		this.$status.html(_status)
	}

	get name() {
		return this.$name.val()
	}


}
