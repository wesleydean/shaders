var renderer, 
    scene, 
    camera, 
    mesh, 
    start = Date.now();

window.addEventListener( 'load', function() {
  setup();
  render();
});

function setup() {
  var width  = window.innerWidth,
      height = window.innerHeight;

  // Create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor( 0x3d3d3d );
  //Add it to the DOM
  document.body.appendChild(renderer.domElement);
  
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera the size of the browser window
  // and place it 10 units away, looking towards the center of the scene
  camera = new THREE.PerspectiveCamera( 
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100 );
  camera.position.z = 4;
  camera.target = new THREE.Vector3( 0, 0, 0 );
  scene.add( camera );
  
  // Add controls to let us rotate the camera about its target.
  controls = new THREE.OrbitControls( camera, render.domElement );
  
  var primaryColor = new THREE.Color().setRGB(1.0, 0.67, 0.1);
  
  // Your meshes will have two components - the geometry and the material.
  // Geometry determines the position and attributes of your vertices
  // Material will take shaders and handle the display of your object.
  var geometry = new THREE.PlaneBufferGeometry( 2, 2, 16, 16 );
  var material = new THREE.MeshBasicMaterial({ color: primaryColor });

  material.side = THREE.DoubleSide; //Since we're rendering a plane, disable back-face culling
  //Finally, create the mesh and add it to our scene.
  mesh = new THREE.Mesh( geometry, material );
  scene.add(mesh);
}

function render() {
  requestAnimationFrame( render );
  // let there be light
  renderer.render( scene, camera );  
}
