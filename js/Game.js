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

/**
* @property {number} score
* The players collected score - increased as coins are collected.
*/
var score = 0;

/**
* @property {string} scoreText
* The score that is displayed to the user.
*/
var scoreText;

/**
* @property {string} currQuest
* The current game quest.
*/
var currQuest = "quest1";

/**
* @property {object.<string, string>} questTexts
* Dictionary containing questID:s as keys and questTexts as values.
*/
var questTexts = {
	"quest1": "Please, traveler. I need a helping hand.\n\n" +
			"I think I'm lost. No, I know I'm lost. Nothing "  +
			"looks familiar here and I mean at all. Oh I " +
			"should've never left our camp...\n\n" +
			"I know our camp is near a lake and we came into " +
			"the forest from the North, but I have no idea where " +
			"North is, I have no idea where anything is. I used to " +
			"have a map, but I lost it somewhere.\n\n" +
			"Please, you've got to help me, help me find my map so " +
			"that I may find my way back to camp. I don't want to be "+
			"in this forest anymore, I want to go home.",

	"quest2": "You see a map placed under a rock the size of a head. "+
			"Someone has clearly placed it there, but no one seems to "+
			"be in the proximity. \n\nYou can’t find any traces of a camp "+
			"either, and you can’t help but think that someone might "+
			"have hidden the map at this place. \n\nYou cautiously move "+
			"the stone. The map, although a little dirty, is in good "+
			"condition and someone has circled a handful of seemingly "+
			"random coordinates. \n\nThe lost man from earlier could be the "+
			"owner of this map, but how did it end up at this place?"
};

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
    game.load.image('coin', 'assets/tile/coin.png');
    game.load.image('friend', 'assets/tile/friend.png');
    game.load.spritesheet('player', 'assets/tile/feminist_sheet.png', 20, 20);
    game.load.image('wall', 'assets/tile/wall.png');
    game.load.audio('collectSound', 'assets/audio/money.mp3');
    game.load.audio('foundMap', 'assets/audio/foundItemSound.mp3');
    game.load.audio('music', 'assets/audio/Visager_-_02_-_Castle_Theme.mp3');
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
    foundMapSound = game.add.audio('foundMap');
    music = game.add.audio('music');
    // music.loop = true;

    game.add.text(32, 16, 'SCORE: ', { font: '20px VCR', fill: '#ccac00' });
    scoreText = game.add.text(110, 16, '0', { font: '20px VCR', fill: '#ccac00' });

    var coin_coords_x = [165, 165, 165, 165, 180, 180, 180, 205, 205, 51*16, 51*16, 300, 275, 547, 547, 547, 547, 547, 816, 550, 570, 590, 950, 950, 950, 950, 970, 970, 970, 970, 1180, 1180, 1180, 1180, 950, 970, 990, 1010, 1030, 1050  ];
    var coin_coords_y = [490, 510, 530, 550, 210, 230, 250, 450, 430, 13*16, 14*16, 100, 100, 420, 400, 380, 360, 340, 190, 590, 590, 590, 240, 220, 200, 180, 240, 220, 200, 180,  300,  320,  340,  360, 490, 490, 490,  490,  490,  490  ];
    coins = game.add.group();
    coins.enableBody = true;
    for(var i = 0; i < coin_coords_x.length; i++){
        coins.create(coin_coords_x[i], coin_coords_y[i], 'coin');
    }

    //Real start position
    player = game.add.sprite(100, game.world.height - 69, 'player');
    //Start next to friend
    //player = game.add.sprite(520, game.world.height - 285, 'player');
    //Start next to map
    //player = game.add.sprite(960, game.world.height - 285, 'player');
    player.animations.add('left', [0, 1, 2], 12, true);
    player.animations.add('up', [3, 4, 5], 12, true);
    player.animations.add('right', [6, 7, 8], 12, true);
    player.animations.add('down', [9, 10, 11], 12, true);
    player.hasTalked = false;
    player.inMenu = true;
    game.physics.enable(player);

    friend = game.add.sprite(480, game.world.height - 285, 'friend');
    game.physics.enable(friend);
    friend.body.immovable = true;

    wall = game.add.sprite(478, game.world.height - 241, 'wall')
    game.physics.enable(wall);
    wall.body.immovable = true;

		friendMap = game.add.sprite(950, game.world.height - 330, 'map');
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
    game.physics.arcade.overlap(player,friendMap,
								    function(player, friendMap) {
									   friendMap.isCollected = true;
									   collectMap(player, friendMap);
								    },
								    null,
								    this);

	if(game.physics.arcade.collide(player, friend) && !player.hasTalked){
        talkWithFriend();
		incrementCurrentQuest();
	}

    game.physics.arcade.collide(player, wall);
    player.body.velocity.set(0);

    if(!player.inMenu){
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
    score += 1;
    scoreText.text = score;
    item.kill();
    collectSound.play();
}

/**
* Collects the map.
*
* @param {Phaser.Sprite} player
* The current player.
*
* @param {Phaser.Sprite} item
* The map to collect.
*/
function collectMap(player, item) {
	showQuestWindow();
	// Sound is played when user collects map
  foundMapSound.play();
  item.kill();
  music.volume = 0.15;
  player.inMenu = true;
}

/**
* Shows quest 1 for the user and allows the player to progress
* beyond the wall. The quest description is only shown if the
* player hasn't talked with the friend sprite. Also disables
* player movement and turns down background music.
*/
function talkWithFriend(){
	showQuestWindow();
	player.hasTalked = true;
	wall.kill();
	music.volume = 0.15;
	player.inMenu = true;
}

/**
* Shows the quest window containing the current quest text.
*/
function showQuestWindow(){
	(function(questID){
		document.getElementById("simpleTextStart").style.visibility = "visible";
		document.getElementById("simpleTextStart")
				.getElementsByTagName("textarea")[0]
				.value = questTexts[questID];

		document.getElementById("questID").innerHTML = questID;
	})(currQuest);
}

/**
* Change volume with first argument. Restart music with the
* second argument set to true. This function is called in
* EventConfig when leaving simple text and going back to game.
*
* @param {number} vol
* The volumn of the music.
*
* @param {boolean} restart
* Whether the music is to restart or not.
*/
function musicVolumeAndRestart(vol, restart){
    music.volume = vol;
    if(restart){
        music.restart();
				setTimeout(function(){
					music.fadeOut(3000); }
				, 5000);

    }
}

/**
* Increments the current quest ID to the next quest ID and
* sets the new string as the current quest..
*
* Assumes the format <body><number>.
*/
function incrementCurrentQuest(){
	var digits = currQuest.match(/\d+/ig);
	var newNumber = parseInt(digits[digits.length-1]) + 1;

	var tailStart = currQuest.length - newNumber.toString().length;
	var body = currQuest.substring(0, tailStart);

	currQuest = body + newNumber;
}

/**
* Start the game by enabling the player to start moving and
* by starting the sound.
* Called within EventConfig when the start button is clicked by user.
*/
function startGame(){
	player.inMenu = false;
	//4th argument makes the music loop
	music.play('', 0, 1, true);
}
