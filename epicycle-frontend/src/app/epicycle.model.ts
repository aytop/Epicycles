export class Epicycle {
  constructor(public radius: number, public phase: number, public angularVelocity: number) {}

  public draw(ctx: CanvasRenderingContext2D, widthOffset: number, heightOffset: number, scaleFactor: number) {
    const radius = this.radius * scaleFactor;
    ctx.beginPath();
    ctx.arc(widthOffset, heightOffset, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(widthOffset, heightOffset);
    ctx.lineTo(this.phasePoint(scaleFactor).x + widthOffset, this.phasePoint(scaleFactor).y + heightOffset);
    ctx.stroke();
    ctx.closePath();
  }
  public phasePoint(scaleFactor) {
    return {
      x: this.radius * Math.cos(this.phase) * scaleFactor,
      y: this.radius * Math.sin(this.phase) * scaleFactor,
    };
  }
  public update(baseAngularVelocity) {
    this.phase += this.angularVelocity * baseAngularVelocity;
  }
}
