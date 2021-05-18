import { Container } from "../display";
import { CanvasRenderer } from "../renderer";

export interface ApplicationOptions {
  view: HTMLCanvasElement;
  antialias?: boolean;
  resolution?: number;
}

export class Application {
  /**
   * The root display container that's rendered.
   */
  public stage: Container = new Container();

  /**
   * Canvas renderer.
   */
  public renderer: CanvasRenderer;

  constructor(options: ApplicationOptions) {
    this.renderer = new CanvasRenderer(options);
  }

  /**
   * Render the current stage.
   */
  public render(): void {
    this.renderer.render(this.stage);
  }

  /**
   * Reference to the renderer's canvas element.
   */
  get view(): HTMLCanvasElement {
    return this.renderer.view;
  }
}
