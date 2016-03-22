/* global createjs */

export default class Canvas {

	constructor() {

		this.canvas = $('.canvas')[0]
		this.$desktop = $('.canvas-image')

		this.fill = this.fill.bind(this)

		this.setDesktop(-1)
	}

	fill(color) {
		this.canvas.style.backgroundColor = color
	}

	setDesktop(index) {
		for (let i = 0; i < 3; i++) {
			this.$desktop[i].style.opacity = (index == i) ? 1 : 0
		}
	}

	setDesktopSource(desktop) {
		let self = this
		this.$desktop.each(function() {
			let id = $(this).attr('id').replace('canvas-', '')
			$(this).attr('src', desktop[id])
		})
	}

}
