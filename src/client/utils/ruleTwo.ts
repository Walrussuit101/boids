import { Boid, CustomVector } from '../models';

/**Get the velocity Vector after applying rule two
 *
 * Rule Two:
 *  - Boids try to keep a small distance away from other objects (including other boids). 
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @param VISUAL_RANGE Visual range of the boids
 * @returns Vector 
 */
const ruleTwo = (boid: Boid, allBoids: Boid[], VISUAL_RANGE: number): CustomVector => {

	let c = new CustomVector(0, 0);

	/* get a velocity for the boid `boid` to move
	 *
	 * aka move the current boid away from another boid
	 * if it is 25 units away
	 */
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId() && boid.canSee(b, VISUAL_RANGE)){
			let distance = b.getPosition().getDistance(boid.getPosition());

			if(distance < 25){
				c.subtractSelf(b.getPosition().subtract(boid.getPosition()));
			}
		}
	});

	return c;
}

export default ruleTwo;
