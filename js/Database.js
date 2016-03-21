
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
	this.authors = {};

	/**
	* @property {object.<string, Contribution>} contributions
	* Map of Contribution objects with questID as the key
	*/
	this.contributions = {};

	/**
	* @property {object.<string, array.<string>>} favourites
	* Map of author names with usernames as the key
	*/
	this.favourites = {};

	/**
	* @property {object<string, UserContLike>} liked
	* Map of the contributions liked by the users.
	*/
	this.liked = {};

	/**
	* @property {object<string, UserContFlag>} flagged
	* Map of the contributions flagged by the users.
	*/
	this.flagged = {};
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
* @param {string} author
* The author name of the contribution.
*
* @param {string} text
* The contribution text.
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

	if (!this.authors[author]){
		this.addAuthor(author);
	}

	var id = this.contributions[questID].length.toString();

	/**
	* @typedef {object} Contribution
	*
	* @property {string} contID
	* @property {string} author
	* @property {int} votes
	* @property {int} flags
	* @property {number} timestamp
	* @property {array} comments
	* @property {string} text
	* @property {array} pictures
	* @property {array} sounds
	*/
	this.contributions[questID].push({
		contID: id,
		author: author,
		votes: 0,
		flags: 0,
		timestamp: Date.now(),
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
* Increments the number of flags by one for the contribution with 
* the specified contribution ID for the quest with
* the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to increment the
* number of flags.
*/
SimpleText.Database.prototype.addFlag = function(questID, contID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			this.contributions[questID][i].flags++;
			break;
		}
	}
}

/**
* Decrements the number of flags by one for the contribution with 
* the specified contribution ID for the quest with
* the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to decrement the
* number of flags.
*/
SimpleText.Database.prototype.removeFlag = function(questID, contID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			this.contributions[questID][i].flags--;
			break;
		}
	}
}

/**
* Increments the number of votes by one for the contribution with 
* the specified contribution ID for the quest with
* the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to increment the
* number of votes.
*/
SimpleText.Database.prototype.addVote = function(questID, contID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			this.contributions[questID][i].votes++;
			break;
		}
	}
}

/**
* Decrements the number of votes by one for the contribution with 
* the specified contribution ID for the quest with
* the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to decrement the
* number of votes.
*/
SimpleText.Database.prototype.removeVote = function(questID, contID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			this.contributions[questID][i].votes--;
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
* The ID of the contribution for which to add the comment.
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

	var comments = [];
	for (var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			comments = this.contributions[questID][i].comments;
			break;
		}
	}
	return comments;
};

/**
* Adds the author with the specified name as one of the user's
* favourite authors.
*
* @param {string} username
* Name of the user.
*
* @param {string} authorName
* Name of the author.
*/
SimpleText.Database.prototype.removeFavouriteAuthor = function(username, authorName){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}
	if (typeof authorName !== "string"){
		throw "authorName: Invalid type " + (typeof authorName) +
				" Expected string.";
	}

	this.favourites[username].push(authorName);
};

/**
* Fetches the favourite authors of the user with the given username.
*
* @param {string} username
* Name of the user.
*
* @return {array.<string>}
* Array containing the names of the user's favourite authors.
*/
SimpleText.Database.prototype.fetchFavouriteAuthors = function(username){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}

	return this.favourites[username] || [];
};

/**
* Removes the author with the specified name from the user's
* favourite authors.
*
* @param {string} username
* Name of the user.
*
* @param {string} authorName
* Name of the author.
*/
SimpleText.Database.prototype.removeFavouriteAuthor = function(username, authorName){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}
	if (typeof authorName !== "string"){
		throw "authorName: Invalid type " + (typeof authorName) +
				" Expected string.";
	}

	this.favourites[username] = this.favorites[username].filter(function(elem){
		return elem !== authorName;
	});
};

/**
* Get a sound array containing hard-coded paths to audio files from the specified 
* contribution ID and for the quest with the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to get the sound file.
*/
SimpleText.Database.prototype.fetchSound = function(questID, contID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	var sound;
	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			sound = this.contributions[questID][i].sounds;
			break;
		}
	}
	return sound || null;
};


/**
* Get a picture array containing hard-coded paths to img files from the specified 
* contribution ID and for the quest with the specified quest ID.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to get the img file.
*/
SimpleText.Database.prototype.fetchPictures = function(questID, contID){
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	var pics;
	for(var i=0; i < this.contributions[questID].length; ++i){
		if (this.contributions[questID][i].contID === contID){
			pics = this.contributions[questID][i].pictures;
			break;
		}
	}
	return pics || null;
};

/**
* Adds the given contribution as flagged by the user with the given username.
*
* @param {string} username
* The username of the user.
*
* @param {string} questID
* The id of the quest to which the contribution belongs.
*
* @param {string} contID
* The id of the contribution to add as flagged.
*/
SimpleText.Database.prototype.addFlagged = function(username, questID, contID){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}
	
	if (!this.flagged[username]){
		this.flagged[username] = [];
	}

	/**
	* @typedef {object} UserContFlag
	*
	* @property {string} questID
	* @property {string} contID
	*/
	this.flagged[username].push({
		questID: questID,
		contID: contID
	});
};

/**
* Adds the given contribution as liked by the user with the given username.
*
* @param {string} username
* The username of the user.
*
* @param {string} questID
* The id of the quest to which the contribution belongs.
*
* @param {string} contID
* The id of the contribution to add as liked.
*/
SimpleText.Database.prototype.addLiked = function(username, questID, contID){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	if (!this.liked[username]){
		this.liked[username] = [];
	}

	/**
	* @typedef {object} UserContLike
	*
	* @property {string} questID
	* @property {string} contID
	*/
	this.liked[username].push({
		questID: questID,
		contID: contID
	});
};

/**
* Removes the given contribution as flagged by the user with the given username.
*
* @param {string} username
* The username of the user.
*
* @param {string} questID
* The id of the quest to which the contribution belongs.
*
* @param {string} contID
* The id of the contribution to remove as flagged.
*/
SimpleText.Database.prototype.removeFlagged = function(username, questID, contID){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	for (var i=0; i < this.flagged[username]; ++i){
		if (this.flagged[username][i].questID === questID &&
			this.flagged[username][i].contID === contID){
			delete this.flagged[username];
		}
	}
};

/**
* Removes the given contribution as liked by the user with the given username.
*
* @param {string} username
* The username of the user.
*
* @param {string} questID
* The id of the quest to which the contribution belongs.
*
* @param {string} contID
* The id of the contribution to add as liked.
*/
SimpleText.Database.prototype.removeLiked = function(username, questID, contID){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}
	if (typeof questID !== "string"){
		throw "questID: Invalid type " + (typeof questID) +
				" Expected string.";
	}
	if (typeof contID !== "string"){
		throw "contID: Invalid type " + (typeof contID) +
				" Expected string.";
	}

	for (var i=0; i < this.liked[username]; ++i){
		if (this.liked[username][i].questID === questID &&
			this.liked[username][i].contID === contID){

			delete this.liked[username];
		}
	}
};

/**
* Fetches the contributions flagged by the user with the given username.
*
* @param {string} username
* The username of the user.
*
* @return {array.<UserContFlag>}
* The contributions flagged by the user.
*/
SimpleText.Database.prototype.getFlagged = function(username){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}

	return this.flagged[username] || [];
};

/**
* Fetches the contributions liked by the user with the given username.
*
* @param {string} username
* The username of the user.
*
* @return {array.<UserContLike>}
* The contributions liked by the user.
*/
SimpleText.Database.prototype.getLiked = function(username){
	if (typeof username !== "string"){
		throw "username: Invalid type " + (typeof username) +
				" Expected string.";
	}

	return this.liked[username] || [];
};


SimpleText.database = new SimpleText.Database();

