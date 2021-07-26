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

  write(text, position, font = '28px',  style = 'black') {
    this.ctx.fillStyle = style;
    this.ctx.font = font;
    this.ctx.fillText(text, ...position);
  }
}