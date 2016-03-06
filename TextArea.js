/**
* Text area to be used in HTML5 canvas via Phaser. 
*
* Requires the <a href="http://phaser.io/">Phaser</a> framework.
*/

/**
* Preloads all assets needed by TextArea and 
* its subcomponents. This function has to be 
* called before any new TextArea objects are
* created.
*
* @param Phaser.Game game 
* - the Phaser.Game to use for preloading the assets.
*/
function preloadTextArea(game){
	// NOTE! It's assumed that the scrollUp asset has the same
	// size as the scrollDown asset.
	game.load.image('scrollUp', 'assets/TextArea/scrollUp.png');
	game.load.image('scrollDown','assets/TextArea/scrollDown.png');
}

/**
* Creates a new object representing a text area.
* The text area has a vertical scroller.
*
* @param Phaser.Game game
* - the game object to use when creating the text area.
*
* @param number x
* - the x value of the text area. 
*
* @param number y
* - the y value of the text area. 
*
* @param number width
* - the width of the text area. 
*
* @param number height
* - the height the text area. 
*
* @param boolean isEditable
* - Sets whether the TextArea is editable. Default is true.
*/
var TextArea = function(game, x, y, width, height, isEditable){
//function TextArea(game, x, y, width, height, isEditable){
	this.game = game;
	this.text = "";
	this.x = null;
	this.y = null;
	this.width = null;
	this.height = null;

	this.isEditable = null;
	this.scroller = null;

	this.phaserGroup = game.add.group();
	this.mask = game.add.graphics(0, 0, this.phaserGroup);
	
	this.foreground = new Phaser.Text(game, 0, 0, "");
	this.phaserGroup.add(this.foreground);
	this.foreground.wordWrap = true;

	this.foreground.mask = this.mask;

	this.setX(x);
	this.setY(y);
	this.setWidth(width);
	this.setHeight(height);
	this.setEditable( (isEditable ? true: false) );

	this.scroller = new TextArea.Scroller(this);
};

/**
* Sets the x value for the TextArea object.
*
* @param number x
* - the new x value.
*/
TextArea.prototype.setX = function(x){
	this.phaserGroup.x = x;
};

/**
* Sets the y value for the TextArea object.
*
* @param number y
* - the new y value.
*/
TextArea.prototype.setY = function(y){
	this.phaserGroup.y = y;
};

/**
* Sets the width of the TextArea object.
*
* @param number width
* - the new width of the TextArea.
*/
TextArea.prototype.setWidth = function(width){
	this.width = width;
	this.foreground.wordWrapWidth = this.width;
	this.adjustMask();
};


/**
* Sets the height of the TextArea object.
*
* @param number height
* - the new height of the TextArea.
*/
TextArea.prototype.setHeight = function(height){
	this.height = height;
	this.adjustMask();
};

/**
* Adjusts the TextArea mask. Called when the
* width or height of the TextArea changes. 
*/
TextArea.prototype.adjustMask = function(){
	if (this.width !== null && this.height !== null){
		this.mask.clear();
		this.mask.beginFill(0xffffff);

		this.mask.drawRect(this.x, this.y, this.width, this.height);
	}
};

/**
* Appends the given text to the current
* text attribute. 
*
* @param string text
* - the new text to append.
*/
TextArea.prototype.append = function(text){
	this.text += text;

	this.foreground.setText(this.text);

	if (this.scroller != null){
		this.scroller.adjustScroller();
	}
};

/**
* Cuts the specified number of characters from the 
* end of the text.
*
* @param int chars
* - the number of characters to cut.
*/
TextArea.prototype.cutTextTail = function(chars){
	var newEnd = this.text.length-chars;
	if (newEnd < this.text.length){
		this.text = this.text.substring(0, newEnd);
		this.foreground.setText(this.text);

		if (this.scroller != null){
			this.scroller.adjustScroller();
		}
	}
};

/**
* Sets the text of the TextArea object.
*
* @param string text
* - the new text.
*/
TextArea.prototype.setText = function(text){
	this.text = text;

	this.foreground.setText(this.text);

	if (this.scroller != null){
		this.scroller.adjustScroller();
	}
};

/**
* Sets whether the TextArea can be editaed by a user
* or not.
*
* @param boolean isEditable
* - the new editable value.
*/
TextArea.prototype.setEditable = function(isEditable){
	this.isEditable = isEditable;

	if (this.isEditable === true){

		/**
		* Appends the pressed key to the TeaxtArea.
		*
		* @param KeyboardEvent keyEvent
		*/
		function keyPressed(keyEvent){
			if (keyEvent.key.length === 1){
				this.append(keyEvent.key);
			} else if (keyEvent.key === "Enter"){
				this.append("\n");
			} else if (keyEvent.key === "Tab"){
				this.append("    ");
			} else if (keyEvent.key === "Backspace"){
				this.cutTextTail(1);
			}
		}

		game.input.keyboard.addCallbacks(this, keyPressed);
		game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
		game.input.keyboard.addKeyCapture(Phaser.Keyboard.BACKSPACE);
	} else if (this.isEditable === false){
		game.input.keyboard.addCallbacks(this, null);
	}
};

/**
* Scroller object bound to a TextArea and makes
* it possible to scroll the text in the TextArea.
*
* @param TextArea textArea
* - the TextArea for which to apply the Scroller. 
*/
TextArea.Scroller = function(textArea){
	this.textArea = textArea;
	
	this.x = textArea.width;
	this.y = 0;
	this.width = 15;
	
	this.currTextHeight = 0;
	this.scale = 1;

	this.group = textArea.game.add.group();
	textArea.phaserGroup.add(this.group);
	this.group.x = this.x;
	this.group.y = this.y;

	this.graphics = this.textArea.game.add.graphics(0, 0, this.group);

	// Scroll Field
	this.scrollField = this.textArea.game.add.graphics(0, 0, this.group);
	this.scrollField.beginFill(0x000000);
	this.scrollField.drawRect(0, 0, this.width, this.textArea.height);

	// Scroll Arrowbuttons
	this.scrollUp = this.textArea.game.add.button(0, 0, 'scrollUp', up, this);
	this.group.add(this.scrollUp);

	this.scrollDown = this.textArea.game.add.button(0, 
													this.textArea.height-this.scrollUp.height, 
													'scrollDown', 
													down, 
													this);
	this.group.add(this.scrollDown);

	function up(){
		this.scroll(-10);
	}

	function down(){
		this.scroll(10);
	}

	// Scroll Indicator
	this.scrollIndicator = null;
	this.createScrollIndicator();
};

/**
* Creates a scroll indicator and sets it in the TextArea.Scroller. 
* The scroll indicator shows an approximation where in the text
* the user is reading and allows for navigation via dragging
* the indicator.
*/
TextArea.Scroller.prototype.createScrollIndicator = function(){
	if (this.scrollIndicator !== null){
		this.group.remove(this.scrollIndicator, true);
	}

	var moveRange = this.textArea.height - 2 * this.scrollUp.height;
	var indicatorHeight = moveRange / this.scale;

	this.graphics.beginFill(0xFF00FF);
	this.graphics.drawRect(0, this.scrollUp.height, this.width, indicatorHeight);

	this.scrollIndicator = this.textArea.game.add.sprite(0,
														this.scrollUp.height, 
														this.graphics.generateTexture());
	this.group.add(this.scrollIndicator);

	// NOTE! The bounds are relative (to the group most likely).
	var bounds = new Phaser.Rectangle(0, this.scrollUp.height, this.width, moveRange);

	this.scrollIndicator.inputEnabled = true;
	this.scrollIndicator.input.enableDrag(false, false, false, 255, bounds);
	this.scrollIndicator.input.setDragLock(false, true);
	
	this.graphics.clear();

	this.scrollIndicator.events.onDragStop.add(dragUpdate, this);

	function dragUpdate(){
		this.scrollTo(this.scrollIndicator.y);
	}
};

/**
* Adjusts the propotions of the scroller. It is called by
* the TextArea and TextArea.Scroller when appropriate.
*/
TextArea.Scroller.prototype.adjustScroller = function(){
	this.scale = this.textArea.foreground.height/(this.textArea.height - 2*this.scrollUp.height);
	
	if (this.textArea.height !== this.currTextHeight){
		this.createScrollIndicator();
		this.currTextHeight = this.textArea.height;
	}
};

/**
* Scrolls the text in the TextArea object the supplied
* number of pixels. The scroll direction is determined 
* by whether the number is positive or negative.
*
* @param number change
* - the position change from the current position.
*/
TextArea.Scroller.prototype.scroll = function(change){
	var newPos = this.textArea.foreground.y + (-1*change);
	var end = -1*(this.textArea.foreground.height - this.textArea.height);
	if (newPos <= 0 && newPos >= end){
		this.scrollIndicator.y += change/this.scale;
		this.textArea.foreground.y = newPos;
	}
};

/**
* Scrolls the text in the TextArea to the corresponding
* scroller position.
*
* @param number pos
* - the new scroller y-position to scroll the text to.
*/
TextArea.Scroller.prototype.scrollTo = function(pos){
	this.textArea.foreground.y = -1*(pos-this.scrollUp.height)*this.scale;
};





