import {getWebGLContext, createShader, createProgram} from "../../asset/web-gL";
import {autobind} from "core-decorators";



function createMatrixPosition(width, height) {
  let i = 0;
  const length = width*height;
  const positionList = [];

  while (i<length){
    const y = parseInt(i/width);
    const x = i - y*width;
    positionList.push(((x+0.5)/(width/2))-1);
    positionList.push((((y+0.5)/(height/2))-1));
    i++;
  }
  return new Float32Array(positionList)
}


function colored(gl, program) {


  const pixelsUint8 = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixelsUint8);
  const pixelsFloat32 = new Float32Array(pixelsUint8)
  //console.log(pixelsFloat32);
  const colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pixelsUint8, gl.DYNAMIC_DRAW)
  const a_Color =   gl.getAttribLocation(program, 'a_Color');
  gl.vertexAttribPointer(a_Color, 4, gl.UNSIGNED_BYTE, false, colorBuffer*4, 0);
  gl.enableVertexAttribArray(a_Color);

}

export class FadeCanvas {
  constructor(gl) {
    this.gl = gl;

    const FSIZE = 4;
    const VSHADER_SOURCE = `
        attribute vec4 a_Position;
        varying vec4 v_Color;
        varying float a_Index;
        
        varying float alpha;
        varying float r;
        varying float g;
        varying float b;
        attribute vec4 a_Color;
        
        void main(){
          a_Index;
          a_Color;
          gl_Position = a_Position;
          gl_PointSize = 1.0;
          alpha = a_Color.a - 20.0;
          if (alpha < 0.0) {
            alpha = 0.0;
          }
          r = a_Color.r - 1.0;
          if (r < 0.0) {
            r = 0.0;
          }
          g = a_Color.g - 1.0;
          if (g < 0.0) {
            g = 0.0;
          } 
          b = a_Color.b - 1.0;
          if (b < 0.0) {
            b = 0.0;
          }
          //v_Color = vec4(a_Color.r/255.0, a_Color.g/255.0, a_Color.b/255.0, alpha/255.0);
          v_Color = vec4(0.0, 0.5, 0.5, 1.0);
        }
      `;

    const FSHADER_SOURCE =`
      precision mediump float;
      varying vec4 v_Color;
      void main(){
        gl_FragColor = v_Color;
      }
  `;

    const vShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
    const program = createProgram(gl, vShader, fShader)

    //gl.useProgram(program)
   // return;

    this.program = program




    const positionFloat32 = this.positionFloat32 = createMatrixPosition(gl.drawingBufferWidth, gl.drawingBufferHeight)
    const positionPuffer = this.positionPuffer =  gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionPuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positionFloat32, gl.STATIC_DRAW);
    const a_Position = this.a_Position =  gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, positionPuffer.BYTES_PER_ELEMENT*2, 0);
    gl.enableVertexAttribArray(a_Position);


    //colored(gl, program)

    //gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.drawArrays(gl.POINTS, 0, gl.drawingBufferWidth * gl.drawingBufferHeight);
    let k = 0
    /*const interval = setInterval(()=>{
      colored(gl, program)
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, gl.drawingBufferWidth * gl.drawingBufferHeight);
      k++
      if(k > 400){
        clearInterval(interval)
        console.log('stop')
      }
    }, 20)*/
    // console.log(positionFloat32)
  }

  @autobind
  fade() {
    const gl = this.gl;
    const program = this.program;
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionPuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.positionFloat32, gl.STATIC_DRAW);
    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, this.positionPuffer.BYTES_PER_ELEMENT*2, 0);
    gl.enableVertexAttribArray(this.a_Position);

    colored(gl, program)
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, gl.drawingBufferWidth * gl.drawingBufferHeight);
  }

}


