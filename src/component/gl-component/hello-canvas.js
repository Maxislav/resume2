import {getWebGLContext, createShader, createProgram} from "./web-gL-context";


export default class HelloCanvas{
  constructor(canvasEl){
    const gl = getWebGLContext(canvasEl, true);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    //Координаты и размер точки
    const VSHADER_SOURCE =
       'void main() {\n' +
      'gl_Position = vec4(0.0, 0.5, 0.0, 1.0);' + // Координаты
     ' gl_PointSize = 10.0;' +
     '}';

    const FSHADER_SOURCE =
       'void main() {' +
     ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' + // Установить цвет
     '}';


    const vShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);

    const program = createProgram(gl, vShader, fShader)
    gl.useProgram(program)
    gl.drawArrays(gl.POINTS, 0, 1);

  }
}
