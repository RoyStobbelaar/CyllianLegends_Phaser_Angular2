import { Component } from '@angular/core';
import { Player } from './player';
import { GameConfig } from './../game.config';

export class Party{

    public PartyMembers: Player[];

    constructor(){
        this.PartyMembers = new Array();
        //Init party

    }

    public addPlayer(newPlayer:Player){
                    console.log('add player', this);
        this.PartyMembers.push(newPlayer);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        let index=0;
        this.PartyMembers.forEach(member => {
            ctx.drawImage(member.portrait,0,0,90,90,700 - (index*96),0,90,90);
            index++;
            //Draw stats or something
        })
    }
}