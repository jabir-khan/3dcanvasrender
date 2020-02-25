//main js

let scene, camera, renderer;

function init() {

//SCENE
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

//CAMERA
//camera = new THREE.PerspectiveCamera(field_of_view(fov), aspect_ratio, near_point, far_point);
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 5000);
camera.rotation.y = 45/180*Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;



//RENDERER
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( 1015, 600 );
renderer.domElement.id = 'canvas_id'
//renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




//LIGHTS
hlight = new THREE.AmbientLight (0x404040,100);
scene.add(hlight);

directionalLight = new THREE.DirectionalLight(0xffffff,100);
directionalLight.position.set(0,1,0);

directionalLight.castShadow = true;
scene.add(directionalLight);

light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,300,500);
scene.add(light);

light2 = new THREE.PointLight(0xc4c4c4,10);
light2.position.set(500,100,0);
scene.add(light2);

light3 = new THREE.PointLight(0xc4c4c4,10);
light3.position.set(0,100,-500);
scene.add(light3);

light4 = new THREE.PointLight(0xc4c4c4,10);
light4.position.set(-500,300,500);
scene.add(light4);


//MOUSE CONTROLS
controls = new THREE.OrbitControls(camera,renderer.domElement)
//controls.minDistance = 1
//controls.maxDistance = 1000
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


//MTL AND OBJ LOADER
// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setTexturePath('/cocacola-assets/maps/');
// mtlLoader.setPath('/cocacola-assets/maps/');
// mtlLoader.load('r2-d2.mtl', function (materials) {

//     materials.preload();

//     var objLoader = new THREE.OBJLoader();
//     objLoader.setMaterials(materials);
//     objLoader.setPath('/cocacola-assets/maps/');
//     objLoader.load('mpm_vol.09_p35.OBJ', function (object) {

//         scene.add(object);
//         object.position.y -= 60;

//     });

// });


//GLTF LOADER
var loader = new THREE.GLTFLoader();
loader.load('car-assets/scene.gltf', function(gltf){
  car = gltf.scene.children[0];
  car.scale.set(0.5,0.5,0.5);
  scene.add(gltf.scene);
  animate();
});

}


						
//ANIMATE starts the animation
 function animate() {
 	requestAnimationFrame( animate );
	//controls.update();
	renderer.render(scene, camera);
};
init();


//animate();

	
			
						