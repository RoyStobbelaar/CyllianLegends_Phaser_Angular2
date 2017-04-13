import { Vector2 } from './vector2';

export class Rectangle{
    
    private x:number;
    private y:number;
    private width:number;
    private height:number;

    private top:number;
    private bottom:number;
    private left:number;
    private right:number;

    constructor(positionX: number, positionY:number, width:number, height:number){
        this.x = positionX;
        this.y = positionY;
        this.width=width;
        this.height=height;

        //Fill top, bottom, left, right
    }

    TouchesCameraBorders(position: Vector2){
        if(position.x > this.x && (position.x < this.x + this.width) &&
        position.y > this.y && (position.y < this.y + this.height)){
            return false;
        }

        return true;
    }

    static Intersect(r1: Rectangle, r2: Rectangle){
        return (r2.x < r1.width &&
                r2.x < r1.x &&
                r2.y < r1.height &&
                r2.height < r1.y
                );
    }
}