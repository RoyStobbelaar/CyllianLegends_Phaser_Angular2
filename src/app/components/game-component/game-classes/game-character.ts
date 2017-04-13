import { Vector2 } from './vector2';
import { GameEntity } from './game-entity';
import { GameComponent } from './../game.component';

enum Direction {
    Left, Right, Up, Down
}

export class GameCharacter extends GameEntity {

    public direction: Direction;
    public velocity: Vector2;
    public prevPosition: Vector2;
    public timer: number = 0;
    public playerCameraPosition: Vector2;

    constructor(
        game: GameComponent,
        pos: Vector2,
        path: string,
        width: number,
        height: number,
        hFrame: number,
        vFrame: number
    ) {
        super(game, pos, path, width, height, hFrame, vFrame);
        //Default face down
        this.direction = Direction.Down;
        this.velocity = new Vector2(0, 0);
        this.playerCameraPosition = new Vector2(this.position.x - this.game.camera.x, this.position.y - this.game.camera.y);
    }

    public collisionWithCollisionTile(tile: GameEntity){
        //Collision with tile, return to previous location
        this.position = this.prevPosition;
    }

    public update() {
        this.timer++;

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.game.keysDown[37]) {
            this.velocity.x -= 3;
            this.verticalFrame = 1;
        }
        if (this.game.keysDown[38]) {
            this.velocity.y -= 3;
            this.verticalFrame = 3;
        }
        if (this.game.keysDown[39]) {
            this.velocity.x += 3;
            this.verticalFrame = 2;
        }
        if (this.game.keysDown[40]) {
            this.velocity.y += 3;
            this.verticalFrame = 0;
        }
        if (this.game.keysDown[32]) {
            this.game.debugMode=true;
        }

        this.prevPosition = new Vector2(this.position.x, this.position.y);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //Check if camera should move
        if (this.game.gameRect.TouchesCameraBorders(new Vector2(this.position.x - this.game.camera.x, this.position.y - this.game.camera.y))) {
            //Move camera
            console.log('move camera');
            this.game.camera.x += this.velocity.x;
            this.game.camera.y += this.velocity.y;
        }

        if (this.timer > 10 && !(this.velocity.x == 0 && this.velocity.y == 0)) {
            this.horizontalFrame += 1;
            this.timer = 0;
            if (this.horizontalFrame > 2)
                this.horizontalFrame = 0;
        }

        this.playerCameraPosition.x = this.position.x - this.game.camera.x;
        this.playerCameraPosition.y = this.position.y - this.game.camera.y;
    }

    public draw(ctx:CanvasRenderingContext2D) {
        //var ctx = this.game.context;

        //Draw debug
        if (this.game.debugMode) {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(this.position.toString(), this.position.x - this.game.camera.x, this.position.y - this.game.camera.y);

            //Draw camera borders
            ctx.rect(200,200,400+48,350+48);
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
        }
        ctx.drawImage(
            this.sprite,
            this.horizontalFrame * 48,
            this.verticalFrame * 48,
            48,
            48,
            this.position.x - this.game.camera.x,
            this.position.y - this.game.camera.y,
            this.width,
            this.height);
    }
}