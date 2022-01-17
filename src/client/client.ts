import Two from 'twojs-ts';
import { CustomVector } from './models';
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
	let NUM_BOIDS = 75;
	let MOUSE_POSITION = new CustomVector(0, 0);

	// update corresponding input elements
	(controls.getController("velocityLimit") as HTMLInputElement).value = VELOCITY_LIMIT.toString();
	(controls.getController("boidSize") as HTMLInputElement).value = BOID_SIZE.toString();
	(controls.getController("visualRange") as HTMLInputElement).value = VISUAL_RANGE.toString();
	(controls.getController("numBoids") as HTMLInputElement).value = NUM_BOIDS.toString();

	return {
		VELOCITY_LIMIT,
		BOID_SIZE,
		VISUAL_RANGE,
		NUM_BOIDS,
		MOUSE_POSITION
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

	document.onmousemove = (e) => {
		params.MOUSE_POSITION.x = e.clientX;
		params.MOUSE_POSITION.y = e.clientY;
	}

	// init boids
	let boids = boidComps.initBoids(params.NUM_BOIDS, two.width, two.height);

	// these listeners reset the boids array, so need to come after
	controls.getController("resetControls").onclick = () => {
		params = initParams();
		boids = boidComps.initBoids(params.NUM_BOIDS, two.width, two.height);
	}

	controls.getController("numBoids").onchange = (e) => {
		let target = e.target as HTMLInputElement;
		params.NUM_BOIDS = parseInt(target.value);
		boids = boidComps.initBoids(params.NUM_BOIDS, two.width, two.height);
	};

	// start game loop
	setInterval(() => {
		// update boids
		boidComps.moveBoids(boids, two.width, two.height, params.VELOCITY_LIMIT, params.VISUAL_RANGE, params.MOUSE_POSITION);

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
