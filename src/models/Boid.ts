import Victor from 'victor';

class Boid{

	private id: number;
	private position: Victor;
	private velocity: Victor;

	constructor(id: number, positionVector: Victor, velocityVector: Victor){
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
	 * Get the Boid's position Victor
	 *
	 * @returns Victor
	 */
	getPosition(): Victor {
		return this.position;
	}

	/**
	 * Get the Boid's velocity Victor
	 *
	 * @returns Victor
	 */
	getVelocity(): Victor {
		return this.velocity;
	}

	/**
	 * "Move" the Boid by adding the Boid's velocity Victor to it's position Victor
	 *
	 * @returns void
	 */
	move(): void {
		this.position.add(this.velocity);
	}

	/**
	 * Add a Victor to the Boid's velocity Victor
	 *
	 * @param victorToAdd Victor to add to boid's velocity
	 * @returns void
	 */
	addToVelocity(victorToAdd: Victor): void {
		this.velocity.add(victorToAdd);
	}
}

export default Boid;
