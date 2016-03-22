/* global $ */

import EventEmitter from 'eventemitter3'
import 'sisyphus'


export default class Settings extends EventEmitter {

	constructor() {
		super()

		this.$form = $('.settings')
		this.$status = $('.settings__status')
		this.$name = $('.settings__name')

		// load from localStorage
		this.$form.sisyphus()

		// event
		$('.settings__update').on('click', () => {
			this.emit('update')
		})
		$('.viewer').on('click', () => {
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
