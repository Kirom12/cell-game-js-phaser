
var MapGeneration = {
	cells : [],
	pathPosition : [],
	
	canvasData : {
		width : 500,
		height : 500
	},
	canvasElement : document.querySelector('canvas'),
	
	cellsData : {
		x : 10,
		y : 10,
		width : null,
		height : null
	},
	
	currentPosition : {
		x : 0,
		y : 0,
		contactNotFill : []
	},
	
	pathLength : 40,
	iteration : 0,
	nbTry : 0,

	init: function() {
		this.cellsData.width = this.canvasData.width/this.cellsData.x;
		this.cellsData.height = this.canvasData.height/this.cellsData.y;
		
		this.canvasElement.width = this.canvasData.width;
		this.canvasElement.height = this.canvasData.height;
		
		this.iteration = this.pathLength;
		
		//Generate cell array
		this.genrateArray();
		
		//Set the first cell
		this.cells[0][0] = 1;
		
		//Recusively add cells to table
		this.addCell();
	},

	genrateArray: function() {
		for (let i = 0; i < this.cellsData.x; i++) {
			this.cells[i] = [];
			
			for (let j = 0; j < this.cellsData.y; j++) {
				this.cells[i][j] = 0;
			}
		}
	},
	
	/**
	 * Recusive add cell
	 */
	addCell: function() {
		let contactCells = 0;
		let checkPosition = [[0, -1],[0, 1],[-1, 0],[1, 0]];
		
		for (let i = 0; i < checkPosition.length; i++) {
			if (this.currentPosition.x+checkPosition[i][0] !== -1 && this.currentPosition.y+checkPosition[i][1] !== -1){
				if (this.cells[this.currentPosition.x+checkPosition[i][0]][this.currentPosition.y+checkPosition[i][1]] === 0) {
					contactCells++;
					this.currentPosition.contactNotFill.push({
						x: this.currentPosition.x+checkPosition[i][0],
						y: this.currentPosition.y+checkPosition[i][1]
					});
				}
			}
		}
		
		//|| (this.currentPosition.x === this.pathPosition[(this.pathLength-this.iteration)-1].x) && (this.currentPosition.y === this.pathPosition[(this.pathLength-this.iteration)-2].y)
		
		//If no way, go back
		if (this.pathLength-this.iteration > 1 &&
			(contactCells === 0 ||
			 ((this.currentPosition.x === this.pathPosition[this.pathPosition.length-1].x) &&
			  (this.currentPosition.y === this.pathPosition[this.pathPosition.length-1].y)))) {	
			this.cells[this.currentPosition.x][this.currentPosition.y] = 0;
			//this.pathPosition.pop();
			this.iteration++;
			
			this.currentPosition.x = this.pathPosition[this.pathPosition.length-1].x;
			this.currentPosition.y = this.pathPosition[this.pathPosition.length-1].y;
			
			console.log((this.pathLength-this.iteration)-1);
			
			//console.log(this.pathPosition[(this.pathLength-this.iteration)-2].x);
			//console.log(this.pathPosition[(this.pathLength-this.iteration)-2].y);
			
			//Remove last element from array
			
			
			console.log("last pos");
		} else {
			//Random add cell
			let rand = Math.round(Math.random()*(this.currentPosition.contactNotFill.length-1));
			
			//Set current cell
			this.currentPosition.x = this.currentPosition.contactNotFill[rand].x;
			this.currentPosition.y = this.currentPosition.contactNotFill[rand].y;
			
			//Color cell
			this.cells[this.currentPosition.x][this.currentPosition.y] = 1;
			
			this.pathPosition.push({
				x : this.currentPosition.x,
				y : this.currentPosition.y
			});
			
			//Reset contact cells array
			this.currentPosition.contactNotFill = [];
			
			this.iteration--;
			
			console.log("addcell");
			//console.log(this.pathPosition);
		}
		
		this.canvasRender();
		
		if (this.iteration > 1) {
			setTimeout(this.addCell.bind(this), 100);
		}
	},
	
	canvasRender: function() {
		let context = this.canvasElement.getContext('2d');
		
		context.clearRect(0, 0, this.canvasData.width, this.canvasData.height);
		
		for (let i = 0; i < this.cellsData.x; i++) {
			for (let j = 0; j < this.cellsData.y; j++) {
				//If 1 -> fill
				if (this.cells[i][j] == 1) {
					context.fillStyle = '#333';
					context.fillRect(i*this.cellsData.width, j*this.cellsData.height, this.cellsData.width, this.cellsData.height);
				}
			}
		}
	}
};

MapGeneration.init();