


export class ValuePair{

    public max:number;
    public current:number;

    constructor(maxAmount:number){
        this.max = maxAmount;
        this.current = maxAmount;
    }

    public toString(){
        return `${this.current}/${this.max}`;
    }

}