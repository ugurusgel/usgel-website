import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

// 🚢 Sahneyi ve Kamerayı Oluştur
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 🌊 Okyanus Zemini
const oceanGeometry = new THREE.PlaneGeometry(50, 50, 10, 10);
const oceanMaterial = new THREE.MeshBasicMaterial({ color: 0x1e90ff, wireframe: true });
const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
ocean.rotation.x = -Math.PI / 2;
scene.add(ocean);

// 🚢 Gemi Modeli (Basit Bir Küp Kullanacağız)
const shipGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const shipMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ship = new THREE.Mesh(shipGeometry, shipMaterial);
ship.position.y = 0.3;
scene.add(ship);

// Kamera Pozisyonu
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

// 🚢 Gemi Hareketi (Sinüs Eğrisi ile Dalga Efekti)
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    let t = clock.getElapsedTime();
    ship.position.z = Math.sin(t) * 5;  // Gemiyi ileri-geri hareket ettir
    ship.position.y = Math.sin(t * 2) * 0.2 + 0.3;  // Gemiyi hafifçe yukarı-aşağı sallandır
    
    renderer.render(scene, camera);
}

animate();

// Ekran Boyutu Değiştiğinde Sahneyi Güncelle
window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
