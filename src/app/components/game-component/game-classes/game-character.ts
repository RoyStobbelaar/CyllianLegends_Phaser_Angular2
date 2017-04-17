import { Vector2 } from './vector2';
import { GameEntity } from './game-entity';
import { GameComponent } from './../game.component';
import { Rectangle } from './rectangle';
import { GameConfig } from './../game.config';

enum Direction {
    Left, Right, Up, Down
}

export class GameCharacter extends GameEntity {

    public direction: Direction;
    public velocity: Vector2;
    public prevPosition: Vector2;
    public prevDirection: Direction;
    public timer: number = 0;
    public playerCameraPosition: Vector2;
    public collision: boolean;
    private camera: Vector2;
    private gameRect: Rectangle;

    constructor(
        pos: Vector2,
        path: string,
        width: number,
        height: number,
        hFrame: number,
        vFrame: number
    ) {
        super(pos, path, width, height, hFrame, vFrame);
        //Default face down
        this.direction = Direction.Down;
        this.velocity = new Vector2(0, 0);
        this.collision = false;
    }

    public init(camera?: Vector2, gameRect?: Rectangle) {
        this.camera = camera;
        this.gameRect = gameRect;
    }

    public collisionWithCollisionTile(tile: GameEntity) {
        //Collision with tile, return to previous location
        //this.position = this.prevPosition;
        console.log('collide');
        this.collision = true;
        this.prevDirection = this.direction;
    }

    public update(keys?: boolean[]) {
        this.timer++;

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (keys[37] || keys[65]) {
            this.velocity.x -= 3;
            this.verticalFrame = 1;
            this.direction = Direction.Left;
        }
        if (keys[38] || keys[87]) {
            this.velocity.y -= 3; 0
            this.verticalFrame = 3;
            this.direction = Direction.Up;

        }
        if (keys[39] || keys[68]) {
            this.velocity.x += 3;
            this.verticalFrame = 2;
            this.direction = Direction.Right;

        }
        if (keys[40] || keys[83]) {
            this.velocity.y += 3;
            this.verticalFrame = 0;
            this.direction = Direction.Down;

        }

        this.prevPosition = new Vector2(this.position.x, this.position.y);

        if (!this.collision || this.direction != this.prevDirection) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            //move boundingbox
            this.BoundingBox.left += this.velocity.x;
            this.BoundingBox.right += this.velocity.x;
            this.BoundingBox.bottom += this.velocity.y;
            this.BoundingBox.top += this.velocity.y;
        }

        //Check if camera should move
        if (this.gameRect.TouchesCameraBorders(new Vector2(this.position.x - this.camera.x, this.position.y - this.camera.y))) {
            //Move camera
            console.log('move camera');
            this.camera.x += this.velocity.x;
            this.camera.y += this.velocity.y;
        }

        if (this.timer > 10 && !(this.velocity.x == 0 && this.velocity.y == 0)) {
            this.horizontalFrame += 1;
            this.timer = 0;
            if (this.horizontalFrame > 2)
                this.horizontalFrame = 0;
        }

        this.collision = false;
    }

    public draw(ctx: CanvasRenderingContext2D) {

        //Draw debug
        if (GameConfig.debugMode) {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(this.position.toString(), this.position.x - this.camera.x, this.position.y - this.camera.y);

            //Draw camera borders
            ctx.rect(200, 200, 400 + 48, 350 + 48);
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
        }

        ctx.drawImage(
            this.sprite,
            this.horizontalFrame * 48,
            this.verticalFrame * 48,
            48,
            48,
            this.position.x - this.camera.x,
            this.position.y - this.camera.y,
            this.width,
            this.height);
    }

    public SetPosition(newPosition: Vector2) {
        this.position = newPosition;
        this.BoundingBox = new Rectangle(this.position.x, this.position.y, this.width, this.height);
        //this.camera = new Vector2(this.position.x - 400, this.position.y - 350);
    }
}