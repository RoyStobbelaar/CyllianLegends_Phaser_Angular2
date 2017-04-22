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
        this.PartyMembers.push(newPlayer);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        let index=0;
        this.PartyMembers.forEach(member => {
            ctx.drawImage(member.portrait,0,0,90,90,700 - (index*96),0,90,90);
            //Draw stats or something

            ctx.fillStyle = '#ff0000';
            ctx.fillText('HP: '+member.health.toString(),700 - (index*96),110);

            ctx.fillStyle = '#0000ff';
            ctx.fillText('MP: '+member.mana.toString(),700 - (index*96),130);

            index++;
        })
    }
}