import Two from 'twojs-ts';
import { boidComps, twojsUtils, controls, interfaces } from './utils';

/**
 * Init param values and set their corresponding HTMLInput elements.
 * This also returns the params to use for onchange listening.
 * 
 * @returns interfaces.params
 */
const initParams = (): interfaces.params => {
	// initial param values
	let VELOCITY_LIMIT = 10;
	let BOID_SIZE = 5;
	let VISUAL_RANGE = 75;

	// update corresponding input elements
	(controls.getController("velocityLimit") as HTMLInputElement).value = VELOCITY_LIMIT.toString();
	(controls.getController("boidSize") as HTMLInputElement).value = BOID_SIZE.toString();
	(controls.getController("visualRange") as HTMLInputElement).value = VISUAL_RANGE.toString();

	return {
		VELOCITY_LIMIT,
		BOID_SIZE,
		VISUAL_RANGE
	}
}

const main = (): void => {
	// init twojs
	let field = document.getElementById("field");
	let two: Two;

	if(field){
		two = twojsUtils.initTwojs(field);
	}else{
		throw new Error("Field div not in document");
	}

	// init params and listeners for changes to their values
	let params = initParams();
	
	controls.getController("velocityLimit").onchange = (e) => {
		let target = e.target as HTMLInputElement;
		params.VELOCITY_LIMIT = parseInt(target.value);
	};

	controls.getController("boidSize").onchange = (e) => {
		let target = e.target as HTMLInputElement;
		params.BOID_SIZE = parseInt(target.value);
	};

	controls.getController("visualRange").onchange = (e) => {
		let target = e.target as HTMLInputElement;
		params.VISUAL_RANGE = parseInt(target.value);
	};

	controls.getController("resetControls").onclick = () => {params = initParams()}

	// init boids
	const boids = boidComps.initBoids(75, two.width, two.height);

	// start game loop
	setInterval(() => {
		// update boids
		boidComps.moveBoids(boids, two.width, two.height, params.VELOCITY_LIMIT, params.VISUAL_RANGE);

		// draw boids
		boidComps.drawBoids(boids, params.BOID_SIZE, two);
	}, 30);
}

try{
	main();
}catch(e){
	console.error(e);
	process.exit(1);
}
