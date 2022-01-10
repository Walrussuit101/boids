import { Boid, CustomVector }from './models';
import Two from 'twojs-ts';
import {
	ruleOne,
	ruleTwo,
	ruleThree
} from './utils';

/**
 * Get a random value between two numbers
 * 
 * @param low Lowest value for range
 * @param high Highest value for range
 * @returns Number between low & high
 */
const randomRange = (low: number, high: number) => {
	return Math.floor(Math.random() * high);
}

/**
 * Encourage a boid to stay within a defined space by changing its velocity
 * 
 * @param boid Boid to bound
 * @param Xmin lowest x value
 * @param Xmax highest x value
 * @param Ymin lowest y value
 * @param Ymax highest y value
 * @returns Vector
 */
const boundBoid = (boid: Boid, Xmin: number, Xmax: number, Ymin: number, Ymax: number) => {
	let v = new CustomVector(0, 0);
	let boidPosition = boid.getPosition();
	const ENCOURAGE = 10;

	if(boidPosition.x < Xmin){
		v.x = ENCOURAGE;
	}else if (boidPosition.x > Xmax){
		v.x = -ENCOURAGE;
	}

	if(boidPosition.y < Ymin){
		v.y = ENCOURAGE;
	}else if(boidPosition.y > Ymax){
		v.y = -ENCOURAGE;
	}

	return v;
}

/**
 * Initialize an array of Boids
 *
 * @param numBoids Number of boids to init
 * @param screenWidth Width of screen
 * @param screenHeight Height of screen
 * @returns Boid[]
 */
const initBoids = (numBoids: number, screenWidth: number, screenHeight: number): Boid[] => {
	const boids: Boid[] = [];

	// TODO: maybe randomize their x/y positions?
	for(let i = 0; i < numBoids; i++){
		let x = randomRange(0, screenWidth);
		let y = randomRange(0, screenHeight);
		let boid = new Boid(i+1, new CustomVector(x, y), new CustomVector(0, 0));
		boids.push(boid);
	}

	return boids;
}

/**
 * Clear, update, and draw shapes on screen
 * 
 * @param allBoids All current boids
 * @param two Twojs instance
 */
const drawBoids = (allBoids: Boid[], two: Two) => {
	// clear all shapes
	two.clear();

	// add updated shapes
	allBoids.forEach(boid => {
		let boidPosition = boid.getPosition();
		two.makeCircle(boidPosition.x, boidPosition.y, 5);
	});

	// render updated shapes
	two.update();
}

/**
 * Move boids to new position after applying the 3 rules
 *
 * @param allBoids All current boids
 * @returns void
 */
const moveBoids = (allBoids: Boid[], screenWidth: number, screenHeight: number): void => {
	const PADDING = 100;

	allBoids.forEach(b => {
		// apply all rules to current Boid
		let v1 = ruleOne(b, allBoids);
		let v2 = ruleTwo(b, allBoids);
		let v3 = ruleThree(b, allBoids);
		let v4 = boundBoid(b, PADDING, screenWidth-PADDING, PADDING, screenHeight-PADDING);

		// set current Boid's velocity to sum of v1,2,3
		let totalV = v1.add(v2.add(v3.add(v4)));
		b.addToVelocity(totalV);

		// update current Boid's position with it's new velocity
		b.move();
	})
}

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
	const boids = initBoids(NUM_BOIDS, TWO_WIDTH, TWO_HEIGHT);

	setInterval(() => {
		// update boids
		moveBoids(boids, TWO_WIDTH, TWO_HEIGHT);

		// draw boids
		drawBoids(boids, two);
	}, 50);
}

try{
	main();
}catch(e){
	console.error(e);
	process.exit(1);
}
