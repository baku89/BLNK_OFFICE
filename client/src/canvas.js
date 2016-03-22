/* global createjs */

export default class Canvas {

	constructor() {

		this.canvas = $('.canvas')[0]
	}


	fill(color) {
		console.log(color)
		this.canvas.style.backgroundColor = color

	}



}
