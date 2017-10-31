import {autobind} from "core-decorators";

/**
 * @param {number} min
 * @param {number}max
 * @param {boolean} [int=false]
 * @returns {number}
 */
const getRandom =  function(min, max, int=false) {
  let rand = min + Math.random() * (max - min);
  if(int){
    rand = Math.round(rand)
  }
  return rand;
};


export class DripColor extends Array {
  constructor(i){
    super();

    this.push(0.0);
    this.push(1.0);
    this.push(0.0);
    this.push(1.0)

    this.push(0.0);
    this.push(1.0);
    this.push(0.0);
    this.push(0.0)

  }
}

export class Drip extends Array{
  /**
   *
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height){
    super();

    this.width = width;
    this.height = height;

    this.scaleY = 2/height;

    this.tailLength = 2;

    /**
     *
     * @type {number}
     */
    const x1 = getRandom(-1, 1);
    /**
     *
     * @type {number}
     */
    const y1 =  getRandom(1, 2*this.tailLength);


    this.push(x1);
    this.push(y1);
    this.push(x1);
    this.push(y1+this.tailLength);


   /* this.push(1.0);
    this.push(0.0);
    this.push(0.0);
    this.push(1.0);

    this.push(1.0);
    this.push(0.0);
    this.push(0.0);
    this.push(0.0);*/




  }

  /**
   * @param {number} [dy=1]
   */
  @autobind
  slip(dy=1) {
    this[1] = this[1]-(dy*this.scaleY);
    this[3] = this[1]+2

    if(this[1] < -1 - this.tailLength){
      this[1] =  this[1]  = getRandom(1,2)
      this[0] = this[2] = getRandom(-1, 1)
    }
    this[3] = this[1]+this.tailLength;
    return this
  }

}