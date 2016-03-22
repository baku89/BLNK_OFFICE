/* global createjs */

export default class Canvas {

	constructor() {

		this.canvas = $('.canvas')[0]
		this.fill = this.fill.bind(this)
		this.$desktop = $('.canvas-image')

		this.setDesktop = this.setDesktop.bind(this)

		this.setDesktop(1)
	}

	fill(color) {
		this.canvas.style.backgroundColor = color
	}

	setDesktop(index) {

		for (let i = 0; i < 2; i++) {
			this.$desktop[i].style.opacity = (index-1 == i) ? 1 : 0
		}
	}

	updateName(name) {
		$('#canvas-wallpaper').attr('src', `./desktop/${name}_wallpaper.png`)
		$('#canvas-normal').attr('src', `./desktop/${name}_normal.png`)
	}

}
