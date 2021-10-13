import { ScaleLinear, ScaleTime } from "d3-scale";
import { CurveFactory, curveLinear, curveStepBefore } from "d3-shape";

import { Texture } from "../../../renderer";
import { UpdatableObject } from "../../../renderer/core/updatable-object";
import { Container } from "../../../renderer/display";
import { Graphics } from "../../../renderer/graphics";
import { Rectangle } from "../../../renderer/math";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

function createGradTexture() {
  // adjust it if somehow you need better quality for very very big images
  const quality = 100;
  //const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = quality;

  const ctx = canvas.getContext("2d");

  // use canvas2d API to create gradient
  const grd = ctx!.createLinearGradient(0, 0, 0, quality);
  grd.addColorStop(0, "#044e80");
  grd.addColorStop(1, "#000000");

  ctx!.fillStyle = grd;
  ctx!.fillRect(0, 0, 1, quality);

  return Texture.from(canvas);
}

const gradTexture = createGradTexture();

gradTexture.orig = new Rectangle(0, 0, 1, 100);
gradTexture._frame = new Rectangle(0, 0, 1, 100);

/**
 * Draws two area curves
 */
export class LineCurve extends Container implements UpdatableObject {
  public points: [number, number][] = [];

  private line: Graphics = new Graphics();

  private stroke: number;
  private curve: CurveFactory;

  constructor(stroke: number = 0, curve: CurveFactory = curveLinear) {
    super();

    this.stroke = stroke;
    this.curve = curve;

    this.line.lineStyle({ width: 1, color: stroke, alpha: 1 });

    this.addChild(this.line);
  }

  public update(
    timeScale: ScaleTime<number, number>,
    priceScale: ScaleLinear<number, number>,
    width: number,
    height: number,
    resolution: number = 1
  ): void {
    const points: [number, number][] = this.points.map((d) => [
      timeScale(d[0]),
      priceScale(d[1]),
    ]);

    this.line.clear();
    this.line.lineStyle({ width: 1, color: this.stroke });
    this.line.drawLine(points, this.curve);
  }
}