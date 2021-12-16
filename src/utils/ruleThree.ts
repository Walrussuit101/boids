import { Boid } from '../models';
import Victor from 'victor';

/**Get the velocity Victor after applying rule three
 *
 * Rule Three:
 *  - Boids try to match velocity with near boids.
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @returns Victor
 */
const ruleThree = (boid: Boid, allBoids: Boid[]): Victor => {
	
	let v = new Victor(0, 0);

	// create a new velocity based on all other boids' velocities
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId()){
			v.add(b.getVelocity());
		}
	});

	let nMinusOne = allBoids.length - 1;
	v.divide(new Victor(nMinusOne, nMinusOne));

	return v;
}

export default ruleThree;
