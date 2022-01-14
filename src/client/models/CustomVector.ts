class CustomVector{
    public x: number;
    public y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    add(v: CustomVector): CustomVector{
        return new CustomVector(
            this.x + v.x,
            this.y + v.y
        );
    }

    addSelf(v: CustomVector): void{
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v: CustomVector): CustomVector{
        return new CustomVector(
            this.x - v.x,
            this.y - v.y
        );
    }

    subtractSelf(v: CustomVector): void{
        this.x -= v.x;
        this.y -= v.y;
    }

    divideScalar(s: number): CustomVector{
        return new CustomVector(
            this.x / s,
            this.y / s
        );
    }

    divideScalarSelf(s: number): void{
        this.x /= s;
        this.y /= s;
    }

    getDistance(v: CustomVector): number{
        let xComp = Math.pow(this.x - v.x, 2);
        let yComp = Math.pow(this.y - v.y, 2);

        return Math.abs(Math.sqrt(xComp + yComp));
    }
}

export default CustomVector;