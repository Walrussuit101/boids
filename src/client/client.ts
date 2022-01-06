import { Boid }from './models';
import Two, { Vector } from 'twojs-ts';
import {
	ruleOne,
	ruleTwo,
	ruleThree
} from './utils';

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
		let boid = new Boid(i+1, new Vector(0, 0), new Vector(0, 0));
		boids.push(boid);
	}

	return boids;
}

/**
 * Move boids to new position after applying the 3 rules
 *
 * @param allBoids All current boids
 * @returns void
 */
const moveBoids = (allBoids: Boid[]): void => {
	allBoids.forEach(b => {
		// apply all rules to current Boid
		let v1 = ruleOne(b, allBoids);
		let v2 = ruleTwo(b, allBoids);
		let v3 = ruleThree(b, allBoids);

		// set current Boid's velocity to sum of v1,2,3
		let totalV = v1.addSelf(v2.addSelf(v3));
		b.addToVelocity(totalV);

		// update current Boid's position with it's new velocity
		b.move();
	})
}

const main = (): void => {
	const NUM_BOIDS = 10;

	const boids = initBoids(NUM_BOIDS);

	console.log(boids);

	let body = document.body;
	let twojsParams = {
		fullscreen: true
	}

	let two = new Two(twojsParams).appendTo(body);
	two.makeCircle(two.width/2, two.height/2, 100).fill = "#000000";
	two.update();
}

try{
	main();
}catch(e){
	console.error(e);
	process.exit(1);
}
