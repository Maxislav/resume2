W.define("glShaders", [], function () {
  return {
    shScreenVS: "\n\tattribute vec2 aPos;\n\tuniform vec4 uVPars0;\n\tuniform vec4 uVPars1;\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tgl_Position = vec4( aPos * uVPars0.xy + uVPars0.zw, 0.0, 1.0 );\n\t\tvec2 tc0 = aPos.xy * 0.5 + 0.5;\n\t\tvTc0 = vec4( tc0 * uVPars1.xy + uVPars1.zw, aPos.xy );\n\t}\n",
    shScreenFS: "\n\tprecision mediump float;\n\tuniform vec4 uPars0;\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tgl_FragColor = uPars0;\n\t}\n",
    shCopyFS: "\n    precision mediump float;\n    \n    uniform vec4 uPars0; // mul color\n    uniform vec4 uPars1; // add color\n    \n    uniform sampler2D sTex0;\n    \n    varying vec4 vTc0;\n\n    void main(void) {\n        gl_FragColor = texture2D( sTex0, vTc0.xy ) * uPars0 + uPars1;\n    }\n",
    shParticleDrawVS: "\n\tprecision mediump float;\n\t\n\tattribute vec4 aVecA; // xy ..position in state texture <0,255>; zw .. vertex position in particle flags\n\t\n\tuniform sampler2D sState0; // actual particle position\n\tuniform sampler2D sState1; // last position\n\t\n\tuniform vec4 uVPars0; // xy .. tc mul, zw ..tc add\n\tuniform vec4 uVPars1; \n\tuniform vec4 uVPars2;\n\tuniform vec4 uVPars3; // xy .. relative shift, zw..antialiasing MAD\n\t\n\tvarying vec4 vTc0;\n\t\n\tvoid main() {\n\t\tvec2 tc = aVecA.xy * uVPars0.xy + uVPars0.zw;\n\t\tvec4 tex0 = texture2D( sState0, tc );\n\t\tvec4 tex1 = texture2D( sState1, tc );\n\t\tvec2 posA = fract( tex0.ba + tex0.rg / 255.5 + uVPars3.xy ) * 2.0 - 1.0; // particle position in <-1.0,1.0> space\n\t\tvec2 posB = fract( tex1.ba + tex1.rg / 255.5 + uVPars3.xy ) * 2.0 - 1.0; // last particle position <-1.0,1.0> space\n\n\t\tvec2 dirF = posA - posB;\n\t\tvec2 dirFN = normalize( dirF ); // normalized forward direction ( from B to A )\n\t\tfloat d = length( dirF ); // d can be used for alpha from speed\n\t\tvec2 dirRN = vec2( dirFN.y, -dirFN.x ); // perpendicular direction (right from dirFN)\n\t\t\n\t\tvec2 pos = mix( posB, posA, aVecA.w * 0.003921569 ); // select posA or posB\n\t\tpos += dirRN * ( aVecA.zz * uVPars1.xy + uVPars1.zw ); // add width\n#ifdef WAVES\n\t\tpos += dirFN * ( aVecA.ww * uVPars2.xy + uVPars2.zw ); // add extra length\n\t\tif( d > 0.5 || d < 0.00005 ) {\n\t\t\tpos.x += 10.0; // bad particle! move away!\n\t\t}\n#else\n\t\tif( d > 0.5 ) { \n\t\t\tpos.x += 10.0;\n\t\t}\n#endif\n\t\tgl_Position = vec4( pos.xy, 0, 1 );\n\t\tvTc0.x = uVPars3.z * aVecA.z + uVPars3.w;\n\t}\n",
    shParticleDrawFS: "\n    precision mediump float;\n    uniform vec4 uPars0;\n    uniform vec4 uPars1;\n\n    varying vec4 vTc0;\n\n    void main(void) {\n    \tfloat aa = clamp( uPars1.x - abs( vTc0.r ), 0.0, 1.0 );\n        gl_FragColor = uPars0 * vec4( aa );\n    }\n",
    shParticleUpdateFS: "\n\tprecision mediump float; // highp\n\n\tuniform vec4 uPars0; // wind texture coords MAD\n\tuniform vec4 uPars1; // particle velocity params (computed per frame)\n\n\tuniform sampler2D sState; // last particle position\n\tuniform sampler2D sWind; // composited wind direction texture\n\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tvec4 tex0 = texture2D( sState, vTc0.xy );\n\t\tvec2 pos = tex0.ba + tex0.rg / 255.5; // decode position from last state texture\n\t\tvec2 tc = fract( pos ) * uPars0.xy + uPars0.zw; // texture coordinates to wind vectors texture // pos + uPars2.xy\n\t\tvec2 dpos = texture2D( sWind, tc ).ra * uPars1.xy + uPars1.zw; // delta position from wind\n\t\tpos = fract( pos + dpos ); // new position and wrap in interval <0.0, 1.0)\n\t\t// output new position\n\t\tgl_FragColor.rg = fract( pos * 255.0 + 0.25 / 255.0 ); // encode lo bits\n\t\tgl_FragColor.ba = pos - gl_FragColor.rg / 255.0; // encode hi bits\n\t}\n"
  }
}), W.define("GlParticles", ["GlObj", "glShaders", "maps", "particles", "rootScope", "render"], function (t, e, a, r, s, n) {
  return L.CanvasLayer.extend({
    _canvas: null,
    glo: new t,
    failed: !1,
    ratioScale: 1,
    alpha: 0,
    needClear: !0,
    isOk: function () {
      return 0 === this.errorCount
    },
    reinitParticleType: function (t) {
      "wind" === t ? this.prepareAlphaLUT(.2, .9, .3, .8) : "waves" === t ? this.prepareAlphaLUT(.7, 1.2, .3, 1.4) : "currents" === t && this.prepareAlphaLUT(.2, 1.2, .3, 1.4), this.particlesIdentLast = t
    },
    createGlStuff: function (t) {
      this.resetGlStuff(), this.errorCount = 0;
      var e = {antialias: !1, depth: !1, stencil: !1, alpha: !0, premultipliedAlpha: !0, preserveDrawingBuffer: !1};
      this.glo.create(t, e, "GlParticlesContext") ? this.initParamsAndShaders() : ++this.errorCount
    },
    resetGlStuff: function () {
      this.vertexBuffer = null, this.indexBuffer = null, this.lastClientWidth = 0, this.lastClientHeight = 0, this.backTexture = null, this.backTextureWidth = 0, this.backTextureHeight = 0, this.textureState0 = null, this.textureState1 = null, this.stateRandBlocks = null
    },
    initParamsAndShaders: function () {
      var t = this.glo;
      this.stateBlocksCount = 16, this.blockTimeSegmentSize = 8, this.totalTimeFrames = this.stateBlocksCount * this.blockTimeSegmentSize, this.stateResX = 256, this.stateResY = 256, this.lastTimeS = 0, this.frames60timer = 0, this.frames60 = 0, this.frameCounter = 0, this.frameCounter60 = 0, this.blockTimeSegment = 0, this.framebuffer = t.createFramebuffer(), this.shWindParticleDraw = this.compileShader(e.shParticleDrawVS, e.shParticleDrawFS, [], "WindParticleDraw"), this.shWaveParticleDraw = this.compileShader(e.shParticleDrawVS, e.shParticleDrawFS, ["WAVES"], "WaveParticleDraw"), this.shScreen = this.compileShader(e.shScreenVS, e.shScreenFS, [], "Screen"), this.shCopy = this.compileShader(e.shScreenVS, e.shCopyFS, [], "Copy"), this.shParticleUpdate = this.compileShader(e.shScreenVS, e.shParticleUpdateFS, [], "ParticleUpdate"), this.vertexBufferRect = t.createBuffer(new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])), this.initParticleDataStructures(this.stateResX, this.stateResY), this.windTexture = null
    },
    compileShader: function (t, e, i, a) {
      var r;
      try {
        r = this.glo.createProgramObj(t, e, i, a)
      } catch (t) {
        window.wError("GlParticles", "Unable to create programObj", t), ++this.errorCount, r = null
      }
      return r
    },
    checkSizesAndReinit: function () {
      var e = this.glo, i = e.get(), a = e.getCanvas();
      if (this.lastClientWidth !== a.width || this.lastClientHeight !== a.height) {
        this.lastClientWidth = a.width, this.lastClientHeight = a.height;
        var r = i.getParameter(i.MAX_TEXTURE_SIZE), s = this.ratioScale > 1.5 ? .8 : 1, n = Math.min(t.getNextPowerOf2Size(s * this.lastClientWidth), r), o = Math.min(t.getNextPowerOf2Size(s * this.lastClientHeight), r);
        if (this.backTextureWidth !== n || this.backTextureHeight !== o) {
          this.backTextureWidth = n, this.backTextureHeight = o;
          var l = new Uint8Array(this.backTextureWidth * this.backTextureHeight * 4);
          this.backTexture = e.createTexture2D(i.LINEAR, i.LINEAR, i.REPEAT, l, this.backTextureWidth, this.backTextureHeight)
        }
      }
    },
    prepareAlphaLUT: function (t, e, i, a) {
      var r = this;
      this.alphaLut = new Float32Array(this.totalTimeFrames);
      var s, n, o = Math.round(t * this.totalTimeFrames), l = Math.round(i * this.totalTimeFrames);
      for (s = 0; s < this.totalTimeFrames; s++)n = 1, s < o ? n = Math.pow(1 * s / o, e) : s >= r.totalTimeFrames - l && (n = Math.pow(1 * (r.totalTimeFrames - s) / l, a)), r.alphaLut[s] = n
    },
    initParticleDataStructures: function (t, e) {
      var i, a, r, s, n, o = this, l = this.glo, h = l.get();
      this.particlesCount = t * e, this.vertsPerParticle = 4, this.vertexStride = 4, this.stateBlock = 0, this.stateBlockDY = e / this.stateBlocksCount;
      var u = new Uint8Array(4 * this.particlesCount);
      for (i = 0; i < u.length; i++)u[i] = Math.floor(256 * Math.random());
      this.textureState0 = l.createTexture2D(h.NEAREST, h.NEAREST, h.REPEAT, u, t, e), this.textureState1 = l.createTexture2D(h.NEAREST, h.NEAREST, h.REPEAT, u, t, e);
      var c = t * this.stateBlockDY * this.vertsPerParticle * this.vertexStride, d = new Uint8Array(c), m = [0, 0, 255, 0, 255, 255, 0, 255];
      for (n = 0, i = 0; i < t; i++)for (a = 0; a < this.stateBlockDY; a++)for (r = 0; r < this.vertsPerParticle; r++)d[n++] = i, d[n++] = a, d[n++] = m[2 * r], d[n++] = m[2 * r + 1];
      this.vertexBuffer = l.createBuffer(d);
      var f = [0, 1, 2, 0, 2, 3];
      this.indsPerParticle = f.length, this.particlesPerBlock = t * this.stateBlockDY, this.indexCount = this.particlesPerBlock * this.indsPerParticle;
      var p = new Uint16Array(this.indexCount);
      for (a = 0, s = 0, i = 0; i < this.indexCount; i++)p[i] = s + f[a], ++a >= f.length && (a = 0, s += o.vertsPerParticle);
      this.indexBuffer = l.createIndexBuffer(p)
    },
    reinitStateBlock: function (t) {
      var e = this.glo, a = e.get(), r = this.stateBlockDY * t, s = this.stateResX * this.stateBlockDY * 4, n = new Uint8Array(s);
      for (i = 0; i < s; i++)n[i] = Math.floor(256 * Math.random());
      e.bindTexture2D(this.textureState0), a.texSubImage2D(a.TEXTURE_2D, 0, 0, r, this.stateResX, this.stateBlockDY, a.RGBA, a.UNSIGNED_BYTE, n), e.bindTexture2D(this.textureState1), a.texSubImage2D(a.TEXTURE_2D, 0, 0, r, this.stateResX, this.stateBlockDY, a.RGBA, a.UNSIGNED_BYTE, n)
    },
    setGlobalAlpha: function (t) {
      this.alpha = t
    },
    fadeOut: function () {
      var t = this.glo, e = t.get(), i = this.shScreen;
      e.useProgram(i.program), t.bindAttribute(this.vertexBufferRect, i.aPos, 2, e.FLOAT, 0, 8, 0), e.uniform4f(i.uVPars0, 1, 1, 0, 0), e.enable(e.BLEND);
      var a = this.fadeScale;
      e.blendColor(a, a, a, a), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ZERO, e.CONSTANT_ALPHA), e.drawArrays(e.TRIANGLE_FAN, 0, 4), e.disable(e.BLEND)
    },
    drawParticles: function () {
      var t = this, e = this.glo, i = e.get(), a = this.mapParams.partObj, r = "waves" === this.mapParams.particlesIdent ? this.shWaveParticleDraw : this.shWindParticleDraw;
      i.useProgram(r.program), e.bindAttribute(this.vertexBuffer, r.aVecA, 4, i.UNSIGNED_BYTE, 0, this.vertexStride, 0), e.bindTexture2D(this.textureState0, 0), i.uniform1i(r.sState0, 0), e.bindTexture2D(this.textureState1, 1), i.uniform1i(r.sState1, 1);
      var s = this.transformParams.widthFactor + 1, n = s / this.lastClientWidth, o = s / this.lastClientHeight, l = a.glParticleLengthEx / this.lastClientWidth, h = a.glParticleLengthEx / this.lastClientHeight;
      i.uniform4f(r.uVPars1, 2 * n / 255, 2 * o / 255, -n, -o), i.uniform4f(r.uVPars2, 2 * l / 255, 2 * h / 255, -l, -h);
      var u = Math.max(1, .8 * this.transformParams.widthFactor);
      i.uniform4f(r.uVPars3, 0, 0, 2 * u / 255, -u), i.uniform4f(r.uPars1, u, 0, 0, 0), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indexBuffer), i.enable(i.BLEND), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE_MINUS_DST_ALPHA, i.ONE);
      for (var c = Math.max(1, Math.min(Math.round(this.transformParams.relativeAmount * this.particlesPerBlock), this.particlesPerBlock)) * this.indsPerParticle, d = 1 / this.stateBlocksCount, m = this.timeFrame0, f = 0; f < this.stateBlocksCount; f++) {
        i.uniform4f(r.uVPars0, 1 / t.stateResX, 1 / t.stateResY, 0, f * d);
        var p = t.alphaLut[m];
        i.uniform4f(r.uPars0, p, p, p, p), i.drawElements(i.TRIANGLES, c, i.UNSIGNED_SHORT, 0), m -= t.blockTimeSegmentSize, m < 0 && (m += t.totalTimeFrames)
      }
      i.disable(i.BLEND)
    },
    copyToCanvas: function () {
      var t = this, e = this.glo, i = e.get();
      e.bindFramebuffer(null), i.viewport(0, 0, e.getCanvas().width, e.getCanvas().height), i.enable(i.BLEND), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ONE);
      var a = this.shCopy;
      i.useProgram(a.program), e.bindAttribute(this.vertexBufferRect, a.aPos, 2, i.FLOAT, 0, 8, 0), e.bindTexture2D(this.backTexture, 0), i.uniform1i(a.sTex0, 0);
      this.shiftX, this.lastClientWidth, this.shiftY, this.lastClientHeight;
      i.uniform4f(a.uVPars0, 1, 1, 0, 0), i.uniform4f(a.uVPars1, 1, 1, 0, 0);
      var r;
      if (this.mapParams.zoom >= 12) r = [.5, 0, .4, this.transformParams.mulAZoomed]; else {
        var s = .4 * this.transformParams.mulRGB;
        r = [s, s, s, .4 * this.transformParams.mulA]
      }
      for (var n = 0; n < 4; n++)r[n] *= t.alpha;
      i.uniform4fv(a.uPars0, r);
      i.uniform4fv(a.uPars1, [-.1, -.1, -.1, -.1]), i.drawArrays(i.TRIANGLE_FAN, 0, 4), i.disable(i.BLEND)
    },
    updateParticles: function (t) {
      var e = this.glo, i = e.get();
      e.bindFramebuffer(this.framebuffer, this.textureState1), i.viewport(0, 0, this.stateResX, this.stateResY);
      var a = this.shParticleUpdate;
      i.useProgram(a.program), e.bindAttribute(this.vertexBufferRect, a.aPos, 2, i.FLOAT, 0, 8, 0), e.bindTexture2D(this.textureState0, 0), i.uniform1i(a.sState, 0), e.bindTexture2D(this.windTexture, 3), i.uniform1i(a.sWind, 3);
      var r = Math.min(Math.floor(256 * this.transformParams.relativeAmount + 1), 256) / 256;
      i.uniform4f(a.uVPars0, r, 1, r - 1, 0), i.uniform4f(a.uVPars1, r, 1, 0, 0), i.uniform4f(a.uPars0, this.windTextureMulX, -this.windTextureMulY, this.windTextureAddX, this.windTextureMulY + this.windTextureAddY);
      var s = this.frameTime * this.transformParams.timeScale, n = s / this.lastClientWidth, o = s / this.lastClientHeight;
      i.uniform4f(a.uPars1, 2 * n, 2 * o, -n, -o), i.drawArrays(i.TRIANGLE_FAN, 0, 4), e.bindFramebuffer(null), t >= 0 && this.reinitStateBlock(t);
      var l = this.textureState0;
      this.textureState0 = this.textureState1, this.textureState1 = l
    },
    updateFrame: function () {
      if (++this.frameCounter60 % 2 == 0) {
        this.checkSizesAndReinit();
        var t = this.glo, e = t.get(), i = .001 * Date.now();
        if (this.frameTime = Math.min(i - this.lastTimeS, .1), this.lastTimeS = i, this.frames60timer += this.frameTime, this.frames60 = Math.max(1, Math.round(60 * this.frames60timer)), this.frames60timer -= .0166667 * this.frames60, this.checkWindData() && this.transformParams) {
          var a = -1;
          this.timeFrame0 = this.stateBlock * this.blockTimeSegmentSize, this.blockTimeSegment += this.frames60, this.blockTimeSegment >= this.blockTimeSegmentSize && (this.blockTimeSegment -= this.blockTimeSegmentSize, a = this.stateBlock, ++this.stateBlock >= this.stateBlocksCount && (this.stateBlock = 0)), this.timeFrame0 = (this.stateBlock - 1) * this.blockTimeSegmentSize, this.timeFrame0 += this.blockTimeSegment, this.timeFrame0 < 0 && (this.timeFrame0 += this.totalTimeFrames), this.updateParamsFromConfig(), this.relParticleShiftX = this.shiftX / this.lastClientWidth, this.relParticleShiftY = this.shiftY / this.lastClientHeight, t.bindFramebuffer(this.framebuffer, this.backTexture), e.viewport(0, 0, this.backTextureWidth, this.backTextureHeight), this.needClear && (e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), this.needClear = !1, this.animationStopped && this.copyToCanvas()), this.animationStopped || (this.drawParticles(), this.fadeOut(), this.copyToCanvas(), this.updateParticles(a), this.alpha < 1 && (this.alpha += 1.8 * this.frameTime, this.alpha > 1 && (this.alpha = 1)), this.frameCounter++, this.showCanvas(!0))
        }
      }
    },
    setNewWindData: function (t) {
      this.newWindData = t
    },
    checkWindData: function () {
      if (this.newWindData) {
        var t = this.newWindData;
        this.transformParams = t.transformParams, this.mapParams = t.mapParams;
        var e = this.glo, i = e.get(), a = i.LUMINANCE_ALPHA;
        if (this.windTextureResX = t.sizeX, this.windTextureResY = t.sizeY, this.windTexture ? (e.bindTexture2D(this.windTexture), i.texImage2D(i.TEXTURE_2D, 0, a, this.windTextureResX, this.windTextureResY, 0, a, i.UNSIGNED_BYTE, null)) : this.windTexture = e.createTexture2D(i.LINEAR, i.LINEAR, i.CLAMP_TO_EDGE, null, this.windTextureResX, this.windTextureResY, a), t.textureTiles) {
          var r = t.textureTiles, s = t.textureTilesPos, n = r.length;
          e.bindTexture2D(this.windTexture);
          for (var o = 0; o < n; o++) {
            var l = r[o], h = s[o];
            i.texSubImage2D(i.TEXTURE_2D, 0, h.x, h.y, l.tileSize, l.tileSize, a, i.UNSIGNED_BYTE, l.data)
          }
        }
        this.newWindData = null;
        var u = this.transformParams;
        this.windTextureMulX = 1 * u.relativeDX * u.width / (u.tilesDX * u.trans), this.windTextureMulY = 1 * u.relativeDY * u.height / (u.tilesDY * u.trans), this.windTextureAddX = u.offsetX / (this.windTextureResX * u.trans), this.windTextureAddY = u.offsetY / (this.windTextureResY * u.trans)
      }
      return !!this.windTexture
    },
    updateParamsFromConfig: function () {
      var t = this.transformParams, e = this.mapParams;
      if (t && e) {
        var i = e.partObj;
        e.particlesIdent !== this.particlesIdentLast && this.reinitParticleType(e.particlesIdent);
        var a, s, n;
        i.configurable ? (a = r.config.velocity || 1, s = r.config.opacity || 1, n = r.config.blending || 1) : (a = i.glVelocity, s = i.glOpacity, n = i.glBlending);
        var o = i.getAmount.call(i, e), l = i.getAmountMultiplier.call(i);
        t.relativeAmount = o / 65536, l < 1 && (t.relativeAmount *= 1 + 7 * (1 - l)), t.relativeAmount *= i.glCountMul, t.widthFactor = Math.max(1, i.getLineWidth.call(i, e) * i.glParticleWidth * this.ratioScale), t.timeScale = a * i.glSpeedPx * t.zoomWindFactor * this.ratioScale, t.mulRGB = .7 * s + .4, t.mulA = s, t.mulAZoomed = .44 * s + .3, t.mulA > 1 && (t.mulA = 2 - t.mulA), t.mulA += .1;
        var h = n - .92;
        this.fadeScale = Math.min(.9 + .5 * h, .98)
      }
    },
    onInit: function () {
      this.errorCount = 0
    },
    onCreateCanvas: function () {
      try {
        this.createGlStuff(this.getCanvas())
      } catch (t) {
        window.wError("GlParticles", "unspecified error in createGlStuff", t), ++this.errorCount
      }
      return this.isOk()
    },
    onCanvasFailed: function () {
      this.glo.release(), n.emit("glParticlesFailed")
    },
    onRemoveCanvas: function () {
      this.glo.release(), this.resetGlStuff()
    },
    onResizeCanvas: function (t, e) {
      var i = Math.min(window.devicePixelRatio || 1, 2), a = this.getCanvas();
      this.ratioScale = i, a.width = t * i, a.height = e * i, a.style.width = t + "px", a.style.height = e + "px"
    },
    onReset: function () {
      this.alpha = 0, this.needClear = !0, this.showCanvas(!1)
    }
  })
}), W.define("glAnimation", ["broadcast", "rootScope"], function (t, e) {
  function i() {
    m = !0, l(), s()
  }

  function a() {
    m = !1, u()
  }

  function r(t) {
    c = t
  }

  function s() {
    c._canvas.style.opacity = 0, c.animationStopped = !0, c.needClear = !0, c.updateFrame()
  }

  function n() {
    c._canvas.style.opacity = 1, c.animationStopped = !1, c.needClear = !0
  }

  function o(t) {
    "off" === t ? (l(), s(), f = !0) : f && (n(), f = !1, m || u())
  }

  function l() {
    cancelAnimationFrame(d)
  }

  function h() {
    d = requestAnimationFrame(h), c.updateFrame()
  }

  function u() {
    cancelAnimationFrame(d), f || (n(), h())
  }

  var c, d = null, m = !1, f = !e.particlesOn;
  return {init: r, suspend: i, enable: a, run: u, stop: l, toggle: o}
}), W.define("glVectors", ["render", "glAnimation", "particles", "utils", "GlObj", "lruCache", "DataTiler"], function (t, e, i, a, r, s) {
  var n, o = new s(16);
  return W.DataTiler.instance({
    syncCounter: 0,
    cancelRqstd: !1,
    latestParams: null,
    enabled: !0,
    cancelTasks: function () {
      this.syncCounter++
    },
    tilesReady: function (t, e, r) {
      a.include(e, r), e.partObj = i[r.particlesIdent];
      var s = {width: this.width, height: this.height, offsetX: this.offsetX, offsetY: this.offsetY, trans: this.trans};
      this.processTiles(t, e, s)
    },
    redrawVectors: function () {
      this.mapMoved = !0, this.latestParams && this.getTiles(this.latestParams)
    },
    init: function (t, e) {
      n = t, this.latestParams = a.clone(e), this.redrawVectors()
    },
    paramsChanged: function (t) {
      this.latestParams && this.latestParams.fullPath === t.fullPath && this.latestParams.overlay === t.overlay || (this.latestParams = a.clone(t), this.getTiles(this.latestParams))
    },
    processTiles: function (i, a, s) {
      var l = i.length;
      if (l > 0) {
        var h = i[0].length;
        if (h > 0) {
          var u, c, d, m, f, p = a.partObj, v = a.JPGtransparency, P = [], g = [], x = p.level2reduce[a.level], T = p.zoom2speed[a.zoom], S = x / p.glMaxSpeedParam;
          for (u = 0; u < l; u++)for (c = 0; c < h; c++) {
            var w = i[u][c], A = new Uint8ClampedArray(131072);
            if (w) {
              var b = o.get(w.url, null);
              if (!b) {
                var D = w.data, C = 8224, F = 0, y = S * p.glMinSpeedParam, E = y * y, R = .5 * p.glSpeedCurvePowParam;
                if (v)for (m = 0; m < 256; m++) {
                  for (d = 0; d < 256; d++) {
                    if (D[C + 2] > 128) A[F++] = 128, A[F++] = 128; else {
                      var B = w.decodeR(D[C]) * S, k = w.decodeG(D[C + 1]) * S, N = B * B + k * k;
                      N > E ? (f = 128 * Math.pow(N, R) / Math.sqrt(N), B *= f, k *= f) : N > 1e-6 ? (f = 128 * y / Math.sqrt(N), B *= f, k *= f) : (B = 0, k = 0), A[F++] = 128 + Math.round(B), A[F++] = 128 + Math.round(k)
                    }
                    C += 4
                  }
                  C += 4
                } else for (m = 0; m < 256; m++) {
                  for (d = 0; d < 256; d++)D[C + 3] < 128 ? (A[F++] = 128, A[F++] = 128) : (B = w.decodeR(D[C]) * S, k = w.decodeG(D[C + 1]) * S, N = B * B + k * k, N > E ? (f = 128 * Math.pow(N, R) / Math.sqrt(N), B *= f, k *= f) : N > 1e-6 ? (f = 128 * y / Math.sqrt(N), B *= f, k *= f) : (B = 0, k = 0), A[F++] = 128 + Math.round(B), A[F++] = 128 + Math.round(k)), C += 4;
                  C += 4
                }
                b = {url: w.url, tileSize: 256, data: new Uint8Array(A)}, o.put(w.url, b)
              }
              P.push(b), g.push({x: 256 * c, y: 256 * u})
            }
          }
          if (1 === P.length) {
            var V = P[0], M = g[0];
            P.push({url: V.url, tileSize: V.tileSize, data: V.data}), g.push({x: M.x + V.tileSize, y: M.y}), h++
          }
          var W = 256 * r.getNextPowerOf2Size(h), z = 256 * r.getNextPowerOf2Size(l);
          s.tilesDX = 256 * h, s.tilesDY = 256 * l, s.relativeDX = 1 * h * 256 / W, s.relativeDY = 1 * l * 256 / z, s.zoomWindFactor = T, n && (n.setNewWindData({
            sizeX: W,
            sizeY: z,
            textureTiles: P,
            textureTilesPos: g,
            transformParams: s,
            mapParams: a
          }), e.run()), t.emit("rendered", "particles")
        }
      }
    }
  })
}), W.define("glParticles", ["glVectors", "glAnimation", "log", "storage", "rootScope", "maps", "broadcast", "GlParticles"], function (t, e, i, a, r, s, n) {
  function o(o) {
    return c.addTo(s), c.failed ? (a.put("webGLtest3", {
        status: "initFailed",
        ua: window.navigator.userAgent
      }), i.page("particles/status/initFailed"), !1) : (r.glParticlesOn = !0, c.getCanvas().classList.add("particles-layer"), s.on("moveend", h), s.on("movestart", u), n.on("particlesAnimation", e.toggle), e.enable(), t.init(c, o), !0)
  }

  function l() {
    e.suspend(), n.off("particlesAnimation", e.toggle), s.off("moveend", h), s.off("movestart", u), s.removeLayer(c)
  }

  var h = t.redrawVectors.bind(t), u = t.cancelTasks.bind(t), c = new W.GlParticles;
  return e.init(c), {open: o, close: l, redraw: h, paramsChanged: t.paramsChanged.bind(t)}
}), W.require(["glParticles"]);