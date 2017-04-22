import { Component, AfterViewInit, ViewChild, OnInit, HostListener, ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { GameEntity } from './../game-classes/game-entity';
import { GameCharacter } from './../game-classes/game-character';
import { Player } from './../game-classes/player';
import { Party } from './../game-classes/party';
import { Vector2 } from './../game-classes/vector2';
import { Rectangle } from './../game-classes/rectangle';
import { Tile } from './../game-classes/tile';
import { TileMap } from './../game-classes/tileMap';
import { LevelMap } from './../game-classes/levelMap';
import { GameConfig } from './../game.config';
import { Http, Headers } from '@angular/http';
import { GameNav } from './../game-nav/game-nav.component';
import { FormsModule } from '@angular/forms';
import 'rxjs/Rx';

@Component({
    selector: 'game-map-creator',
    styleUrls: ['./game-map-creator.component.css'],
    templateUrl: './game-map-creator.component.html'
})

export class GameMapCreatorComponent implements OnInit, AfterViewInit {
    
    public context: CanvasRenderingContext2D;
    public tileContext: CanvasRenderingContext2D;

    //Map info
    public mapName: string;
    public layers: TileMap[];
    public selectedLayer: TileMap;
    public selectedTile: any;
    public spritesheets: string[];
    public selectedSpritesheet: string;
    public tileMapCoords: HTMLCanvasElement;

    @ViewChild("mapCanvas") Canvas: ElementRef;
    @ViewChild("tileCanvas") TileCanvas: ElementRef;

    constructor(private http: Http) { 

    }

    ngOnInit() {
        this.layers = new Array();
        this.spritesheets = new Array();
        this.selectedTile = new Image();

        //Load spritesheets
        this.spritesheets.push("tiles_outside1.png");
        this.spritesheets.push("tiles_splatter_outside1.png");
        this.selectedSpritesheet = GameConfig.game_image_path + this.spritesheets[0];
    }

    ngAfterViewInit() {
        let canvas = this.Canvas.nativeElement;
        this.context = canvas.getContext("2d");

        let tileCanvas = this.TileCanvas.nativeElement;
        this.tileContext = tileCanvas.getContext("2d");

        this.update();
    }

    canvasClicked(event:MouseEvent){
        console.log(event.layerX + " - " + event.layerY);
    }

    spritesheetClicked(event:MouseEvent){
        let x = Math.floor(event.layerX/48);
        let y = Math.floor(event.layerY/48);
        console.log("selected tile: "+x+"-"+y);
        this.selectedTile.src = this.selectedSpritesheet;

        this.tileContext.clearRect(0, 0, 50, 50);
        this.tileContext.drawImage(
            this.selectedTile,
            x*48,y*48,48,48,0,0,50,50
            );
    }

    onChangeSpritesheet(newSheet:string){
        this.selectedSpritesheet = GameConfig.game_image_path + newSheet;
    }

    update() {
        requestAnimationFrame(() => {
            this.update();
        });

        this.context.fillStyle = 'blue';
        this.context.clearRect(0, 0, 800, 700);
        this.context.fillStyle = "#ffffff";
        this.context.fillText("Select tiles and start creating a map already!",400,350);
    }
}