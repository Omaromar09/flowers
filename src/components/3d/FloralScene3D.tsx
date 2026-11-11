'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FloralScene3DProps {
  className?: string;
  intensity?: number;
}

export default function FloralScene3D({ className = '', intensity = 1.0 }: FloralScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set up Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch {
      setIsSupported(false);
      return;
    }

    // Botanical Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7f0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd1, 2.2);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const roseRimLight = new THREE.DirectionalLight(0xb83a5d, 2.0);
    roseRimLight.position.set(-10, -6, 6);
    scene.add(roseRimLight);

    const softFillLight = new THREE.PointLight(0xf6e7e4, 1.5, 30);
    softFillLight.position.set(0, -4, 8);
    scene.add(softFillLight);

    // Create Organic Curved Petal Geometry
    function createCurvedPetalGeometry() {
      const geom = new THREE.BufferGeometry();
      const segmentsU = 12;
      const segmentsV = 16;
      const positions: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];

      for (let j = 0; j <= segmentsV; j++) {
        const v = j / segmentsV; // 0 (base) to 1 (tip)
        const widthScale = Math.sin(v * Math.PI) * (1 - v * 0.25);
        const curveZ = Math.sin(v * Math.PI * 0.8) * 0.45;

        for (let i = 0; i <= segmentsU; i++) {
          const u = (i / segmentsU - 0.5) * 2; // -1 to 1
          const x = u * widthScale * 0.9;
          const y = (v - 0.4) * 2.2;
          const z = curveZ + (u * u * 0.15);

          positions.push(x, y, z);
          normals.push(0, 0, 1);
          uvs.push(i / segmentsU, v);
        }
      }

      for (let j = 0; j < segmentsV; j++) {
        for (let i = 0; i < segmentsU; i++) {
          const a = j * (segmentsU + 1) + i;
          const b = a + 1;
          const c = a + (segmentsU + 1);
          const d = c + 1;

          indices.push(a, b, c);
          indices.push(b, d, c);
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geom.setIndex(indices);
      geom.computeVertexNormals();
      return geom;
    }

    const petalGeom = createCurvedPetalGeometry();

    // Palette of luxurious botanical petals
    const petalColors = [
      new THREE.Color(0xb83a5d), // Rose velvet
      new THREE.Color(0xd87d95), // Blush silk
      new THREE.Color(0xef889d), // Coral peony
      new THREE.Color(0xecd8d6), // Alabaster white petal
      new THREE.Color(0xf6d06e), // Golden pollen center
      new THREE.Color(0x5a1827)  // Deep burgundy
    ];

    const petalCount = window.innerWidth < 768 ? 28 : 55;
    const petals: {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      initialPos: THREE.Vector3;
      swayOffset: number;
    }[] = [];

    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < petalCount; i++) {
      const color = petalColors[i % petalColors.length];
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.08,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92
      });

      const mesh = new THREE.Mesh(petalGeom, material);

      const radius = 6 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius * (Math.random() > 0.5 ? 1 : -1);
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 12;

      mesh.position.set(x, y, z);
      const scale = 0.45 + Math.random() * 0.75;
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      group.add(mesh);

      petals.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          -0.008 - Math.random() * 0.012,
          (Math.random() - 0.5) * 0.01
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.015
        ),
        initialPos: new THREE.Vector3(x, y, z),
        swayOffset: Math.random() * Math.PI * 2
      });
    }

    // Centerpiece Organic 3D Rose Sculpture
    const flowerCenterGroup = new THREE.Group();
    group.add(flowerCenterGroup);
    flowerCenterGroup.position.set(3.5, 0.2, 0);

    const centerLayers = 5;
    const petalsPerLayer = [4, 6, 8, 10, 12];
    for (let l = 0; l < centerLayers; l++) {
      const layerRadius = 0.3 + l * 0.38;
      const count = petalsPerLayer[l];
      const layerColor = petalColors[l % petalColors.length];
      const layerMat = new THREE.MeshStandardMaterial({
        color: layerColor,
        roughness: 0.3,
        metalness: 0.05,
        side: THREE.DoubleSide
      });

      for (let p = 0; p < count; p++) {
        const phi = (p / count) * Math.PI * 2 + (l * 0.5);
        const pMesh = new THREE.Mesh(petalGeom, layerMat);
        const px = Math.cos(phi) * layerRadius;
        const py = Math.sin(phi) * layerRadius;
        pMesh.position.set(px, py, -l * 0.22);
        pMesh.rotation.z = phi + Math.PI / 2;
        pMesh.rotation.x = 0.5 + l * 0.18;
        const s = 0.5 + l * 0.22;
        pMesh.scale.set(s, s, s);
        flowerCenterGroup.add(pMesh);
      }
    }

    // Mouse Parallax Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 1.5;
      targetMouseY = y * 1.2;
    };

    const handleClick = () => {
      setHasInteracted(true);
      // Gentle radial pulse wave on click
      petals.forEach(p => {
        p.velocity.x += (Math.random() - 0.5) * 0.06;
        p.velocity.y += (Math.random() - 0.2) * 0.05;
        p.velocity.z += (Math.random() - 0.5) * 0.06;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('click', handleClick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Visible-in-viewport check
    let isVisible = true;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    });
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 2.5;
      camera.position.y = mouseY * 2.0;
      camera.lookAt(0, 0, 0);

      // Rotate centerpiece flower sculpture subtly
      if (!prefersReducedMotion) {
        flowerCenterGroup.rotation.y = elapsedTime * 0.12;
        flowerCenterGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.08;
      }

      // Animate floating petals
      if (!prefersReducedMotion) {
        petals.forEach(p => {
          p.mesh.position.y += p.velocity.y * intensity;
          p.mesh.position.x += Math.sin(elapsedTime + p.swayOffset) * 0.012 * intensity;
          p.mesh.position.z += p.velocity.z * intensity;

          p.mesh.rotation.x += p.rotSpeed.x;
          p.mesh.rotation.y += p.rotSpeed.y;
          p.mesh.rotation.z += p.rotSpeed.z;

          // Recycle petals that fall below view
          if (p.mesh.position.y < -8) {
            p.mesh.position.y = 8 + Math.random() * 2;
            p.mesh.position.x = (Math.random() - 0.5) * 16;
            p.mesh.position.z = (Math.random() - 0.5) * 10;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js memory cleanly
      petals.forEach(p => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach(m => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
      });
      petalGeom.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity]);

  if (!isSupported) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=85"
          alt="High-resolution luxury botanical garden roses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-alabaster)] via-transparent to-transparent opacity-80" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D Living Floral Experience"
      title="Click anywhere to stir the botanical petals"
    >
      <div className="absolute bottom-4 left-6 pointer-events-none z-10 hidden md:flex items-center gap-2 text-[10px] tracking-widest uppercase text-[var(--color-obsidian)]/50 bg-[var(--color-alabaster)]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--color-stone)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-burgundy)] animate-pulse" />
        Interactive 3D Flora • Move Cursor to Orbit • Click to Stir Petals
      </div>
    </div>
  );
}
