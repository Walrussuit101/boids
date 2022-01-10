import Two from 'twojs-ts';
import { boidComps } from './utils';

const main = (): void => {
	// init twojs
	let body = document.body;
	let twojsParams = { fullscreen: true };
	let two = new Two(twojsParams).appendTo(body);

	// init constants
	const NUM_BOIDS = 25;
	const TWO_WIDTH = two.width;
	const TWO_HEIGHT = two.height;

	// init boids
	const boids = boidComps.initBoids(NUM_BOIDS, TWO_WIDTH, TWO_HEIGHT);

	setInterval(() => {
		// update boids
		boidComps.moveBoids(boids, TWO_WIDTH, TWO_HEIGHT);

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
