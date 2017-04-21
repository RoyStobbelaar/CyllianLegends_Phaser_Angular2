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
import 'rxjs/Rx';

@Component({
    selector: 'game-map-creator',
    styleUrls: [],
    templateUrl: './game-map-creator.component.html'
})

export class GameMapCreatorComponent implements OnInit, AfterViewInit {
    
    public context: CanvasRenderingContext2D;
    @ViewChild("mapCanvas") Canvas: ElementRef;

    constructor(private http: Http) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        let canvas = this.Canvas.nativeElement;
        this.context = canvas.getContext("2d");
        this.update();
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