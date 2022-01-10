import { Boid, CustomVector } from '../models';

/**Get the velocity Vector after applying rule one
 *
 * Rule One: 
 *  - Boids try to fly towards the centre of mass of neighbouring boids
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @returns Vector 
 */
const ruleOne = (boid: Boid, allBoids: Boid[]): CustomVector => {

	let perceivedCenter = new CustomVector(0, 0);

	// get the "perceived center" of all other boids
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId()){
			perceivedCenter.addSelf(b.getPosition());
		}
	});

	let nMinusOne = allBoids.length - 1;
	perceivedCenter.divideScalarSelf(nMinusOne);

	// return velocity that is 1% towards the "perceived center"
	perceivedCenter.subtractSelf(boid.getPosition());
	perceivedCenter.divideScalarSelf(100);

	return perceivedCenter;
}

export default ruleOne;
