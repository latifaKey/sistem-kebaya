import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Camera,
  Sparkles,
  Box,
  Eye,
  Check,
  Maximize2
} from 'lucide-react';

export function Mannequin3DCanvas({
  selectedSilhouette,
  selectedColorway,
  selectedInner,
  selectedBawahan,
  selectedAccessories,
  rotationAngle,
  setRotationAngle,
  lightingMode,
  setLightingMode
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const mannequinGroupRef = useRef(null);
  const kebayaMeshRef = useRef(null);
  const innerMeshRef = useRef(null);
  const skirtMeshRef = useRef(null);
  const broochMeshRef = useRef(null);
  const lightsRef = useRef({});

  // View Mode: 'real' (Foto Asli Bywazu) vs '3d' (Model 3D Tiga Dimensi Three.js)
  const [viewMode, setViewMode] = useState('real');
  const [realAngle, setRealAngle] = useState('model'); // 'model', 'detail', 'jarik'
  const [photoZoom, setPhotoZoom] = useState(1);

  // 3D canvas controls
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationYRef = useRef(0);

  // Real photos mapped from authentic Bywazu Attire collection
  const currentRealImage = selectedColorway?.image || selectedSilhouette?.image || '/images/bywazu/bywazu_ariana_rose_gold.jpg';
  const currentRealName = selectedColorway?.bywazuName || selectedSilhouette?.bywazuName || 'Ariana Rose Gold';
  const currentCode = selectedSilhouette?.code || 'BWZ-01';

  // Helper to generate a procedural Batik texture for Three.js
  const createBatikTexture = (bgColor, patternColor) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor || '#2C1D18';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = patternColor || '#C9A35E';
    ctx.lineWidth = 6;
    for (let x = -512; x < 1024; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 512, 512);
      ctx.stroke();
    }

    ctx.fillStyle = '#D4AF37';
    for (let x = 24; x < 512; x += 48) {
      for (let y = 24; y < 512; y += 48) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 4);
    return texture;
  };

  // Initialize Three.js
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 550;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 2.0);
    dirLight.position.set(3, 4, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 0.9);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffeacc, 1.5, 8);
    rimLight.position.set(0, 2.5, -2);
    scene.add(rimLight);

    lightsRef.current = { ambient: ambientLight, dir: dirLight, fill: fillLight, rim: rimLight };

    // 5. Floor shadow receiver
    const floorGeo = new THREE.CircleGeometry(1.6, 64);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.35;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Subtle studio floor ring
    const ringGeo = new THREE.RingGeometry(1.2, 1.21, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc8b5b0, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.34;
    scene.add(ringMesh);

    // 6. Master Mannequin Group
    const mannequinGroup = new THREE.Group();
    mannequinGroup.position.y = -0.1;
    scene.add(mannequinGroup);
    mannequinGroupRef.current = mannequinGroup;

    // Stand & Base
    const brassMat = new THREE.MeshStandardMaterial({ color: 0x241d1a, roughness: 0.4, metalness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d261a, roughness: 0.5, metalness: 0.2 });

    const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.04, 32), brassMat);
    baseMesh.position.y = -1.32;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    mannequinGroup.add(baseMesh);

    const poleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.3, 16), brassMat);
    poleMesh.position.y = -0.2;
    poleMesh.castShadow = true;
    mannequinGroup.add(poleMesh);

    const knobMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 24, 24), woodMat);
    knobMesh.position.y = 1.05;
    knobMesh.castShadow = true;
    mannequinGroup.add(knobMesh);

    const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.16, 24), woodMat);
    neckMesh.position.y = 0.94;
    neckMesh.castShadow = true;
    mannequinGroup.add(neckMesh);

    // Torso Linen Base
    const torsoMat = new THREE.MeshStandardMaterial({ color: 0xEEE7DF, roughness: 0.8, metalness: 0.05 });
    const torsoGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.85, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
    torsoMesh.position.y = 0.48;
    torsoMesh.scale.set(1.25, 1, 0.75);
    torsoMesh.castShadow = true;
    mannequinGroup.add(torsoMesh);

    // Bust volume
    const bustLeft = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), torsoMat);
    bustLeft.position.set(-0.11, 0.62, 0.09);
    bustLeft.scale.set(1, 0.9, 0.85);
    mannequinGroup.add(bustLeft);

    const bustRight = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), torsoMat);
    bustRight.position.set(0.11, 0.62, 0.09);
    bustRight.scale.set(1, 0.9, 0.85);
    mannequinGroup.add(bustRight);

    // Inner / Kamisol Layer
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColorway?.accentHex || 0x222222),
      roughness: 0.35,
      metalness: 0.25,
      transparent: true,
      opacity: 0.95
    });
    const innerGeo = new THREE.CylinderGeometry(0.25, 0.23, 0.55, 32);
    const innerMesh = new THREE.Mesh(innerGeo, innerMaterial);
    innerMesh.position.y = 0.52;
    innerMesh.scale.set(1.28, 1, 0.8);
    mannequinGroup.add(innerMesh);
    innerMeshRef.current = innerMesh;

    // Kebaya Top (Brokat / Lace Layer)
    const kebayaMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColorway?.hex || '#D98897'),
      roughness: 0.5,
      metalness: 0.15,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      transparent: true,
      opacity: 0.95
    });

    const kebayaTopGroup = new THREE.Group();
    mannequinGroup.add(kebayaTopGroup);
    kebayaMeshRef.current = kebayaTopGroup;

    // Bodice
    const bodiceMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.62, 32), kebayaMaterial);
    bodiceMesh.position.y = 0.54;
    bodiceMesh.scale.set(1.3, 1, 0.82);
    bodiceMesh.castShadow = true;
    kebayaTopGroup.add(bodiceMesh);

    // Sleeves
    const sleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.05, 0.72, 24), kebayaMaterial);
    sleeveL.position.set(-0.35, 0.44, 0);
    sleeveL.rotation.z = 0.18;
    sleeveL.castShadow = true;
    kebayaTopGroup.add(sleeveL);

    const sleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.05, 0.72, 24), kebayaMaterial);
    sleeveR.position.set(0.35, 0.44, 0);
    sleeveR.rotation.z = -0.18;
    sleeveR.castShadow = true;
    kebayaTopGroup.add(sleeveR);

    // Lower flare
    const flareMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.38, 0.38, 32), kebayaMaterial);
    flareMesh.position.y = 0.15;
    flareMesh.scale.set(1.25, 1, 0.85);
    flareMesh.castShadow = true;
    kebayaTopGroup.add(flareMesh);

    // Skirt / Bawahan (Batik Cloth)
    const batikTex = createBatikTexture(selectedBawahan?.patternBg, selectedBawahan?.patternColor);
    const skirtMaterial = new THREE.MeshStandardMaterial({
      map: batikTex,
      roughness: 0.75,
      metalness: 0.05
    });
    const skirtGeo = new THREE.CylinderGeometry(0.27, 0.32, 1.15, 32);
    const skirtMesh = new THREE.Mesh(skirtGeo, skirtMaterial);
    skirtMesh.position.y = -0.42;
    skirtMesh.scale.set(1.2, 1, 0.8);
    skirtMesh.castShadow = true;
    skirtMesh.receiveShadow = true;
    mannequinGroup.add(skirtMesh);
    skirtMeshRef.current = skirtMesh;

    // Keraton Gold Brooch
    const broochMat = new THREE.MeshStandardMaterial({ color: 0xE5C158, metalness: 0.9, roughness: 0.2 });
    const broochMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.015, 16), broochMat);
    broochMesh.position.set(0, 0.65, 0.17);
    broochMesh.rotation.x = Math.PI / 2;
    mannequinGroup.add(broochMesh);
    broochMeshRef.current = broochMesh;

    // Mouse Interaction
    const domElement = renderer.domElement;
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      setIsAutoRotating(false);
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      targetRotationYRef.current += deltaX * 0.012;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDraggingRef.current = false; };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setIsAutoRotating(false);
      }
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      targetRotationYRef.current += deltaX * 0.012;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => { isDraggingRef.current = false; };

    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isAutoRotating) {
        targetRotationYRef.current += 0.008;
      }

      if (mannequinGroupRef.current) {
        mannequinGroupRef.current.rotation.y += (targetRotationYRef.current - mannequinGroupRef.current.rotation.y) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animationFrameId);
      if (domElement.parentNode) domElement.parentNode.removeChild(domElement);
      renderer.dispose();
    };
  }, []);

  // Update Three.js Materials dynamically when props change
  useEffect(() => {
    if (!kebayaMeshRef.current) return;
    const color = new THREE.Color(selectedColorway?.hex || '#D98897');
    kebayaMeshRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color = color;
        child.material.needsUpdate = true;
      }
    });

    if (innerMeshRef.current) {
      innerMeshRef.current.material.color = new THREE.Color(selectedColorway?.accentHex || 0x222222);
      innerMeshRef.current.material.needsUpdate = true;
    }

    if (skirtMeshRef.current && selectedBawahan) {
      const tex = createBatikTexture(selectedBawahan.patternBg, selectedBawahan.patternColor);
      skirtMeshRef.current.material.map = tex;
      skirtMeshRef.current.material.needsUpdate = true;
    }

    if (broochMeshRef.current) {
      const hasBrooch = selectedAccessories?.some(a => a.id === 'bros-keraton');
      broochMeshRef.current.visible = Boolean(hasBrooch);
    }
  }, [selectedColorway, selectedBawahan, selectedAccessories, selectedSilhouette]);

  // Update Rotation Angle when Preset is clicked
  useEffect(() => {
    const rad = (rotationAngle * Math.PI) / 180;
    targetRotationYRef.current = rad;
  }, [rotationAngle]);

  // Update Lighting Mode
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights.ambient || !lights.dir) return;

    if (lightingMode === 'ballroom') {
      lights.ambient.color.setHex(0x553333);
      lights.ambient.intensity = 1.0;
      lights.dir.color.setHex(0xffcb99);
      lights.dir.intensity = 2.4;
      lights.rim.color.setHex(0xffaa66);
    } else if (lightingMode === 'sunset') {
      lights.ambient.color.setHex(0x664433);
      lights.ambient.intensity = 1.1;
      lights.dir.color.setHex(0xff9966);
      lights.dir.intensity = 2.5;
      lights.rim.color.setHex(0xff5533);
    } else {
      lights.ambient.color.setHex(0xffffff);
      lights.ambient.intensity = 1.3;
      lights.dir.color.setHex(0xfff5ea);
      lights.dir.intensity = 2.0;
      lights.rim.color.setHex(0xffeacc);
    }
  }, [lightingMode]);

  // Zoom Handler for 3D
  const handleZoom = (factor) => {
    if (!cameraRef.current) return;
    const newZ = Math.max(2.8, Math.min(5.5, cameraRef.current.position.z + factor));
    cameraRef.current.position.z = newZ;
  };

  // Determine which real image to display based on selected angle
  const getDisplayPhoto = () => {
    if (realAngle === 'detail') {
      return '/images/bywazu/bywazu_ariana_rose_gold.jpg';
    }
    if (realAngle === 'jarik') {
      return '/images/bywazu/bywazu_couple_batik.jpg';
    }
    return currentRealImage;
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden glass-panel shadow-sm flex items-center justify-center border border-stone-200/60 select-none bg-stone-50">
      
      {/* Three.js Canvas Container (Always active in background or foreground) */}
      <div 
        ref={mountRef} 
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-300 ${
          viewMode === '3d' ? 'opacity-100 relative z-10' : 'opacity-0 pointer-events-none absolute inset-0'
        }`} 
      />

      {/* MODE 1: FOTO ASLI KOLEKSI BYWAZU (HIGH RESOLUTION REAL LOOKBOOK) */}
      {viewMode === 'real' && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FBF8F6] to-[#F5EFEA]">
          
          {/* Main Real Image with Interactive Zoom */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden group cursor-zoom-in">
            <img
              src={getDisplayPhoto()}
              alt={currentRealName}
              style={{ transform: `scale(${photoZoom})` }}
              className="w-full h-full object-cover transition-transform duration-500 ease-out"
              onClick={() => setPhotoZoom(photoZoom === 1 ? 1.4 : 1)}
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-stone-900/10 pointer-events-none" />

            {/* Top Left: Real Picture Authentic Badge */}
            <div className="absolute top-16 left-5 z-20 pointer-events-none">
              <div className="btn-glass px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 shadow-xs border border-white/80 bg-white/90">
                <Camera className="w-3.5 h-3.5 text-[#7A1C30]" />
                <span className="font-bold text-stone-900">100% Foto Asli Koleksi</span>
                <span className="text-stone-300">&bull;</span>
                <span className="text-[#7A1C30] font-bold">Bywazu Attire</span>
              </div>
            </div>

            {/* Top Right: Zoom Button for Real Photo */}
            <div className="absolute top-16 right-5 z-20 flex items-center gap-2">
              <button
                onClick={() => setPhotoZoom(photoZoom === 1 ? 1.4 : 1)}
                className="btn-glass p-2 rounded-full text-stone-800 hover:text-[#7A1C30] transition-colors shadow-xs cursor-pointer bg-white/90"
                title={photoZoom === 1 ? "Zoom Detail Payet" : "Reset Zoom"}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Info Bar of Real Photo */}
            <div className="absolute bottom-5 inset-x-5 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-auto">
              <div className="text-white drop-shadow-md">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7A1C30] text-rose-100 text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                  {currentCode} &bull; Model Asli Studio
                </span>
                <h3 className="font-serif text-2xl font-bold leading-tight">
                  {currentRealName}
                </h3>
                <p className="text-xs text-rose-100/90 font-light mt-0.5">
                  Bordir payet handmade &bull; Jahitan pas badan Bywazu Mojokerto
                </p>
              </div>

              {/* Real Photo Angle Selector Pills */}
              <div className="btn-glass p-1 rounded-full flex items-center text-xs bg-white/85 shadow-md border border-white">
                <button
                  onClick={() => setRealAngle('model')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    realAngle === 'model' ? 'btn-glass-primary shadow-xs' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Model Depan
                </button>
                <button
                  onClick={() => setRealAngle('detail')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    realAngle === 'detail' ? 'btn-glass-primary shadow-xs' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Detail Payet
                </button>
                <button
                  onClick={() => setRealAngle('jarik')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    realAngle === 'jarik' ? 'btn-glass-primary shadow-xs' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Kain Jarik
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TOP FLOATING TOGGLE: MODE FOTO ASLI vs 3D VIRTUAL MODEL */}
      <div className="absolute top-4 inset-x-0 mx-auto w-fit z-30 btn-glass p-1 rounded-full flex items-center shadow-lg border border-white/90 bg-white/90">
        <button
          onClick={() => { setViewMode('real'); setPhotoZoom(1); }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            viewMode === 'real'
              ? 'btn-glass-primary shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-rose-300" />
          <span>📸 Foto Asli Koleksi</span>
        </button>

        <button
          onClick={() => setViewMode('3d')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            viewMode === '3d'
              ? 'btn-glass-primary shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Box className="w-3.5 h-3.5 text-[#7A1C30]" />
          <span>🌐 3D Virtual Model</span>
        </button>
      </div>

      {/* MODE 2: CONTROLS FOR 3D VIEWPORT */}
      {viewMode === '3d' && (
        <>
          {/* Top Left: Clean Editorial Info Pill */}
          <div className="absolute top-16 left-5 z-20 pointer-events-none">
            <div className="btn-glass px-4 py-2 rounded-full text-xs font-medium tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-stone-900">Three.js 3D Viewport</span>
              <span className="text-stone-400">|</span>
              <span className="text-stone-600 capitalize">{selectedSilhouette?.name}</span>
            </div>
          </div>

          {/* Top Right: Glass Controls for Lighting & Zoom */}
          <div className="absolute top-16 right-5 z-20 flex items-center gap-2">
            <div className="btn-glass p-1 rounded-full flex items-center text-xs">
              <button
                onClick={() => setLightingMode('studio')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  lightingMode === 'studio' ? 'btn-glass-primary shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Studio
              </button>
              <button
                onClick={() => setLightingMode('ballroom')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  lightingMode === 'ballroom' ? 'btn-glass-primary shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Ballroom
              </button>
              <button
                onClick={() => setLightingMode('sunset')}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  lightingMode === 'sunset' ? 'btn-glass-primary shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sunset
              </button>
            </div>

            <button
              onClick={() => handleZoom(-0.5)}
              className="btn-glass w-8 h-8 rounded-full flex items-center justify-center text-stone-700 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(0.5)}
              className="btn-glass w-8 h-8 rounded-full flex items-center justify-center text-stone-700 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`btn-glass w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isAutoRotating ? 'text-[#7A1C30] font-bold' : 'text-stone-600'
              }`}
              title="Auto Rotate 360"
            >
              {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Drag Instruction Cue */}
          <div className="absolute top-28 left-5 z-20 pointer-events-none hidden sm:block">
            <span className="text-[11px] text-stone-400 font-sans tracking-wide">
              Klik & seret untuk putar manekin 360° secara bebas
            </span>
          </div>

          {/* Bottom Bar: Rotation Presets Glass Pill */}
          <div className="absolute bottom-5 inset-x-5 z-20 flex items-center justify-between pointer-events-auto">
            <div className="btn-glass p-1 rounded-full flex items-center text-xs">
              <span className="text-[11px] font-semibold text-stone-400 pl-3 pr-2">Sudut:</span>
              {[
                { label: 'Depan (0°)', deg: 0 },
                { label: 'Serong (45°)', deg: 45 },
                { label: 'Samping (90°)', deg: 90 },
                { label: 'Belakang (180°)', deg: 180 },
              ].map((item) => (
                <button
                  key={item.deg}
                  onClick={() => { setRotationAngle(item.deg); setIsAutoRotating(false); }}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                    rotationAngle === item.deg
                      ? 'btn-glass-primary shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quick Picture-in-Picture link back to Real Photo */}
            <button
              onClick={() => setViewMode('real')}
              className="btn-glass px-4 py-1.5 rounded-full text-xs font-semibold text-[#7A1C30] hover:bg-rose-50 flex items-center gap-1.5 shadow-xs border border-rose-200 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#7A1C30]" />
              <span>Lihat Foto Asli</span>
            </button>
          </div>
        </>
      )}

    </div>
  );
}
