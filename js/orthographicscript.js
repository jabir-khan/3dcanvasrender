var scene = new THREE.Scene();

screenWidth=1015
screenHeight=576

left = screenWidth / 2
right = screenWidth / - 2
top = screenHeight / 2
bottom = screenHeight / - 2
near=0.1
far=10000
camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
camera.fov = 75;


var camscale = Math.tan(( camera.fov / 2 ) / 180 * Math.PI);
var camfix = screenHeight / 2 / camscale;

console.log("camfix : "+camfix)
var cameraPosition = new THREE.Vector3(
	0,
	0,
	camfix
);

camera.position.copy( cameraPosition );
// camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );




var renderer = new THREE.WebGLRenderer({ alpha: true });
// var renderer = new THREE.WebGLRenderer();
// renderer.setClearColor( 0x000000, 0 );
// renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
renderer.setSize(screenWidth , screenHeight );
renderer.domElement.id = 'canvas_id'
document.body.appendChild( renderer.domElement );




var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/objfiles/r2-d2/');
mtlLoader.setPath('assets/objfiles/r2-d2/');
mtlLoader.load('r2-d2.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/objfiles/r2-d2/');
    objLoader.load('r2-d2.obj', function (object) {
	    object.position.set(0,0,0);
		var bb = new THREE.Box3().setFromObject( object );
		var object3DWidth  = bb.max.x - bb.min.x;
		var object3DHeight = bb.max.y - bb.min.y;
		var object3DDepth  = bb.max.z - bb.min.z;
		console.log("Height :"+object3DHeight+" Width : "+object3DWidth+" Depth : "+object3DDepth)
		

		// object.position.x = ( screenWidth - object3DWidth ) / 2 
		// object.position.y = ( screenHeight - object3DHeight ) / 2 
		// object.position.z = 0
	    console.log(object.position.x,object.position.y,object.position.z);

	    scene.add(object);``
		dist = object3DHeight / 2 / Math.tan(Math.PI * camera.fov / 360);
		console.log("dist : "+dist)
		// camera.position.z = dist;
      
    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	// console.log(camera.position.z)
	// console.log(object.position.x,object.position.y,object.position.z)
	renderer.render(scene, camera);
};

animate();