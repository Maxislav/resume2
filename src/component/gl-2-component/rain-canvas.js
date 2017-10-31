import {Drip, DripColor} from './drip';


import {getWebGLContext, createShader, createProgram} from "../../asset/web-gL";
import FadeCanvas from './fade-canvas'


export default class RainCanvas {
  constructor(canvasEl) {

    const gl = getWebGLContext(canvasEl, {preserveDrawingBuffer: true});
    const drip = new Drip(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const dripList = ((i) => {
      const list = [];
      while ( 0 < i) {
        list.push(new Drip(gl.drawingBufferWidth, gl.drawingBufferHeight))
        i--
      }
      return list
    })(40);

    const dripColorList = ((i) => {
      const list = [];
      while ( 0 < i) {
        list.push(new DripColor(i))
        i--
      }
      return list
    })(40);


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
      gl_PointSize = 4.0;
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

    gl.useProgram(program)
    gl.lineWidth(2);


    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let a_Position = gl.getAttribLocation(program, 'a_Position');
    const vertexXY = new Float32Array(Array.prototype.concat(...dripList));


    gl.bufferData(gl.ARRAY_BUFFER, vertexXY, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 4 * 2, 0);

    gl.enableVertexAttribArray(a_Position);


    const vertexColor = new Float32Array(Array.prototype.concat(...dripColorList));
    const vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    let a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.bufferData(gl.ARRAY_BUFFER, vertexColor, gl.DYNAMIC_DRAW)
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 4 * 4, 0);
    gl.enableVertexAttribArray(a_Color);

    setInterval(() => {
      const vertexXY = new Float32Array(Array.prototype.concat(...dripList));
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexColor, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(a_Color);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexXY, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(a_Position);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.LINES, 0, 80);
      dripList.forEach(drip=>{
        drip.slip(4)
      });
    }, 25);
  }
}