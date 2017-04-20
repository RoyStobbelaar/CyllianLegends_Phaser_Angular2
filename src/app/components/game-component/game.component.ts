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
    public Height: number = 700;
    public context: CanvasRenderingContext2D;
    public Map: LevelMap;
    public debugMode: boolean = false;
    public Player: GameCharacter;
    public IsLoading: boolean = true;

    public keysDown: boolean[] = new Array();

    private tile_positions: Vector2[] = new Array();

    @ViewChild("gameCanvas") gameCanvas: ElementRef;

    constructor(private http: Http) { }

    ngOnInit() {
    }

    loadMap() {
        let tileArray: number[][];
        let collisionArray:number[][];
        tileArray = [];
        collisionArray = [];
        //Create test map pro way
        for(let y = 0; y * 48 < (this.Height * 3); y++){
            tileArray[y] = [];
            collisionArray[y] = [];
            for(let x = 0; x * 48 < (this.Width * 3); x++){
                tileArray[y][x] = Math.floor(x/3);
            }
        }

        collisionArray[8][0] = 132;
        collisionArray[8][1] = 133;
        collisionArray[9][0] = 144;
        collisionArray[9][1] = 145;

        collisionArray[10][10] = 132;
        collisionArray[10][11] = 133;
        collisionArray[11][10] = 144;
        collisionArray[11][11] = 145;

        collisionArray[0][9] = 132;
        collisionArray[0][10] = 133;
        collisionArray[1][9] = 144;
        collisionArray[1][10] = 145;

        collisionArray[4][4] = 132;
        collisionArray[4][5] = 133;
        collisionArray[5][4] = 144;
        collisionArray[5][5] = 145;

        console.log(collisionArray);

        //Create tilemap
        let layers: TileMap[] = new Array();

        layers.push(new TileMap("lvl1ground","tiles_outside1.png",tileArray,false));
        layers.push(new TileMap("lvl1collision","tiles_splatter_outside1.png",collisionArray,true));

        //Create entrance and exit
        let entranceTile = new Tile(new Vector2(100, 50), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 2, 12, "World");
        let exitTile = new Tile(new Vector2(1000, 700), GameConfig.game_image_path + "tiles_splatter_outside1.png", 48, 48, 4, 4, "Cellar");

        this.Map = new LevelMap("Level1", layers, this.Player, entranceTile, exitTile);

        this.IsLoading = false;

        //this.saveMapToDatabase();
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
        if(!GameConfig.testData){
        this.http.get('http://localhost:80/player.service.php')
        .toPromise()
        .then(result => data = result.json())
        .then(()=> this.Player = 
        new GameCharacter(new Vector2(data.positionX,data.positionY),
         GameConfig.game_image_path + "/" + data.image,parseInt(data.width), parseInt(data.height), data.horizontalFrame, data.verticalFrame))
            .then(() => this.loadMap())
            .then(() => this.update());
        }
        else{
            this.Player = new GameCharacter(new Vector2(300,300),
            GameConfig.game_image_path + "/" + "characters1.png",48,48,0,0);
            this.loadMap();
            this.update();
        }
    }

    saveMapToDatabase(){

        let newHeaders = new Headers();
        newHeaders.append('Access-Control-Allow-Origin', '*');
        newHeaders.append('Access-Control-Allow-Headers',' Origin, X-Requested-With, Content-Type, Accept');
        newHeaders.append('Access-Control-Allow-Methods','GET, POST, PUT');

        // this.http.post('http://localhost:80/level.service.php', {
        //     'name':this.Map.Identifier, 
        //     'entrance':this.Map.Entrance,
        //     'exit':this.Map.Exit,
        //     'layers': this.Map.Layers,

        var postBody: any = {};
        postBody.name = JSON.stringify(this.Map.Identifier);
        postBody.entrance = JSON.stringify(this.Map.Entrance);
        postBody.exit = JSON.stringify(this.Map.Exit);
        postBody.layers = JSON.stringify(this.Map.Layers);

        this.http.post('http://localhost:80/level.service.php', postBody,
            {headers: newHeaders})
        .toPromise().then(() => console.log("saved"));
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