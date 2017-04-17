import { Component, AfterViewInit, ViewChild, OnInit, HostListener, ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { GameEntity } from './game-classes/game-entity';
import { GameCharacter } from './game-classes/game-character';
import { Vector2 } from './game-classes/vector2';
import { Rectangle } from './game-classes/rectangle';
import { Tile } from './game-classes/tile';
import { TileMap } from './game-classes/tileMap';
import { LevelMap } from './game-classes/levelMap';
import { GameConfig } from './game.config';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements AfterViewInit, OnInit {

    public Width: number = 800;
    public height: number = 700;
    public context: CanvasRenderingContext2D;
    public Map: LevelMap;
    public gameRect: Rectangle;
    public camera: Vector2;
    public debugMode: boolean = false;
    public Player: GameCharacter;
    public IsLoading: boolean = true;

    public keysDown: boolean[] = new Array();


    private tile_positions: Vector2[] = new Array();

    @ViewChild("gameCanvas") gameCanvas: ElementRef;

    constructor(private http: Http) { }

    ngOnInit() {
        this.gameRect = new Rectangle(200, 200, 400, 350);
        this.camera = new Vector2(0, 0);
        this.Player;
    }

    loadMap() {

        console.log(this);

        //Create test map
        for (let x = 0; x < this.Width; x += 48) {
            for (let y = 0; y < this.height; y += 48) {
                this.tile_positions.push(new Vector2(x, y));
            }
        }

        let tiles: Tile[] = new Array();

        //Foreach tile position create tile
        this.tile_positions.forEach(tile => {
            tiles.push(new Tile(tile, GameConfig.game_image_path + "tiles_outside1.png", 48, 48, 0, 0));
        })

        //Create tilemap
        let layers: TileMap[] = new Array();
        layers.push(new TileMap("testlayer", tiles));

        //Create splattered tilemap
        let splatterTiles: Tile[] = new Array();
        splatterTiles.push(new Tile(new Vector2(100, 100), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 11));
        splatterTiles.push(new Tile(new Vector2(200, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 1, 12));
        splatterTiles.push(new Tile(new Vector2(300, 300), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 1, 13));
        splatterTiles.push(new Tile(new Vector2(400, 400), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 11));
        splatterTiles.push(new Tile(new Vector2(500, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 12));
        splatterTiles.push(new Tile(new Vector2(600, 600), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 1, 13));
        splatterTiles.push(new Tile(new Vector2(700, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 11));

        layers.push(new TileMap("testsplatterlayer", splatterTiles));

        //Create collision layer
        let collisionTiles: Tile[] = new Array();
        collisionTiles.push(new Tile(new Vector2(800, 100), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 13));
        collisionTiles.push(new Tile(new Vector2(700, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 13));
        collisionTiles.push(new Tile(new Vector2(300, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 13));
        collisionTiles.push(new Tile(new Vector2(200, 600), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 13));
        collisionTiles.push(new Tile(new Vector2(100, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 0, 13));

        layers.push(new TileMap("testcollisionlayer", collisionTiles, true));

        //Create entrance and exit
        let entranceTile = new Tile(new Vector2(400, 200), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 12, "World");
        let exitTile = new Tile(new Vector2(1000, 500), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 4, 4, "Cellar");

        layers.forEach(layer => layer.initTiles(this.camera,this.gameRect));
        entranceTile.init(this.camera,this.gameRect);
        exitTile.init(this.camera,this.gameRect);

        this.Map = new LevelMap(this, "Level1", layers, this.Player, entranceTile, exitTile);

        console.log("MapLoading = done");
        this.IsLoading = false;
    }

    @HostListener('document:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        this.keysDown[event.keyCode || event.which] = true;

        if (event.keyCode == 32) {
            GameConfig.debugMode != GameConfig.debugMode;
        }
    }
    @HostListener('document:keyup', ['$event'])
    KeyboardReleased(event: KeyboardEvent) {
        this.keysDown[event.keyCode || event.which] = false;
    }

    ngAfterViewInit() {

        let canvas = this.gameCanvas.nativeElement;
        this.context = canvas.getContext("2d");

        //Get player from db
        let data:any;

        this.http.get('http://localhost:80/player.service.php')
        .toPromise()
        .then(result => data = result.json())
        .then(()=> this.Player = 
        new GameCharacter(new Vector2(data.positionX,data.positionY),
         GameConfig.game_image_path + "/" + data.image,data.width, data.height, data.horizontalFrame, data.verticalFrame))
            .then(() => this.Player.init(this.camera,this.gameRect))
            .then(() => this.loadMap())
            .then(() => this.update());
    }

    update() {
        requestAnimationFrame(() => {
            this.update();
        });
        if(!this.IsLoading){
            //Clear screen
           this.context.clearRect(0, 0, 800, 700);

            this.context.beginPath();

            this.context.fillStyle = "#ffffff";

            //Update game elements
            this.Map.update();
            this.Player.update(this.keysDown);

            //Draw tiles
            this.Map.draw(this.context);
            this.Player.draw(this.context);

            this.context.closePath();
        }
        else{
               this.context.fillStyle = 'blue';
               this.context.clearRect(0,0,800,700);
               let loadingImage = new Image();
               loadingImage.src="./game-images/loading.png";
               this.context.drawImage(loadingImage,0,0,600,800,0,0,600,800);
        }
    }
}