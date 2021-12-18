import { Boid } from '../models';
import Victor from 'victor';

/**Get the velocity Victor after applying rule one
 *
 * Rule One: 
 *  - Boids try to fly towards the centre of mass of neighbouring boids
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @returns Victor
 */
const ruleOne = (boid: Boid, allBoids: Boid[]): Victor => {

	let perceivedCenter = new Victor(0, 0);

	// get the "perceived center" of all other boids
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId()){
			perceivedCenter.add(b.getPosition());
		}
	});

	let nMinusOne = allBoids.length - 1;
	perceivedCenter.divide(new Victor(nMinusOne, nMinusOne));

	// return velocity that is 1% towards the "perceived center"
	perceivedCenter.subtract(boid.getPosition());
	perceivedCenter.divide(new Victor(100, 100));

	return perceivedCenter;
}

export default ruleOne;
