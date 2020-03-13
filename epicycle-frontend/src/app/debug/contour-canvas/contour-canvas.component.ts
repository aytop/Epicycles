import { Component, OnInit, ViewChild, ElementRef, Input, NgZone, OnChanges } from '@angular/core';
import { Point } from 'src/app/point.model';

@Component({
  selector: 'app-contour-canvas',
  templateUrl: './contour-canvas.component.html',
  styleUrls: ['./contour-canvas.component.css'],
})
export class ContourCanvasComponent implements OnChanges {
  @ViewChild('contourCanvas', { static: true }) canvasRef: ElementRef;

  @Input() points: Point[];

  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  constructor() {}

  ngOnChanges() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.width = this.canvasRef.nativeElement.width;
    this.height = this.canvasRef.nativeElement.height;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const xOffset = this.width / 2;
    const yOffset = this.height / 2;
    this.ctx.beginPath();
    if (this.points.length) {
      this.ctx.moveTo(this.points[0].x + xOffset, this.points[0].y + yOffset);
      for (const point of this.points) {
        this.ctx.lineTo(point.x + xOffset, point.y + yOffset);
      }
      this.ctx.lineTo(this.points[0].x + xOffset, this.points[0].y + yOffset);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
