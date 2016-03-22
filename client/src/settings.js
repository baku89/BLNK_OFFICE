/* global $ */

import EventEmitter from 'eventemitter3'
import 'sisyphus'


export default class Settings extends EventEmitter {

	constructor() {
		super()

		this.$form = $('.settings')
		this.$status = $('.settings__status')
		this.$name = $('.settings__name')
		this.$inputFile = $('.input-file')
		this.$inputImage = $('.input-image')

		this.desktop = {}

		// load from localStorage
		{
			this.$form.sisyphus()

			let self = this
			this.$inputImage.each(function () {
				let id = $(this).attr('id').replace('desktop-', '')
				let dataUrl = localStorage.getItem(id)
				self.setImage(id, dataUrl)
			})
		}

		// event
		$('.input-file').on('change', this.saveImage.bind(this))
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

	saveImage(e) {
		let file = e.target.files[0]
		let $target = $(e.target)
		let $img = $target.next()
		window.t = $target

		let reader = new FileReader()

		reader.onload = (e) => {
			let dataUrl = e.target.result
			let id = $img.attr('id').replace('desktop-', '')

			this.setImage(id, dataUrl)
		}

		reader.readAsDataURL(file)
	}

	setImage(id, dataUrl) {
		dataUrl = dataUrl != 'null' ? dataUrl : undefined
		this.desktop[id] = dataUrl
		if (dataUrl) {
			$(`#desktop-${id}`).attr('src', dataUrl)
			localStorage.setItem(id, dataUrl)
		}
	}
}
