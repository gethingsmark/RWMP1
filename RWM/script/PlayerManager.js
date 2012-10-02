
this._bulletCount;
function PlayerManager(world){
	
	// A list of enemies.
	this._player = new Player(world, "pos", "vel", "health" );
	
	this._bulletCount = 5;
	this._playerBullets = new Array(this._bulletCount);
	this._playerBullets[0] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[1] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[2] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[3] = new PlayerBullet(world, "pos", "vel", "health" );
	this._playerBullets[4] = new PlayerBullet(world, "pos", "vel", "health" );
	

};

PlayerManager.prototype.update = function(){

	this._player.update();
	var i =0;
	while (i < this._bulletCount){
		this._playerBullets[i].update();
		i++;
	}
};

PlayerManager.prototype.fireBullet = function(){
	var i =0;
	while (i < this._bulletCount){
		if(!this._playerBullets[i].isAlive()){
			this._playerBullets[i].bulletAlive(this._player.getPosition());
			break;
			}
		i++;
	}
};


PlayerManager.prototype.getPlayer = function( index ){
	return this._player;

};