import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const canvas = document.getElementById("experience-canvas")
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xAAAAFF)
renderer.shadowMap.enabled = true;

// CARREGANDO MODELOS
const fbxLoader = new FBXLoader();
fbxLoader.load('./assets/3d/Portal.fbx', (fbx) => {
    fbx.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            if (child.material) {
                child.material.metalness = 1;
                child.material.roughness = 1;
            }
        }
    });
    fbx.position.set(0, 0.5, -4.5); 
    fbx.scale.set(0.01, 0.01, 0.01); 
    scene.add(fbx);
});

fbxLoader.load('./assets/3d/bigpredra.fbx', (fbx) => {
    fbx.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            if (child.material) {
                child.material.metalness = 1;
                child.material.roughness = 1;
            }
        }
    });
    fbx.position.set(4, -0.8, -2.3); 
    fbx.scale.set(0.01, 0.01, 0.01); 
    scene.add(fbx);
});
fbxLoader.load('./assets/3d/miniPredra.fbx', (fbx) => {
    fbx.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            if (child.material) {
                child.material.metalness = 1;
                child.material.roughness = 1;
            }
        }
    });
    fbx.position.set(4, -0.1, 2.3); 
    fbx.scale.set(0.01, 0.01, 0.01); 
    scene.add(fbx);
});
fbxLoader.load('./assets/3d/miniPredra.fbx', (fbx) => {
    fbx.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            if (child.material) {
                child.material.metalness = 1;
                child.material.roughness = 1;
            }
        }
    });
    fbx.position.set(4, -0.1, 1); 
    fbx.scale.set(0.01, 0.01, 0.01); 
    scene.add(fbx);
});
fbxLoader.load('./assets/3d/miniPredra.fbx', (fbx) => {
    fbx.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            if (child.material) {
                child.material.metalness = 1;
                child.material.roughness = 1;
            }
        }
    });
    fbx.position.set(2, -0.1, 3); 
    fbx.scale.set(0.01, 0.01, 0.01); 
    scene.add(fbx);
});

const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/3d/Mage.glb', function (gltf) {
    const model = gltf.scene;
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    scene.add(model);
}, undefined, function(error){
    console.error(error);
});

gltfLoader.load('./assets/3d/island.glb', function (gltf) {
    const secondModel = gltf.scene;
    secondModel.traverse((child) => {
        if (child.isMesh) {
            child.receiveShadow = true;
        }
    });
    secondModel.position.set(0, -3.7, -2);
    secondModel.scale.set(20, 5, 15);
    scene.add(secondModel);
}, undefined, function(error){
    console.error('Error loading second GLB model:', error);
});

gltfLoader.load('./assets/3d/animated_tree.glb', function (gltf) {
    const secondModel = gltf.scene;
    secondModel.traverse((child) => {
        if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
        }
    });
    secondModel.position.set(-5, 0, -3);
    secondModel.scale.set(2, 2,2);
    scene.add(secondModel);
}, undefined, function(error){
    console.error('Error loading second GLB model:', error);
});


// ILUMINAÇÃO PORTAL 
const portalLight = new THREE.PointLight(0xFFFFFF, 10, 5); 
portalLight.position.set(0, 0.5, -4.5); 
portalLight.castShadow = true;
scene.add(portalLight);

// BOLA SOL E BOLA LUA
const sunGroup = new THREE.Group();
scene.add(sunGroup);

const sunOffset = new THREE.Vector3(10, 5, 15);

const sunGeometry = new THREE.SphereGeometry(2, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, fog: false });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.copy(sunOffset);
sunGroup.add(sunMesh);

const glowGeometry = new THREE.SphereGeometry(4, 64, 64);
const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, fog: false });
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
glowMesh.position.copy(sunOffset);
sunGroup.add(glowMesh);

const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
sunLight.position.copy(sunOffset);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunGroup.add(sunLight);

const moonOffset = new THREE.Vector3(-sunOffset.x, sunOffset.y, -sunOffset.z);

const textureLoader = new THREE.TextureLoader();
textureLoader.load('./assets/Moon_texture.jpg', (moonTexture) => {
    const moonMaterial = new THREE.MeshStandardMaterial({ 
        map: moonTexture,
        roughness: 1,
        metalness: 0.3,
        emissive: 0x111111,
        emissiveIntensity: 0.2 
    });

    const moonGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.position.copy(moonOffset);
    moonMesh.castShadow = true;
    sunGroup.add(moonMesh);

    const moonLight = new THREE.PointLight(0x8888ff, 0.5, 5);
    moonLight.position.copy(moonOffset);
    moonLight.castShadow = true;
    sunGroup.add(moonLight);
});

const particleCount = 300;
const particles = new THREE.BufferGeometry();
const posArray = new Float32Array(particleCount * 3);
for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}
particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xffaa00, size: 0.1, transparent: true, blending: THREE.AdditiveBlending });
const particleSystem = new THREE.Points(particles, particleMaterial);
particleSystem.position.copy(sunOffset);
sunGroup.add(particleSystem);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 25);
const controls = new OrbitControls(camera, canvas);
controls.update();

textureLoader.load('./assets/space.jpg', (texture) => {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    const skySphere = new THREE.Mesh(geometry, material);
    scene.add(skySphere);
});

// BOLAS ELEMENTAIS
const elementGroup = new THREE.Group();
elementGroup.position.set(0, 1.5, 0);
scene.add(elementGroup);

const fireGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const fireMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500, emissive: 0xffa500, emissiveIntensity: 1, roughness: 0.4, metalness: 0.1 });
const fireBall = new THREE.Mesh(fireGeometry, fireMaterial);
fireBall.position.set(0, 0, 2.5);
fireBall.castShadow = true;
elementGroup.add(fireBall);
const fireLight = new THREE.PointLight(0xffa500, 2, 5);
fireLight.position.copy(fireBall.position);
fireLight.castShadow = true;
elementGroup.add(fireLight);

const waterGeometry = new THREE.SphereGeometry(1, 32, 32);
const waterMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5, emissiveIntensity: 1, roughness: 0.5, metalness: 0.7 });
const waterBall = new THREE.Mesh(waterGeometry, waterMaterial);
waterBall.position.set(2.5, 0, 0);
waterBall.castShadow = true;
elementGroup.add(waterBall);
const waterLight = new THREE.PointLight(0x0000FF, 2, 5);
waterLight.position.copy(waterBall.position);
waterLight.castShadow = true;
elementGroup.add(waterLight);

const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x964B00, emissiveIntensity: 1, roughness: 1, metalness: 0.1 });
const earthBall = new THREE.Mesh(earthGeometry, earthMaterial);
earthBall.position.set(0, 0, -2.5);
earthBall.castShadow = true;
elementGroup.add(earthBall);

const iceGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const iceMaterial = new THREE.MeshStandardMaterial({ color: 0x89CFF0, emissive: 0xFFFFFF, emissiveIntensity: 1, roughness: 0.4, metalness: 0.1 });
const iceBall = new THREE.Mesh(iceGeometry, iceMaterial);
iceBall.position.set(-2.5, 0, 0);
iceBall.castShadow = true;
elementGroup.add(iceBall);
const iceLight = new THREE.PointLight(0xFFFFFF, 2, 5);
iceLight.position.copy(iceBall.position);
iceLight.castShadow = true;
elementGroup.add(iceLight);

function handleResize() {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
}
window.addEventListener("resize", handleResize);

function animate() {
    elementGroup.rotation.y += 0.011;
    sunGroup.rotation.y += 0.025;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
