/* global $ */

import EventEmitter from 'eventemitter3'
import 'sisyphus'


export default class Settings extends EventEmitter {

	constructor() {
		super()

		this.$form = $('.settings')
		this.$status = $('.settings__status')
		this.$name = $('#name')
		this.$x = $('#x')
		this.$y = $('#y')
		this.$coord = $('.settings__coord')
		this.$point = $('.settings__coord-point')

		// load from localStorage
		this.sisyphus = this.$form.sisyphus()
		this.updateCoord(this.$x.val(), this.$y.val())

		// event
		$('.settings__update').on('click', () => {
			this.emit('update')
		})
		$('.settings__close').on('click', () => {
			this.$form.toggleClass('hidden')
		})
		$('.viewer').on('click', () => {
			this.$form.toggleClass('hidden')
		})

		this.$coord.on({
			'mousedown': (e) => {
				this.updateCoord(
					e.offsetX / this.$coord.outerWidth(),
					e.offsetY / this.$coord.outerHeight()
				)
			}
		})

		this.$x.on('change', () => {
			this.updateCoord(this.$x.val(), this.$y.val())
		})

		this.$y.on('change', (e) => {
			this.updateCoord(this.$x.val(), this.$y.val())
		})
	}

	updateCoord(x, y) {
		this.$x.val(x)
		this.$y.val(y)
		this.$point.css({
			left: `${x * 100}%`,
			top: `${y * 100}%`
		})
		this.sisyphus.saveAllData()
	}


	// properties

	get status() {
		return this.$status.val()
	}
	set status(_status) {
		this.$status.val(_status)
	}

	get name() {
		return this.$name.val()
	}

	get x() {
		return this.$x.val()
	}

	get y() {
		return this.$y.val()
	}
}
