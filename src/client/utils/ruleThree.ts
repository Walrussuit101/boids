import { Boid } from '../models';
import { Vector } from 'twojs-ts';

/**Get the velocity Vector after applying rule three
 *
 * Rule Three:
 *  - Boids try to match velocity with near boids.
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @returns Vector
 */
const ruleThree = (boid: Boid, allBoids: Boid[]): Vector => {
	
	let v = new Vector(0, 0);

	// create a new velocity based on all other boids' velocities
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId()){
			v.addSelf(b.getVelocity());
		}
	});

	let nMinusOne = allBoids.length - 1;
	v.divideScalar(new Vector(nMinusOne, nMinusOne));

	return v;
}

export default ruleThree;
