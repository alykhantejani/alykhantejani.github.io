




/*
     FILE ARCHIVED ON 4:19:59 May 11, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:39:38 Jun 24, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
//min-heap implementation
function PriorityQueue(){
	this.heapsize=0;
	this.heap = new Array();
	this.indices = {};
}
PriorityQueue.prototype.empty = function(){
	this.heapsize=0;
	this.heap = new Array();
}

function left(i){
	return 2*i + 1;
}

function right(i){
	return 2*i + 2;
}

function parent(i){
	return Math.floor((i-1)/2);
}

PriorityQueue.prototype.isEmpty = function(){
	return this.heapsize == 0;
}

PriorityQueue.prototype.dequeue = function(){
	this.swap(0, this.heapsize - 1);
	var res = this.heap[this.heapsize - 1];
	this.heapsize -- ;
	this.minHeapify(0);
	return res;
}

PriorityQueue.prototype.minHeapify = function(i){
	if(i < this.heapsize){
		var val = this.heap[i].priority;
		var index = i;
		var l = left(i);
		var r = right(i);
		if(l < this.heapsize && this.heap[l].priority <= val){
			val = this.heap[l].priority;
			index = l;
		}
		if(r < this.heapsize && this.heap[r].priority <= val){
			val = this.heap[r].priority;
			index = r;
		}
		if(index != i){
			this.swap(index, i);
			this.minHeapify(index);
		}
	}
}

PriorityQueue.prototype.enqueue = function(cell, val){
	this.heapsize++;
	this.heap[this.heapsize - 1] = cell;
	this.indices[cell.hash()] = this.heapsize - 1;
	cell.priority = val;
	this.propogateUpwards(this.heapsize - 1);
}

PriorityQueue.prototype.decreaseKey = function(cell, val){
	var i = this.indices[cell.hash()];
	cell.priority = val;
	this.propogateUpwards(i);
}

PriorityQueue.prototype.propogateUpwards = function(i){
	var p = parent(i);
	if(p >= 0){
		if(this.heap[i].priority < this.heap[p].priority){
			this.swap(i,p);
			this.propogateUpwards(p);
		}
	}
}

PriorityQueue.prototype.swap = function(i,j){
	this.indices[this.heap[i].hash()] = j;
	this.indices[this.heap[j].hash()] = i;
	var tmp = this.heap[i];
	this.heap[i] = this.heap[j];
	this.heap[j] = tmp;
}
