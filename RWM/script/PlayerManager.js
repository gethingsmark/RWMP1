

function PlayerManager(world){
	
	// A list of enemies.
	this._player = new Player(world, "pos", "vel", "health" );
	

};

PlayerManager.prototype.update = function(){

	this._player.update();
};


PlayerManager.prototype.getPlayer = function( index ){


};