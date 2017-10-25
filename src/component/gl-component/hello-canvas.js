import {getWebGLContext, createShader, createProgram} from "./web-gL";


function initVertexBuffers(gl) {
  var vertexXYColor = new Float32Array([
    -0.5, 0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5, 0.0, 0.0, 1.0,
  ]);
  var n = 3;

  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object ');
    return -1;
  }
  // Определить тип буферного объекта
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Записать данные в буферный объект
   gl.bufferData(gl.ARRAY_BUFFER, vertexXYColor, gl.STATIC_DRAW);

  var FSIZE = vertexXYColor.BYTES_PER_ELEMENT;

  console.log(FSIZE)


  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*5, 0);
  gl.enableVertexAttribArray(a_Position);

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
  gl.enableVertexAttribArray(a_Color);

  return n;
}

export default class HelloCanvas{
  constructor(canvasEl){
    const gl = getWebGLContext(canvasEl, true);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    //Координаты и размер точки
    const VSHADER_SOURCE =`
      attribute vec4 a_Position;
      attribute vec4 a_Color;
      varying vec4 v_Color;
      
      void main() {\n 
      //gl_Position = vec4(0.0, 0.5, 0.0, 1.0);  // Координаты
      gl_Position = a_Position;  // Координаты
      gl_PointSize = 10.0; 
      v_Color = a_Color; // Передача данных во фрагментный шейдер
     }`;

    const FSHADER_SOURCE =`
     precision mediump float;
     uniform vec4 u_FragColor;
     varying vec4 v_Color;
     void main() { 
      //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Установить цвет
      //gl_FragColor = u_FragColor;  // Установить цвет
      gl_FragColor = v_Color;  // Установить цвет
      
     }`;


    const vShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);

    const program = createProgram(gl, vShader, fShader)

    gl.useProgram(program)
    gl.program = program;




    gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.drawArrays(gl.POINTS, 0, 1);


    const n = initVertexBuffers(gl)
    console.log(n)
    gl.drawArrays(gl.POINTS, 0, n);




    //console.log(gl.getAttribLocation(program, 'a_Position'))

  }
}
