// Just some short-cut renaming
var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	
function Player( x, y, physics )
{	
	this.pos = new b2Vec2(x,y);
	this.velocity =new b2Vec2(0,0); 

	this.physBody;
	this.physics = physics;
	this.health = 75;
	this.width = 57; // sprite width
	this.height = 32;// sprite height
	this.radius = this.width/(2 * this.physics.getScale()); // radius of physics obj;
	this.speed = 10;
	this.turningSpeed = 0.05
	this.forceApplied = new b2Vec2(0,this.speed);
	this.isAlive = true;
	this.isRightPressed = false;
	this.isLeftPressed = false;
	this.isUpPressed = false;
	
	this.SetupPhysicsBody();
	
	var p = this;
	this.physics.addContactListener( function(){p.Hit()} );
 	this.physBody.SetUserData( "Player" );
	
}

Player.prototype.Hit = function()
{// the player has been hit	
	this.health -= 25;
}

 Player.prototype.SetupPhysicsBody = function()
{
  	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0;
	fixDef.restitution = 1;
	fixDef.shape = new b2PolygonShape;
	// create the object
	
	this.physBody = new b2BodyDef;
	this.physBody.type = b2Body.b2_dynamicBody;	
	
	fixDef.shape.SetAsBox(this.width/this.physics.getScale()/2, this.height/this.physics.getScale()/2);
	//fixDef.shape = new b2CircleShape(this.radius); //radius
	
	this.physBody.position.x = this.pos.x / this.physics.getScale();
    this.physBody.position.y = this.pos.y / this.physics.getScale();
	
	this.physBody = this.physics.getWorld().CreateBody(this.physBody).CreateFixture(fixDef).GetBody();

} 

Player.prototype.Draw = function(canvasContext)
{
	// the sprite is drawn at the origin but it ita transulated to its position

	// Transulate and rotate the canvas
	canvasContext.translate(this.pos.x, this.pos.y);
	canvasContext.rotate(this.physBody.GetAngle());
	
	// draws palyer
	canvasContext.drawImage(images.spriteSheet, 
                219, 300, //sourceImgX, sourceImgY
                this.width, this.height,  // sourceImgWidth, sourceImgHeight
                -this.width/2, -this.height/2, // canvasX, canvas Y
                this.width, this.height); // width, height 	
	//drawing health bar
	//draw health bar background
	canvasContext.fillRect(4-(this.width/2),-25,50,10);
	//draw health bar
	//set colour of health bar based on health value
	if (this.health <= 25)
	{
		canvasContext.fillStyle = "#FF0000";
	}
	else if (this.health <= 50)
	{
		canvasContext.fillStyle = "#FF7F00";
	}
	else if (this.health <= 75)
	{
		canvasContext.fillStyle = "#FFFF00";
	}
	else
	{
		canvasContext.fillStyle = "#00FF00";
	}
	
	if(this.isAlive)// draw health bar
		canvasContext.fillRect(4-(this.width/2),-25,50*this.health/100,10);
	
	
	// undo Transulate and rotate of the canvas
	canvasContext.rotate(-this.physBody.GetAngle());	
	canvasContext.translate(-this.pos.x, -this.pos.y);
}

Player.prototype.Update = function()
{
	this.pos.x = this.physBody.GetPosition().x * this.physics.getScale();
	this.pos.y = this.physBody.GetPosition().y * this.physics.getScale();
	
	if(this.health <= 0)
		this.isAlive = false;

	this.Movement();
}

Player.prototype.OnKeyDown = function(evt)
{
	switch (evt.keyCode) 
	{
		case 38:  /* Up arrow was pressed */
			this.isUpPressed = true;
		
	break;
		case 37:  /* Left arrow was pressed */ 
			this.isLeftPressed = true;
		
	break;
		case 39:  /* Right arrow was pressed */		
			this.isRightPressed = true;
		
	break;
	}
}

Player.prototype.OnKeyUp = function(evt)
{
	switch (evt.keyCode) 
	{
		case 38:  /* Up arrow was pressed */
			this.isUpPressed = false;
		
	break;
		case 37:  /* Left arrow was pressed */ 
			this.isLeftPressed = false;
		
	break;
		case 39:  /* Right arrow was pressed */		
			this.isRightPressed = false;
		
	break;
	}
}



Player.prototype.Movement =function()
{
	if(this.isRightPressed)
	{// turn right
		this.physBody.SetAngularVelocity(0);// stop the body spinning;
		this.physBody.SetAngle(this.physBody.GetAngle() + this.turningSpeed);//rotates clockwise	
	}
	if(this.isLeftPressed)
	{// turn left	
		this.physBody.SetAngularVelocity(0);// stop the body spinning;	
		this.physBody.SetAngle(this.physBody.GetAngle() - this.turningSpeed);//rotates anti clockwise	
	}
	if(this.isUpPressed)
	{//applies a force
		SetVec2Angle(this.forceApplied, this.physBody.GetAngle() - (Math.PI/2));// make the force turn with the body 
		this.physBody.ApplyForce( this.forceApplied, this.physBody.GetWorldCenter());	//apply force
	}
}

// sets the angle of a vector
SetVec2Angle = function( vec, angle )
{
	if (angle != 0)
	{
		var newVec = new b2Vec2(Math.cos(angle),Math.sin(angle));
		newVec.Multiply(vec.Length());
		vec.SetV(newVec);
	}
}



