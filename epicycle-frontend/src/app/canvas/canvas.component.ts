import { Component, OnInit, NgZone, ElementRef, ViewChild, Input, Injectable, OnChanges } from '@angular/core';
import { Epicycle } from '../epicycle.model';
import { Point } from '../point.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnChanges {
  @ViewChild('myCanvas', { static: true }) canvasRef: ElementRef;

  @Input() epicycles: Epicycle[];
  @Input() scaleFactor: number;
  @Input() baseAngularVelocity: number;

  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private trace: Point[] = [];
  constructor(private ngZone: NgZone) {}

  ngOnChanges() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.width = this.canvasRef.nativeElement.width;
    this.height = this.canvasRef.nativeElement.height;
    this.trace = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ngZone.runOutsideAngular(() => this.draw());
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    let xOffset = this.width / 2;
    let yOffset = this.height / 2;
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;
    for (const circle of this.epicycles) {
      circle.draw(this.ctx, xOffset, yOffset, this.scaleFactor);
      circle.update(this.baseAngularVelocity);
      xOffset += circle.phasePoint(this.scaleFactor).x;
      yOffset += circle.phasePoint(this.scaleFactor).y;
    }
    this.trace.push({ x: xOffset, y: yOffset });
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(this.trace[0].x, this.trace[0].y);
    for (const point of this.trace) {
      this.ctx.lineTo(point.x, point.y);
    }
    this.ctx.stroke();
    this.ctx.closePath();
    requestAnimationFrame(() => this.draw());
  }
}
