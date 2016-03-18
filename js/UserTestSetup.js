/**
* Setup for the user tests of the prototype.
* Should be run before each user test.
*
* @module UserTestSetup
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

		var comNames = ["óle", "Fred", "Hugo", "Ms Ellenius", "Bobby Tables"];
		var comTexts = ["Where can I find the map?",
					"Some of those words seems a little advanced...",
					"Great simplification!",
					"THANKS!",
					"This was the best translation ever! I löve u män!"];
		for (var i=0; i < 5; ++i){
			SimpleText.database.addVote(questID, nisseContId);
			SimpleText.database.addComment(questID, nisseContId, comNames[i], comTexts[i]);
		}

		var oleContId = SimpleText.database.addContribution(questID, "óle", "Try jumping.");
		SimpleText.database.addComment(questID, oleContId, "Fred", "You can't jump in this game.");
		SimpleText.database.addComment(questID, oleContId, "Hugo", "This has nothing to do with the quest.");


		fredContId = SimpleText.database.addContribution(questID, 
														"Fred", 
						"I'm lost. Please find my map.");

		var fComNames = ["Nisse", "Hugo", "óle", "NissElenius"];
		var fComTexts = ["You ignored a lot of information.",
						"Straight to the point!",
						"Try jumping.",
						"That wasn't everything he said. You "+
						"forgot some of the story relevant the parts."];
		for (var j=0; j < 4; ++j){
			if (j % 2 === 0){
				SimpleText.database.addVote(questID, fredContId);
			}
			SimpleText.database.addComment(questID, fredContId, fComNames[j], fComTexts[j]);
		}
	 } // populateQuest1

	function populateQuest2(questID){
		nisseContId = SimpleText.database.addContribution(questID, 
														"Nisse", 
				"You see a map under a rock. Someone has placed it there. " + 
				"You can't see anyone. You can’t find any traces of a camp either." +
				" You think that someone might have hidden the map. You move the stone." +
				" The map is a little dirty, but it is in good condition. " +
				"Someone has circled a handful of places. The lost man from " +
				" earlier could be the owner of this map, but how did it end up "+
				"at this place?"	
			);
		
		var comNames = ["óle", "Fred", "Hugo", "Ms Ellenius", "Bobby Tables"];
		var comTexts = ["I found the map!",
					"Is this really simplified? Seems very similar to theoriginal.",
					"Great as always!",
					"Thanks again!",
					"This was even better than the previous one! I löve u män!"];
		for (var i=0; i < 5; ++i){
			if (i < 3){
				SimpleText.database.addVote(questID, nisseContId);
			}
			SimpleText.database.addComment(questID, nisseContId, comNames[i], comTexts[i]);
		}

		oleContId = SimpleText.database.addContribution(questID, 
														"óle", 
														"Run in circles.");
		SimpleText.database.addComment(questID, oleContId, "Fred", "No, don't listen to him!");
		SimpleText.database.addComment(questID, oleContId, "Hugo", "That isn't what the text said.");

		fredContId = SimpleText.database.addContribution(questID, 
														"Fred", 
										"You found a dirty map. " +
										"Go back to the lost man.");

		var fComNames = ["Nisse", "Hugo", "óle", "NissElenius"];
		var fComTexts = ["You ignored a lot of information.",
						"Straight to the point!",
						"Try jumping.",
						"That wasn't everything he said. You "+
						"forgot some of the story relevant the parts."];
		for (var j=0; j < 4; ++j){
			SimpleText.database.addVote(questID, fredContId);
			SimpleText.database.addComment(questID, fredContId, fComNames[j], fComTexts[j]);
		}
	} // populateQuest2

	populateAuthors();
	populateQuest1("quest1");
	populateQuest2("quest2");

	// TODO
	/*
	SimpleText.database.addPicture(quest1, contId, "path/picture");
	SimpleText.database.addSound(quest1, contId, "path/picture");
	*/
}; // fillDatabase

fillDatabase();

