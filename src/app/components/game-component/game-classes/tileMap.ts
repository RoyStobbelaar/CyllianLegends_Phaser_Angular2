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

        console.log('draw tiles');

            for(let i = 0; i < this.Tiles.length; i++){
                for(let j = 0; j < this.Tiles[i].length;j++){

                    var tile = this.GetTileFromNumber(this.Tiles[i][j]);
                    console.log(tile);

                    ctx.drawImage(
                        this.spritesheet,
                        tile[0] * 48, tile[1] * 48, 48, 48,
                        (i * 48) - GameConfig.worldCamera.x,
                        (j * 48) - GameConfig.worldCamera.y,
                        48,48 
                    );
                }
            }

            // ctx.drawImage(
            // this.spritesheet,
            // this.horizontalFrame * 48,
            // this.verticalFrame * 48,
            // 48,
            // 48,
            // this.position.x - GameConfig.worldCamera.x,
            // this.position.y - GameConfig.worldCamera.y,
            // this.width,
            // this.height);

        // ctx.drawImage(
        //     this.spritesheet,
        //     this.horizontalFrame * 48,
        //     this.verticalFrame * 48,
        //     48,
        //     48,
        //     this.position.x - GameConfig.worldCamera.x,
        //     this.position.y - GameConfig.worldCamera.y,
        //     this.width,
        //     this.height);

    }

    public GetTileFromNumber(tileNumber:number) {
        let total=0;
        for(let x = 0; (x*48) <= this.spritesheet.width; x++){
            for (let y=0; (y*48) <= this.spritesheet.height; y++){
                total++;
                if(total == tileNumber)
                    return [x, y];
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