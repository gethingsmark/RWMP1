
var spriteCtx;
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
	
	this._score = 0;
	
	//
	//	Physical properties. Box2d stuff.
	//
	
	this._body;
	this._bodyType;
	
	// Maybe more to come...
	
	//create the box2d physics for player here.
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;
	this.bodyDef.position.Set(4,8);
	this.bodyDef.userData = 'Player';
	this.bodyDef.linearDamping = 1;
	this._myBody = world.CreateBody(this.bodyDef);
	this.myFixture = new b2FixtureDef;
	this.myFixture.shape = new b2CircleShape(1);
	this.myFixture.density = 10;
	this.myFixture.friction = .5;
	this.myFixture.restitution = .6; 
	this._myBody.CreateFixture(this.myFixture);
	
	//set up the sprite canvas to draw sprites over the physics world
	var c=document.getElementById("canvasSprites");
	spriteCtx=c.getContext("2d");
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	
	//ctx.drawImage(this._image, 10, 10);
};

Player.prototype.update = function(Sposition){
	
	// Kill that mofo if the lives are gone.
	//if( this._lives == 0 ) this._alive = false;
	
	//refresh the player sprite on the screen.
	spriteCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
	spriteCtx.drawImage(this._image, Sposition.x*worldScale-50, Sposition.y*worldScale-50);
	
	//this._myBody.SetLinearVelocity(new b2Vec2(0, -0.1));

};


Player.prototype.reset = function(){


};


Player.prototype.getPosition = function( ){
	this._position = this._myBody.GetPosition();
	return this._position;
};

Player.prototype.getBody = function( ){
	return this._myBody;
};

Player.prototype.getScore = function( ){
	return this._score;
};

Player.prototype.setScore = function( newScore ){
	this._score = newScore;
};

Player.prototype.getHealth = function( ){
	return this._health;
};

Player.prototype.setHealth = function( newScore ){
	this._health = newScore;
};


Player.prototype.setPosition = function( x, y ){


};


Player.prototype.lostLife = function(  ){

	// Set the colour of the player according to his lives.

};

//Player movement ->:

Player.prototype.playerUp = function(force ){
	if(this._myBody.GetPosition().y > 0)
		this._myBody.SetLinearVelocity(new b2Vec2(0, -force));
};

Player.prototype.playerDown = function(force ){
	if(this._myBody.GetPosition().y < window.innerHeight/30)
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
