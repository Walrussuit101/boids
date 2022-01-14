import Two from 'twojs-ts';
import { boidComps, twojsUtils } from './utils';

const main = (): void => {
	// init twojs
	let field = document.getElementById("field");
	let two: Two;

	if(field){
		two = twojsUtils.initTwojs(field);
	}else{
		throw new Error("Field div not in document");
	}

	// init boids
	const boids = boidComps.initBoids(25, two.width, two.height);

	// start game loop
	setInterval(() => {
		// update boids
		boidComps.moveBoids(boids, two.width, two.height);

		// draw boids
		boidComps.drawBoids(boids, two);
	}, 30);
}

try{
	main();
}catch(e){
	console.error(e);
	process.exit(1);
}
