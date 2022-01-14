import { Boid, CustomVector } from '../models';
import { ruleOne, ruleTwo, ruleThree } from './';
import Two from 'twojs-ts';

/**
 * Get a random value between 0 and a number
 * 
 * @param high Highest value for range
 * @returns Number between low & high
 */
 const randomRange = (high: number) => {
	return Math.floor(Math.random() * high);
}

/**
 * Initialize an array of Boids
 *
 * @param numBoids Number of boids to init
 * @param screenWidth Width of screen
 * @param screenHeight Height of screen
 * @returns Boid[]
 */
export const initBoids = (numBoids: number, screenWidth: number, screenHeight: number): Boid[] => {
    const boids: Boid[] = [];

    for(let i = 0; i < numBoids; i++){
        let x = randomRange(screenWidth);
        let y = randomRange(screenHeight);
        let boid = new Boid(i+1, new CustomVector(x, y), new CustomVector(1, 1));
        boids.push(boid);
    }

    return boids;
}

/**
 * Clear, update, and draw shapes on screen
 * 
 * @param allBoids All current boids
 * @param boidSize Size of the boids
 * @param two Twojs instance
 */
export const drawBoids = (allBoids: Boid[], boidSize: number, two: Two) => {
    // clear all shapes
    two.clear();

    // add updated shapes
    allBoids.forEach(boid => {
        let boidPosition = boid.getPosition();
        two.makeCircle(boidPosition.x, boidPosition.y, boidSize);
    });

    // render updated shapes
    two.update();
}

/**
 * Move boids to new position after applying the 3 rules
 * and other modifiers
 *
 * @param allBoids All current boids
 * @param screenWidth Width of screen
 * @param screenHeight Height of screen
 * @returns void
 */
export const moveBoids = (allBoids: Boid[], screenWidth: number, screenHeight: number, VELOCITY_LIMIT: number, VISUAL_RANGE: number): void => {
    const PADDING = 100;

    allBoids.forEach(b => {
        // apply all rules to current Boid
        let v1 = ruleOne(b, allBoids, VISUAL_RANGE);
        let v2 = ruleTwo(b, allBoids, VISUAL_RANGE);
        let v3 = ruleThree(b, allBoids, VISUAL_RANGE);
        let v4 = boundBoid(b, PADDING, screenWidth-PADDING, PADDING, screenHeight-PADDING);

        // set current Boid's velocity to sum of v1,2,3
        let totalV = v1.add(v2.add(v3.add(v4)));
        b.addToVelocity(totalV);

        // limit boid's velocity
        limitVelocity(b, VELOCITY_LIMIT);

        // update current Boid's position with it's new velocity
        b.move();
    })
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
 * Limit a boids x/y velocity
 * 
 * @param boid Boid to limit velocity
 * @param VELOCITY_LIMIT Velocity speed to limit the boid to
 * @returns void
 */
const limitVelocity = (boid: Boid, VELOCITY_LIMIT: number): void => {
    let boidVelocity = boid.getVelocity();

    if(Math.abs(boidVelocity.x) > VELOCITY_LIMIT){
        let sign = Math.sign(boidVelocity.x);
        boidVelocity.x = sign * VELOCITY_LIMIT;
    }

    if(Math.abs(boidVelocity.y) > VELOCITY_LIMIT){
        let sign = Math.sign(boidVelocity.y);
        boidVelocity.y = sign * VELOCITY_LIMIT;
    }
}