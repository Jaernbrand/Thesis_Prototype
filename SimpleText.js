/**
* Contains functions to create and handle the Simple Text menu.
*
* Requires the phaser framework to be in scope.
*/

/**
* Preloads the assets needed by the Simple Text menu.
*
* @param Phaser.Game game
* - the Phaser.Game object to use for preloading.
*/
function preloadSimpleText(game){
	// TODO Need assets.
	game.load.image('exitSimpleText', 'assets/Close.png');
	game.load.image('background', 'assets/sky.png'); 
} // preloadSimpleText

/**
* Creates the Simple Text menu.
*
* @param Phaser.Game game
* - the Phaser.Game object to use for creation.
*
* @return object 
* - the simple text menu.
*/
function createSimpleText(game){

	// ==================== //
	// Function Definitions //
	// ==================== //

	/**
	* Creates the menu containing the list of
	* simplified texts.
	*
	* @return object
	* - list menu.
	*/
	function createListMenu(){
		listMenu = game.add.group();

		listMenu.create(0, 0, 'background');

		// TODO Should not be hardcoded.
		listMenu.add(new Phaser.Text(game, 30, 30, "Quest 1")); 
		// TODO Should not be hardcoded.
		listMenu.add(new Phaser.Text(game, 30, 60, "Simple text versions"));

		var closeButton = new Phaser.Button(game, 
											30, 
											listMenu.height-40, 
											'exitSimpleText', 
											function(){exitSimpleText(simpleText)}, 
											this);
		listMenu.add(closeButton);
		listMenu.visible = false;

		return listMenu;
	};

	// ================= //
	// Object Definition //
	// ================= //

	var simpleText = {};

	simpleText.listMenu = createListMenu();

	simpleText.root = simpleText.listMenu;
	simpleText.current = simpleText.listMenu;

	/**
	* Sets the x value for the Simple Text menu.
	*
	* @param number x
	* - the new x value.
	*/
	simpleText.setX = function(x){
		simpleText.x = x;
		simpleText.current.x = x;
	};

	/**
	* Sets the y value for the Simple Text menu.
	*
	* @param number y
	* - the new y value.
	*/
	simpleText.setY = function(y){
		simpleText.y = y;
		simpleText.current.y = y;
	};

	/**
	* Sets the current page of the Simple Text menu.
	*
	* @param object current
	* - the new current page.
	*/
	simpleText.setCurrent = function(current){
		current.x = this.x;
		current.y = this.y;
		current.visible = true;
		simpleText.current.visible = false;
		simpleText.current = current;
	};

	return simpleText;
} // createSimpleText

/**
* Shows the Simple Text menu at the given coordinates.
* The current page will be set to the root page.
*
* @param object simpleTextMenu
* - the simple text menu to show.
*
* @param number x
* - the x coordinate to show the menu.
*
* @param number y
* - the y coordinate to show the menu.
*/
function showSimpleText(simpleTextMenu, x, y){
	simpleTextMenu.current = simpleTextMenu.root;
	simpleTextMenu.setX(x);
	simpleTextMenu.setY(y);
	simpleTextMenu.current.visible = true;
}

/**
* Hides the Simple Text menu.
*
* @param object simpleTextMenu
* - the simple text menu to hide.
*/
function exitSimpleText(simpleTextMenu){
	simpleTextMenu.current.visible = false;
}




