import { Vector2 } from './vector2';
import { Rectangle } from './rectangle';
import { GameConfig } from './../game.config';

export class GameEntity {

    id: number;
    position: Vector2;//Position on the canvas
    image: string;//Path to image
    width: number;//Width of sprite
    height: number;//Height of sprite
    horizontalFrame: number = 0;//number of horizontal sprite on spritesheet
    verticalFrame: number = 0;//number of vertical sprite on spritesheet
    sprite: HTMLImageElement;

    BoundingBox: Rectangle; //Collisionbox

    constructor(
        pos: Vector2,
        path: string,
        width: number,
        height: number,
        hFrame: number,
        vFrame: number) {

        this.width = width;
        this.height = height;
        this.horizontalFrame = hFrame;
        this.verticalFrame = vFrame;

        this.position = pos;
        this.sprite = new Image();
        this.sprite.src = path;
        this.BoundingBox = new Rectangle(this.position.x, this.position.y, this.width, this.height);
    }

    public init(camera?: Vector2, gameRect?: Rectangle) {
    }

    public update(keys?: boolean[]) {
        //Updates entity;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.sprite,
            this.horizontalFrame * 48,
            this.verticalFrame * 48,
            48,
            48,
            this.position.x ,
            this.position.y,
            this.width,
            this.height);
    }
}