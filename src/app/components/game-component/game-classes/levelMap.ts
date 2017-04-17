import { TileMap } from './tileMap';
import { GameCharacter } from './game-character';
import { Tile } from './tile';
import { Vector2 } from './vector2';
import { Rectangle } from './rectangle';
import { GameConfig } from './../game.config';
import { GameComponent } from './../game.component';

//A collection of tilemaps, with identifier and connections to other tilemaps
export class LevelMap {

    public Game: GameComponent;
    public Layers: TileMap[];
    public Identifier: string;
    public Player: GameCharacter;
    public Entrance: Tile;
    public Exit: Tile;
    public PlayerStartPosition: Vector2;

    constructor(game: GameComponent, name: string, layers: TileMap[], player: GameCharacter, entrance: Tile, exit: Tile) {
        this.Game = game;
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
        //Load that map
        console.log(mapName);


        switch (mapName) {
            case "World":

                let tile_positions: Vector2[] = new Array();

                //Create test map
                for (let x = 0; x < 1000; x += 48) {
                    for (let y = 0; y < 1000; y += 48) {
                        tile_positions.push(new Vector2(x, y));
                    }
                }

                let tiles: Tile[] = new Array();

                //Foreach tile position create tile
                tile_positions.forEach(tile => {
                    tiles.push(new Tile(tile, GameConfig.game_image_path + "tiles_outside1.png", 48, 48, 5, 0));
                })

                //Create tilemap
                let layers: TileMap[] = new Array();
                layers.push(new TileMap("testlayer", tiles));

                //Create splattered tilemap
                let splatterTiles: Tile[] = new Array();
                splatterTiles.push(new Tile(new Vector2(100, 100), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 5, 11));
                splatterTiles.push(new Tile(new Vector2(200, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 6, 12));
                splatterTiles.push(new Tile(new Vector2(300, 300), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 7, 13));
                splatterTiles.push(new Tile(new Vector2(400, 400), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 8, 11));
                splatterTiles.push(new Tile(new Vector2(500, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 5, 12));
                splatterTiles.push(new Tile(new Vector2(600, 600), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 6, 13));
                splatterTiles.push(new Tile(new Vector2(700, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 7, 11));

                layers.push(new TileMap("testsplatterlayer", splatterTiles));

                //Create collision layer
                let collisionTiles: Tile[] = new Array();
                collisionTiles.push(new Tile(new Vector2(800, 100), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 5, 13));
                collisionTiles.push(new Tile(new Vector2(700, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 6, 13));
                collisionTiles.push(new Tile(new Vector2(300, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 7, 13));
                collisionTiles.push(new Tile(new Vector2(200, 600), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 8, 13));
                collisionTiles.push(new Tile(new Vector2(100, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 9, 13));

                layers.push(new TileMap("testcollisionlayer", collisionTiles, true));

                //Create entrance and exit
                let entranceTile = new Tile(new Vector2(400, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 12, "World");
                let exitTile = new Tile(new Vector2(1000, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 4, 4, "Cellar");

                this.SetNewMap("world", layers, this.Player, entranceTile, exitTile);

                layers.forEach(layer => layer.initTiles(this.Game.camera, this.Game.gameRect));
                entranceTile.init(this.Game.camera,this.Game.gameRect);
                exitTile.init(this.Game.camera,this.Game.gameRect);

                break;
            case "Cellar":
                let tile_positions2: Vector2[] = new Array();

                //Create test map
                for (let x = 0; x < 1000; x += 48) {
                    for (let y = 0; y < 1000; y += 48) {
                        tile_positions2.push(new Vector2(x, y));
                    }
                }

                let tiles2: Tile[] = new Array();

                //Foreach tile position create tile
                tile_positions2.forEach(tile => {
                    tiles2.push(new Tile(tile, GameConfig.game_image_path + "tiles_outside1.png", 48, 48, 5, 3));
                })

                //Create tilemap
                let layers2: TileMap[] = new Array();
                layers2.push(new TileMap("testlayer", tiles2));

                //Create splattered tilemap
                let splatterTiles2: Tile[] = new Array();
                splatterTiles2.push(new Tile(new Vector2(100, 100), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 1, 11));
                splatterTiles2.push(new Tile(new Vector2(200, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 12));
                splatterTiles2.push(new Tile(new Vector2(300, 300), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 3, 13));
                splatterTiles2.push(new Tile(new Vector2(400, 400), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 4, 11));
                splatterTiles2.push(new Tile(new Vector2(500, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 5, 12));
                splatterTiles2.push(new Tile(new Vector2(600, 600), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 6, 13));
                splatterTiles2.push(new Tile(new Vector2(700, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 7, 11));

                layers2.push(new TileMap("testsplatterlayer", splatterTiles2));

                //Create collision layer
                let collisionTiles2: Tile[] = new Array();
                collisionTiles2.push(new Tile(new Vector2(800, 100), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 1, 13));
                collisionTiles2.push(new Tile(new Vector2(700, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 13));
                collisionTiles2.push(new Tile(new Vector2(300, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 3, 13));
                collisionTiles2.push(new Tile(new Vector2(200, 600), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 4, 13));
                collisionTiles2.push(new Tile(new Vector2(100, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 5, 13));

                layers2.push(new TileMap("testcollisionlayer", collisionTiles2, true));

                //Create entrance and exit
                let entranceTile2 = new Tile(new Vector2(400, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 5, 12, "World");
                let exitTile2 = new Tile(new Vector2(1000, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 7, 4, "Cellar");

                layers2.forEach(layer => layer.initTiles(this.Game.camera, this.Game.gameRect));
                entranceTile2.init(this.Game.camera,this.Game.gameRect);
                exitTile2.init(this.Game.camera,this.Game.gameRect);

                this.SetNewMap("Cellar", layers2, this.Player, entranceTile2, exitTile2);
                break;
        }
    }

}