import { Vector2 } from './vector2';

export class Rectangle{
    
    public x:number;
    public y:number;
    public width:number;
    public height:number;

    public top:number;
    public bottom:number;
    public left:number;
    public right:number;

    constructor(positionX: number, positionY:number, width:number, height:number){
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;

        //Fill top, bottom, left, right
        this.top = positionY;
        this.bottom = positionY+height;
        this.left = positionX;
        this.right = positionX + width;
    }

    TouchesCameraBorders(position: Vector2){
        if(position.x > this.x && (position.x < this.x + this.width) &&
        position.y > this.y && (position.y < this.y + this.height)){
            return false;
        }

        return true;
    }

    static Intersect(r1: Rectangle, r2: Rectangle){

        return (r1.left < r2.right &&
                r2.left < r1.right &&
                r1.top < r2.bottom &&
                r2.top < r1.bottom
                );
    }
}