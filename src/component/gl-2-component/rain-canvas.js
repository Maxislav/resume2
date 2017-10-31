import {getWebGLContext, createShader, createProgram} from "../../asset/web-gL";
import {Matrix} from './matrix'

export default class RainCanvas {
  constructor(canvasEl) {
    const gl = getWebGLContext(canvasEl, {preserveDrawingBuffer: true});
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
    const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
     void main() {
      gl_Position = a_Position;
      gl_PointSize = 1.0;
      v_Color = a_Color; 
     }
    `;

    const FSHADER_SOURCE = `
     precision mediump float;
     varying vec4 v_Color;
     void main() {
      gl_FragColor = v_Color;
     }
    `;

    const vShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
    const program = createProgram(gl, vShader, fShader);
    gl.useProgram(program);

    let matrix = new Matrix(gl.drawingBufferWidth, gl.drawingBufferHeight)

    const positionPuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionPuffer);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 4*6, 0);
    gl.enableVertexAttribArray(a_Position);
    const a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 4*6, 4*2);
    gl.enableVertexAttribArray(a_Color);


    setInterval(()=>{
      gl.bufferData(gl.ARRAY_BUFFER, matrix.getMatrixPosition(), gl.STATIC_DRAW);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, gl.drawingBufferWidth * gl.drawingBufferHeight);
      matrix.fade()
    }, 25)







  }
}