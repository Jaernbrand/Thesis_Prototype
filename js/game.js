// *****************************************************
// **************** GLOBAL VARIABLES *******************
// *****************************************************

/**
* @property {Phaser.Game} game
* The game object running the game.
*/
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

/**
* @property {Phaser.Tilemap} map
* The tilemap of the game.
*/
var map;

/**
* @property {Phaser.Sprite} player
* The user controlled sprite.
*/
var player;

/**
* @property {Phaser.Sprite} friend
* Friendly sprite.
*/
var friend;

/**
* @property {Phaser.Group} coins
* Coins collectible by the player.
*/
var coins;

/**
* @property {object} cursors
* Contains the cursos keys.
*/
var cursors;

/**
* @property {Phaser.Sound} music
* The game's background music.
*/
var music;

/**
* @property {Phaser.Sprite} wall
* An impassable wall.
*/
var wall;

/**
* @property {Phaser.Sprite} friendMap
* Map the player is tasked to find.
*/
var friendMap;

// *****************************************************
// *****************************************************

/**
* Preloads the assets needed by the game.
*/
function preload() {
    //  Load tilemap
    game.load.tilemap('map',
				'assets/tile/map_no_objects.csv',
				null,
				Phaser.Tilemap.CSV);

    //  Load the tileset. This is just an image,
    // loaded in via the normal way we load images:
    game.load.image('tiles', 'assets/tile/simples_pimples.png');
    // game.load.image('bat', 'assets/tile/bat.png');
    game.load.image('coin', 'assets/tile/coin.png');
    // game.load.image('door', 'assets/tile/door.png');
    game.load.image('friend', 'assets/tile/friend.png');
    // game.load.image('key', 'assets/tile/key.png');
    // game.load.image('skeletonLeft', 'assets/tile/skeletonLeft.png');
    // game.load.image('skeletonRight', 'assets/tile/skeletonRight.png');
    game.load.spritesheet('player', 'assets/tile/feminist_sheet.png', 20, 20);
    // game.load.audio('money', 'assets/audio/money.mp3');
    game.load.image('wall', 'assets/tile/wall.png');
    game.load.audio('collectSound', 'assets/audio/money.mp3');
    game.load.audio('music', 'assets/audio/mathgrant_-_Sober_Lullaby.mp3');

    game.load.image('map', 'assets/tile/map_14.png');
}

/**
* Creates the variables and objects needed by the game.
*/
function create() {
    map = game.add.tilemap('map', 16, 16);
    // The first parameter is the tileset name,
    // as specified in the Tiled map editor (and in the tilemap json file)
    // The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('simples_pimples', 'tiles');
    //  Creates a layer from the layers in the map data.
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(3000, 4000);
    cursors = game.input.keyboard.createCursorKeys();

    collectSound = game.add.audio('collectSound');
    music = game.add.audio('music');

    var coin_coords_x = [180, 180, 180, 205, 205, 51*16, 51*16, 300, 275];
    var coin_coords_y = [210, 230, 250, 450, 430, 13*16, 14*16, 100, 100];
    coins = game.add.group();
    coins.enableBody = true;
    for(var i = 0; i < coin_coords_x.length; i++){
        coins.create(coin_coords_x[i], coin_coords_y[i], 'coin');
    }

    //Old coords
    //player = game.add.sprite(80, game.world.height - 90, 'player');
    player = game.add.sprite(520, game.world.height - 285, 'player');
    player.animations.add('left', [0, 1, 2], 12, true);
    player.animations.add('up', [3, 4, 5], 12, true);
    player.animations.add('right', [6, 7, 8], 12, true);
    player.animations.add('down', [9, 10, 11], 12, true);
    player.hasTalked = false;
    game.physics.enable(player);

    friend = game.add.sprite(480, game.world.height - 285, 'friend');
    game.physics.enable(friend);
    friend.body.immovable = true;

    wall = game.add.sprite(478, game.world.height - 241, 'wall')
    game.physics.enable(wall);
    wall.body.immovable = true;

    //music.play();

	friendMap = game.add.sprite(game.world.width - 128, game.world.height - 64, 'map');
	friendMap.scale.setTo(0.5, 0.5);
	friendMap.isCollected = false;
    game.physics.enable(friendMap);
}


/**
* Updates the gamestate one tick.
*/
function update() {
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.overlap(player, coins, collectItem, null, this);
    game.physics.arcade.overlap(player,
								friendMap,
								function(player, friendMap) {
									friendMap.isCollected = true;
									collectItem(player, friendMap);
								},
								null,
								this);


	if(game.physics.arcade.collide(player, friend)){
		if (!friendMap.isCollected && !player.hasTalked){
        	talkWithFriend();
		} else if (friendMap.isCollected){
			// TODO Should get a new talk/quest.
			document.getElementById("simpleTextStart").style.visibility = "visible";
		}
	}

    game.physics.arcade.collide(player, wall);


    player.body.velocity.set(0);

    if (cursors.left.isDown){
        player.body.velocity.x = -100;
        player.play('left');
    }else if (cursors.right.isDown){
        player.body.velocity.x = 100;
        player.play('right');
    }else if (cursors.up.isDown){
        player.body.velocity.y = -100;
        player.play('up');
    }else if (cursors.down.isDown){
        player.body.velocity.y = 100;
        player.play('down');
    }else{
        player.animations.stop();
        player.frame = 10;
    }
}



// *****************************************
// ********** HELPER FUNCTIONS *************
// *****************************************

/**
* Collects the given coin as the supplied player.
*
* @param {Phaser.Sprite} player
* Player to collect coin.
*
* @param {Phaser.Sprite} coin
* The coin to collect.
*/
function collectItem(player, item) {
    item.kill();
    collectSound.play();
}

/**
* Shows a quest description on screen.
*/
function talkWithFriend(){
    document.getElementById("simpleTextStart").style.visibility = "visible";
    player.hasTalked = true;
    wall.kill();
}
