import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DepthImageProps {
  imageSrc: string;
  depthSrc: string;
  className?: string;
  parallaxStrength?: number;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uImage;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;
  uniform float uParallax;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec4 depth = texture2D(uDepth, uv);

    // Displacement based on depth map + mouse position
    vec2 parallax = (uMouse - 0.5) * uParallax;
    float depthFactor = depth.r;

    // Multi-layer displacement for 2.5D feel
    vec2 offset = parallax * (depthFactor - 0.5) * 2.0;
    
    // Subtle wave shimmer
    float shimmer = sin(uTime * 0.5 + uv.y * 6.0) * 0.0015;
    offset.x += shimmer;

    vec4 color = texture2D(uImage, uv + offset);
    
    // Vignette
    float vig = smoothstep(1.2, 0.4, length(uv - 0.5));
    color.rgb *= vig;

    gl_FragColor = color;
  }
`;

export default function DepthImage({
  imageSrc,
  depthSrc,
  className = '',
  parallaxStrength = 0.08,
}: DepthImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
    };
    resize();
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    let imageTex: THREE.Texture | null = null;
    let depthTex: THREE.Texture | null = null;

    const uniforms = {
      uImage: { value: null as THREE.Texture | null },
      uDepth: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uParallax: { value: parallaxStrength },
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let loaded = 0;
    const onTexLoad = () => {
      loaded++;
      if (loaded === 2) {
        uniforms.uImage.value = imageTex;
        uniforms.uDepth.value = depthTex;
      }
    };

    imageTex = loader.load(imageSrc, onTexLoad);
    depthTex = loader.load(depthSrc, onTexLoad);
    imageTex.colorSpace = THREE.SRGBColorSpace;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.tx = x;
      mouseRef.current.ty = y;
    };

    container.addEventListener('mousemove', onMouseMove);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const dt = clock.getDelta();
      uniforms.uTime.value += dt;

      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      imageTex?.dispose();
      depthTex?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc, depthSrc, parallaxStrength]);

  return <div ref={containerRef} className={className} />;
}
