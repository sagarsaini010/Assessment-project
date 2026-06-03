import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = ({ category }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight || 380;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0xf8fafc, 1); // light bg
    mount.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(3, 2.5, 4.5);
    camera.lookAt(0, 0, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dLight.position.set(5, 8, 5);
    dLight.castShadow = true;
    scene.add(dLight);
    const pL1 = new THREE.PointLight(0x3b96f6, 2, 15);
    pL1.position.set(-3, 3, -2);
    scene.add(pL1);
    const pL2 = new THREE.PointLight(0x7c3aed, 1.2, 12);
    pL2.position.set(3, -1, 3);
    scene.add(pL2);

    // Geometry by category
    const cat = (category || '').toLowerCase();
    let geometry;
    if (cat.includes('furn'))      geometry = new THREE.BoxGeometry(2, 2, 2, 3, 3, 3);
    else if (cat.includes('elec')) geometry = new THREE.CylinderGeometry(0.1, 1.4, 2.2, 6);
    else if (cat.includes('cloth') || cat.includes('sport')) geometry = new THREE.TorusGeometry(1.1, 0.4, 16, 80);
    else if (cat.includes('food')) geometry = new THREE.SphereGeometry(1.3, 32, 32);
    else                           geometry = new THREE.OctahedronGeometry(1.4, 1);

    // Canvas texture with light palette
    const tc = document.createElement('canvas');
    tc.width = 512; tc.height = 512;
    const cx = tc.getContext('2d');
    const g = cx.createLinearGradient(0, 0, 512, 512);
    g.addColorStop(0, '#3b96f6');
    g.addColorStop(0.5, '#7c3aed');
    g.addColorStop(1, '#06b6d4');
    cx.fillStyle = g;
    cx.fillRect(0, 0, 512, 512);
    cx.strokeStyle = 'rgba(255,255,255,0.18)';
    cx.lineWidth = 1;
    for (let i = 0; i <= 512; i += 32) {
      cx.beginPath(); cx.moveTo(i, 0); cx.lineTo(i, 512); cx.stroke();
      cx.beginPath(); cx.moveTo(0, i); cx.lineTo(512, i); cx.stroke();
    }
    const texture = new THREE.CanvasTexture(tc);

    const material = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.2, roughness: 0.4 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    scene.add(mesh);

    // Wireframe
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    scene.add(wireMesh);

    // Grid (light)
    const grid = new THREE.GridHelper(10, 20, 0xdde1e7, 0xe8ecf1);
    grid.position.y = -2;
    scene.add(grid);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.y += 0.007;
      mesh.rotation.x += 0.002;
      wireMesh.rotation.copy(mesh.rotation);
      pL1.position.set(Math.sin(Date.now() * 0.001) * 4, 3, Math.cos(Date.now() * 0.001) * 4);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [category]);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-600 text-slate-500 ml-1" style={{fontFamily:'JetBrains Mono'}}>3D Preview</span>
        </div>
        <span className="text-xs text-slate-400">Drag · Scroll to zoom</span>
      </div>
      {/* Canvas */}
      <div ref={mountRef} className="flex-1 min-h-72" style={{minHeight: '320px'}} />
    </div>
  );
};

export default ThreeScene;
