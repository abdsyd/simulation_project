import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene, renderer, and camera
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 50);

// Create a background image
var textureLoader = new THREE.TextureLoader();
var backgroundImage = textureLoader.load('./assets/sh_ft.png', function () {
    // Once the image is loaded, set it as the background of the scene
    scene.background = backgroundImage;
});

// Create a helicopter model
var helicopter;
var loader = new GLTFLoader();
loader.load('./helicopter_model/scene.gltf', function (gltf) {
    helicopter = gltf.scene;
    helicopter.position.set(20, 30, 20);
    helicopter.scale.set(10, 10, 10);
    scene.add(helicopter);
});

// Create a skydiver model
var skydiver;
loader.load('./skydiver_model/scene.gltf', function (gltf) {
    skydiver = gltf.scene;
    skydiver.visible = false; // Hide the skydiver initially
    skydiver.position.set(10, 20, 20);
    skydiver.scale.set(0.5, 0.5, 0.5);
    scene.add(skydiver);
});

// Create a parachute model
var parachute;
loader.load('./parachute_model/scene.gltf', function (gltf) {
    parachute = gltf.scene;
    parachute.visible = false;  // Hide the parachute initially
    parachute.scale.set(1.5, 1.5, 1.5);
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
        var initialY = skydiver.position.y; // Initial y-coordinate of the skydiver
        var velocity = 0; // Initial velocity of the skydiver




        // Implement the animation to drop the skydiver from the helicopter
        function animateSkydiver() {

            velocity += 0.01; // Increase the velocity

            // Update the position based on the velocity and time
            skydiver.position.y -= velocity;

            //helicopter.position.y += 0.1;\\

            // Check if the skydiver has reached the ground (y = 0)
            if (skydiver.position.y <= 0) {
                skydiver.position.y = 0; // Set the position to y = 0
                renderer.render(scene, camera); // Render the scene one more time

                // Animation complete, remove the event listener
                document.removeEventListener('keydown', keydownListener);
                return;
            }

            renderer.render(scene, camera); // Render the updated scene

            // Continue the animation recursively
            requestAnimationFrame(animateSkydiver);
        }

        // Start the animation when the "P" key is pressed
        var keydownListener = function (event) {
            if (event.key === 'p' || event.key === 'P') {
                animateSkydiver();

            }
        };
        document.addEventListener('keydown', keydownListener);
    }
}

// Function to show the parachute
function showParachute() {
    if (parachute) {
        parachute.visible = true;
        parachute.position.copy(skydiver.position);
        // Implement any necessary animations or position updates for the parachute
        function animateParachute() {

            renderer.render(scene, camera); // Render the updated scene

            // Continue the animation recursively
            requestAnimationFrame(animateParachute);
        }
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