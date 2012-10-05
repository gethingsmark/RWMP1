
this._bulletCount;
var b2Listener = Box2D.Dynamics.b2ContactListener;

//Add listeners for contact
var listener = new b2Listener;
var player;
var collWorld;
var playerBullets;

function PlayerManager(world){
	
	// A list of enemies.
	this._player = new Player(world, "pos", "vel", "health" );
	player = this._player;
	
	this._bulletCount = 5;
	this._playerBullets = new Array(this._bulletCount);
	this._playerBullets[0] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[1] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[2] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[3] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[4] = new PlayerBullet(world, "pos", "vel", "health" );
	
	this._world = world;
	this._world.SetContactListener(listener);
	collWorld = this._world;
	
	playerBullets = this._playerBullets;
};

PlayerManager.prototype.update = function(){

	this._player.update(this._player.getPosition());
	var i =0;
	while (i < this._bulletCount){
		this._playerBullets[i].update();
		i++;
	}
	
	//this.world.SetContactListener(listener);
};

PlayerManager.prototype.fireBullet = function(){
	var i =0;
	while (i < this._bulletCount){
		if(!this._playerBullets[i].isAlive()){
			this._playerBullets[i].bulletAlive(this._player.getPosition(), i);
			break;
			}
		i++;
	}
};


PlayerManager.prototype.getPlayer = function( index ){
	return this._player;

};

listener.BeginContact = function(contact) {
    //console.log(contact.GetFixtureA().GetBody().GetUserData());
}

listener.EndContact = function(contact) {
    // console.log(contact.GetFixtureA().GetBody().GetUserData());
}

listener.PostSolve = function(contact, impulse) {
	var i = 0;
	while (i < 5){
		if (contact.GetFixtureA().GetBody().GetUserData() == 'Bullet' + i || contact.GetFixtureB().GetBody().GetUserData() == 'Bullet' + i) {
			//var impulse = impulse.normalImpulses[0];
			//if (impulse < 0.2) return; //threshold ignore small impacts
			//world.ball.impulse = impulse > 0.6 ? 0.5 : impulse;
			//console.log(world.ball.impulse);
			player.setScore(player.getScore() + 1);
		}
		if (contact.GetFixtureA().GetBody().GetUserData() == 'Bullet' + i){
		//destry body here...
		collWorld.DestroyBody(contact.GetFixtureA().GetBody());
		//contact.GetFixtureA().GetBody() = null;
		playerBullets[i].setAlive(false);
		}
		else if (contact.GetFixtureB().GetBody().GetUserData() == 'Bullet' + i){
		//destry body here...
		collWorld.DestroyBody(contact.GetFixtureB().GetBody());
		//contact.GetFixtureA().GetBody() = null;
		playerBullets[i].setAlive(false);
		}
		i++;
	}
}

listener.PreSolve = function(contact, oldManifold) {
    // PreSolve
}
