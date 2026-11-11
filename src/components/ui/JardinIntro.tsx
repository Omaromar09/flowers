'use client';

import React, { useEffect } from 'react';
import '@/styles/jardin-intro.css';

declare const THREE: any;

export default function JardinIntro() {
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const CFG = {
      brand: 'JARDIN VIVANT',
      tagline: 'Where flowers speak',
      once: true, // play once per session
      t: { bloom: 0.8, detach: 4.1, text: 5.7, tag: 6.6, exit: 8.0, end: 9.6 }
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if already played in this session or reduced motion
    try {
      if (reduce || (CFG.once && sessionStorage.getItem('jv-intro'))) {
        window.dispatchEvent(new CustomEvent('jardin:intro-done'));
        return;
      }
    } catch (e) {
      if (reduce) {
        window.dispatchEvent(new CustomEvent('jardin:intro-done'));
        return;
      }
    }

    // Check WebGL availability
    function isWebGLAvailable() {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    }

    if (!isWebGLAvailable()) {
      window.dispatchEvent(new CustomEvent('jardin:intro-done'));
      return;
    }

    let isMounted = true;
    let animId: number | null = null;
    let cleanupFn: (() => void) | null = null;

    const SCRIPTS = [
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js',
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js',
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js',
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/MaskPass.js',
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js',
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js',
      'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js'
    ];

    function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = (err) => reject(err);
        document.head.appendChild(s);
      });
    }

    async function init() {
      try {
        for (const src of SCRIPTS) {
          if (!isMounted) return;
          await loadScript(src);
        }
      } catch (err) {
        console.warn('JardinIntro: Failed to load 3D scripts, skipping intro gracefully.', err);
        window.dispatchEvent(new CustomEvent('jardin:intro-done'));
        return;
      }

      if (!isMounted || typeof THREE === 'undefined') {
        window.dispatchEvent(new CustomEvent('jardin:intro-done'));
        return;
      }

      const cl = (x: number, a: number, b: number) => Math.min(1, Math.max(0, (x - a) / (b - a)));
      const eo = (t: number) => 1 - Math.pow(1 - t, 3);
      const eio = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const rnd = (a: number, b: number) => a + Math.random() * (b - a);
      const T = CFG.t;

      /* DOM */
      const ov = document.createElement('div');
      ov.id = 'jv-intro';
      ov.setAttribute('aria-hidden', 'true');
      ov.innerHTML = '<canvas></canvas><div class="jv-rays"></div><div class="jv-glow"></div><div class="jv-text"><h1></h1><p class="jv-tag"></p></div>';
      const h1 = ov.querySelector('h1')!;
      [...CFG.brand].forEach((c, i) => {
        const s = document.createElement('span');
        s.textContent = c === ' ' ? '\u00A0' : c;
        s.style.transitionDelay = i * 0.07 + 's';
        h1.appendChild(s);
      });
      ov.querySelector('.jv-tag')!.textContent = CFG.tagline;
      document.body.appendChild(ov);

      const prevOv = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      const rays = ov.querySelector('.jv-rays') as HTMLElement;
      const glow = ov.querySelector('.jv-glow') as HTMLElement;

      /* Renderer + Scene */
      const canvas = ov.querySelector('canvas') as HTMLCanvasElement;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
      renderer.setPixelRatio(DPR);
      renderer.setClearColor(0x240913, 1);
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x240913, 7.5, 19);
      const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
      const look = new THREE.Vector3(0, 0.55, 0);

      scene.add(new THREE.HemisphereLight(0xffd6c8, 0x3a0c1c, 0.8));
      const key = new THREE.DirectionalLight(0xffe0c0, 1.5);
      key.position.set(3, 6, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xff5f8c, 1.6);
      rim.position.set(-5, 2, -4);
      scene.add(rim);
      const core = new THREE.PointLight(0xffa070, 0, 10);
      core.position.set(0, 0.8, 0);
      scene.add(core);

      /* Petal geometry */
      const geo = new THREE.PlaneGeometry(1, 1, 8, 12);
      const P = geo.attributes.position;
      const sh: number[] = [];
      for (let i = 0; i < P.count; i++) {
        const v = P.getY(i) + 0.5;
        const w = Math.pow(Math.sin(Math.PI * (0.13 + 0.74 * v)), 0.6) * 1.1;
        const x = P.getX(i) * w;
        const lip = v > 0.76 ? Math.pow(v - 0.76, 2) * 3.6 : 0;
        P.setXYZ(i, x, v, -(x * x * 0.85 + v * v * 0.16) + lip + Math.sin(v * 9 + x * 4) * 0.012 * v);
        const g = 0.42 + 0.58 * Math.pow(v, 0.8);
        sh.push(g, g, g);
      }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(sh, 3));
      geo.computeVertexNormals();

      const pal = [0x6e0f2a, 0x8f1a3b, 0xb92d52, 0xdb6785, 0xf0a9b8, 0xf7cdd3, 0xfbe3df].map(c => new THREE.Color(c));
      const acc = [0xf7e4d0, 0xf4d27e, 0xea6f8d, 0xb3203f, 0xffb3c1].map(c => new THREE.Color(c));
      const mat = (c: any, emi: number) =>
        new THREE.MeshPhysicalMaterial({
          color: c,
          vertexColors: true,
          side: THREE.DoubleSide,
          roughness: 0.42,
          sheen: new THREE.Color(0xffb4c4),
          clearcoat: 0.22,
          clearcoatRoughness: 0.5,
          emissive: c.clone().multiplyScalar(emi),
          transparent: true
        });

      /* Rose */
      const rose = new THREE.Group();
      scene.add(rose);
      const RINGS = [3, 5, 7, 9, 11, 13, 15];
      const petals: any[] = [];
      RINGS.forEach((n, r) => {
        for (let i = 0; i < n; i++) {
          const pv = new THREE.Group();
          pv.rotation.y = (i / n) * 6.283 + r * 0.7;
          pv.position.y = r * 0.01;
          const m = new THREE.Mesh(geo, mat(pal[r].clone().lerp(acc[3], Math.random() * 0.18), 0.22));
          const s = 0.62 + r * 0.16;
          m.scale.set(s * 1.08, s, s);
          m.position.z = 0.012 + r * 0.04;
          pv.add(m);
          rose.add(pv);
          petals.push({
            m,
            r,
            closed: 0.03 + r * 0.015,
            open: 0.22 + r * 0.21 + rnd(-0.05, 0.05),
            a: rnd(0, 6.28),
            rad: rnd(0.8, 3.8),
            h: rnd(-0.6, 2.2),
            sp: rnd(0.8, 1.8) * (Math.random() < 0.5 ? -1 : 1),
            dl: rnd(0, 0.5),
            spin: new THREE.Vector3(rnd(-3, 3), rnd(-3, 3), rnd(-3, 3)),
            free: false,
            from: new THREE.Vector3()
          });
        }
      });

      /* Petal Storm */
      const N = window.innerWidth < 700 ? 300 : 520;
      const storm = new THREE.InstancedMesh(geo, mat(new THREE.Color(0xffffff), 0.12), N);
      const S: any[] = [];
      const D = new THREE.Object3D();
      for (let i = 0; i < N; i++) {
        storm.setColorAt(i, Math.random() < 0.6 ? pal[(Math.random() * 7) | 0] : acc[(Math.random() * 5) | 0]);
        S.push({
          a: rnd(0, 6.28),
          rad: rnd(0.5, 4.8),
          h: rnd(-2, 3),
          sp: rnd(0.7, 1.9) * (Math.random() < 0.5 ? -1 : 1),
          dl: rnd(0, 1.6),
          sc: rnd(0.15, 0.44),
          spin: new THREE.Vector3(rnd(-3, 3), rnd(-3, 3), rnd(-3, 3)),
          fly: rnd(0.6, 1.4)
        });
      }
      storm.visible = false;
      scene.add(storm);

      /* Golden Dust */
      const dc = document.createElement('canvas');
      dc.width = dc.height = 64;
      const dg = dc.getContext('2d')!;
      const gr = dg.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(255,236,190,1)');
      gr.addColorStop(0.35, 'rgba(255,200,120,0.5)');
      gr.addColorStop(1, 'rgba(255,200,120,0)');
      dg.fillStyle = gr;
      dg.fillRect(0, 0, 64, 64);

      const DN = 280;
      const dpos = new Float32Array(DN * 3);
      const dsp: number[] = [];
      for (let i = 0; i < DN; i++) {
        dpos.set([rnd(-5, 5), rnd(-3, 4), rnd(-4, 3)], i * 3);
        dsp.push(rnd(0.12, 0.5));
      }
      const dgeo = new THREE.BufferGeometry();
      dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
      const dmat = new THREE.PointsMaterial({
        size: 0.13,
        map: new THREE.CanvasTexture(dc),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      scene.add(new THREE.Points(dgeo, dmat));

      /* Post-processing */
      let comp: any = null;
      let bloom: any = null;
      let fx: any = null;
      if (THREE.EffectComposer && THREE.UnrealBloomPass) {
        comp = new THREE.EffectComposer(renderer);
        comp.setPixelRatio(DPR);
        comp.addPass(new THREE.RenderPass(scene, cam));
        bloom = new THREE.UnrealBloomPass(new THREE.Vector2(512, 512), 0.6, 0.8, 0.5);
        comp.addPass(bloom);
        fx = new THREE.ShaderPass({
          uniforms: { tDiffuse: { value: null }, time: { value: 0 }, amt: { value: 1 } },
          vertexShader:
            'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
          fragmentShader:
            'uniform sampler2D tDiffuse;uniform float time,amt;varying vec2 v;' +
            'float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}' +
            'void main(){vec2 d=v-.5;float r=dot(d,d);vec2 o=d*r*.05*amt;' +
            'vec3 c=vec3(texture2D(tDiffuse,v+o).r,texture2D(tDiffuse,v).g,texture2D(tDiffuse,v-o).b);' +
            'c*=1.-r*1.5;c+=(h(v*900.+time)-.5)*.045;gl_FragColor=vec4(c,1.);}'
        });
        comp.addPass(fx);
      }

      let W = 0, H = 0;
      function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        renderer.setSize(W, H, false);
        if (comp) {
          comp.setSize(W, H);
          bloom.setSize(W, H);
        }
        cam.aspect = W / H;
        cam.updateProjectionMatrix();
      }
      window.addEventListener('resize', resize);
      resize();

      /* Timeline */
      const tmp = new THREE.Vector3();
      let t0: number | null = null;
      let last = 0;
      let done = false;
      let textOn = false;
      let tagOn = false;

      function swirl(p: any, tau: number, out: any) {
        const k = eo(cl(tau, 0, 2.2));
        const sq = 1 - 0.55 * eio(cl(tau + T.detach, T.text - 0.6, T.text + 1.4));
        const a = p.a + p.sp * tau * 0.9;
        const r = p.rad * k * sq;
        return out.set(Math.cos(a) * r, 0.6 + p.h * k + Math.sin(tau * 2 + p.a) * 0.12, Math.sin(a) * r);
      }

      function finish() {
        if (done) return;
        done = true;
        window.removeEventListener('resize', resize);
        if (animId) cancelAnimationFrame(animId);
        try {
          renderer.dispose();
          geo.dispose();
          dgeo.dispose();
        } catch (e) {}
        if (ov && ov.parentNode) {
          ov.remove();
        }
        document.documentElement.style.overflow = prevOv;
        try {
          if (CFG.once) sessionStorage.setItem('jv-intro', '1');
        } catch (e) {}
        window.dispatchEvent(new CustomEvent('jardin:intro-done'));
      }

      cleanupFn = finish;

      function frame(now: number) {
        if (done || !isMounted) return;
        if (t0 === null) {
          t0 = now;
          last = now;
        }
        const t = (now - t0) / 1000;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;

        /* Camera */
        const bz = cam.aspect < 1 ? 11.5 : 7.8;
        const zf = t < T.detach ? lerp(1.18, 0.66, eio(cl(t, 0, T.detach))) : lerp(0.66, 1.02, eio(cl(t, T.detach, T.text)));
        const ang = Math.sin(t * 0.4) * 0.4;
        cam.position.set(
          Math.sin(ang) * bz * zf * 0.5 + Math.sin(t * 1.7) * 0.03,
          lerp(3.1, 1.6, eio(cl(t, 0, T.text))) + Math.sin(t * 1.3) * 0.03,
          Math.cos(ang) * bz * zf - eo(cl(t, T.exit, T.end))
        );
        cam.lookAt(look);

        /* Bloom + Detach */
        rose.rotation.y = t * 0.45;
        rose.position.y = Math.sin(t * 1.3) * 0.04;
        const fade = eo(cl(t, 0, 0.9));
        const out = 1 - cl(t, T.exit + 0.6, T.end);
        petals.forEach(p => {
          const m = p.m;
          m.material.opacity = fade * (p.free ? out : 1);
          if (!p.free) {
            const b = eo(cl(t - T.bloom - (6 - p.r) * 0.12, 0, 2.2));
            m.rotation.x = lerp(p.closed, p.open, b);
            m.material.emissiveIntensity = 1 + b * 1.4;
            if (t > T.detach + p.dl * 0.3) {
              rose.updateMatrixWorld(true);
              scene.attach(m);
              p.free = true;
              p.from.copy(m.position);
              p.t0 = t;
            }
          } else {
            const k = eio(cl(t - p.t0, 0, 1.6));
            swirl(p, t - T.detach, tmp);
            m.position.lerpVectors(p.from, tmp, k);
            m.rotation.x += p.spin.x * dt * k;
            m.rotation.y += p.spin.y * dt * k;
            m.rotation.z += p.spin.z * dt * k;
            m.position.z += eo(cl(t, T.exit, T.end)) * 14 * p.sp * p.sp * Math.sign(p.sp);
          }
        });

        if (t > T.detach - 0.3) {
          storm.visible = true;
          const f = eo(cl(t, T.exit, T.end));
          for (let i = 0; i < N; i++) {
            const p = S[i];
            const tau = t - (T.detach - 0.3) - p.dl;
            if (tau < 0) {
              D.scale.setScalar(0);
            } else {
              swirl(p, tau, D.position);
              D.position.z += f * 16 * p.fly;
              D.rotation.set(p.spin.x * tau, p.spin.y * tau, p.spin.z * tau);
              D.scale.setScalar(p.sc * eo(cl(tau, 0, 0.6)));
            }
            D.updateMatrix();
            storm.setMatrixAt(i, D.matrix);
          }
          storm.instanceMatrix.needsUpdate = true;
          storm.material.opacity = out;
        }

        /* Dust */
        for (let i = 0; i < DN; i++) {
          let y = dpos[i * 3 + 1] + dsp[i] * dt;
          if (y > 4) y = -3;
          dpos[i * 3 + 1] = y;
          dpos[i * 3] += Math.sin(t + i) * dt * 0.1;
        }
        dgeo.attributes.position.needsUpdate = true;
        dmat.opacity = 0.9 * eo(cl(t, 1, 3)) * out;

        /* Light, rays, glow */
        const bl = eo(cl(t, T.bloom, T.bloom + 2.4));
        const exitFade = 1 - cl(t, T.exit, T.end - 0.4);
        core.intensity = bl * 2.6 * (1 - cl(t, T.detach, T.text));
        const burst = Math.exp(-Math.pow((t - T.detach - 0.15) * 2.2, 2));
        rays.style.opacity = ((bl * 0.45 + burst * 0.5) * exitFade).toFixed(3);
        glow.style.opacity = (Math.min(1, bl * 0.8 + burst * 0.5) * (1 - 0.35 * cl(t, T.detach, T.text)) * exitFade).toFixed(3);
        glow.style.transform = 'scale(' + (1 + Math.sin(t * 1.6) * 0.04 + bl * 0.25 + burst * 0.2) + ')';
        if (bloom) {
          bloom.strength = 0.55 + bl * 0.45 + burst * 1.1 + cl(t, T.text, T.text + 0.8) * 0.25;
          fx.uniforms.time.value = t;
          fx.uniforms.amt.value = 1 + burst * 3;
        }

        /* Text reveal */
        if (!textOn && t > T.text) {
          textOn = true;
          ov.classList.add('on');
        }
        if (!tagOn && t > T.tag) {
          tagOn = true;
          ov.classList.add('tag');
        }
        if (t > T.exit) {
          ov.classList.add('out');
        }

        /* Exit: circular reveal */
        if (t > T.exit) {
          const R = eio(cl(t, T.exit, T.end)) * Math.hypot(W, H) * 0.62;
          const mk = `radial-gradient(circle at 50% 50%, transparent ${R}px, #000 ${R + 110}px)`;
          ov.style.webkitMaskImage = mk;
          ov.style.maskImage = mk;
        }

        if (comp) {
          comp.render();
        } else {
          renderer.render(scene, cam);
        }

        if (t >= T.end) {
          return finish();
        }

        animId = requestAnimationFrame(frame);
      }

      const fontPromise =
        document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fontPromise.then(() => {
        if (isMounted) {
          animId = requestAnimationFrame(frame);
        }
      });
    }

    init();

    return () => {
      isMounted = false;
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return null;
}
