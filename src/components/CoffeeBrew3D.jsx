import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CoffeeBrew3D({ scrollProgress = 0, interactive = true }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  // References to animateable 3D parts
  const apparatusGroupRef = useRef(null);
  const liquidLevelRef = useRef(null);
  const steamParticlesRef = useRef(null);
  const streamMeshRef = useRef(null);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 600;

    // ─── Scene & Camera ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // ─── Renderer ───────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ─── Lighting Setup (Warm Luxury Studio) ─────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.9);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfffaf0, 2.8);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Rich ember/burnt-orange rim light from behind
    const rimLight = new THREE.DirectionalLight(0xd85820, 3.2);
    rimLight.position.set(-3.5, 2, -2.5);
    scene.add(rimLight);

    // Accent gold fill light
    const goldFill = new THREE.PointLight(0xdfb15b, 1.8, 10);
    goldFill.position.set(1.5, -0.5, 2);
    scene.add(goldFill);

    // ─── Materials ──────────────────────────────────────────────────
    // Handcrafted 24k Brushed Gold / Brass PBR
    const brassGoldMat = new THREE.MeshStandardMaterial({
      color: 0xdfb15b,
      metalness: 0.94,
      roughness: 0.22,
      envMapIntensity: 1.5,
    });

    // Dark Volcanic Walnut Wood for collar
    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x24160e,
      roughness: 0.65,
      metalness: 0.1,
    });

    // Refractive Borosilicate Glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      thickness: 1.4,
      specularIntensity: 1.2,
      specularColor: 0xfff0dd,
    });

    // Dark Ground Coffee Bed
    const coffeeGroundsMat = new THREE.MeshStandardMaterial({
      color: 0x1f130b,
      roughness: 0.95,
      metalness: 0.05,
    });

    // Rich Golden Amber Liquid
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x9e3f12,
      roughness: 0.15,
      metalness: 0.3,
      transparent: true,
      opacity: 0.88,
    });

    // ─── Master Apparatus Group ──────────────────────────────────────
    const apparatus = new THREE.Group();
    apparatusGroupRef.current = apparatus;
    scene.add(apparatus);

    // 1. Decanter / Glass Carafe Base (Lathe Profile)
    const decanterPoints = [];
    decanterPoints.push(new THREE.Vector2(0, -1.4));
    decanterPoints.push(new THREE.Vector2(0.95, -1.4)); // flat base
    decanterPoints.push(new THREE.Vector2(1.1, -1.3));
    decanterPoints.push(new THREE.Vector2(1.2, -0.8)); // wide belly
    decanterPoints.push(new THREE.Vector2(0.9, -0.2));
    decanterPoints.push(new THREE.Vector2(0.55, 0.4)); // narrow neck
    decanterPoints.push(new THREE.Vector2(0.58, 0.65)); // collar rim
    decanterPoints.push(new THREE.Vector2(0.68, 0.8)); // opening flare

    const decanterGeo = new THREE.LatheGeometry(decanterPoints, 48);
    const decanterMesh = new THREE.Mesh(decanterGeo, glassMat);
    decanterMesh.castShadow = true;
    decanterMesh.receiveShadow = true;
    apparatus.add(decanterMesh);

    // 2. Liquid in Decanter
    const liquidPoints = [];
    liquidPoints.push(new THREE.Vector2(0, -1.38));
    liquidPoints.push(new THREE.Vector2(0.92, -1.38));
    liquidPoints.push(new THREE.Vector2(1.08, -1.28));
    liquidPoints.push(new THREE.Vector2(1.15, -0.85));
    liquidPoints.push(new THREE.Vector2(0.95, -0.45));
    liquidPoints.push(new THREE.Vector2(0, -0.45));

    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 36);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0;
    liquidMesh.scale.set(0.98, 0.6, 0.98); // Initial liquid level
    apparatus.add(liquidMesh);
    liquidLevelRef.current = liquidMesh;

    // 3. Walnut Neck Collar & Brass Tie
    const collarGeo = new THREE.CylinderGeometry(0.57, 0.6, 0.35, 48);
    const collarMesh = new THREE.Mesh(collarGeo, walnutMat);
    collarMesh.position.y = 0.52;
    apparatus.add(collarMesh);

    const brassBandGeo = new THREE.TorusGeometry(0.59, 0.025, 16, 48);
    const brassBandMesh = new THREE.Mesh(brassBandGeo, brassGoldMat);
    brassBandMesh.position.y = 0.52;
    brassBandMesh.rotation.x = Math.PI / 2;
    apparatus.add(brassBandMesh);

    // 4. Conical V60 Brass Dripper Cone (Resting atop decanter)
    const conePoints = [];
    conePoints.push(new THREE.Vector2(0.18, 0.78)); // exit hole
    conePoints.push(new THREE.Vector2(0.24, 0.82));
    conePoints.push(new THREE.Vector2(0.85, 1.65)); // top flare
    conePoints.push(new THREE.Vector2(0.90, 1.70)); // top folded lip
    conePoints.push(new THREE.Vector2(0.84, 1.68));

    const dripperGeo = new THREE.LatheGeometry(conePoints, 48);
    const dripperMesh = new THREE.Mesh(dripperGeo, brassGoldMat);
    dripperMesh.castShadow = true;
    apparatus.add(dripperMesh);

    // Spiral Ribs on Dripper (12 elegant spiral ridges)
    const ribsGroup = new THREE.Group();
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const ribCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(angle) * 0.22, 0.85, Math.sin(angle) * 0.22),
        new THREE.Vector3(
          Math.cos(angle + 0.35) * 0.52,
          1.25,
          Math.sin(angle + 0.35) * 0.52
        ),
        new THREE.Vector3(
          Math.cos(angle + 0.6) * 0.84,
          1.65,
          Math.sin(angle + 0.6) * 0.84
        ),
      ]);
      const ribGeo = new THREE.TubeGeometry(ribCurve, 20, 0.015, 8, false);
      const ribMesh = new THREE.Mesh(ribGeo, brassGoldMat);
      ribsGroup.add(ribMesh);
    }
    apparatus.add(ribsGroup);

    // 5. Paper Filter & Coffee Bed inside Dripper
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xeee6d8,
      roughness: 0.9,
    });
    const filterGeo = new THREE.ConeGeometry(0.78, 0.82, 36, 1, true);
    filterGeo.rotateX(Math.PI);
    const filterMesh = new THREE.Mesh(filterGeo, paperMat);
    filterMesh.position.y = 1.25;
    apparatus.add(filterMesh);

    // Ground Coffee Bed
    const groundsGeo = new THREE.CylinderGeometry(0.68, 0.45, 0.28, 36);
    const groundsMesh = new THREE.Mesh(groundsGeo, coffeeGroundsMat);
    groundsMesh.position.y = 1.32;
    apparatus.add(groundsMesh);

    // 6. Extraction Liquid Stream (Falling from dripper into carafe)
    const streamCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0.75, 0),
      new THREE.Vector3(0, -0.45, 0)
    );
    const streamGeo = new THREE.TubeGeometry(streamCurve, 10, 0.022, 8, false);
    const streamMesh = new THREE.Mesh(streamGeo, liquidMat);
    apparatus.add(streamMesh);
    streamMeshRef.current = streamMesh;

    // 7. Rising Steam Particles
    const steamCount = 35;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    const steamVel = new Float32Array(steamCount * 3);

    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 0.4;
      steamPos[i * 3 + 1] = 1.5 + Math.random() * 0.8;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      steamVel[i * 3] = (Math.random() - 0.5) * 0.003;
      steamVel[i * 3 + 1] = 0.006 + Math.random() * 0.008;
      steamVel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffe4cc,
      size: 0.12,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const steamParticles = new THREE.Points(steamGeo, steamMat);
    apparatus.add(steamParticles);
    steamParticlesRef.current = { points: steamParticles, vel: steamVel, count: steamCount };

    // Initial apparatus position
    apparatus.position.y = -0.15;
    apparatus.rotation.y = -0.35;

    // ─── Mouse Parallax ─────────────────────────────────────────────
    let targetRotY = -0.35;
    let targetRotX = 0;
    let currentRotY = -0.35;
    let currentRotX = 0;

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = -0.35 + normX * 0.25;
      targetRotX = normY * 0.12;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ─── Window Resize ──────────────────────────────────────────────
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ─── Animation Render Loop ──────────────────────────────────────
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse rotation damping
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;

      if (apparatus) {
        apparatus.rotation.y = currentRotY + Math.sin(elapsedTime * 0.5) * 0.03;
        apparatus.rotation.x = currentRotX + Math.cos(elapsedTime * 0.7) * 0.02;

        // Subtle floating movement
        apparatus.position.y = -0.15 + Math.sin(elapsedTime * 1.2) * 0.03;
      }

      // Animate Steam Particles
      if (steamParticlesRef.current) {
        const { points, vel, count } = steamParticlesRef.current;
        const positions = points.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
          positions[i * 3 + 1] += vel[i * 3 + 1];
          positions[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.001;

          if (positions[i * 3 + 1] > 2.5) {
            positions[i * 3 + 1] = 1.4;
            positions[i * 3] = (Math.random() - 0.5) * 0.4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
      }

      // Stream flow pulsation
      if (streamMeshRef.current) {
        streamMeshRef.current.scale.x = 0.9 + Math.sin(elapsedTime * 8) * 0.15;
        streamMeshRef.current.scale.z = 0.9 + Math.sin(elapsedTime * 8) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  // Update 3D liquid level & camera angle as user scrolls
  useEffect(() => {
    if (liquidLevelRef.current) {
      // Scale liquid level with scroll
      const scaleY = 0.5 + scrollProgress * 0.7;
      liquidLevelRef.current.scale.set(0.98, scaleY, 0.98);
    }

    if (apparatusGroupRef.current) {
      // Rotate apparatus smoothly with scroll
      apparatusGroupRef.current.rotation.y = -0.35 + scrollProgress * 1.5;
    }
  }, [scrollProgress]);

  if (!hasWebGL) {
    // Graceful fallback for non-WebGL devices
    return (
      <div className="coffee-brew-fallback">
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=1200&q=85&auto=format"
          alt="Artisanal pour over coffee brewing vessel"
          className="coffee-brew-fallback__img"
        />
        <div className="coffee-brew-fallback__caption">
          <span>Artisanal Extraction</span>
          <strong>Precision Brass & Borosilicate Dripper</strong>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="coffee-brew-3d-canvas"
      aria-label="Interactive 3D Artisanal Coffee Pour-Over Brewing Apparatus"
    />
  );
}
