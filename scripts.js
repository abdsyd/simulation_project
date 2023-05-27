import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene, renderer, and camera
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 50);

// Create a helicopter model
var helicopter;
var loader = new GLTFLoader();
loader.load('./helicopter_model/scene.gltf', function (gltf) {
    helicopter = gltf.scene;
    helicopter.scale.set(30, 30, 30);
    scene.add(helicopter);
});

// Create a skydiver model
var skydiver;
loader.load('./skydiver_model/scene.gltf', function (gltf) {
    skydiver = gltf.scene;
    skydiver.visible = false; // Hide the skydiver initially
    skydiver.scale.set(1.5, 1.5, 1.5);
    scene.add(skydiver);
});

// Create a parachute model
var parachute;
loader.load('./parachute_model/scene.gltf', function (gltf) {
    parachute = gltf.scene;
    parachute.visible = false;  // Hide the parachute initially
    parachute.scale.set(5, 5, 5);
    scene.add(parachute);
});

// Add a directional light to illuminate the scene
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 0);
scene.add(light);


// Function to drop the skydiver
function dropSkydiver() {
    if (skydiver) {
        skydiver.visible = true;
        skydiver.position.copy(helicopter.position);
        // Implement the animation to drop the skydiver from the helicopter
        // This could involve updating the position of the skydiver over time
    }
}

// Function to show the parachute
function showParachute() {
    if (parachute) {
        parachute.visible = true;
        parachute.position.copy(skydiver.position);
        // Implement any necessary animations or position updates for the parachute
    }
}

// Keydown event listener to handle key presses
document.addEventListener('keydown', function (event) {
    if (event.key === 'p' || event.key === 'P') {
        dropSkydiver();
    } else if (event.key === 'o' || event.key === 'O') {
        showParachute();
    }
});

// Function to update the scene and render the frames
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start the animation
animate();

// Making the canvas responsive
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});