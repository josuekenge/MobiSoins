'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const AMOUNTX = 80;  // points per line
    const AMOUNTY = 20;  // number of lines
    const SPACING_X = 80;
    const SPACING_Z = 120;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 2000, 8000);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 500, 2200);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    containerRef.current.appendChild(renderer.domElement);

    // Create one line per Z row
    const lines: { line: THREE.Line; geometry: THREE.BufferGeometry }[] = [];

    for (let iy = 0; iy < AMOUNTY; iy++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(AMOUNTX * 3);

      for (let ix = 0; ix < AMOUNTX; ix++) {
        positions[ix * 3]     = ix * SPACING_X - (AMOUNTX * SPACING_X) / 2;
        positions[ix * 3 + 1] = 0;
        positions[ix * 3 + 2] = iy * SPACING_Z - (AMOUNTY * SPACING_Z) / 2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Fade lines in the distance using opacity
      const opacity = 0.15 + (iy / AMOUNTY) * 0.85;
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(0.24, 0.73, 0.24),
        transparent: true,
        opacity,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push({ line, geometry });
    }

    let count = 0;
    let animationId: number = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      lines.forEach(({ geometry }, iy) => {
        const pos = geometry.attributes.position.array as Float32Array;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          // Classic 3D wave — both ix and iy drive the Y so the whole surface ripples
          pos[ix * 3 + 1] =
            Math.sin((ix + count) * 0.3) * 80 +
            Math.sin((iy + count) * 0.5) * 80;
        }
        geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
      count += 0.07;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    sceneRef.current = { renderer, animationId };

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        lines.forEach(({ geometry, line }) => {
          geometry.dispose();
          (line.material as THREE.Material).dispose();
        });
        sceneRef.current.renderer.dispose();
        if (containerRef.current && sceneRef.current.renderer.domElement) {
          containerRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 -z-10', className)}
      {...props}
    />
  );
}
