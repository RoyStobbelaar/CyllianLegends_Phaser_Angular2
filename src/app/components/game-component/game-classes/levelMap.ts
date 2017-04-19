import { TileMap } from './tileMap';
import { GameCharacter } from './game-character';
import { Tile } from './tile';
import { Vector2 } from './vector2';
import { Rectangle } from './rectangle';
import { GameConfig } from './../game.config';
import { GameComponent } from './../game.component';

//A collection of tilemaps, with identifier and connections to other tilemaps
export class LevelMap {

    public Layers: TileMap[];
    public Identifier: string;
    public Player: GameCharacter;
    public Entrance: Tile;
    public Exit: Tile;
    public PlayerStartPosition: Vector2;

    constructor(name: string, layers: TileMap[], player: GameCharacter, entrance: Tile, exit: Tile) {
        this.Layers = layers;
        this.Identifier = name;
        this.Player = player;
        this.Entrance = entrance;
        this.Exit = exit;
        //1 tile below back position
        this.Player.SetPosition(new Vector2(entrance.position.x, entrance.position.y + 50));
    }

    public SetNewMap(name: string, layers: TileMap[], player: GameCharacter, entrance: Tile, exit: Tile) {
        this.Layers = layers;
        this.Identifier = name;
        this.Player = player;
        this.Entrance = entrance;
        this.Exit = exit;
        this.Player.SetPosition(new Vector2(entrance.position.x, entrance.position.y + 50));
    }

    public update() {
        //Check collision with player and such
        this.Layers.forEach((layer) => {
            if (layer.Collision) {
                layer.checkCollision(this.Player);
            }
        });

        //Check collision with exit or entrance
        if (Rectangle.Intersect(this.Entrance.BoundingBox, this.Player.BoundingBox)) {
            //Load previous map
            this.LoadMap(this.Entrance.leadsTo);
        }

        if (Rectangle.Intersect(this.Exit.BoundingBox, this.Player.BoundingBox)) {
            //Load next map
            this.LoadMap(this.Exit.leadsTo);
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.Layers.forEach(l => l.Draw(ctx));
        this.Entrance.draw(ctx);
        this.Exit.draw(ctx);
    }

    public LoadMap(mapName: string) {
        console.log("Load level: " + mapName);
        switch (mapName) {
            case "World":
                let tileArray: number[][];
                tileArray = [];
                //Create test map pro way
                for (let y = 0; y * 48 < (500 * 3); y++) {
                    tileArray[y] = [];
                    for (let x = 0; x * 48 < (500 * 3); x++) {
                        tileArray[y][x] = Math.floor(x / 4);
                    }
                }
                //Create tilemap
                let layers: TileMap[] = new Array();

                layers.push(new TileMap("lvl1ground", "tiles_outside1.png", tileArray, false));

                //Create entrance and exit
                let entranceTile = new Tile(new Vector2(400, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 12, "Level1");
                let exitTile = new Tile(new Vector2(1000, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 4, 4, "Cellar");

                this.SetNewMap("world", layers, this.Player, entranceTile, exitTile);

                break;
            case "Cellar":

                let tileArray2: number[][];
                tileArray2 = [];
                //Create test map pro way
                for (let y = 0; y * 48 < (600 * 3); y++) {
                    tileArray2[y] = [];
                    for (let x = 0; x * 48 < (600 * 3); x++) {
                        tileArray2[y][x] = Math.floor(x / 6);
                    }
                }
                //Create tilemap
                let layers2: TileMap[] = new Array();

                layers2.push(new TileMap("lvl1ground", "tiles_outside1.png", tileArray2, false));

                //Create entrance and exit
                let entranceTile2 = new Tile(new Vector2(400, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 5, 12, "World");
                let exitTile2 = new Tile(new Vector2(1000, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 7, 4, "Level1");

                this.SetNewMap("Cellar", layers2, this.Player, entranceTile2, exitTile2);
                break;
            case "Level1":

                let tileArray3: number[][];
                tileArray3 = [];
                //Create test map pro way
                for (let y = 0; y * 48 < (700 * 3); y++) {
                    tileArray3[y] = [];
                    for (let x = 0; x * 48 < (800 * 3); x++) {
                        tileArray3[y][x] = Math.floor(x / 3);
                    }
                }
                //Create tilemap
                let layers3: TileMap[] = new Array();

                layers3.push(new TileMap("lvl1ground", "tiles_outside1.png", tileArray3, false));

                //Create entrance and exit
                let entranceTile3 = new Tile(new Vector2(100, 50), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 12, "World");
                let exitTile3 = new Tile(new Vector2(1000, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 4, 4, "Cellar");

                this.SetNewMap("Level1", layers3, this.Player, entranceTile3, exitTile3);

                break;
        }
    }

}