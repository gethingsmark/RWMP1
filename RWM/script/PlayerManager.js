

function PlayerManager(){
	
	// A list of enemies.
	this._player = new Player( "pos", "vel", "health" );
	

};

PlayerManager.prototype.update = function(){

	this._player.update();
};


PlayerManager.prototype.getPlayer = function( index ){


};