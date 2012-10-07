/**	@Name:	EnemyMine.js
	@Author: Gearóid Neville
	@Brief:	This is the Mine Enemy Class. Here are all the functions and properties
			of each Mine in the Game.
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
var ctx;
this._image;

/**	@Name:	EnemyMine
	@Brief:	This is the Constructor of the Class.
			It initialises it's core members and draws the Enemy Mine Object.
	@Arguments:N/A
	@Returns: N/A
*/
function EnemyMine( world, posX, posY, vel, health, width, height, arrayPos ){
	this._health = health;												// The health variable of an Enemy Mine.	
	this._positionX = posX;												// The current X Position of an Enemy Mine.
	this._positionY = posY;												// The current X Position of an Enemy Mine.
	this._width = width;												// The width of an Enemy Mine.
	this._height = height;												// The height of an Enemy Mine.
	this._startPositionX = posX;										// The starting X Position of an Enemy Mine.
	this._startPositionY = posY;										// The starting Y Position of an Enemy Mine.
	this._velocity = vel;												// The velocity of an Enemy Mine.
	this._alive = false;												// A boolean to check whether an Enemy Mine is alive or not.
	this._ttl = 100;													// Time left until Enemy Mine dies.
	this._world = world;												// The b2 world variable.
	this._image = new Image();											// The graphical representation.
	this._image.src = "img/mine.png";									// The source of the image.
	this._imageWidth = 30;												// Width of the Sprite.
	this._imageHeight = 30;												// Height of the Sprite.
	this._body;															// Physical Body of an Enemy Mine.
	this._bodyDef;														// The Body Definition of an Enemy Mine.
	this._bodyFixtureDef;												// The Body Fixture Definition of an Enemy Mine.
	this._bodyDef = new b2BodyDef;										// Create a new Body Definition for the Enemy Mine Object.
	this._bodyDef.type = b2Body.b2_dynamicBody; 						// Define Object type.
	this._bodyDef.position.Set(this._positionX, this._positionY);		// Define Position.
	this._bodyDef.userData = 'Mine' + arrayPos;							// Gives the Body a unique ID to check for collision callbacks.

	this._bodyFixtureDef = new b2FixtureDef;							// Create a new Fixture Definition for an Enemy Mine Object.		
	this._bodyFixtureDef.density = 10.0; 								// Define Density.
	this._bodyFixtureDef.friction = 0.4; 								// Define Friction.
	this._bodyFixtureDef.restitution = 0.03; 							// Define Restitution.
	this._bodyFixtureDef.shape = new b2PolygonShape; 					// Define Shape.
	this._bodyFixtureDef.shape.SetAsBox(this._width, this._height); 	// Define Size.
	
	
	this._body = this._world.CreateBody(this._bodyDef);		// Create the Enemy Mine Body Object in the Game World.
	this._body.CreateFixture(this._bodyFixtureDef);			// Create the defined Fixture for the Enemy Mine Body.
	this._alive = true;
	
	var c=document.getElementById("canvasSprites");
	ctx =c.getContext("2d");
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
};	// End Function EnemyMine().

/**	@Name:	Update
	@Brief:	This is Update Function of the Class.
			This is empty for now but the specialised
			Enemy Mine class will have content in their
			Update Functions.
	@Arguments:N/A
	@Returns: N/A
*/
EnemyMine.prototype.update = function(Sposition){
	ctx.drawImage(this._image, Sposition.x*30 - this._imageWidth, Sposition.y*30 - this._imageHeight);
		this._positionY = this.getPositionY();
		if ( this._positionY >= this._startPositionY ) {
			this._body.SetLinearVelocity(new b2Vec2(0, -2));
		}
};	// End Function update().

/**	@Name:	Reset
	@Brief:	This is Reset Function of the Class.
			This Function will reset an Enemy Mine to
			it's starting Position at the start
			of the Game World.
	@Arguments:N/A
	@Returns: N/A
*/
EnemyMine.prototype.reset = function(){
	this._positionX = this._body.GetDefinition().position.x;
	this._positionX = this._startPositionX;
	this._positionY = this._body.GetDefinition().position.y;
	this._positionY = this._startPositionY;
};	// End Function reset().


/**	@Name:	Get Position
	@Brief:	This Function will return an Enemy Mine's Position.
	@Arguments:N/A
	@Returns: _position ( Position of the Enemy Mine )
*/
EnemyMine.prototype.getPosition = function( ){
	this._position = this._body.GetPosition();
	return this._position;
};	// End Function getPosition().

/**	@Name:	Get PositionX
	@Brief:	This is the Get Function of the X Position of an Enemy Mine.
			Object. This will return the current X Position of the 
			Enemy Mine in question.
	@Arguments:N/A
	@Returns: _position ( Returns the position of the Enemy Mine )
*/
EnemyMine.prototype.getPositionX = function( ){
	this._positionX = this._body.GetDefinition().position.x;
	return this._positionX;
};	// End Function getPositionX().

/**	@Name:	Get PositionY
	@Brief:	This is the Get Function of the Y Position of an Enemy Mine.
			Object. This will return the current Y Position of the 
			Enemy Mine in question.
	@Arguments:N/A
	@Returns: _position ( Returns the position of the Enemy Mine )
*/
EnemyMine.prototype.getPositionY = function( ){
	this._positionY = this._body.GetDefinition().position.y;
	return this._positionY;
};	// End Function getPositionY().

/**	@Name:	Set Position
	@Brief:	This is the Set Function of the Position of an Enemy Mine.
			Object. This will change the current Position of the
			Enemy Mine to the location specified by the User.
	@Arguments: newPosX, newPosY.
	@Returns: N/A
*/
EnemyMine.prototype.setPosition = function( newPosX, newPosY ){
	this._positionX = this._body.GetDefinition().position.x;
	this._positionY = this._body.GetDefinition().position.y;
	this._positionX = newPosX;
	this._positionY = newPosY;
};	//End Function setPosition( newPosX, newPosY ).

