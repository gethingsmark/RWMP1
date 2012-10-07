
var ctx;
this._image;
function PlayerBullet(world, pos , vel , health ){
	
	// A list of enemies.
	this._health = health;
	
	// The position of the Player.
	this._position = pos;
	
	// Speed and direction.
	this._velocity = vel;
	
	// Is alive.
	this._alive = false;
	
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
	this._myBody;
	
	// Maybe more to come...
};

PlayerBullet.prototype.bulletAlive = function(position, arrayPos){
	//create the bullet in box2d
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;
	this.bodyDef.position.Set(position.x+3,position.y);
	this.bodyDef.userData = 'Bullet' + arrayPos;
	this.bodyDef.linearDamping = 1;
	this._myBody = world.CreateBody(this.bodyDef);
	this.myFixture = new b2FixtureDef;
	this.myFixture.shape = new b2CircleShape(.2);
	this.myFixture.density = 10;
	this.myFixture.friction = .5;
	this.myFixture.restitution = .6; 
	this._myBody.CreateFixture(this.myFixture);
	
	this._alive = true;

};

PlayerBullet.prototype.update = function(){
	//move the bullet if it is alive
	if(this._alive == true){
		this._myBody.SetLinearVelocity(new b2Vec2(this._velocity, 0));
		//spriteCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
		//spriteCtx.drawImage(this._image, this._myBody.GetPosition.x*30, this._myBody.GetPosition.y*30);
	}
	
	//destroy the bullet when it goes off of the screen.
	if(this._alive == true)
		if(this._myBody.GetPosition().x > window.innerWidth/30)
			this._alive = false;
};


PlayerBullet.prototype.reset = function(){


};

PlayerBullet.prototype.isAlive = function( ){
	return this._alive;
}

PlayerBullet.prototype.setAlive = function(change ){
	this._alive = change;
}

PlayerBullet.prototype.getPosition = function( ){

	return this._position;
};


PlayerBullet.prototype.setPosition = function( x, y ){


};


PlayerBullet.prototype.lostLife = function(  ){

	// Set the colour of the player according to his lives.

};

PlayerBullet.prototype.playerUp = function(force ){

	this._myBody.SetLinearVelocity(new b2Vec2(0, -force));
};

PlayerBullet.prototype.playerDown = function(force ){

	this._myBody.SetLinearVelocity(new b2Vec2(0, force));
};

PlayerBullet.prototype.playerLeft = function(force ){
	if(this._myBody.GetPosition().x>1)
		this._myBody.SetLinearVelocity(new b2Vec2(-force, 0));
};

PlayerBullet.prototype.playerRight = function(force ){
	if(this._myBody.GetPosition().x<5)
		this._myBody.SetLinearVelocity(new b2Vec2(force, 0));
};