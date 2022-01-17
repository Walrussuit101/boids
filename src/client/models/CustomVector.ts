class CustomVector{
    public x: number;
    public y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    /**
     * Add a CustomVector to the current CustomVector and return
     * the result in a new CustomVector
     * 
     * @param v CustomVector to add
     * @returns CustomVector
     */
    add(v: CustomVector): CustomVector{
        return new CustomVector(
            this.x + v.x,
            this.y + v.y
        );
    }

    /**
     * Add a CustomVector to the current CustomVector
     * 
     * @param v CustomVector to add
     */
    addSelf(v: CustomVector): void{
        this.x += v.x;
        this.y += v.y;
    }

    /**
     * Subtract a CustomVector from the current CustomVector and return
     * the result in a new CustomVector
     * 
     * @param v CustomVector to subtract
     * @returns CustomVector
     */
    subtract(v: CustomVector): CustomVector{
        return new CustomVector(
            this.x - v.x,
            this.y - v.y
        );
    }

    /**
     * Subtract a CustomVector from the current CustomVector
     * 
     * @param v CustomVector to subtract
     */
    subtractSelf(v: CustomVector): void{
        this.x -= v.x;
        this.y -= v.y;
    }

    /**
     * Divide a CustomVector from the current CustomVector and return
     * the result in a new CustomVector
     * 
     * @param v CustomVector to divide
     * @returns CustomVector
     */
    divideScalar(s: number): CustomVector{
        return new CustomVector(
            this.x / s,
            this.y / s
        );
    }

    /**
     * Divide a CustomVector from the current CustomVector
     * 
     * @param v CustomVector to subtract
     */
    divideScalarSelf(s: number): void{
        this.x /= s;
        this.y /= s;
    }

    /**
     * Get the positional distance from another CustomVector
     * 
     * @param v CustomVector to get distance from
     * @returns number
     */
    getDistance(v: CustomVector): number{
        let xComp = Math.pow(this.x - v.x, 2);
        let yComp = Math.pow(this.y - v.y, 2);

        return Math.abs(Math.sqrt(xComp + yComp));
    }
}

export default CustomVector;