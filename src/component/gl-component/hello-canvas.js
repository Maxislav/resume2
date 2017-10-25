import {getWebGLContext, createShader, createProgram} from "./web-gL-context";


export default class HelloCanvas{
  constructor(canvasEl){
    const gl = getWebGLContext(canvasEl, true);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    //Координаты и размер точки
    const VSHADER_SOURCE =`
      attribute vec4 a_Position;
      attribute float a_PointSize;
      
      void main() {\n 
      //gl_Position = vec4(0.0, 0.5, 0.0, 1.0);  // Координаты
      gl_Position = a_Position;  // Координаты
      //gl_PointSize = 10.0; 
      gl_PointSize = a_PointSize; 
     }`;

    const FSHADER_SOURCE =
     `void main() { 
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Установить цвет
     }`;


    const vShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);

    const program = createProgram(gl, vShader, fShader)
    gl.useProgram(program)
    gl.drawArrays(gl.POINTS, 0, 1);

    var a_Position = gl.getAttribLocation(program, 'a_Position');

    var a_PointSize = gl.getAttribLocation(program, 'a_PointSize')

    var  position = new Float32Array([0.5, 0.0, 0.0, 1.0]);
    var size = new Float32Array([100.0])

   // gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0); //устанавливает значение отдельных элементов
    gl.vertexAttrib4fv(a_Position, position);

    //gl.vertexAttrib1f(a_PointSize, 100.0);
    gl.vertexAttrib1fv(a_PointSize, size);



    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

    //console.log(gl.getAttribLocation(program, 'a_Position'))

  }
}
