import { Boid }from './models';
import Victor from 'victor';

/**
 * Initialize an array of Boids
 *
 * @param numBoids Number of boids to init
 * @returns Boid[]
 */
const initBoids = (numBoids: number): Boid[] => {
	const boids: Boid[] = [];

	// TODO: maybe randomize their x/y positions?
	for(let i = 0; i < numBoids; i++){
		let boid = new Boid(new Victor(0, 0), new Victor(0, 0));
		boids.push(boid);
	}

	return boids;
}

const main = (): void => {
	const NUM_BOIDS = 10;

	const boids = initBoids(NUM_BOIDS);

	console.log(boids);
}

try{
	main();
}catch(e){
	console.error(e);
	process.exit(1);
}
