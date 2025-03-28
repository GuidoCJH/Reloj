import * as THREE from 'three';

// Configuración Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('quantum-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Geometría Cuántica
const geometry = new THREE.IcosahedronGeometry(1, 5);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
});
const quantumMesh = new THREE.Mesh(geometry, material);
scene.add(quantumMesh);
camera.position.z = 3;

// WebSocket
const ws = new WebSocket('ws://localhost:8080');
let timeData = {};

ws.onmessage = (e) => {
    timeData = JSON.parse(e.data);
};

// Animación
function animate() {
    requestAnimationFrame(animate);
    
    quantumMesh.rotation.x += 0.01;
    quantumMesh.rotation.y += 0.01;
    
    // Actualizar tiempo
    const date = new Date(timeData.time || Date.now());
    document.getElementById('time').textContent = date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    });
    
    document.getElementById('flux').textContent = `Flujo: ${(timeData.flux || 0).toFixed(4)}`;
    
    renderer.render(scene, camera);
}

// Manejar resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();