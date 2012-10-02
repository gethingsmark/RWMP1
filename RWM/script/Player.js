
var ctx;
this._image;
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
	this._image.src = "img/tn_submarine.png";
	
	//
	//	Physical properties. Box2d stuff.
	//
	
	this._body;
	this._bodyType;
	
	// Maybe more to come...
	
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;
	this.bodyDef.position.Set(4,8);
	this.bodyDef.userData = 'BOX';
	this.bodyDef.linearDamping = 1;
	this._myBody = world.CreateBody(this.bodyDef);
	this.myFixture = new b2FixtureDef;
	this.myFixture.shape = new b2CircleShape(2);
	this.myFixture.density = 10;
	this.myFixture.friction = .5;
	this.myFixture.restitution = .6; 
	this._myBody.CreateFixture(this.myFixture);
	
	var c=document.getElementById("canvasGame");
	ctx=c.getContext("2d");
	
	ctx.drawImage(this._image, 10, 10);
};

Player.prototype.update = function(){
	
	// Kill that mofo if the lives are gone.
	if( this._lives == 0 ) this._alive = false;
	ctx.drawImage(this._image, 10, 10);

};


Player.prototype.reset = function(){


};


Player.prototype.getPosition = function( ){
	this._position = this._myBody.GetPosition();
	return this._position;
};


Player.prototype.setPosition = function( x, y ){


};


Player.prototype.lostLife = function(  ){

	// Set the colour of the player according to his lives.

};

Player.prototype.playerUp = function(force ){

	this._myBody.SetLinearVelocity(new b2Vec2(0, -force));
};

Player.prototype.playerDown = function(force ){

	this._myBody.SetLinearVelocity(new b2Vec2(0, force));
};

Player.prototype.playerLeft = function(force ){
	if(this._myBody.GetPosition().x>1)
		this._myBody.SetLinearVelocity(new b2Vec2(-force, 0));
};

Player.prototype.playerRight = function(force ){
	if(this._myBody.GetPosition().x<5)
		this._myBody.SetLinearVelocity(new b2Vec2(force, 0));
};