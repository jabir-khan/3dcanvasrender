
//SCENE
var scene = new THREE.Scene();


//CAMERA
var cameraFov = 75
var aspect = window.innerWidth / window.innerHeight
var nearpoint= 0.1
var farpoint=1000
var camera = new THREE.PerspectiveCamera( cameraFov, aspect, nearpoint, farpoint );



//RENDERER
video_div = document.getElementById('video_div')
width = video_div.offsetWidth;
height = video_div.offsetHeight;
video = document.getElementById('video')
var renderer = new THREE.WebGLRenderer({ antialias:true,alpha: true }); 
renderer.domElement.id = 'canvas_id'
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );


//CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();


// scene.add(keyLight);
scene.add(fillLight);
// scene.add(backLight);

var ambientLight = new THREE.AmbientLight('orange');
scene.add(ambientLight);


// var loader = new THREE.FBXLoader();
// loader.load('assets/objfiles/cokecup/Cup FBX.fbx', function(object) {
//     scene.add(object);
// }, (ev) => {
//     console.log(ev);
// }, (e) => {
//     console.log(e);
// });

//MLT AND OBJ LOADER
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/objfiles/cancoke/');
mtlLoader.setPath('assets/objfiles/cancoke/');
mtlLoader.load('glasscoke.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/objfiles/cancoke/');
    objLoader.load('glasscoke.obj', function (object) {    
	    
	    
		var bb = new THREE.Box3().setFromObject( object );
		var object3DWidth  = bb.max.x - bb.min.x;
		var object3DHeight = bb.max.y - bb.min.y;
		var object3DDepth  = bb.max.z - bb.min.z;
		console.log("Height :"+object3DHeight+" Width : "+object3DWidth+" Depth : "+object3DDepth)

		
		
		
		object.position.set(0,0,0);
	    object.scale.set(0.1,0.1,0.1);

	    scene.add(object);

	    camera.position.z -= 700;

	    //add clickevent on mesh			
		var domEvents = new THREEx.DomEvents(camera, renderer.domElement)
			domEvents.addEventListener(object, 'click', function(event){
				video.pause();
				var modal = document.getElementById("myModal");
				canvas = document.getElementById('canvas_id')
				var closeModal = document.getElementById("closeModal").addEventListener("click", close)
				canvas.style.background= "rgba(0, 0, 0, 0.8)";				
				modal.style.display = "block";
				function close(){
					modal.style.display = "none";
					video.play();
					canvas.style.background= "";

				}			
					
		},false)


    });

});
// ------------------------------ RobotEnd ------------------------------
	    
			

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	scene.rotation.y += 0.02;

	renderer.render(scene, camera);
};

animate();