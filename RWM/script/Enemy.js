

function Enemy( pos , vel , health ){
	
	// A list of enemies.
	this._health = health;
	
	// The position of the Enemy.
	this._position = pos;
	
	// Speed and direction.
	this._velocity = vel;
	
	// Is alive.
	this._alive = true;
	
	// Time to live?
	this._ttl = 100;
	
	//
	//	Physical properties. Box2d stuff.
	//
	
	this._body;
	this._bodyType;
	
	// Maybe more to come...
};


Enemy.prototype.update = function(){


};


Enemy.prototype.reset = function(){


};


Enemy.prototype.getPosition = function( ){

	return this._position;
};


Enemy.prototype.setPosition = function( x, y ){


};