import { CustomVector } from "../models";

export interface params {
    VELOCITY_LIMIT: number, 
    BOID_SIZE: number, 
    VISUAL_RANGE: number,
    NUM_BOIDS: number,
    MOUSE_POSITION: CustomVector
}