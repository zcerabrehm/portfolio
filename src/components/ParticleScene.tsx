import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  accent?: string;
  className?: string;
}

export default function ParticleScene({
  accent = "#ccff00",
  className = "",
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.WebGLRenderingContext) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mount = mountRef.current;
    if (!mount) return;

    let width = Math.max(mount.clientWidth || window.innerWidth, 1);
    let height = Math.max(mount.clientHeight || window.innerHeight, 1);
    let active = true;
    let running = false;

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

    const COUNT = reduce ? 900 : 2200;
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
    const onMove = (e: MouseEvent) => {
      if (!active) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onResize = () => {
      width = Math.max(mount.clientWidth || window.innerWidth, 1);
      height = Math.max(mount.clientHeight || window.innerHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", onResize);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onResize)
        : null;
    ro?.observe(mount);
    requestAnimationFrame(onResize);

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04;
      points.rotation.x = Math.sin(t * 0.15) * 0.08;
      points.position.x += (targetX * 0.35 - points.position.x) * 0.04;
      points.position.y += (-targetY * 0.22 - points.position.y) * 0.04;
      camera.position.x += (targetX * 0.18 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 0.12 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduce || running) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduce) {
      renderer.render(scene, camera);
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          active = Boolean(entry?.isIntersecting);
          if (active) start();
          else stop();
        },
        { threshold: 0.05 },
      );
      io.observe(mount);

      return () => {
        stop();
        io.disconnect();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        ro?.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    }

    return () => {
      stop();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
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
