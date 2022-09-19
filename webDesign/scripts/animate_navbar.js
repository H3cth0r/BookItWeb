$(document).ready(function(){
	console.log("sdf");
	anime({
		targets:	'.main-navbar',
		translateY:	-63,
		duration:	1
	});
	setTimeout(function(){
		anime({
			targets:	'.main-navbar',
			translateY:	0,
			duration:	2500
		});
	}, 1000);
});

