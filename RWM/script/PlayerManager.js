

function PlayerManager(world){
	
	// Create the player
	this._playerHealth = 100;
	this._player = new Player(world, "pos", "vel", this._playerHealth );
	//player = this._player;
	
	//create the players bullets
	this._bulletCount = 5;
	this.BulletVel = 5;
	this._playerBullets = new Array(this._bulletCount);
	this._playerBullets[0] = new PlayerBullet(world, "pos", this.BulletVel, "health" );
	this._playerBullets[1] = new PlayerBullet(world, "pos", this.BulletVel, "health" );
	this._playerBullets[2] = new PlayerBullet(world, "pos", this.BulletVel, "health" );
	this._playerBullets[3] = new PlayerBullet(world, "pos", this.BulletVel, "health" );
	this._playerBullets[4] = new PlayerBullet(world, "pos", this.BulletVel, "health" );
	
	this._world = world;
	
	//playerBullets = this._playerBullets;
};

PlayerManager.prototype.update = function(){

	//update the player and the players bullets
	this._player.update(this._player.getPosition());
	var i =0;
	while (i < this._bulletCount){
		this._playerBullets[i].update();
		i++;
	}
	
	//this.world.SetContactListener(listener);
};

PlayerManager.prototype.fireBullet = function(){
	//Fire the player bullets, one at a time.
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

PlayerManager.prototype.getPlayerBullets = function(){
	return this._playerBullets;

};