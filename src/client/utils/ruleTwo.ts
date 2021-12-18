import { Boid } from '../models';
import Victor from 'victor';

/**Get the velocity Victor after applying rule two
 *
 * Rule Two:
 *  - Boids try to keep a small distance away from other objects (including other boids). 
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @returns Victor
 */
const ruleTwo = (boid: Boid, allBoids: Boid[]): Victor => {

	let c = new Victor(0, 0);

	/* get a velocity for the boid `boid` to move
	 *
	 * aka move the current boid away from another boid
	 * if it is 100 units away
	 */
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId()){
			let distance = b.getPosition().distance(boid.getPosition());

			if(Math.abs(distance) < 100){
				c.subtract(b.getPosition().subtract(boid.getPosition()));
			}
		}
	});

	return c;
}

export default ruleTwo;
