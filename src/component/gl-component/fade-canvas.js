import {getWebGLContext, createShader, createProgram} from "./web-gL";

function getAttribLocation(name, pixelsFloat32, gl, program) {
  const redBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, redBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pixelsFloat32, gl.STREAM_DRAW);
  return gl.getAttribLocation(program, name);
}

function createMatrixPosition(width, height) {
  let i = 0;
  const length = width*height;
  const positionList = [];

  while (i<length){
    const y = parseInt(i/width);
    const x = i - y*width;
    positionList.push((x/(width/2))-1);
    positionList.push(-1*((y/(height/2))-1));
    i++;
  }
  return new Float32Array(positionList)
}


function fadeCanvas(gl) {

  const FSIZE = 4;
  const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  varying vec4 v_Color;
  varying float a_Index;
  
  attribute float red;
  attribute float green;
  attribute float blue;
  attribute float alpha;
  
  void main(){
    a_Index;
    gl_Position = a_Position;
    //gl_Position = vec4(0.0, 0.0 ,0.0 , 1.0);
    gl_PointSize = 1.0;
    a_Index = red;
    v_Color = vec4(red/255.0, 0, 0.0, 0.5);
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
  gl.useProgram(program)


  var pixelsUint8 = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
  var pixelsFloat32 = new Float32Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixelsUint8);
  //console.log(new Flpixels)
  pixelsFloat32 = new Float32Array(pixelsUint8)
  console.log(pixelsFloat32);

  /*const redBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, redBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pixelsFloat32, gl.STATIC_DRAW);*/
  //const red = getAttribLocation('red', pixelsFloat32, gl, program);

  const redBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, redBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pixelsFloat32, gl.STATIC_DRAW)
  const red = getAttribLocation('red', pixelsFloat32, gl, program)

  gl.vertexAttribPointer(red, 1, gl.FLOAT, false, redBuffer*3, 0);
  gl.enableVertexAttribArray(red);
  //gl.drawArrays(gl.POINTS, 0, gl.drawingBufferWidth * gl.drawingBufferHeight);

  const positionFloat32 = createMatrixPosition(gl.drawingBufferWidth, gl.drawingBufferHeight)
  const positionPuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionPuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positionFloat32, gl.STATIC_DRAW);
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, positionPuffer.BYTES_PER_ELEMENT*2, 0);
  gl.enableVertexAttribArray(a_Position);


  gl.drawArrays(gl.POINTS, 0, gl.drawingBufferWidth * gl.drawingBufferHeight/2);


 // console.log(positionFloat32)
}

export default fadeCanvas

