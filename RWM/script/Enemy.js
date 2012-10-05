/**	@Name:	Enemy.js
	@Author: Gearóid Neville
	@Brief:	This is the Base Class of the Enemies. All further Enemy Class shall inherit from this one.
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

/**	@Name:	Enemy
	@Brief:	This is the Constructor of the Class.
			It initialises it's core members and draws the Enemy Object.
	@Arguments:N/A
	@Returns: N/A
*/
function Enemy( world, posX, posY, vel, health, width, height ){
	this._health = health;												// The health variable of an Enemy.	
	this._positionX = posX;												// The current X Position of an Enemy.
	this._positionY = posY;												// The current X Position of an Enemy.
	this._width = width;												// The width of an Enemy.
	this._height = height;												// The height of an Enemy.
	this._startPositionX = posX;										// The starting X Position of an Enemy.
	this._startPositionY = posY;										// The starting Y Position of an Enemy.
	this._velocity = vel;												// The velocity of an Enemy.
	this._alive = true;													// A boolean to check whether an Enemy is alive or not.
	this._ttl = 100;													// Time left until Enemy dies.
	this._world = world;												// The b2 world variable.
	this._body;															// Physical Body of an Enemy.
	this._bodyDef;														// The Body Definition of an Enemy.
	this._bodyFixtureDef;												// The Body Fixture Definition of an Enemy.
	this._bodyDef = new b2BodyDef;										// Create a new Body Definition for the Enemy Object.
	this._bodyDef.type = b2Body.b2_staticBody; 							// Define Object type.
	this._bodyDef.position.Set(this._positionX, this._positionY);		// Define Position.

	this._bodyFixtureDef = new b2FixtureDef;							// Create a new Fixture Definition for an Enemy Object.		
	this._bodyFixtureDef.density = 10.0; 								// Define Density.
	this._bodyFixtureDef.friction = 0.4; 								// Define Friction.
	this._bodyFixtureDef.restitution = 0.03; 							// Define Restitution.
	this._bodyFixtureDef.shape = new b2PolygonShape; 					// Define Shape.
	this._bodyFixtureDef.shape.SetAsBox(this._width, this._height); 	// Define Size.
	
	
	this._body = this._world.CreateBody(this._bodyDef);					// Create the Enemy Body Object in the Game World.
	this._body.CreateFixture(this._bodyFixtureDef);						// Create the defined Fixture for the Enemy Body.
	
};	// End Function Enemy().

/**	@Name:	Draw
	@Brief:	This is Drawing Function of the Class.
			It creates the Enemy Instance in the Game World.
	@Arguments:N/A
	@Returns: N/A
*/
Enemy.prototype.draw = function(){
	this._position = this._body.GetDefinition().position;
	this._position.x = 12;
	this._position.y = 12;

};	// End Function draw().

/**	@Name:	Update
	@Brief:	This is Update Function of the Class.
			This is empty for now but the specialised
			Enemy class will have content in their
			Update Functions.
	@Arguments:N/A
	@Returns: N/A
*/
Enemy.prototype.update = function(){


};	// End Function update().

/**	@Name:	Reset
	@Brief:	This is Reset Function of the Class.
			This Function will reset an Enemy to
			it's starting Position at the start
			of the Game World.
	@Arguments:N/A
	@Returns: N/A
*/
Enemy.prototype.reset = function(){
	this._positionX = this._body.GetDefinition().position.x;
	this._positionX = this._startPositionX;
	this._positionY = this._body.GetDefinition().position.y;
	this._positionY = this._startPositionY;
};	// End Function reset().

/**	@Name:	Get PositionX
	@Brief:	This is the Get Function of the X Position of an Enemy.
			Object. This will return the current X Position of the 
			Enemy in question.
	@Arguments:N/A
	@Returns: _position ( Returns the position of the Enemy )
*/
Enemy.prototype.getPositionX = function( ){
	this._positionX = this._body.GetDefinition().position.x;
	return this._positionX;
};	// End Function getPositionX().

/**	@Name:	Get PositionY
	@Brief:	This is the Get Function of the Y Position of an Enemy.
			Object. This will return the current Y Position of the 
			Enemy in question.
	@Arguments:N/A
	@Returns: _position ( Returns the position of the Enemy )
*/
Enemy.prototype.getPositionY = function( ){
	this._positionY = this._body.GetDefinition().position.y;
	return this._positionY;
};	// End Function getPositionY().

/**	@Name:	Set Position
	@Brief:	This is the Set Function of the Position of an Enemy.
			Object. This will change the current Position of the
			Enemy to the location specified by the User.
	@Arguments: newPosX, newPosY.
	@Returns: N/A
*/
Enemy.prototype.setPosition = function( newPosX, newPosY ){
	this._positionX = this._body.GetDefinition().position.x;
	this._positionY = this._body.GetDefinition().position.y;
	this._positionX = newPosX;
	this._positionY = newPosY;
};	//End Function setPosition( newPosX, newPosY ).