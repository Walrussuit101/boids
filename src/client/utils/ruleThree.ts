import { Boid, CustomVector } from '../models';

/**Get the velocity Vector after applying rule three
 *
 * Rule Three:
 *  - Boids try to match velocity with near boids.
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @returns Vector
 */
const ruleThree = (boid: Boid, allBoids: Boid[]): CustomVector => {
	
	let v = new CustomVector(0, 0);

	// create a new velocity based on all other boids' velocities
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId()){
			v.addSelf(b.getVelocity());
		}
	});

	let nMinusOne = allBoids.length - 1;
	v.divideScalarSelf(nMinusOne);

	v.subtractSelf(boid.getVelocity());
	v.divideScalarSelf(4);

	return v;
}

export default ruleThree;
