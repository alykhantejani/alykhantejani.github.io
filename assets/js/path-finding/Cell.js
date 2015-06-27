




/*
     FILE ARCHIVED ON 0:24:24 May 11, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:40:05 Jun 24, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
function Cell(x,y){
	this.x = x;
	this.y = y;
	this.priority = 0;
}

Cell.prototype.hash = function(){
	return this.x + "," + this.y;
}