class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.originY = y;
    this.radius = radius;
    this.ctx = ctx;
    this.color_decomposed = {};
    this.color = "rgb(255,255,255)";
    // this.factor = factor;
    this.angle = 0;
  }

  draw() {


    const luminance = this.getLuminance(this.color_decomposed);

    this.ctx.fillStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    //this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

      this.y += luminance *10
    


  }


  getLuminance(color){
    const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
    return luminance/255;
    }

}
