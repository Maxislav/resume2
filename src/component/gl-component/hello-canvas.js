import {getWebGLContext, createShader, createProgram} from "./web-gL-context";


function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
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
   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  // Сохранить ссылку на буферный объект в переменной a_Position
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // Разрешить присваивание переменной a_Position
  gl.enableVertexAttribArray(a_Position);
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
      attribute float a_PointSize;
      
      void main() {\n 
      //gl_Position = vec4(0.0, 0.5, 0.0, 1.0);  // Координаты
      gl_Position = a_Position;  // Координаты
      //gl_PointSize = 10.0; 
      gl_PointSize = a_PointSize; 
     }`;

    const FSHADER_SOURCE =`
     precision mediump float;
     uniform vec4 u_FragColor;
     void main() { 
      //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Установить цвет
      gl_FragColor = u_FragColor;  // Установить цвет
     }`;


    const vShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);

    const program = createProgram(gl, vShader, fShader)

    gl.useProgram(program)
    gl.program = program;
    gl.drawArrays(gl.POINTS, 0, 1);

    var a_Position = gl.getAttribLocation(program, 'a_Position');

    var a_PointSize = gl.getAttribLocation(program, 'a_PointSize')

    var  position = new Float32Array([0.5, 0.0, 0.0, 1.0]);
    var size = new Float32Array([5.0])

   // gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0); //устанавливает значение отдельных элементов
    gl.vertexAttrib4fv(a_Position, position);

    //gl.vertexAttrib1f(a_PointSize, 100.0);
    gl.vertexAttrib1fv(a_PointSize, size);


    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    var color = new Float32Array([0,1,1,1])
    //gl.uniform4f(u_FragColor,0,1,0,1)
    gl.uniform4fv(u_FragColor,color)

    gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.drawArrays(gl.POINTS, 0, 1);


    const n = initVertexBuffers(gl)
    gl.drawArrays(gl.POINTS, 0, n);


    //console.log(gl.getAttribLocation(program, 'a_Position'))

  }
}
