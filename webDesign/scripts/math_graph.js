// mouse coordinate
var mouseX=1;
var mouseY=1;

function mouseCoords(event)
{
	mouseX = event.clientX;
	mouseY = event.clientY;
}

// basic three.js variables
let  canvas, scene, renderer, camera;
let surfaceGeometry;
let xx = 20;
let yy = 20;

// control fro rotating view
let  controls;

// function for rendering the scene
function animate()
{
	// controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}


// This is just the mathematical function that 
// will generate the surface
function surfaceFunction(u, v, vector)
{
	let x, y, z;		// cooddinate for point on surface
	
	// 'u' & 'v' range from 0 to 1
	x	=	xx * (u - 0.5);
	z	=	yy * (v - 0.5);
	y	=	2  * (Math.sin(x/2) * Math.cos(z));
	vector.set(x, y, z);
}

function createWorld()
{
	scene	=	new THREE.Scene();
	camera	=	new THREE.PerspectiveCamera(20, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
	camera.position.set(8, 5, 18);
	camera.rotation.x = -0.4;
	camera.rotation.y = 0.5;
	camera.rotation.z = -0.4;


	let light;
	light	=	new THREE.DirectionalLight(0xffffff, 0.2);
	light.position.set(0, 0, 1);
	camera.add(light);
	scene.add(camera);

	light	=	new THREE.PointLight(0xffffff, 0.1);
	light.position.set(0, 20, 0);
	scene.add(light);



	// mouse location

	surfaceGeometry = new THREE.ParametricGeometry(surfaceFunction, 64, 64);
	let material;
	material =	new THREE.MeshPhongMaterial({
				color	:	"white",
				specular:	0x080808,
				side	:	THREE.DoubleSide
			});

	let surface;
	surface	=	new THREE.Mesh(surfaceGeometry, material);
	scene.add(surface);

}


function init()
{
	try{
		canvas	=	document.getElementById("maincanvas");
		renderer=	new THREE.WebGL1Renderer({
			canvas		:	canvas,
			antialias	:	true
		});
		renderer.setClearColor("black");
	}
	catch(e){
		console.log("error");
		return;
	}
	
	createWorld();
	animate();
}

window.onload	=	init;





window.addEventListener('load', function(){
$("#canvas-holder").mousemove(function(event){      
	mouseX = event.pageX - $(this).offset().left;
	mouseY = event.pageY - $(this).offset().top;
	xx = 0.1 * mouseX;
	yy = 0.1 * mouseY;
	init();
});
});
