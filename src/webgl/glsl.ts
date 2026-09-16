/**
 * JOEL.NOIR — Stage shaders.
 * One persistent plane blends between two project textures. The transition is a
 * directional, noise-perturbed reveal plus subtle uv displacement; each project
 * carries its own composition (framing scale/focus, wipe style, amplitude) so
 * the projects share one language without looking identical.
 *
 * Editorial and physical: calm at rest, powerful only during transition/velocity.
 * Noise: Ashima "webgl-noise" simplex (MIT). No Shadertoy-sourced code.
 * https://github.com/ashima/webgl-noise
 */

export const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position; // Plane geometry: -0.5..0.5

uniform vec2 uRectCenter; // clip-space center of the draw rect (-1..1)
uniform vec2 uRectSize;   // clip-space full size of the draw rect (0..2)

varying vec2 vUv;

void main() {
  vUv = uv;
  vec2 clip = uRectCenter + position * uRectSize;
  gl_Position = vec4(clip, 0.0, 1.0);
}
`;

export const fragment = /* glsl */ `
precision highp float;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uImgAspectA;
uniform float uImgAspectB;
uniform float uRectAspect;
uniform vec2  uDirA;
uniform vec2  uDirB;
uniform float uScaleA;
uniform float uScaleB;
uniform vec2  uFocusA;
uniform vec2  uFocusB;
uniform float uAmpA;
uniform float uAmpB;
uniform float uWipeB;      // reveal style of the incoming project: 0 linear, 1 radial, 2 slices
uniform float uMix;        // 0 = A, 1 = B
uniform float uVelocity;   // signed, normalised scroll velocity
uniform float uTime;
uniform float uOpacity;

/* HERO GLYPH MASK — off (uMaskOn 0) everywhere except the hero -> reel entry. */
uniform float uMaskOn;
uniform sampler2D uMask;   // R: signed contour distance (encoded), G: coverage
uniform vec4  uMaskBox;    // the (enlarged) h1 box on screen, CSS px (x, y, w, h)
uniform float uMaskBias;   // signed distance = (R - bias) * scale, CSS px at scale 1
uniform float uMaskScale;
uniform float uMaskZ;      // how far the letters are enlarged (1 = as set)
uniform float uMaskGrow;   // outward opening, screen CSS px
uniform vec4  uImgBox;     // the headline's own image placement, CSS px
uniform float uImgMix;     // 0 = the headline's placement, 1 = the plane's
uniform float uGrade;      // the headline's contrast/brightness grade, 0..1
uniform vec2  uView;       // viewport, CSS px
uniform vec2  uBuf;        // drawing buffer, device px

varying vec2 vUv;

// --- Ashima simplex noise 2D (MIT) ---
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                 + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Cover-fit uv (fill the rect, crop the image), then zoom toward a focal point.
vec2 coverUv(vec2 uv, float imgAspect, float rectAspect, float scale, vec2 focus){
  if (rectAspect > imgAspect) uv.y = (uv.y - 0.5) * (imgAspect / rectAspect) + 0.5;
  else                        uv.x = (uv.x - 0.5) * (rectAspect / imgAspect) + 0.5;
  uv = (uv - focus) / scale + focus;
  return uv;
}

// Reveal progress across the frame in the incoming project's own style.
float wipeMetric(vec2 uv, vec2 d0, float type){
  vec2 d = normalize(d0 + 1e-4);
  float p = dot(uv, d);
  p /= (abs(d.x) + abs(d.y));
  if (type > 1.5) {                       // slices — controlled fragmentation
    float bands = 7.0;
    float b = floor(p * bands);
    float w = fract(p * bands);
    float ph = mod(b, 2.0) < 0.5 ? w : 1.0 - w;
    return (b + ph) / bands;
  } else if (type > 0.5) {                // radial — atmospheric bloom from centre
    return 1.0 - clamp(distance(uv, vec2(0.5)) * 1.41421, 0.0, 1.0);
  }
  return clamp(p, 0.0, 1.0);              // linear directional
}

void main() {
  float m = clamp(uMix, 0.0, 1.0);
  float n = snoise(vUv * 2.6 + uTime * 0.03);
  float n01 = n * 0.5 + 0.5;

  /* Dissolve threshold per pixel. Compare the mix against the pixel's own
     metric (not the other way round) so the wipe actually tracks progress:
     at m=0 every pixel still shows A, at m=1 every pixel shows B. */
  float wp = wipeMetric(vUv, uDirB, uWipeB);
  float metric = wp * 0.62 + n01 * 0.38;
  float edge = smoothstep(metric - 0.18, metric + 0.18, m);

  float band = sin(3.14159265 * m);
  float amp = band * 0.05 * mix(uAmpA, uAmpB, m) + abs(uVelocity) * 0.045;
  vec2  dir = normalize(mix(uDirA, uDirB, m) + 1e-4);
  vec2  disp = dir * (n * amp);
  vec2  vel = vec2(0.0, uVelocity) * 0.03;

  vec2 uvA = coverUv(vUv, uImgAspectA, uRectAspect, uScaleA, uFocusA) + disp + vel;
  vec2 uvB = coverUv(vUv, uImgAspectB, uRectAspect, uScaleB, uFocusB) - disp + vel;

  float alpha = 1.0;
  if (uMaskOn > 0.5) {
    vec2 css = vec2(gl_FragCoord.x, uBuf.y - gl_FragCoord.y) / uBuf * uView;

    // the same texture, placed first exactly as the headline places it, then
    // travelling into the plane's own framing (an affine blend: a clean move)
    vec2 uvH = vec2((css.x - uImgBox.x) / uImgBox.z, 1.0 - (css.y - uImgBox.y) / uImgBox.w);
    uvA = mix(uvH, uvA, uImgMix);

    vec2 mp = (css - uMaskBox.xy) / uMaskBox.zw;
    vec2 mc = clamp(mp, 0.0, 1.0);
    vec4 ms = texture2D(uMask, mc);
    bool inside = mp.x == mc.x && mp.y == mc.y;
    // as set: the browser-identical antialiased coverage; enlarged: the signed
    // distance field, which keeps the letter edges sharp at any scale
    // signed distance on screen; beyond the box, keep counting outward
    float sd = (ms.r - uMaskBias) * uMaskScale * uMaskZ
             + (inside ? 0.0 : length((mp - mc) * uMaskBox.zw));
    // uMaskGrow opens the enlarged letters outward along the field's own
    // smooth iso-lines once enlarging alone would magnify the raster
    float sdfA = 1.0 - smoothstep(-0.75, 0.75, sd - uMaskGrow);
    float w = clamp((uMaskZ - 1.0) / 0.2, 0.0, 1.0);
    alpha = inside ? mix(ms.g, sdfA, w) : sdfA;
  }

  vec3 colA = texture2D(uTexA, uvA).rgb;
  vec3 colB = texture2D(uTexB, uvB).rgb;

  float k = (m <= 0.001) ? 0.0 : (m >= 0.999 ? 1.0 : edge);
  vec3 col = mix(colA, colB, k);

  // the headline's CSS grade (contrast 1.06, brightness 1.02), released as it opens
  vec3 graded = ((col - 0.5) * 1.06 + 0.5) * 1.02;
  col = mix(col, clamp(graded, 0.0, 1.0), uGrade);

  gl_FragColor = vec4(col, uOpacity * alpha);
}
`;
