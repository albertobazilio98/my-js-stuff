class Canvas2d {
  constructor(canvas) {
    this.element = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
  }

  fill(position, size, style) {
    this.ctx.fillStyle = style;
    this.ctx.fillRect(...position, ...size);
  }

  stoke(position, size, style) {
    this.ctx.strokeStyle = style;
    this.ctx.strokeRect(...position, ...size);
  }

  write(text, position, style = 'black', font = "bold 12px 'Noto Sans TC'") {
    this.ctx.fillStyle = style;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = font;
    this.ctx.fillText(text, ...position);
  }

  placeImage(image, position, size) {
    this.ctx.drawImage(image, ...position, ...size);
  }
}