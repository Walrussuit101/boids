import { Boid, CustomVector } from '../models';

/**Get the velocity Vector after applying rule one
 *
 * Rule One: 
 *  - Boids try to fly towards the centre of mass of neighbouring boids
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @param VISUAL_RANGE Visual range of the boids
 * @returns Vector 
 */
const ruleOne = (boid: Boid, allBoids: Boid[], VISUAL_RANGE: number): CustomVector => {

	let perceivedCenter = new CustomVector(0, 0);
	let numNeighbors = 0;

	// get the "perceived center" of all other boids
	allBoids.forEach(b => {
		if(b.getId() !== boid.getId() && b.getPosition().getDistance(boid.getPosition()) < VISUAL_RANGE){
			perceivedCenter.addSelf(b.getPosition());
			numNeighbors++;
		}
	});

	if(numNeighbors){
		perceivedCenter.divideScalarSelf(numNeighbors);

		// return velocity that is 1% towards the "perceived center"
		perceivedCenter.subtractSelf(boid.getPosition());
		perceivedCenter.divideScalarSelf(100);

		return perceivedCenter;
	}

	return new CustomVector(0, 0);
}

export default ruleOne;
