
/**
* @class SimpleText.Database
*
* Stores and retrieves information related to
* SimpleText.
*/
SimpleText.Database = function(){

	/**
	* @property {object.<string, Author>} authors
	* Map of Author objects with Author.name as the key
	*/
	this.authors = {}

	/**
	* @property {object.<string, Contribution>} contributions
	* Map of Contribution objects with questID as the key
	*/
	this.contributions = {};
};

/**
* Adds the given author name to the database.
*
* @param {string} name
* Name of the author.
*/
SimpleText.Database.prototype.addAuthor = function(name){
	if (typeof name !== "string"){
		throw "name: Invalid type " + (typeof name) +
				" Expected string.";
	}

	/**
	* @typedef {object} Author
	*
	* @property {string} name
	* @property {int} favourited
	*/
	this.authors[name] = {
		name: name,
		favourited: 0
	};
};

/**
* Decrements the number of users that favourited 
* the author.
*
* @param {string} name
* Name of the author to defavourite.
*/
SimpleText.Database.prototype.defavouriteAuthor = function(name){
	if (typeof name !== "string"){
		throw "name: Invalid type " + (typeof name) +
				" Expected string.";
	}

	this.authors[name].favourited--;
};

/**
* Increments the number of users that favourited 
* the author.
*
* @param {string} name
* Name of the author to favourite.
*/
SimpleText.Database.prototype.favouriteAuthor = function(name){
	if (typeof name !== "string"){
		throw "name: Invalid type " + (typeof name) +
				" Expected string.";
	}

	this.authors[name].favourited++;
};

/**
* Adds a contribution to the database. The contribution
* is a simplified text of the quest text with the given
* quest id.
*
* @param {string} questID
* The id of the quest for which to add a contribution.
*
* @return {string}
* ID of the newly added contribution.
*/
SimpleText.Database.prototype.addContribution = function(questID, author, text){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}

	if (!this.contributions[questID]){
		this.contributions[questID] = []
	}	

	var id = this.contributions[questID].length.toString();

	/**
	* @typedef {object} Contribution
	*
	* @property {string} contID
	* @property {string} author
	* @property {int} votes
	* @property {int} flags
	* @property {array} comments
	* @property {string} text
	* @property {array} pictures,
	* @property {array} sounds
	*/
	this.contributions[questID].push({
		contID: id,
		author: author,
		votes: 0,
		flags: 0,
		comments: [],
		text: text,
		pictures: [],
		sounds: []
	});

	return id;
};

/**
* Adds a path to a pictrue to the contribution with 
* the specified contribution ID and for the quest with
* the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to add the sound file.
*
* @param {string} picture
* Path to the picture.
*/
SimpleText.Database.prototype.addPicture = function(questID, contID, picture){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}
	if (typeof picture !== "string"){
		throw "picture: Invalid type " + (typeof picture) +
				" Expected string.";
	}

	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			this.contributions[questID][i].pictures.push(picture);
			break;
		}
	}
}

/**
* Adds a path to a sound file to the contribution with 
* the specified contribution ID and for the quest with
* the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to add the sound file.
*
* @param {string} sound
* Path to the sound file.
*/
SimpleText.Database.prototype.addSound = function(questID, contID, sound){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}
	if (typeof sound !== "string"){
		throw "sound: Invalid type " + (typeof sound) +
				" Expected string.";
	}

	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			this.contributions[questID][i].sounds.push(sound);
			break;
		}
	}
}

/**
* Adds a comment to the contribution for the quest
* with the given quest ID and with the given 
* contribution ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of teh contribution for which to add the comment.
*
* @param {string} author
* The author of the comment.
*
* @param {string} text
* The comment text. 
*
* @return {string}
* The comment id of the newly added comment.
*/
SimpleText.Database.prototype.addComment = function(questID, contID, author, text){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	var id; 

	console.log(this.contributions[questID]);
	console.log(this.contributions[questID].length);

	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			id = this.contributions[questID][i].comments.length.toString();
	
			/**
			* @typedef {object} Comment
			*
			* @property {string} comID
			* @property {string} author
			* @property {string} text
			*/
			this.contributions[questID][i].comments.push({
				comID: id,
				author: author,
				text: text
			});
			break;
		}
	}

	return id;
};

/**
* Fetches the author with the specified name.
*
* @param {string} name
* Name of the author to fetch.
*
* @return {Author}
* Representation of an author.
*/
SimpleText.Database.prototype.fetchAuthor = function(name){
	if (typeof name !== "string"){
		throw "name: Invalid type " + (typeof name) +
				" Expected string.";
	}
	
	return this.authors[name] || null;
};

/**
* Fetches the contributions for the supplied quest ID.
*
* @param {string} questID
* The ID of the quest for which to fetch the contributions.
*
* @return {array.<Contribution>}
* The quest contributions.
*/
SimpleText.Database.prototype.fetchContributions = function(questID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}

	return this.contributions[questID] || [];
};

/**
* Fetches the comments for the quest with the given quest ID
* and with the given contribution ID.
*
* @param {string} questID
* The quest ID for which to fetch the comments.
*
* @param {string} contID
* The contributions ID for which to fetch the comments.
*
* @return {array.<Comment>}
* The comments for the contribution to the quest.
*/
SimpleText.Database.prototype.fetchComments = function(questID, contID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	return this.contributions[questID][contID] || [];
};



SimpleText.database = new SimpleText.Database();



