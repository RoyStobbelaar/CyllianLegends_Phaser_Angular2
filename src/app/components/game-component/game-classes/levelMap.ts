import { TileMap } from './tileMap';
import { GameCharacter } from './game-character';
import { Tile } from './tile';

//A collection of tilemaps, with identifier and connections to other tilemaps
export class LevelMap{

    public Layers: TileMap[];
    public Identifier: string;
    public Player: GameCharacter;
    //public Entrance: Tile;
    //public Exit: Tile;

    constructor(name:string, layers: TileMap[], player:GameCharacter){
        this.Layers = layers;
        this.Identifier = name;
        this.Player = player;
        //this.Entrance = entrance;
        //this.Exit = exit;
    }

    public update(){
        //Check collision with player and such
        this.Layers.forEach( (layer) => {
            if(layer.Collision){
                layer.checkCollision(this.Player);
            }
        })
    }

    public draw(ctx:CanvasRenderingContext2D){
        this.Layers.forEach(l => l.Draw(ctx));
    }

}