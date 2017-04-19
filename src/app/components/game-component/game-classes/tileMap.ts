import { GameEntity } from './game-entity';
import { Tile } from './tile';
import { GameCharacter } from './game-character';
import { Rectangle } from './rectangle';
import { Vector2 } from './vector2';
import { GameConfig } from './../game.config';

//Just a collection of tiles
export class TileMap{

    public Collision: boolean;//This is a collision layer/map 
    //public Tiles : Tile[];
    public Tiles:number[][];
    public Identifier : string;
    public spritesheet = new Image();

    constructor(id:string, spritesheet:string, tiles:number[][], collision?:boolean){
        //this.Tiles=tiles;
        this.spritesheet.src = GameConfig.game_image_path + '/' + spritesheet;
        this.Identifier = id;
        this.Collision=collision;
        this.Tiles = tiles;
    }

    //Draw all tiles
    public Draw(ctx:CanvasRenderingContext2D){
        //this.Tiles.forEach(tile => tile.draw(ctx,this.Collision));

        // if (GameConfig.debugMode) {
        //     //Draw camera borders
        //     if(this.Collision){

        //         ctx.font = "16px Arial";
        //         ctx.fillStyle = "#ffffff";
        //         ctx.fillText(this.position.toString(), this.position.x - GameConfig.worldCamera.x, this.position.y - GameConfig.worldCamera.y);

        //         ctx.rect(this.position.x - GameConfig.worldCamera.x,this.position.y - GameConfig.worldCamera.y,48,48);
        //         ctx.strokeStyle = "#ff00ff";
        //         ctx.stroke();
        //     }
        // }

            for(let i = 0; i < this.Tiles.length; i++){
                for(let j = 0; j < this.Tiles[i].length;j++){

                    //Get y tile
                    var tileX = Math.floor(this.Tiles[i][j]/16);
                    //get x get rest
                    var tileY = this.Tiles[i][j]%12;

                    ctx.drawImage(
                        this.spritesheet,
                        tileX * 48, tileY * 48, 48, 48,
                        (i * 48) - GameConfig.worldCamera.x,
                        (j * 48) - GameConfig.worldCamera.y,
                        48,48 
                    );
                }
            }
    }

    //Check collision with playerlocation
    public checkCollision(player: GameCharacter){

        // this.Tiles.forEach( (tile) => {
        //     if(Rectangle.Intersect(tile.BoundingBox,player.BoundingBox)){
        //         //Collision detected
        //         player.collisionWithCollisionTile(tile);
        //         console.log('collision with player');
        //     }
        // })

    }
}