/**	@Name:	EnemyMine.js
	@Author: Gearóid Neville
	@Brief:	This is the Enemy Manager Class. This will control all the Enemies in the game
			It will initialise and update each Enemy Class.
	@Arguments:N/A
	@Returns:N/A
*/

/**	@Name:	EnemyManager
	@Brief:	This is the Constructor of the Class.
			It initialises it's core members and initalises the Enemies of the Game.
	@Arguments: world ( the game World object )
	@Returns: N/A
*/
function EnemyManager(world){
	
	this._wave1Check = false;
	this._wave2Check = false;
	
	
	this._world = world;
	this._waveOneCount = 1;
	this._waveTwoCount = 20;
	// A list of enemies.
	this._enemyWaveOne = new Array(this._waveOneCount);
	this._enemyWaveTwo = new Array(this._waveTwoCount);
		
	var i =0;
	while (i < this._waveOneCount){
		var randomNumberY = Math.floor(Math.random()*30);
		var randomNumberX = Math.floor(Math.random()*280);
		if ( randomNumberX < 40 )
		{
			randomNumberX = Math.floor(Math.random()*250);
		}
		else {
		this._enemyWaveOne[i] =  new EnemyTorpedo(this._world, randomNumberX, randomNumberY, 0.01, -1,3, 1.4,0.3, i);
		i++;
		}
	}
	this._wave1Check = true;

}; // End Function EnemyManager()

//this is called to initialise the second wave.
EnemyManager.prototype.initWave2 = function( ){
	var i =0;
	while (i < this._waveTwoCount){
		var randomNumberY = Math.floor(Math.random()*30);
		var randomNumberX = Math.floor(Math.random()*280);
		if ( randomNumberX < 40 )
		{
			randomNumberX = Math.floor(Math.random()*250);
		}
		else {
		this._enemyWaveTwo[i] =  new EnemyShark(this._world, randomNumberX, randomNumberY, 0.01, -1,3, 1.2,0.5, i);
		i++;
		}
	}
	this._wave2Check = true;
	
}


/**	@Name:	Update
	@Brief:	This updates all enemies in the game.
	@Arguments: N/A
	@Returns: N/A
*/
EnemyManager.prototype.update = function( ){
	
	//do this if it is the first wave
	if(this._wave1Check == true){
		var i =0;
		this._wave1AliveCount =0;
		while (i < this._waveOneCount){
			// Why are you passing the position of itself into itself :)
			// Im passing it in to allow the image to keep redrawing itself at the current pos of the body.
			// You crazy nigga
			this._enemyWaveOne[i].update(this._enemyWaveOne[i].getPosition());
			if(this._enemyWaveOne[i].isAlive() == false)
				this._wave1AliveCount = this._wave1AliveCount + 1;
			i++;
		}
		//check if all enemies in wave one are dead, if so then stop updating wave 1 and start wave 2;
		//(had to put in a -1 because for some reason sometimes the wave is an enemy short and so wave  2 would never start...)
		if(this._wave1AliveCount == this._waveOneCount-1){
			this._wave1Check = false;
			this.initWave2();
			}
	}//else do this if it is the second wave. (may be a better way to do all this, this was just thrown together quickly to allow changes in waves (MARK)
	else if (this._wave2Check == true){
		var i =0;
		this._wave2AliveCount =0;
		while (i < this._waveTwoCount){
			this._enemyWaveTwo[i].update(this._enemyWaveTwo[i].getPosition());
			if(this._enemyWaveTwo[i].isAlive() == false)
				this._wave2AliveCount = this._wave2AliveCount + 1;
			i++;
		}
		//check if all enemies in wave 2 are dead, if so then stop updating wave 2 and start wave 3...
		if(this._wave2AliveCount == this._waveTwoCount){
			this._wave2Check = false;
			}
	}

}; // End Function Update()

/**	@Name:	Delete Wave
	@Brief:	This deletes the current waves of Enemies.
	@Arguments: N/A
	@Returns: N/A
*/
EnemyManager.prototype.deleteWave = function(){
	while (i < this._waveOneCount){
		delete this._enemyWaveOne[i];
		i++;
	}

};	// End Function deleteWave()

/**	@Name:	Get Enemies
	@Brief:	This gets the list of Enemies currently in the game.
	@Arguments: N/A
	@Returns: N/A
*/
EnemyManager.prototype.getEnemies = function(){


};	// End Function getEnemies()

/**	@Name:	Get Enemy
	@Brief:	This gets a single Enemy from the List of Enemies in the game.
	@Arguments: index ( the position of the Enemy in the list )
	@Returns: N/A
*/
EnemyManager.prototype.getEnemy = function( index ){


}; // End Function getEnemy()

/**	@Name:	Destroy Enemy
	@Brief:	This destroys a single Enemy from the List of Enemies in the game.
	@Arguments: index ( the position of the Enemy in the list )
	@Returns: N/A
*/
EnemyManager.prototype.destroyEnemy = function( index ){


}; // End Function destroyEnemy()

EnemyManager.prototype.checkWave = function(){
	if(this._wave1Check ==true)
		return 1;
	else if (this._wave2Check ==true)
		return 2;

};

EnemyManager.prototype.getWaveCount = function(index){
	if(index == 1)
		return this._waveOneCount;
	else if (index == 2)
		return this._waveTwoCount;

};

EnemyManager.prototype.getWave = function(index){
	if(index == 1)
		return this._enemyWaveOne;
	else if(index == 2)
		return this._enemyWaveTwo;

};