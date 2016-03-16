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
	function populateAuthors(){
		SimpleText.database.addAuthor("Nisse");
		SimpleText.database.addAuthor("Fred");
		SimpleText.database.addAuthor("óle");
	}

	function populateQuest1(questID){
		nisseContId = SimpleText.database.addContribution(questID, "Nisse", "Please, traveler. I need help.\n\n" + 
											"I'm lost. Oh, I should've never left our camp. I used " +
											"to have a map, but I lost it somewhere. Please, help me " + 
											"find my map.");

		for (var i=0; i < 3; ++i){
			SimpleText.database.addVote(questID, nisseContId);
		}

		var oleContId = SimpleText.database.addContribution(questID, "óle", "Try jumping.");
		SimpleText.database.addComment(questID, oleContId, "Fred", "You can't jump in this game.");
	}

	populateAuthors();
	populateQuest1("quest1");

	// TODO
	/*
	SimpleText.database.addPicture(quest1, contId, "path/picture");
	SimpleText.database.addSound(quest1, contId, "path/picture");
	*/
};

fillDatabase();

