import { GameComponent } from './../game.component';
import { GameEntity } from './game-entity';
import { Vector2 } from './vector2';
import { TileMap } from './tileMap';

export class Tile extends GameEntity{

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
    }

    public draw(ctx:CanvasRenderingContext2D, collision?:boolean){
        //var ctx = this.game.context;
        //Draw debug
        if (this.game.debugMode) {
            //Draw camera borders
            if(collision){

                ctx.font = "16px Arial";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(this.position.toString(), this.position.x - this.game.camera.x, this.position.y - this.game.camera.y);

                ctx.rect(this.position.x - this.game.camera.x,this.position.y - this.game.camera.y,48,48);
                ctx.strokeStyle = "#ff00ff";
                ctx.stroke();
            }
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