const mycanvas = document.getElementById("myCanvas");
const ctx = mycanvas.getContext("2d");

class Tile{
    constructor(x, y, text){
        this.x = x;
        this.y = y;
        this.color = "red";
        this.text = text
    }
    width = 100;
    height = 100;

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
    }
}

class Board{

    constructor(tileAmount){
        this.width = 800;
        this.height = 600;
        this.tileAmount = tileAmount;
    }

    createTiles(){
        let tiles = [];
        for(let i = 0; i < this.tileAmount; i++){
            tiles.push(new Tile(i * 100, 0, i + 1));
        }
        return tiles;
    }
}


let board = new Board(16);
let tiles = board.createTiles();

tiles.forEach(tile => {
    tile.draw();
})