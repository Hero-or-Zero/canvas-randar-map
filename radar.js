var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var data = [['Vue', 77],
['React', 72],
['Angular', 66],
['Android', 88],
['ios', 80],
['webpack', 60]];

var count = data.length; // 边数6
var centerWidth = canvas.width / 2; // 中心点横坐标
var centerHeight = canvas.height / 2; // 中心点纵坐标
var center = centerWidth = centerHeight;
var space = 20; // 第一个六边形所在外接圆的半径以及每个六边形外接圆之间的距离
var angle = Math.PI * 2 / count;

drawArea(ctx); // 画六边形
drawConnect(ctx); // 连线
drawData(ctx); // 画数据区域
drawText(ctx); // 画每个角上的文字

function drawArea(ctx) {
	ctx.save();
	ctx.strokeStyle = '#B8B8B8';
	// 画几个圈
	for (let i = 0; i < count; i++) {
		ctx.beginPath();
		let cellSpace = space * (i + 1);
		// 画一个圈
		for (let j = 0; j < count; j++) {
			let x = center + cellSpace * Math.cos(angle * j);
			let y = center + cellSpace * Math.sin(angle * j)
			ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.stroke();
	}
	ctx.restore();
}

function drawConnect(ctx) {
	ctx.save();
	ctx.strokeStyle = '#B8B8B8';
	for (let i = 0; i < count; i++) {
		ctx.beginPath();
		ctx.lineTo(center, center);
		let x = center + space * count * Math.cos(angle * i);
		let y = center + space * count * Math.sin(angle * i);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();
	}
	ctx.restore();
}

function drawData(ctx) {
	ctx.save();
	ctx.beginPath();
	for (let i = 0; i < count; i++) {
		let x = center + space * count * Math.cos(angle * i) * (data[i][1] / 100);
		let y = center + space * count * Math.sin(angle * i) * (data[i][1] / 100);
		ctx.lineTo(x, y);
	}
	ctx.closePath();
	ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
	ctx.fill();
	ctx.restore();
}

function drawText(ctx) {
	ctx.save();
	ctx.fillStyle = 'black';
	for (let i = 0; i < count; i++) {
		let x = center + space * count * Math.cos(angle * i);
		let y = center + space * count * Math.sin(angle * i);
		console.log(angle * i);
		console.log(data[i][0]);
		let angleTmp = angle * i;

		if (angleTmp == 0) {
			ctx.fillText(data[i][0], x + 8, y + 5);
		} else if (angleTmp > 0 && angleTmp <= Math.PI / 2) {
			ctx.fillText(data[i][0], x, y + 17);
		} else if (angleTmp > Math.PI / 2 && angleTmp < Math.PI) {
			ctx.fillText(data[i][0], x - 24, y + 17);
		} else if (angleTmp == Math.PI) {
			ctx.fillText(data[i][0], x - 52, y + 5);
		} else if (angleTmp > Math.PI && angleTmp < Math.PI * 3 / 2) {
			ctx.fillText(data[i][0], x - 20, y - 7);
		} else {
			ctx.fillText(data[i][0], x, y - 7);
		}
	}
	ctx.restore();
}