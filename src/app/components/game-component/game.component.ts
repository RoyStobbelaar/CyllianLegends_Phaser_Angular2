import { Component, AfterViewInit, ViewChild, OnInit, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { GameEntity } from './game-classes/game-entity';
import { GameCharacter } from './game-classes/game-character';
import { Vector2 } from './game-classes/vector2';
import { Rectangle } from './game-classes/rectangle';
import { Tile } from './game-classes/tile';
import { TileMap } from './game-classes/tileMap';
import { LevelMap } from './game-classes/levelMap';

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements AfterViewInit, OnInit {

    public Width: number = 800;
    public height: number = 700;
    public context: CanvasRenderingContext2D;
    //public characters: GameEntity[] = new Array();
    //public tiles: GameEntity[] = new Array();
    public Map: LevelMap;
    public gameRect: Rectangle;
    public camera: Vector2;
    public debugMode: boolean = false;
    public Player: GameCharacter;

    public keysDown: boolean[] = new Array();
    private tile_positions: Vector2[] = new Array();

    @ViewChild("gameCanvas") canvas: any;

    ngOnInit() {
        let canvas = this.canvas.nativeElement;
        this.context = canvas.getContext("2d");
        this.gameRect = new Rectangle(200, 200, 400, 350);
        this.camera = new Vector2(0, 0);

        //Create test character
        this.Player = new GameCharacter(this, new Vector2(300, 300), "./app/components/game-component/game-images/characters1.png", 48, 48, 0, 0)

        //Create test map
        for (let x = 0; x < this.Width; x += 48) {
            for (let y = 0; y < this.height; y += 48) {
                this.tile_positions.push(new Vector2(x, y));
            }
        }

        let tiles: Tile[] = new Array();

        //Foreach tile position create tile
        this.tile_positions.forEach(tile => {
            tiles.push(new Tile(this, tile, "./app/components/game-component/game-images/tiles_outside1.png", 48, 48, 0, 0));
        })

        //Create tilemap
        let layers: TileMap[] = new Array();
        layers.push(new TileMap("testlayer",tiles));

        //Create splattered tilemap
        let splatterTiles: Tile[] = new Array();
        splatterTiles.push(new Tile(this, new Vector2(100,100), "./app/components/game-component/game-images/tiles_splatter_outside1.png", 48,48,0,11));
        splatterTiles.push(new Tile(this, new Vector2(200,200), "./app/components/game-component/game-images/tiles_splatter_outside1.png", 48,48,1,12));
        splatterTiles.push(new Tile(this, new Vector2(300,300), "./app/components/game-component/game-images/tiles_splatter_outside1.png", 48,48,1,13));
        splatterTiles.push(new Tile(this, new Vector2(400,400), "./app/components/game-component/game-images/tiles_splatter_outside1.png", 48,48,0,11));
        splatterTiles.push(new Tile(this, new Vector2(500,500), "./app/components/game-component/game-images/tiles_splatter_outside1.png", 48,48,2,12));
        splatterTiles.push(new Tile(this, new Vector2(600,600), "./app/components/game-component/game-images/tiles_splatter_outside1.png", 48,48,1,13));
        splatterTiles.push(new Tile(this, new Vector2(700,700), "./app/components/game-component/game-images/tiles_splatter_outside1.png", 48,48,0,11));
        
        layers.push(new TileMap("testsplatterlayer", splatterTiles));

        //Create collision layer
        let collisionTiles: Tile[] = new Array();
        collisionTiles.push(new Tile(this, new Vector2(800,100),"./app/components/game-component/game-images/tiles_splatter_outside1.png",48,48,0,13));
        collisionTiles.push(new Tile(this, new Vector2(700,200),"./app/components/game-component/game-images/tiles_splatter_outside1.png",48,48,0,13));
        collisionTiles.push(new Tile(this, new Vector2(300,500),"./app/components/game-component/game-images/tiles_splatter_outside1.png",48,48,0,13));
        collisionTiles.push(new Tile(this, new Vector2(200,600),"./app/components/game-component/game-images/tiles_splatter_outside1.png",48,48,0,13));
        collisionTiles.push(new Tile(this, new Vector2(100,700),"./app/components/game-component/game-images/tiles_splatter_outside1.png",48,48,0,13));
        
        layers.push(new TileMap("testcollisionlayer",collisionTiles,true));

        //Create map
        this.Map = new LevelMap("Level1",layers,this.Player);
    }

    @HostListener('document:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        this.keysDown[event.keyCode || event.which] = true;
    }
    @HostListener('document:keyup', ['$event'])
    KeyboardReleased(event: KeyboardEvent) {
        this.keysDown[event.keyCode || event.which] = false;
    }

    ngAfterViewInit() {
        this.update();
    }

    update() {
        requestAnimationFrame(() => {
            this.update();
        });

        //Clear screen
        var ctx = this.context;
        ctx.beginPath();
        ctx.clearRect(0, 0, 1000, 1000);
        

        //Update game elements
        this.Map.update();
        this.Player.update();

        //Draw tiles
        this.Map.draw(ctx);
        this.Player.draw(ctx);

        ctx.closePath();
    }
}