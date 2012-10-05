

function EnemyManager(world){
	
	this._world = world;
	this._waveOneCount = 40;
	// A list of enemies.
	this._enemyWaveOne = new Array(this._waveOneCount);
	/*
	this._enemyWaveOne[0] =  new EnemyTorpedo(this._world, 25, 20, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[1] =  new EnemyTorpedo(this._world, 15, 5, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[2] =  new EnemyTorpedo(this._world, 20, 10, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[3] =  new EnemyTorpedo(this._world, 35, 12, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[4] =  new EnemyTorpedo(this._world, 12, 25, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[5] =  new EnemyTorpedo(this._world, 25, 20, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[6] =  new EnemyTorpedo(this._world, 15, 5, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[7] =  new EnemyTorpedo(this._world, 20, 10, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[8] =  new EnemyTorpedo(this._world, 35, 12, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[9] =  new EnemyTorpedo(this._world, 12, 25, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[10] =  new EnemyTorpedo(this._world, 25, 20, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[11] =  new EnemyTorpedo(this._world, 15, 5, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[12] =  new EnemyTorpedo(this._world, 20, 10, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[13] =  new EnemyTorpedo(this._world, 35, 12, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[14] =  new EnemyTorpedo(this._world, 12, 25, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[15] =  new EnemyTorpedo(this._world, 25, 20, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[16] =  new EnemyTorpedo(this._world, 15, 5, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[17] =  new EnemyTorpedo(this._world, 20, 10, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[18] =  new EnemyTorpedo(this._world, 35, 12, 0.01, -1,3, 1.4,0.3);
	this._enemyWaveOne[19] =  new EnemyTorpedo(this._world, 12, 25, 0.01, -1,3, 1.4,0.3);
	*/
	
	
	var i =0;
	while (i < this._waveOneCount){
		var randomNumberY = Math.floor(Math.random()*30);
		var randomNumberX = Math.floor(Math.random()*280);
		if ( randomNumberX < 40 )
		{
			randomNumberX = Math.floor(Math.random()*250);
		}
		else {
		this._enemyWaveOne[i] =  new EnemyTorpedo(this._world, randomNumberX, randomNumberY, 0.01, -1,3, 1.4,0.3);
		i++;
		}
	}

};

EnemyManager.prototype.update = function(){
	
	var i =0;
	while (i < this._waveOneCount){
		this._enemyWaveOne[i].update();
		i++;
	}

};


EnemyManager.prototype.deleteWave = function(){
	while (i < this._waveOneCount){
		delete this._enemyWaveOne[i];
		i++;
	}

};

EnemyManager.prototype.getEnemies = function(){


};


EnemyManager.prototype.getEnemy = function( index ){


};


EnemyManager.prototype.destroyEnemy = function( index ){


};