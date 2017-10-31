import {getWebGLContext, createShader, createProgram} from "../../asset/web-gL";

import fadeCanvas from './fade-canvas'


export default class HelloCanvas{
  constructor(canvasEl){
    const gl = getWebGLContext(canvasEl, {preserveDrawingBuffer: true});
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);


    //Координаты и размер точки
    const VSHADER_SOURCE =`
      attribute vec4 a_Position;
      attribute vec4 a_Color;
      attribute vec3 coordinates;
      attribute float a_Size;
      varying vec4 v_Color;
      
      void main() {\n 
      //gl_Position = vec4(0.0, 0.5, 0.0, 1.0);  // Координаты
      gl_Position = a_Position;  // Координаты
     // gl_PointSize = 10.0; 
      a_Size; 
      gl_PointSize = a_Size; 
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
    //gl = program;
    gl.clear(gl.COLOR_BUFFER_BIT);
    //const n = initVertexBuffers(gl, program);


    var vertexXYColor = new Float32Array([
      -0.5, 0.5, 1.0, 0.0, 0.0, 1.0,
      -0.5, -0.5, 0.0, 1.0, 0.0, 1.0,
      0.5, -0.5, 0.0, 0.0, 1.0, 0.56,
    ]);
    var n = 3;

    var sizeList = new Float32Array([
      10.0,
      20.0,
      5.0
    ])
    const sizeBuffer =  gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizeList, gl.STATIC_DRAW)

    const a_Size = gl.getAttribLocation(program, 'a_Size');
    gl.vertexAttribPointer(a_Size, 1, gl.FLOAT, false, 4,0)
    gl.enableVertexAttribArray(a_Size);



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


    var a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*6, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, FSIZE*6, FSIZE*2);
    gl.enableVertexAttribArray(a_Color);

    gl.drawArrays(gl.POINTS, 0, 3);
    //gl.deleteBuffer(sizeBuffer)
    //fadeCanvas(gl);
   /* setTimeout(()=>{
      fadeCanvas(gl);
    }, 1000)
*/



    //var coord = gl.getAttribLocation(program, "coordinates");
    //gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(coord);



    //console.log(gl.getAttribLocation(program, 'a_Position'))

  }
}
