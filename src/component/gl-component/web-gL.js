/**
 * @param {HTMLCanvasElement} canvas
 * @param {boolean} debug
 * @return {(WebGLRenderingContext|null)}
 */
export function getWebGLContext(canvas, debug) {
  let gl = null;

  try {
    // Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
    gl = canvas.getContext("webgl", {preserveDrawingBuffer: true}) || canvas.getContext("experimental-webgl", debug);
  }
  catch(e) {}

  // Если мы не получили контекст GL, завершить работу
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }

  return gl;
}

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {number}type
 * @param {string} source
 * @return {WebGLShader}
 */
export const createShader = (gl, type, source) => {
  const shader = gl.createShader(type); // создание шейдера
  gl.shaderSource(shader, source); // устанавливаем шейдеру его программный код
  gl.compileShader(shader); // компилируем шейдер
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) { // если компиляция прошла успешно - возвращаем шейдер
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};


/**
 * @param gl
 * @param vertexShader
 * @param fragmentShader
 * @return {WebGLProgram}
 */
export const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};
