/**
* Text area to be used in HTML5 canvas. 
*
* Requires the phaser framework to be in scope.
*/

/**
* Creates a new object representing a text area.
*
* @param Phaser.Game game
* - the game object to use when creating the text area.
*
* @param number x
* - the x value of the text area. Default is 0.
*
* @param number y
* - the y value of the text area. Default is 0.
*/
function createTextArea(game, x=0, y=0){
	textArea = {};
	textArea.text = "";
	textArea.maxWidth;
	// TODO Make the text scrollable.

	textArea.phaserGroup = game.add.group();
	
	textArea.foreground = new Phaser.Text(game, 0, 0, "");
	textArea.phaserGroup.add(textArea.foreground);
	textArea.foreground.wordWrap = true;

	/**
	* Sets the x value for the textArea object.
	*
	* @param number x
	* - the new x value.
	*/
	textArea.setX = function(x){
		textArea.phaserGroup.x = x;
	};

	/**
	* Sets the y value for the textArea object.
	*
	* @param number y
	* - the new y value.
	*/
	textArea.setY = function(y){
		textArea.phaserGroup.y = y;
	};

	/**
	* Sets the max width of the textArea object.
	*
	* @param number maxWidth
	* - the new maxWidth of the textArea.
	*/
	textArea.setMaxWidth = function(maxWidth){
		textArea.maxWidth = maxWidth;
		textArea.foreground.wordWrapWidth = textArea.maxWidth;
	};

	/**
	* Appends the given text to the current
	* text attribute. 
	*
	* @param string text
	* - the new text to append.
	*/
	textArea.append = function(text){
		textArea.text += text;

		textArea.foreground.setText(textArea.text);
	};

	/**
	* Sets the text of the textArea object.
	*
	* @param string text
	* - the new text.
	*/
	textArea.setText = function(text){
		textArea.text = text;

		textArea.foreground.setText(textArea.text);
	};

	// TODO only enable this if editing is enabled!
	// TODO Write the callback function.
	game.input.keyboard.addCallbacks(this, function(){console.log("It's working!")});

	textArea.setX(x);
	textArea.setY(y);

	return textArea;
} // createTextArea



