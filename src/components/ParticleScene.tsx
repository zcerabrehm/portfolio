import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  accent?: string;
  className?: string;
}

function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(Math.PI * 2 * v);
}

function clampGauss(scale: number, limit: number) {
  return Math.max(-limit, Math.min(limit, gauss() * scale));
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
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const mount = mountRef.current;
    if (!mount) return;

    let width = Math.max(mount.clientWidth || window.innerWidth, 1);
    let height = Math.max(mount.clientHeight || window.innerHeight, 1);
    let active = true;
    let running = false;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height, false);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.transform = "none";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const fov = mobile ? 58 : 70;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 200);
    camera.position.set(0, 0, mobile ? 10 : 9);
    camera.lookAt(0, 0, 0);

    const COUNT = reduce ? 180 : mobile ? 360 : 520;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const gold = new THREE.Color(accent);
    const white = new THREE.Color("#ffffff");

    // Aspect-aware, center-weighted cloud so portrait doesn't bias sideways
    const aspect = width / height;
    const spreadX = mobile ? 11 * Math.max(aspect, 0.55) * 2.2 : 21;
    const spreadY = mobile ? 16 : 14;
    const spreadZ = mobile ? 8 : 9;

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = clampGauss(spreadX * 0.38, spreadX);
      positions[i * 3 + 1] = clampGauss(spreadY * 0.38, spreadY);
      positions[i * 3 + 2] = clampGauss(spreadZ * 0.38, spreadZ);
      const c = gold.clone().lerp(white, Math.random() * 0.7);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
    if (geometry.boundingSphere) {
      const { center } = geometry.boundingSphere;
      geometry.translate(-center.x, -center.y, -center.z);
    }

    const material = new THREE.PointsMaterial({
      size: mobile ? 0.042 : 0.034,
      vertexColors: true,
      transparent: true,
      opacity: mobile ? 0.68 : 0.72,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(0, 0, 0);
    scene.add(points);

    const onResize = () => {
      width = Math.max(mount.clientWidth || window.innerWidth, 1);
      height = Math.max(mount.clientHeight || window.innerHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      camera.position.set(0, 0, mobile ? 10 : 9);
      camera.lookAt(0, 0, 0);
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
    const rotY = mobile ? 0.012 : 0.04;
    const rotXAmp = mobile ? 0.03 : 0.08;

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      // Gentle spin around origin — no lateral drift
      points.rotation.y = t * rotY;
      points.rotation.x = Math.sin(t * 0.12) * rotXAmp;
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
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
