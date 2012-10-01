

function Player(world, pos , vel , health ){
	
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
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.Set(4,8);
	bodyDef.userData = 'BOX';
	bodyDef.linearDamping = 0.5;
	myBody = world.CreateBody(bodyDef);
	var myFixture = new b2FixtureDef;
	myFixture.shape = new b2CircleShape(2);
	myFixture.density = 10;
	myFixture.friction = .5;
	myFixture.restitution = .6; 
	myBody.CreateFixture(myFixture);
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