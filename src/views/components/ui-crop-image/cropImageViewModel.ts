export default class CropImageViewModel {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  aspectRatio: number;
  left: number = 0;
  top: number = 0;

  width: number = 100;
  height: number = 100;

  resize(dx: number, dy: number, control: number) {
    // logic
    // //console.log(`this.top`, this.top);
    // //console.log(`dy`, dy);

    // if (this.top <= 0 && dy < 0) {
    //   this.top = 0;
    //   dy = 0;
    // }

    // switch (ControlType[control]) {
    //   case "Top": {
    //     dx = 0;
    //     this.top += dy;
    //     this.height -= dy;
    //     dx = dy * this.aspectRatio;
    //     this.width += -dx;
    //     dy = 0;

    //     break;
    //   }
    //   case "Bottom": {
    //     dx = 0;
    //     break;
    //   }
    //   case "Left": {
    //     dx = 0;
    //     dy = 0;
    //     break;
    //   }
    //   case "RightBottom": {
    //     // dy = dx * this.aspectRatio;
    //     break;
    //   }
    //   case "Right": {
    //     dy = dx * this.aspectRatio;
    //     break;
    //   }
    //   case "RightTop":
    //     {
    //       dx = 0;
    //       this.top += dy;
    //       this.height -= dy;
    //       dx = dy * this.aspectRatio;
    //       this.width += -dx;
    //       dy = 0;

    //       break;
    //     }
    //     break;
    // }
    // //console.log(`this.height`, this.height);
    // //console.log(`this.maxHeight, minHeight`, this.maxHeight, this.minHeight);
    // //console.log(`this.top`, this.top);
    // //console.log(`dy`, dy);
    if (this.aspectRatio == 1 && this.aspectRatio != (this.width + dx) / (this.height + dy)) {
      dx = dy;
      // //console.log(`3`);
    }
    if (this.width + dx > this.maxWidth - this.left || this.width + dx < this.minWidth) {
      // dx = 0;
      return;
      // //console.log(`1`);
    }
    if (this.height + dy > this.maxHeight) {
      return;
      dy = 0;
      // this.height = this.minHeight;
      // //console.log(`2`);
    }

    // if (this.aspectRatio != (this.width + dx) / (this.height + dy)) {
    //   dx = dy * this.aspectRatio;
    // }
    //console.log(`this.height this.maxHeight this.minHeight`, this.height, this.maxHeight, this.minHeight);
    this.width += dx;
    this.height += dy;
  }
  move(dx: number, dy: number) {
    if (this.left + dx < 0 || this.left + dx > this.maxWidth - this.width) {
      dx = 0;
    }

    if (this.top + dy < 0 || this.top + dy > this.maxHeight - this.height) {
      dy = 0;
    }
    this.left += dx;
    this.top += dy;
  }
}
export enum ControlType {
  LeftTop,
  Top, //
  RightTop,
  Right, //
  RightBottom,
  Bottom, //
  LeftBottom,
  Left, //
}
