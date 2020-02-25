var scene = new THREE.Scene();

var cameraFov = 75
var aspect = window.innerWidth / window.innerHeight
var nearpoint= 0.1
var farpoint=10000
var camera = new THREE.PerspectiveCamera( cameraFov, aspect, nearpoint, farpoint );
// camera.position.z = 1000;


// var w = 1920;
// var h = 1080;
// var fullWidth = w * 3;
// var fullHeight = h * 2;

// camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );

// geometry.dynamic=true; 
// geometry.verticesNeedUpdate=true;

var renderer = new THREE.WebGLRenderer({ alpha: true });
// var renderer = new THREE.WebGLRenderer();
// renderer.setClearColor( 0x000000, 0 );
// renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
renderer.setSize( 1015, 576 );
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
	    //object.position.set(object.position.x,object.position.y-300,object.position.z);
	    object.position.set(0,0,0);	    
	    console.log(object.position.x,object.position.y,object.position.z);

	    // object.position.y = object.position.y+1000

	    // object.scale.x = camera.position.z;
	    // object.scale.z = camera.position.z;
	    // object.scale.y = camera.position.z;

		var bb = new THREE.Box3().setFromObject( object );
		var object3DWidth  = bb.max.x - bb.min.x;
		var object3DHeight = bb.max.y - bb.min.y;
		var object3DDepth  = bb.max.z - bb.min.z;
		console.log("Height :"+object3DHeight+" Width : "+object3DWidth+" Depth : "+object3DDepth)
		
		// object.scale.copy( new THREE.Vector3( object3DHeight, object3DWidth, object3DDepth ) );

	    scene.add(object);``
		dist = object3DHeight / 2 / Math.tan(Math.PI * cameraFov / 360);
		console.log("dist : "+dist)
		// camera.position.z = dist;
		var cameraPosition = new THREE.Vector3(
			0,
			0,
			object.position.z + Math.abs( object3DDepth / Math.sin( cameraFov / 2 ) )
		);

		camera.position.copy( cameraPosition );
		camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        
    });

});
// var geometry = new THREE.Geometry();

// var objLoader = new THREE.OBJLoader();
//     objLoader.setPath('assets/objfiles/singlecoke/');
//     objLoader.load('cokecan2.obj', function (object) {

// 	    //object.position.set(object.position.x,object.position.y-300,object.position.z);
// 	    object.position.set(0,0,0);	    
// 	    console.log(object.position.x,object.position.y,object.position.z);

// 	    // object.position.y = object.position.y+1000

// 	    // object.scale.x = camera.position.z;
// 	    // object.scale.z = camera.position.z;
// 	    // object.scale.y = camera.position.z;

// 		var bb = new THREE.Box3().setFromObject( object );
// 		var object3DWidth  = bb.max.x - bb.min.x;
// 		var object3DHeight = bb.max.y - bb.min.y;
// 		var object3DDepth  = bb.max.z - bb.min.z;
// 		console.log("Height :"+object3DHeight+" Width : "+object3DWidth+" Depth : "+object3DDepth)
		
// 		// object.scale.copy( new THREE.Vector3( object3DHeight, object3DWidth, object3DDepth ) );

// 	    scene.add(object);``
// 		dist = object3DHeight / 2 / Math.tan(Math.PI * cameraFov / 360);
// 		console.log("dist : "+dist)
// 		// camera.position.z = dist;
// 		var cameraPosition = new THREE.Vector3(
// 			0,
// 			0,
// 			object.position.z + Math.abs( object3DDepth / Math.sin( cameraFov / 2 ) )
// 		);

// 		camera.position.copy( cameraPosition );
// 		camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

//     });


var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	// console.log(camera.position.z)
	// console.log(object.position.x,object.position.y,object.position.z)
	renderer.render(scene, camera);
};

animate();