import * as THREE from "three";

// Create a new scene
const scene = new THREE.Scene();

// Create a perspective camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

scene.add(camera);

// Set the camera position
camera.position.set(0, 1, 5);

// Create a WebGLRenderer with antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set the renderer size to match the window size
renderer.setSize(window.innerWidth, window.innerHeight);

// Set the background color to black
renderer.setClearColor(0x000000, 1);

// Append the renderer's canvas element to the HTML body
document.body.appendChild(renderer.domElement);

// Create an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);

// Set the ambient light position
ambientLight.position.set(0, 0, 5);

// Add the ambient light to the scene
scene.add(ambientLight);

// Create a directional light
const sunlight = new THREE.DirectionalLight(0xffffff, 1);

// Set the position of the directional light
sunlight.position.set(0, 15, 0);

// Add the directional light to the scene
scene.add(sunlight);

// Create a cube geometry
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create a basic material with red color
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create a cube mesh with the geometry and material
const cube = new THREE.Mesh(cubeGeometry, material);
cube.translateY(0);
scene.add(cube);

//event listeners for keydown and keyup

document.addEventListener("keydown", onKeyDown, false);

function onKeyDown(event) {
  let keyCode = event.which;

  if (keyCode === 39) {
    camera.translateX(1);
  } else if (keyCode === 37) {
    camera.translateX(-1);
  } else if (keyCode === 38) {
    camera.translateY(1);
  } else if (keyCode === 40) {
    camera.translateY(-1);
  } else if (keyCode === 87) {
    camera.translateZ(-1);
  } else if (keyCode === 83) {
    camera.translateZ(1);
  } else if (keyCode === 65) {
    camera.rotateY(-0.05);
  } else if (keyCode === 68) {
    camera.rotateY(0.05);
  }
}
// Create a texture map
let textureLoader = new THREE.TextureLoader(); // Create a texture loader so we can load our image file
let floorTexture = new THREE.TextureLoader().load("img/Floor.jpg");

textureLoader.load("img/Floor.jpg");

// Create the floor plane.
let planeGeometry = new THREE.BoxGeometry(45, 45); // BoxGeometry is the shape of the object
let planeMaterial = new THREE.MeshLambertMaterial({
  // MeshBasicMaterial is the material the object is made of
  map: floorTexture,
  side: THREE.DoubleSide,
});

let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial); // create the floor with geometry and material

floorPlane.rotation.x = Math.PI / 2; // this is 90 degrees
floorPlane.position.y = -Math.PI; // this is -180 degrees

scene.add(floorPlane); // add the floor to the scene

// Create a group to hold all the objects
const wallgroup = new THREE.Group(); // create a group
scene.add(wallgroup); // add the group to the scene

// const frontwallTexture = new THREE.TextureLoader().load("img/FrontWall.jpg");
// textureLoader.load("img/FrontWall.jpg");
const frontwallGeometry = new THREE.BoxGeometry(50, 25, 0.1);
const frontwallMaterial = new THREE.MeshLambertMaterial({ color: "grey" });
const frontwall = new THREE.Mesh(frontwallGeometry, frontwallMaterial);
frontwall.position.z = -22;
frontwall.position.y = 2.2;
wallgroup.add(frontwall);

// left wall
// const leftwallTexture = new THREE.TextureLoader().load("img/LeftWall.jpg");
// textureLoader.load("img/LeftWall.jpg");
const leftwallGeometry = new THREE.BoxGeometry(0.1, 25, 45);
const leftwallMaterial = new THREE.MeshLambertMaterial({ color: "red" });
const leftwall = new THREE.Mesh(leftwallGeometry, leftwallMaterial);
leftwall.position.x = 22.5;
leftwall.position.y = 2.2;
wallgroup.add(leftwall);

// right wall
const rightwallGeometry = new THREE.BoxGeometry(0.1, 25, 45);
const rightwallMaterial = new THREE.MeshLambertMaterial({ color: "red" });
const rightwall = new THREE.Mesh(rightwallGeometry, rightwallMaterial);
rightwall.position.x = -22.5;
rightwall.position.y = 2.2;
wallgroup.add(rightwall);

// back wall
const backwallGeometry = new THREE.BoxGeometry(45, 25, 0.1);
const backwallMaterial = new THREE.MeshLambertMaterial({ color: "grey" });
const backwall = new THREE.Mesh(backwallGeometry, backwallMaterial);
backwall.position.z = 22;
backwall.position.y = 2.2;
wallgroup.add(backwall);

//ceiling
// const ceilingGeometry = new THREE.BoxGeometry(45, 0.1, 45);
// const ceilingMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
// const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
// ceiling.position.y = 5;
// wallgroup.add(ceiling);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//moon
const moonGeometry = new THREE.SphereGeometry(80, 35, 35);
const moonMaterial = new THREE.MeshStandardMaterial({
  color: "white",

  map: new THREE.TextureLoader().load("/img/moon-texture.jpg"),
  side: THREE.DoubleSide,
  displacementMap: new THREE.TextureLoader().load("/img/moon-displacement.jpg"),
  displacementScale: 0.5,
  bumpMap: new THREE.TextureLoader().load("/img/moon-displacement.jpg"),
  bumpScale: 0.4,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(500, 35, -20);
scene.add(moon);

// create stars

function createStarsInRange(
  scene,
  minRadius,
  maxRadius,
  numStars,
  starSize,
  starColor,
  rotationSpeed
) {
  const starGeometry = new THREE.SphereGeometry(starSize, 24, 24);
  const starMaterial = new THREE.MeshBasicMaterial({ color: starColor });

  const angleStep = (2 * Math.PI) / numStars;
  const stars = new THREE.Group();

  for (let i = 0; i < numStars; i++) {
    const angle = i * angleStep;
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = radius * Math.random() * 2 - radius;

    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(x, y, z);
    stars.add(star);
  }

  scene.add(stars);
  stars.rotation.y += rotationSpeed;

  return stars;
}

const starGroup = createStarsInRange(
  scene,
  100,
  180,
  400,
  0.2,
  "white",
  -0.0004
);
const starGroup2 = createStarsInRange(
  scene,
  75,
  250,
  400,
  0.23,
  "#b3b3ff",
  -0.0004
);
const starGroup3 = createStarsInRange(
  scene,
  200,
  400,
  4000,
  0.2,
  "white",
  -0.0004
);

//LOOP through the each wall and create the bounding box

for (let i = 0; i < wallgroup.children.length; i++) {
  wallgroup.children[i].BBox = new THREE.Box3();
  wallgroup.children[i].BBox.setFromObject(wallgroup.children[i]);
}

let render = function () {
  requestAnimationFrame(render);
  moon.rotation.y += 0.00035;
  starGroup.rotation.y += 0.0004;

  starGroup2.rotation.y += 0.0004;
  starGroup2.rotation.z += 0.0004;

  starGroup3.rotation.y += 0.00002;
  starGroup3.rotation.z += -0.0002;
  renderer.render(scene, camera);
};

render();