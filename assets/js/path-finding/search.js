




/*
     FILE ARCHIVED ON 1:38:31 May 11, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:40:10 Jun 24, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
		function Maze(canvas){
			canvas.data("ctx", canvas[0].getContext("2d"));
			canvas.data("cell_width",5);
			canvas.data("cell_height",5);
			this.canvas = canvas;
			this.initializeMaze(this);
		}
				
		Maze.prototype.MODE = {
			SELECT_START:0,
			SELECT_END: 1,
			SELECT_WALLS:2
		}
		
		 Maze.prototype.initializeMaze = function(maze){
			var canvas = maze.canvas;
			this.drawGridLines();
			maze.canvas[0].walls = {};
		}


		Maze.prototype.drawGridLines = function(){
			var canvas = this.canvas;
			var ctx = canvas[0].getContext("2d");
			
			var x = canvas.attr("width");
			var y = canvas.attr("height");

			var cell_width = 10;
			var cell_height = 10;
			var cells_x = 0;
			var cells_y = 0;
			
			for(var h = 0.5; h < y; h+=cell_height){
				ctx.moveTo(0,h);
				ctx.lineTo(x,h);
				cells_y++;
			}
			for(var w = 0.5; w < x; w+=cell_width){
				ctx.moveTo(w,0);
				ctx.lineTo(w,y);
				cells_x++;
			}
			
			canvas.attr("cells_x", cells_x);
			canvas.attr("cells_y", cells_y);
			
			ctx.strokeStyle = "#000";
			ctx.stroke();
			
		}
		
		Maze.prototype.startDrawingWalls= function(){
			this.canvas.mousedown(mazeStartdrawWalls);
			this.canvas.mouseup(mazeStopdrawWalls);
			this.canvas.mousemove(drawWalls);
		}
		Maze.prototype.stopDrawingWalls = function(){
			this.canvas.unbind();
		}
		
		Maze.prototype.startChoosingStartPoint = function(){
			this.canvas.mousedown(mazeStartChoosingStartPoint);
		}
		
		Maze.prototype.stopChoosingStartPoint = function(){
			this.canvas.unbind();
			this.startX = this.canvas[0].startX;
			this.startY = this.canvas[0].startY;
			addWall(this.startX,this.startY,this.canvas[0],"#AA0078");
		}
		
		Maze.prototype.startChoosingEndPoint = function(){
			this.canvas.mousedown(mazeStartChoosingEndPoint);
		}
		
		Maze.prototype.stopChoosingEndPoint = function(){
			this.endX = this.canvas[0].endX;
			this.endY = this.canvas[0].endY;
			this.canvas.unbind();
		}
		
		mazeStartChoosingStartPoint = function(e){
			if(this.startX != undefined && this.startY != undefined){
				unFillSquare(this.startX, this.startY, this);
			}
			this.x = e.pageX;
			this.y = e.pageY;
			var x = getX(e, this);
			var y = getY(e, this);
			this.startX = x;
			this.startY = y;
			fillSquare(x,y,this,"#AA0078");
		}
		
		mazeStartChoosingEndPoint = function(e){
			if(this.endX != undefined && this.endY != undefined){
				unFillSquare(this.endX,this.endY,this);
			}
			this.x = e.pageX;
			this.y = e.pageY;
			var x = getX(e, this);
			var y = getY(e, this);
			this.endX = x;
			this.endY = y;
			fillSquare(x,y,this,"#AA0078");
		}
		
		mazeStopdrawWalls = function(e){
			this.mouseDown = false;
		}
		
		mazeStartdrawWalls = function(e){
			this.mouseDown = true;
			this.x = e.pageX;
			this.y = e.pageY;
			var x = getX(e, this);
			var y = getY(e, this);
			addWall(x,y,this,"#435EF3");
		}
		
		function addWall(x,y,canvas,color){
			var c = new Cell(x,y);
			if(canvas.walls[c.hash()] == undefined || !canvas.walls[c.hash()]){
				canvas.walls[c.hash()] = true;
				fillSquare(x,y,canvas, color);
			}
		}
		
		function unFillSquare(x,y,canvas){
			fillSquare(x,y,canvas, "#ffffff");
		}
		
		function drawWalls(e){
			if(this.mouseDown){
				var x = getX(e, this);
				var y = getY(e, this);
				addWall(x,y,this);
			}
		}		
		function getX(e, canvas){
			return Math.floor((e.pageX - jQuery(canvas).offset().left)/10);
		}
		
		
		function getY(e,canvas){
			return Math.floor((e.pageY - jQuery(canvas).offset().top)/10);
		}
		

		function fillSquare(x,y,canvas,color){
			var ctx = jQuery(canvas)[0].getContext("2d");
			var newx = (x*10)+0.5;
			var newy = (y*10) + 0.5;
			ctx.moveTo(newx,newy);
			ctx.beginPath();
			ctx.lineTo(newx + 10, newy);
			ctx.lineTo(newx + 10, newy + 10);
			ctx.lineTo(newx, newy+10);
			ctx.lineTo(newx, newy);
			ctx.fillStyle = color;
			ctx.fill();
		} 
		function getNeighbours(c, maze){
			var x = c.x;
			var y = c.y;
			var neighbours = new Array();
			var index = 0;
			for(i = -1; i <= 1; i++){
				for(j = -1; j <= 1; j++){
					if(i != 0 || j != 0){
						if((x + i >=0 && x + i < maze.canvas.attr("cells_x"))
						&& (y + j >=0 && y + j < maze.canvas.attr("cells_y"))){
							neighbours[index] = new Cell(x+i, y+j);
							index++;
						}
					}
				}
			}
			return neighbours;
		}
		
		function dfs(stack, maze, visited, occupied,backtrack){
			if(stack.length >= 1){
				var c = stack.pop();
				if(c.x == maze.endX && c.y == maze.endY){
					stack = new Array();
					setTimeout(function(){dfs(stack, maze, visited, occupied,backtrack)});
				}
				else{
					fillSquare(c.x, c.y, maze.canvas, "#008400");
					setTimeout(function(){visitNeighboursDFS(c,maze,stack,visited, occupied,backtrack,dfs);},10);
				}
			}
			else{
				var c = new Cell(maze.endX, maze.endY);
				plotBacktrack(backtrack,maze,c);
			}
		}
		
		function djikstras(queue, maze, visited, occupied, distances,backtrack){
			if(!queue.isEmpty()){
				var c = queue.dequeue();
				if(c.x == maze.endX && c.y == maze.endY){
					queue.empty();
					setTimeout(function(){djikstras(queue, maze, visited, occupied,distances,backtrack)},10);
				}
				else{
					fillSquare(c.x,c.y,maze.canvas,"#008400");
					setTimeout(function(){visitNeighbours(c,maze,queue,visited,occupied, distances,djikstraHeuristic,backtrack,djikstras)},10);
				}
			}
			else{
				var c = new Cell(maze.endX, maze.endY);
				plotBacktrack(backtrack,maze,c);
			}
		}

		
		function aStar(queue,maze,visited,occupied,distances,backtrack){
			if(!queue.isEmpty()){
				var c = queue.dequeue();
				if(c.x == maze.endX && c.y == maze.endY){
					queue.empty();
					setTimeout(function(){aStar(queue,maze,visited,occupied,distances,backtrack)});
				}
				else{
					fillSquare(c.x,c.y,maze.canvas,"#008400");
					setTimeout(function(){visitNeighbours(c,maze,queue,visited,occupied, distances,aStarHeuristic,backtrack,aStar)},10);
				}
			}
			else{
				var c = new Cell(maze.endX, maze.endY);
				plotBacktrack(backtrack,maze,c);
			}
		}
		
		function djikstraHeuristic(cell,maze){return 1;}
		
		function aStarHeuristic(cell, maze){
			var dx = (maze.endX - cell.x);
			var dy = (maze.endY - cell.y);
			var dist = Math.sqrt(dx*dx + dy*dy);
			return dist;
		}
		
		function visitNeighboursDFS(c,maze,collection,visited, occupied,backtrack,callback){
			var neighbours = getNeighbours(c, maze);
			for(i = 0; i < neighbours.length; i++){
				if(!(neighbours[i].hash() in occupied) && !(neighbours[i].hash() in visited)){
					collection.add(neighbours[i]);
					visited[neighbours[i].hash()] = true;
					backtrack[neighbours[i].hash()] = c;
				}
			}
			callback(collection,maze,visited, occupied,backtrack);
		}
		
		function visitNeighbours(c, maze, queue, visited, occupied, distances, heuristic, backtrack, callback){
			var neighbours = getNeighbours(c, maze);
			for(i = 0; i < neighbours.length; i++){
				var n = neighbours[i].hash();
				if(!(n in occupied)){
					if(!(n in visited)){
						visited[n] = true;
						distances[n] = distances[c.hash()] + heuristic(neighbours[i],maze);
						backtrack[n] = c;
						queue.enqueue(neighbours[i],distances[n]);
					}
					else{
						if(distances[c.hash()] + heuristic(neighbours[i],maze) < distances[n]){
							distances[n] = distances[c.hash()] + heuristic(neighbours[i],maze);
							queue.increaseKey(neighbours[i],distances[n]);
						}
					}
				}
			}
			callback(queue,maze,visited,occupied,distances,backtrack);
		}
		
		function plotBacktrack(backtrack, maze, cell){
			if(cell.hash() in backtrack){
				fillSquare(cell.x,cell.y,maze.canvas, "#840000");
				setTimeout(function(){plotBacktrack(backtrack, maze,backtrack[cell.hash()]);},20);
			}
		}
		
		Array.prototype.add = function(elem){
			this.push(elem);
		}	
