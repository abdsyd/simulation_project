import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene, renderer, and camera
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 50);

// Create a skydiver model
var skydiver = new THREE.Object3D();
var loader = new GLTFLoader();
loader.load('./skydiver_model/scene.gltf', function (gltf) {
    var gltfScene = gltf.scene;
    gltfScene.position.copy(initialSkydiverPosition);
    gltfScene.scale.set(2, 2, 2);
    skydiver.add(gltfScene);
});

// Create a parachute model
var parachute = new THREE.Object3D();
loader.load('./parachute_model/scene.gltf', function (gltf) {
    var gltfScene = gltf.scene;
    gltfScene.position.copy(initialParachutePosition);
    gltfScene.visible = false; // Hide the parachute initially
    gltfScene.scale.set(2, 2, 2);
    parachute.add(gltfScene);
});

// Set the initial positions and rotations
var initialSkydiverPosition = new THREE.Vector3(0, 100, 0);
var initialParachutePosition = new THREE.Vector3(0, 100, 0);

// Add the skydiver and parachute to the scene
scene.add(skydiver);
scene.add(parachute);

// Add a directional light to illuminate the scene
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 0); // Adjust the light position as needed
scene.add(light);

// Function to determine when to deploy the parachute
function shouldDeployParachute() {
    // Implement the logic to determine when to deploy the parachute
    // Return true or false based on the condition
    // For example, you can check if the skydiver's y-position is below a certain threshold
    return skydiver.position.y < 50;
}

// Function to simulate the skydiving animation
function skydivingAnimation() {
    // Update the skydiver's position and rotation based on user input or time
    // ...

    // Check if it's time to deploy the parachute
    if (shouldDeployParachute()) {
        // Set the parachute position and make it visible
        parachute.position.copy(skydiver.position);
        parachute.visible = true;

        // Remove the skydiver from the scene
        scene.remove(skydiver);
    }

    // Render the scene
    renderer.render(scene, camera);

    // Continue the animation
    requestAnimationFrame(skydivingAnimation);
}

// Start the skydiving animation
skydivingAnimation();

// Making the canvas responsive
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});