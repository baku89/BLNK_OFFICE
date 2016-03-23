export default class Canvas {

	constructor() {

		this.$canvas = $('.canvas')[0]
		this.desktop = $('.canvas-desktop')[0]
		this.$desktop = $('.canvas-desktop')

		this.fill = this.fill.bind(this)
		this.opacity = this.opacity.bind(this)
		this.toggleDesktop = this.toggleDesktop.bind(this)

		window.desktop = this.desktop

		this.toggleDesktop(false)
	}

	fill(color) {
		this.$canvas.style.backgroundColor = color
	}

	opacity(alpha) {
		this.$desktop.css('opacity', parseFloat(alpha))
	}

	toggleDesktop(value) {
		let flag = value == 1
		this.desktop.style.visibility = flag ? 'visible' : 'hidden'
		this.$canvas.style.visibility = flag ? 'hidden' : 'visible'
	}

	updateName(name) {
		this.desktop.src = './desktop/desktop.png'
	}

}
