import { GameEntity } from './game-entity';
import { Tile } from './tile';
import { GameCharacter } from './game-character';
import { Rectangle } from './rectangle';
import { Vector2 } from './vector2';
import { GameConfig } from './../game.config';

//Just a collection of tiles
export class TileMap {

    public Collision: boolean;//This is a collision layer/map 
    public Tiles: number[][];
    public Identifier: string;
    public spritesheet = new Image();

    constructor(id: string, spritesheet: string, tiles: number[][], collision?: boolean) {
        this.spritesheet.src = GameConfig.game_image_path + '/' + spritesheet;
        this.Identifier = id;
        this.Collision = collision;
        this.Tiles = tiles;
    }

    //Draw all tiles
    public Draw(ctx: CanvasRenderingContext2D) {

        for (let i = 0; i < this.Tiles.length; i++) {
            for (let j = 0; j < this.Tiles[i].length; j++) {

                var tileX = Math.floor(this.Tiles[i][j] / 16);
                var tileY = this.Tiles[i][j] % 12;
                
                ctx.drawImage(
                    this.spritesheet,
                    tileX * 48, tileY * 48, 48, 48,
                    (i * 48) - GameConfig.worldCamera.x,
                    (j * 48) - GameConfig.worldCamera.y,
                    48, 48
                );

                if (GameConfig.debugMode && this.Collision && this.Tiles[i][j]!=null) {
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "#ffffff";
                    ctx.fillText((i * 48).toString() + " - " + (j * 48).toString(), (i * 48) - GameConfig.worldCamera.x, (j * 48) - GameConfig.worldCamera.y);

                    ctx.rect((i * 48) - GameConfig.worldCamera.x, (j * 48) - GameConfig.worldCamera.y, 48, 48);
                    
                    ctx.strokeStyle = "#ff00ff";
                    ctx.stroke();
                }
            }
        }
    }

    //Check collision with playerlocation
    public checkCollision(player: GameCharacter) {

        for (let i = 0; i < this.Tiles.length; i++) {
            for (let j = 0; j < this.Tiles[i].length; j++) {

                let rect = new Rectangle((i * 48),(j * 48),48,48);

                if(this.Tiles[i][j] != null && Rectangle.Intersect(rect,player.BoundingBox)){
                    console.log('Collision with player at : {0} - {1}',i*48,j*48);
                    player.position = player.prevPosition;
                }
            }
        }
    }
}