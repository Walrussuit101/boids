import Two from 'twojs-ts';
import { boidComps, twojsUtils, controls } from './utils';

const main = (): void => {
	// init twojs
	let field = document.getElementById("field");
	let two: Two;

	if(field){
		two = twojsUtils.initTwojs(field);
	}else{
		throw new Error("Field div not in document");
	}

	// init controls and their values
	let VELOCITY_LIMIT = 10;
	controls.getController("velocityLimit").onchange = (e) => {
		let target = e.target as HTMLInputElement;
		VELOCITY_LIMIT = parseInt(target.value);
	};

	// init boids
	const boids = boidComps.initBoids(25, two.width, two.height);

	// start game loop
	setInterval(() => {
		// update boids
		boidComps.moveBoids(boids, two.width, two.height, VELOCITY_LIMIT);

		// draw boids
		boidComps.drawBoids(boids, two);
	}, 30);
}

try{
	main();
}catch(e){
	console.error(e);
	process.exit(1);
}
