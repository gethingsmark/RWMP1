/**	@Name:	EnemyTorpedo.js
	@Author: Gearóid Neville
	@Brief:	This is the Torpedo Enemy Class. Here are all the 
			functions and propertiesof each Torpedo in the Game.
	@Arguments:N/A
	@Returns:N/A
*/

// Shorthand box2d variables.
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
this._imageShark;
var ctxShark;

/**	@Name:	EnemyTorpedo
	@Brief:	This is the Constructor of the Class.
			It initialises it's core members and draws the Enemy Torpedo Object.
	@Arguments:N/A
	@Returns: N/A
*/
function EnemyShark( world, posX, posY, vel, dir, health, width, height, arrayPos ){

	this._upDownCount = 0;

	this._health = health;												// The health variable of an Enemy Torpedo.	
	this._positionX = posX;												// The current X Position of an Enemy Torpedo.
	this._positionY = posY;												// The current X Position of an Enemy Torpedo.
	this._width = width;												// The width of an Enemy Torpedo.
	this._height = height;												// The height of an Enemy Torpedo.
	this._startPositionX = posX;										// The starting X Position of an Enemy Torpedo.
	this._startPositionY = posY;										// The starting Y Position of an Enemy Torpedo.
	this._velocity = vel;												// The velocity of an Enemy Torpedo.
	this._direction = dir;												// The direction of the Enemy Torpedo.
	this._alive = false;												// A boolean to check whether an Enemy Torpedo is alive or not.
	this._loaded = false;
	this._imageShark = new Image();											// The graphical representation.
	this._imageShark.addEventListener( "load", function() {
		this._loaded = true;
	}, false );
	this._imageShark.src = "img/robotshark.png";								// The source of the image.
	this._ttl = 100;													// Time left until Enemy Torpedo dies.
	this._imageWidth = 107;												// Width of the Sprite.
	this._imageHeight = 70;												// Height of the Sprite.
	this._world = world;												// The b2 world variable.
	this._body;															// Physical Body of an Enemy Torpedo.
	this._bodyDef;														// The Body Definition of an Enemy Torpedo.
	this._bodyFixtureDef;												// The Body Fixture Definition of an Enemy Torpedo.
	this._bodyDef = new b2BodyDef;										// Create a new Body Definition for the Enemy Torpedo Object.
	this._bodyDef.userData = 'Shark' + arrayPos;						// Gives the Body a unique ID to check for collision callbacks.
	this._bodyDef.type = b2Body.b2_dynamicBody; 						// Define Object type.
	this._bodyDef.position.Set( this._positionX, this._positionY );		// Define Position.

	this._bodyFixtureDef = new b2FixtureDef;							// Create a new Fixture Definition for an Enemy Torpedo Object.		
	this._bodyFixtureDef.density = 10.0; 								// Define Density.
	this._bodyFixtureDef.friction = 0.1; 								// Define Friction.
	this._bodyFixtureDef.restitution = 0.03; 							// Define Restitution.
	this._bodyFixtureDef.shape = new b2PolygonShape; 					// Define Shape.
	this._bodyFixtureDef.shape.SetAsBox(this._width, this._height); 	// Define Size.
	
	
	this._body = this._world.CreateBody(this._bodyDef);					// Create the Enemy Torpedo Body Object in the Game World.
	this._body = this._body.CreateFixture(this._bodyFixtureDef).GetBody();			// Create the defined Fixture for the Enemy Torpedo Body.
	this._alive = true;
	
	// code for setting up the context to be able to draw sprites.
	var c=document.getElementById("canvasSprites");
	ctx=c.getContext("2d");
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	
};	// End Function EnemyTorpedo().


/**	@Name:	Remove
	@Brief:	This is the Delete an Enemy Torpedo.
			Object. 
	@Arguments:N/A
	@Returns: N/A
*/
EnemyShark.prototype.remove = function( ){
	
};	// End Function remove().

/**	@Name:	Move
	@Brief:	This is move Function of the Class.
			This makes the Torpedos move 
			throughout the game.
	@Arguments:N/A
	@Returns: N/A
*/
EnemyShark.prototype.move = function(){

	this._positionX = this._body.GetPosition.x;
	this._positionX += this._velocity * this._direction;

};	// End Function move().

/**	@Name:	Update
	@Brief:	This is Update Function of the Class.
			This is empty for now but the specialised
			Enemy Torpedo class will have content in their
			Update Functions.
	@Arguments:N/A
	@Returns: N/A
*/
EnemyShark.prototype.update = function( Sposition ){

	if ( this._alive ) {
	
		// Translate and rotate the canvas
		//ctx.translate(this._body.GetPosition.x, this._body.GetPosition.y);
		//ctx.rotate(this._body.GetAngle());

		// Draw the image in the place of the body, plus some fucked up numbers.
		ctx.drawImage( this._imageShark, this._body.GetPosition().x *worldScale - this._imageWidth/2, this._body.GetPosition().y *worldScale - this._imageHeight/2 );
		
		//makes the shark move up and down as it swims forwards.
		if(this._upDownCount < 10){
			this._body.SetLinearVelocity( new b2Vec2(-6, 4) );
			this._upDownCount = this._upDownCount+1;
		}
		else{
			this._body.SetLinearVelocity( new b2Vec2(-6, -4) );
			this._upDownCount = this._upDownCount+1;
			if(this._upDownCount == 20)
				this._upDownCount = 0;
		}
		
		// undo Translate and rotate of the canvas
		//ctx.rotate(-this._body.GetAngle());	
		//ctx.translate(-this._body.GetPosition.x, -this._body.GetPosition.y);
		
		//this._body.ApplyForce( new b2Vec2(-8, 0), this._body.GetWorldCenter());	//apply force
	}
};	// End Function update().

/**	@Name:	Reset
	@Brief:	This is Reset Function of the Class.
			This Function will reset an Enemy Torpedo to
			it's starting Position at the start
			of the Game World.
	@Arguments:N/A
	@Returns: N/A
*/
EnemyShark.prototype.reset = function(){
	this._positionX = this._body.GetDefinition().position.x;
	this._positionX = this._startPositionX;
	this._positionY = this._body.GetDefinition().position.y;
	this._positionY = this._startPositionY;
};	// End Function reset().

/**	@Name:	Get Position
	@Brief:	This Function will return an Enemy Torpedo's Position.
	@Arguments:N/A
	@Returns: _position ( Position of the Enemy Torpedo )
*/
EnemyShark.prototype.getPosition = function( ){
	this._position = this._body.GetPosition();
	return this._position;
};	// End Function getPosition().

/**	@Name:	Get PositionX
	@Brief:	This is the Get Function of the X Position of an Enemy Torpedo.
			Object. This will return the current X Position of the 
			Enemy Torpedo in question.
	@Arguments:N/A
	@Returns: _position ( Returns the position of the Enemy Mine )
*/
EnemyShark.prototype.getPositionX = function( ){
	this._positionX = this._body.GetDefinition().position.x;
	return this._positionX;
};	// End Function getPositionX().

/**	@Name:	Get PositionY
	@Brief:	This is the Get Function of the Y Position of an Enemy Torpedo.
			Object. This will return the current Y Position of the 
			Enemy Torpedo in question.
	@Arguments:N/A
	@Returns: _position ( Returns the position of the Enemy Mine )
*/
EnemyShark.prototype.getPositionY = function( ){
	this._positionY = this._body.GetDefinition().position.y;
	return this._positionY;
};	// End Function getPositionY().

/**	@Name:	Set Position
	@Brief:	This is the Set Function of the Position of an Enemy Torpedo.
			Object. This will change the current Position of the
			Enemy Torpedo to the location specified by the User.
	@Arguments: newPosX, newPosY.
	@Returns: N/A
*/
EnemyShark.prototype.setPosition = function( newPosX, newPosY ){
	this._positionX = this._body.GetDefinition().position.x;
	this._positionY = this._body.GetDefinition().position.y;
	this._positionX = newPosX;
	this._positionY = newPosY;
};	//End Function setPosition( newPosX, newPosY ).

EnemyShark.prototype.isAlive = function( ){
	return this._alive;
}

EnemyShark.prototype.setAlive = function(change ){
	this._alive = change;
}
