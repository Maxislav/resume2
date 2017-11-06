import {getWebGLContext, createShader, createProgram} from "../../asset/web-gL";
import {Matrix} from './matrix'
import {Drip} from "./drip";
import {FadeCanvas} from "./fade-canvas";

export default class RainCanvas {
  constructor(canvasEl) {

    const gl = getWebGLContext(canvasEl, {preserveDrawingBuffer: false});

    gl.clearColor(0.0,0.0,0.0,0.0);
    //gl.colorMask(false, false, false, true);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendEquation( gl.FUNC_ADD );
   gl.blendFunc(gl.ONE, gl.ONE);
  //  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const VSHADER_SOURCE =`
      attribute vec4 a_Position;
      attribute vec4 a_Color;
      varying vec4 v_Color;
      
       void main() {
          gl_Position = a_Position; 
          gl_PointSize = 2.0;
          v_Color = a_Color;
          
       }
    `
    const FSHADER_SOURCE =`
     precision mediump float;
     varying vec4 v_Color;
     void main() { 
      //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Установить цвет
      gl_FragColor = v_Color;  // Установить цвет
     }`;

    const vShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
    const program = createProgram(gl, vShader, fShader);


    const dripList = ((i) => {
      const list = []
      while (list.length<i){
        list.push(new Drip(gl).useProgram(program))
      }
      return list
    })(1000);

    gl.useProgram(program);
   /* dripList.forEach((drip, i) => {
      const count = drip.slip(0.3+(i*0.01));
      gl.drawArrays(gl.POINTS, 0, count);
    });*/
    const fadeCanvas = new FadeCanvas(gl)

    //gl.clear(gl.COLOR_BUFFER_BIT);
    function action() {
      //fadeCanvas.fade()

      gl.clear(gl.COLOR_BUFFER_BIT);
      dripList.forEach((drip, i) => {
        const count = drip.slip(0.3+(i*0.01));
        gl.drawArrays(gl.POINTS, 0, count);
      });

      requestAnimationFrame(action)
    }
    action()



  }
}