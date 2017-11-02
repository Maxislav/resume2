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
    this.push(1.0);
    this.push(0.0);
    this.push(1.0);
    this.push(0.0);
    this.push(0.0)

  }
}

export class Drip extends Array{
  /**
   *
   * @param {WebGLRenderingContext} gl
   */
  constructor(gl) {
    super();
    this.gl = gl;
    this.width = gl.drawingBufferWidth;
    this.height = gl.drawingBufferHeight;
    this.scaleX = 2/this.width;
    this.scaleY = 2/this.height ;
    this.x = getRandom(0, this.width, true);
    this.y = getRandom(0, this.height , true);
    this[0] = (this.x*this.scaleX) - 1;
    this[1] = (this.y*this.scaleY) - 1;
    this.vertexPositionBuffer = null;
    this.vertexColorBuffer = null;
    this.a_Position = null;
    this.a_Color = null;

    this[2] = 0;
    this[3] = 1;
    this[4] = 0;
    this[5] = 1;
    this.tail = [];
  }

  slip(dy = 1) {

    const previous = ((i) => {
      const arr = []
      while (arr.length<i){
        arr.push(this[arr.length])
      }
      return arr
    })(this.length);
    this.tail.unshift(previous);
    let lastIndex = -1;
    this.tail.forEach((drip, i) => {
      drip[5] = drip[5]/1.04;
      if(drip[5]<0.001){
        drip[5] = 0;
        if(lastIndex<0){
          lastIndex = i
        }
      }
    });

    if(-1<lastIndex){
      this.tail.length  = lastIndex
    }



    this.y = this.y - dy;
    if (this.y < 0){
      this.y = this.height;
      this.x = getRandom(0, this.width, true);
      this[0] = (this.x*this.scaleX) - 1;
    }
    this[1] = (this.y*this.scaleY) - 1;
    return this.useBuffer()
  }

  useProgram(program) {
    this.program = program;
    return this
  }

  /**
   *
   * @param program
   * @param name
   */
  useBuffer() {
    const program = this.program;
    const gl = this.gl;
    if(!this.vertexPositionBuffer){
      this.vertexPositionBuffer = gl.createBuffer();

    }

    if( !this.vertexColorBuffer) {
      this.vertexColorBuffer = gl.createBuffer();
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.concat(...this.tail)), gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.concat(...this.tail)), gl.DYNAMIC_DRAW);


    if(!this.a_Position){
      this.a_Position = gl.getAttribLocation(program, 'a_Position');
      gl.enableVertexAttribArray(this.a_Position);
    }

    if(!this.a_Color){
      this.a_Color = gl.getAttribLocation(program, 'a_Color');
      gl.enableVertexAttribArray(this.a_Color);
    }
    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, 4*6, 0);
    gl.vertexAttribPointer(this.a_Color, 4, gl.FLOAT, false, 4*6, 2*4);
    return this.tail.length
  }

}