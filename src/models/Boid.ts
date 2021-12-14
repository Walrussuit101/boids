import Victor from 'victor';

class Boid{

	private position: Victor;
	private velocity: Victor;

	constructor(positionVector: Victor, velocityVector: Victor){
		this.position = positionVector;
		this.velocity = velocityVector;
	}

	/**
	 * Get the Boid's position Victor
	 */
	getPosition(): Victor {
		return this.position;
	}

	/**
	 * Get the Boid's velocity Victor
	 */
	getVelocity(): Victor {
		return this.velocity;
	}

	/**
	 * "Move" the Boid by adding the Boid's velocity Victor to it's position Victor
	 */
	move(): void {
		this.position.add(this.velocity);
	}

	/**
	 * Add a Victor to the Boid's velocity Victor
	 *
	 * @param victorToAdd Victor to add to boid's velocity
	 */
	addToVelocity(victorToAdd: Victor): void {
		this.velocity.add(victorToAdd);
	}
}

export default Boid;
