import { Boid } from '../models';
import { Vector } from 'twojs-ts';

/**Get the velocity Vector after applying rule two
 *
 * Rule Two:
 *  - Boids try to keep a small distance away from other objects (including other boids). 
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @returns Vector 
 */
const ruleTwo = (boid: Boid, allBoids: Boid[]): Vector => {

	let c = new Vector(0, 0);

	/* get a velocity for the boid `boid` to move
	 *
	 * aka move the current boid away from another boid
	 * if it is 100 units away
	 */
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId()){
			let distance = b.getPosition().distanceTo(boid.getPosition());

			if(Math.abs(distance) < 100){
				c.subSelf(b.getPosition().subSelf(boid.getPosition()));
			}
		}
	});

	return c;
}

export default ruleTwo;
