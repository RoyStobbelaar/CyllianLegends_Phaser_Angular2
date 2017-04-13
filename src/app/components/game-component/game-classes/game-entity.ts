import { Vector2 } from './vector2';
import { GameComponent } from './../game.component';
import { Rectangle } from './rectangle';

export class GameEntity {

    position: Vector2;//Position on the canvas
    game: GameComponent
    image: string;//Path to image
    width: number;//Width of sprite
    height: number;//Height of sprite
    horizontalFrame: number = 0;//number of horizontal sprite on spritesheet
    verticalFrame: number = 0;//number of vertical sprite on spritesheet
    sprite: HTMLImageElement;

    BoundingBox: Rectangle; //Collisionbox

    constructor(
        game: GameComponent,
        pos: Vector2,
        path: string,
        width: number,
        height: number,
        hFrame: number,
        vFrame: number) {
        this.game = game;
        this.position = pos;
        this.image = path;
        this.width = width;
        this.height = height;
        this.horizontalFrame = hFrame;
        this.verticalFrame = vFrame;

        this.sprite = new Image();
        this.sprite.src = path;
        this.BoundingBox = new Rectangle(this.position.x,this.position.y,width,height);
    }

    public update() {
        //Updates entity;

        //handle pushed keys
        // if (this.game.keysDown[37]){
        //     this.position.x -= 3;
        //     this.verticalFrame = 1;
        // }
        // if (this.game.keysDown[38]){
        //     this.position.y -= 3;
        //     this.verticalFrame = 3;
        // }
        // if (this.game.keysDown[39]){
        //     this.position.x += 3;
        //     this.verticalFrame = 2;
        // }
        // if (this.game.keysDown[40]){
        //     this.position.y += 3;
        //     this.verticalFrame = 0;
        // }
}

    public draw(ctx:CanvasRenderingContext2D) {
    // var ctx = this.game.context;

    // ctx.drawImage(
    //     this.sprite,
    //     this.horizontalFrame * 48,
    //     this.verticalFrame * 48,
    //     48,
    //     48,
    //     this.position.x - this.game.camera.x,
    //     this.position.y - this.game.camera.y,
    //     this.width,
    //     this.height);
}
}