/**
* Setup for the user tests of the prototype.
* Should be run before each user test.
*
* @module Setup
*/

SimpleText.username = "TestUser";

/**
* Populates the database with data.
*/
function fillDatabase(){
	SimpleText.database.addAuthor("Nisse");
	SimpleText.database.addAuthor("Fred");
	SimpleText.database.addAuthor("óle");

	var quest1 = "quest1";
	var contId = SimpleText.database.addContribution(quest1, "óle", "Try jumping.");

	SimpleText.database.addComment(quest1, contId, "Fred", "You can't jump in this game.");

	SimpleText.database.addPicture(quest1, contId, "path/picture");
	SimpleText.database.addSound(quest1, contId, "path/picture");
};

fillDatabase();

