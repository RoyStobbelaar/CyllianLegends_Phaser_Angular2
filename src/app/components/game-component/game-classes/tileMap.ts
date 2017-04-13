import { GameEntity } from './game-entity';
import { Tile } from './tile';
import { GameCharacter } from './game-character';
import { Rectangle } from './rectangle';

//Just a collection of tiles
export class TileMap{

    public Collision: boolean;//This is a collision layer/map 
    public Tiles : Tile[];
    public Identifier : string;

    constructor(id:string, tiles:Tile[], collision?:boolean){
        this.Tiles=tiles;
        this.Identifier = id;
        this.Collision=collision;
    }

    //Draw all tiles
    public Draw(ctx:CanvasRenderingContext2D){
        this.Tiles.forEach(tile => tile.draw(ctx,this.Collision));
    }

    //Check collision with playerlocation
    public checkCollision(player: GameCharacter){
        //TODO::FIX POSITION USING CAMERA OBJECT
        this.Tiles.forEach( (tile) => {
            if(Rectangle.Intersect(tile.BoundingBox,player.BoundingBox)){
                //Collision detected
                player.collisionWithCollisionTile(tile);
                console.log('collision with player');
            }
        })
    }
}