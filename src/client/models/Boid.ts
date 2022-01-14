import { CustomVector } from './';

class Boid{

	private id: number;
	private position: CustomVector;
	private velocity: CustomVector;

	constructor(id: number, positionVector: CustomVector, velocityVector: CustomVector){
		this.id = id;
		this.position = positionVector;
		this.velocity = velocityVector;
	}

	/**
	 * Get the Boid's id
	 *
	 * @returns number
	 */
	getId(): number{
		return this.id;
	}

	/**
	 * Get the Boid's position Vector
	 *
	 * @returns Vector
	 */
	getPosition(): CustomVector{
		return this.position;
	}

	/**
	 * Get the Boid's velocity Vector
	 *
	 * @returns Vector
	 */
	getVelocity(): CustomVector{
		return this.velocity;
	}

	/**
	 * "Move" the Boid by adding the Boid's velocity Victor to it's position Victor
	 *
	 * @returns void
	 */
	move(): void {
		this.position.addSelf(this.velocity)
	}

	/**
	 * Add a Vector to the Boid's velocity Vector
	 *
	 * @param vectorToAdd Vector to add to boid's velocity
	 * @returns void
	 */
	addToVelocity(vectorToAdd: CustomVector): void {
		this.velocity.addSelf(vectorToAdd);
	}

	/**
	 * Determine if a boid can see another boid
	 * 
	 * @param otherBoid Boid to determine if this boid can see
	 * @param VISUAL_RANGE Visual range of all boids
	 * @returns Boolean
	 */
	canSee(otherBoid: Boid, VISUAL_RANGE: number): boolean{
		return this.getPosition().getDistance(otherBoid.getPosition()) < VISUAL_RANGE;
	}
}

export default Boid;
