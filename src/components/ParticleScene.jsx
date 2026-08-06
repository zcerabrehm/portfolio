import { useEffect, useRef } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

/**
 * Lightweight WebGL particle field for the hero backdrop.
 * Lazy-loaded so Three stays off the critical path.
 */
export default function ParticleScene({ accent = "#e8ff4d", className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.WebGLRenderingContext) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mount = mountRef.current;
    if (!mount) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 200);
    camera.position.z = 9;

    // Oversized cloud so rotation / parallax never exposes empty edges
    const COUNT = reduce ? 1200 : 2800;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const gold = new THREE.Color(accent);
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 42;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const c = gold.clone().lerp(white, Math.random() * 0.7);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.034,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let targetX = 0;
    let targetY = 0;
    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf;

    const tick = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04;
      points.rotation.x = Math.sin(t * 0.15) * 0.08;
      // Keep parallax subtle so the oversized field stays edge-to-edge
      points.position.x += (targetX * 0.35 - points.position.x) * 0.04;
      points.position.y += (-targetY * 0.22 - points.position.y) * 0.04;
      camera.position.x += (targetX * 0.18 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 0.12 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [accent]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}

ParticleScene.propTypes = {
  accent: PropTypes.string,
  className: PropTypes.string,
};
