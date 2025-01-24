let cvs = document.getElementsByTagName("canvas")[0];
let ctx = cvs.getContext("2d");
let btn = document.getElementsByTagName("button")[0];
let inputs = document.getElementsByTagName("input");
let triangle;

function resize() {
	cvs.height = window.innerHeight;
	cvs.width = window.innerWidth;
}
resize();

window.addEventListener("resize", resize);

class Triangle {
	constructor(length, interval) {
		this.length = length;
		this.interval = interval;
		this.draw();
	}

	draw() {
		let halfHeight = (this.length * Math.sin(Math.PI / 3)) / 2;
		this.verticies = {
			A: [window.innerWidth / 2 - this.length / 2, window.innerHeight / 2 + halfHeight],
			B: [window.innerWidth / 2 + this.length / 2, window.innerHeight / 2 + halfHeight],
			C: [window.innerWidth / 2, window.innerHeight / 2 - halfHeight],
		};

		ctx.translate(this.verticies.A[0], this.verticies.A[1]);
		ctx.fillRect(0, 0, this.length, 1);
		ctx.rotate(-Math.PI / 3);
		ctx.fillRect(0, 0, this.length, 1);
		ctx.rotate(Math.PI / 3);
		ctx.translate(this.length, 1);
		ctx.rotate(-(Math.PI * 2) / 3);
		ctx.fillRect(0, 0, this.length, 1);
		ctx.rotate((Math.PI * 2) / 3);
		ctx.translate(-this.verticies.A[0] - this.length, -this.verticies.A[1] - 1);

		ctx.fillStyle = "red";
		ctx.fillRect(this.verticies.A[0], this.verticies.A[1], 2, 2);
		ctx.fillRect(this.verticies.B[0], this.verticies.B[1], 2, 2);
		ctx.fillRect(this.verticies.C[0], this.verticies.C[1], 2, 2);
	}

	putPoint(x, y) {
		let verticies = ["A", "B", "C"];
		this.point = [x, y];
		ctx.fillRect(this.point[0], this.point[1], 2, 2);
		for (let i = 0; i <= this.interval; i++) {
			console.log("running");

			this.midPoint(this.point, verticies[Math.floor(Math.random() * verticies.length)]);
		}
	}

	midPoint(point, vertex) {
		let midpoint = [(point[0] + this.verticies[vertex][0]) / 2, (point[1] + this.verticies[vertex][1]) / 2];
		ctx.fillRect(midpoint[0], midpoint[1], 2, 2);
		this.point = midpoint;
	}
}

btn.addEventListener("click", () => {
	triangle = new Triangle(inputs[0].value, inputs[1].value);
});

cvs.addEventListener("click", (eve) => {
	let [x, y] = [eve.x, eve.y];
	triangle ? triangle.putPoint(x, y) : false;
});
