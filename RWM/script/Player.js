

function Player( pos , vel , health ){
	
	// A list of enemies.
	this._health = health;
	
	// The position of the Player.
	this._position = pos;
	
	// Speed and direction.
	this._velocity = vel;
	
	// Is alive.
	this._alive = true;
	
	// The lives of the player.
	this._lives = 3;
	
	// The graphical representation.
	this._image = new Image();
	
	// The source of the image. This is an inital sprite and will be changed!
	this._image.src = "http://4.bp.blogspot.com/_SJsqZeAk064/SxLz6pn9_aI/AAAAAAAACd8/lozmwiAthnk/s1600/offline.bmp";
	
	//
	//	Physical properties. Box2d stuff.
	//
	
	this._body;
	this._bodyType;
	
	// Maybe more to come...
};

Player.prototype.update = function(){
	
	// Kill that mofo if the lives are gone.
	if( this._lives == 0 ) this._alive = false;

};


Player.prototype.reset = function(){


};


Player.prototype.getPosition = function( ){

	return this._position;
};


Player.prototype.setPosition = function( x, y ){


};


Player.prototype.lostLife = function(  ){

	// Set the colour of the player according to his lives.

};