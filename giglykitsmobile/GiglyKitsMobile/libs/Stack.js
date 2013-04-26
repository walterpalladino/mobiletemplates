/*
*	Description: Stack management class
*
*/
function Stack() {
	this.stack = new Array();
	this.pop = function() {
		var value = this.stack[this.stack.length-1];
		this.stack = this.stack.slice(0,this.stack.length-1);
		return value;
	}
	this.push = function(item) {
		this.stack.push(item);
	}
	this.sniff = function() {
		return this.stack[this.stack.length-1];
	}
	this.clear = function () {
		this.stack = [];
	}
	
}