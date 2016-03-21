/**
* Defines actions taken during events involving HTML elements,
* mainly onclick events.
*
* @module EventConfig
*/

// Run when the DOM is loaded and ready
$(document).ready(function(){

	//Makes the startScreen fade out and starts the game
	$("#startGameBtn").click(function(){
		startGame(); //Enables player to move and starts music
		$("#startScreen").fadeOut(2000);
	});


	// Needed to be able to fade-in/fade-out infoBox when user clicks any icon
	// when viewing a single contribution.
	// If visibility is set with css, jQuery function fadeIn() & fadeOut() can't
	// be used.
	$("#infoBox").hide();
	$("#blackBox").hide();
	//Load fancybox
	$(".fancybox").fancybox({
  	arrows : false
	});

	//Hide guidelines so they can be shown later using jquery
	$("#guidelinesWrapper").hide();

	//Show tooltip on mouse over icons
	$('[data-toggle="tooltip"]').tooltip();


	//Old file selections are visible, remove when leaving create page
	function removeOldFileSelections(){
		var filenames = document.getElementsByClassName("choose-file");
		for (var i = 0; i < filenames.length; ++i){
			filenames[i].value = "";
		}
	}

	/**
	* Close simpleTextStart window, i.e. the quest text window.
	*/
	document.getElementById("okButton").onclick = function () {
		document.getElementById("simpleTextStart").style.visibility = "hidden";

		if(friendMap.isCollected){
			musicVolumeAndRestart(0.6, true);
			$("#blackBox").delay(750).fadeIn(2250);
			$("#blackHeading").delay(5500).fadeOut(1500);
		}else{
			musicVolumeAndRestart(0.6, false);
			player.inMenu = false; /*Enables player to move again*/
		}
	};

	// Open contribution list.
	document.getElementById("simpleTextButton").onclick = function () {
		document.getElementById("simpleTextStart").style.visibility = "hidden";
		document.getElementById("contributions").style.visibility = "visible";
		listContributions();
	};

	// Go back to simpleTextStart from contribution list
	document.getElementById("contributeBack").onclick = function () {
		document.getElementById("contributions").style.visibility = "hidden";
		document.getElementById("simpleTextStart").style.visibility = "visible";

	};

	// Go back to contributions list from view single contribution
	document.getElementById("viewContributionBack").onclick = function () {
		document.getElementById("viewSingleContribution").style.visibility = "hidden";
		document.getElementById("contributions").style.visibility = "visible";
		//Hide loaded images
		hideAndResetContributionImages();

		//Hide 'no-sound-audioplayer' image
		var noSoundPlayer = document.getElementById("audioplayerNoSound").setAttribute("hidden", true);

		//Remove real audioplayer if its been added to the document
		var element = document.getElementById("audioplayerHasSound");
		if(element !== null){
			element.outerHTML = "";
			delete document.getElementById("audioplayerHasSound");
		}
		$("#infoBox").hide();
	};

	// Go to comment quest contribution
	document.getElementById("commentContribution").onclick = function () {
		document.getElementById("viewSingleContribution").style.visibility = "hidden";
		document.getElementById("createComment").style.visibility = "visible";
		document.getElementById("createCommentArea").focus();
	};

	// Submit written comment
	document.getElementById("submitCommment").onclick = function () {
		// Stay on page, user sees its own comment and chooses to go back.
		// Disabeling textarea & submit button after submitting comment.
		// Forces user to go back after viewing the cubmitted comment.
		document.getElementById("createCommentArea").disabled = true;
		document.getElementById("submitCommment").disabled = true;

		document.getElementById("createCommentArea").value = "";
	};


	// Cancel comment
	document.getElementById("cancelComment").onclick = function () {
		document.getElementById("createComment").style.visibility = "hidden";
		document.getElementById("viewSingleContribution").style.visibility = "visible";

		// Eenable submit button & comment textarea if they have been disabled
		document.getElementById("submitCommment").disabled = false;
		document.getElementById("createCommentArea").disabled = false;

		document.getElementById("createCommentArea").value = "";
	};


	// Show create simple text / contribution
	document.getElementById("contributeCreate").onclick = function () {

		var questID = document.getElementById("questID").innerHTML;
		var questText = questTexts[questID];

		document.getElementById("contributions").style.visibility = "hidden";

		document.getElementById("originalTextOnCreate").value = questText;
		document.getElementById("createContribution").style.visibility = "visible";
		document.getElementById("newTextArea").focus();
	};


	// Go back to contributions list from create simple text
	document.getElementById("cancelCreateText").onclick = function () {
		document.getElementById("createContribution").style.visibility = "hidden";
		document.getElementById("contributions").style.visibility = "visible";
		document.getElementById("newTextArea").value="";
		removeOldFileSelections();
	};

	// Show guidelines
	document.getElementById("guidelines").onclick = function () {
		$("#closeGuidelines").fadeIn(350);
		$("#guidelinesWrapper").fadeIn(400);

	};

	// Submit simple text contribution
	document.getElementById("submitCreateText").onclick = function () {
		document.getElementById("createContribution").style.visibility = "hidden";

		// Database
		//	- add new contribution
		//	- update contributions list before making it visible

		// Check if a file has been choosen
		var filenames = document.getElementsByClassName("choose-file");
		var selectionMade = false;
		for (var i = 0; i < filenames.length; ++i){
			if(filenames[i].value !== ""){
				selectionMade = true;
			}
		}
		// Add contribution. Img also if one has been choosen
		var textByUser = document.getElementById("newTextArea").value;
		document.getElementById("newTextArea").value="";
		var questID = document.getElementById("questID").innerHTML;
		var contrID = SimpleText.database.addContribution(questID, SimpleText.username, textByUser);
		if(selectionMade){
			var imgPath = "assets/web/printScreen02.png"; //OBS HARDCODED FILE PATH
			SimpleText.database.addPicture(questID, contrID, imgPath);
		}

		listContributions();

		document.getElementById("contributions").style.visibility = "visible";

		var infoBox = $("#infoBox").fadeIn(300);
		/*var message =*/ document.getElementById("infoMessage").innerHTML = "Thank you, your contribution has been added!";
		infoBox.delay(3000).fadeOut(500);

		// Remove old file selections
		removeOldFileSelections();
	};


	//Close guidelines
	$("#closeGuidelines").click(function() {
		$("#guidelinesWrapper").fadeOut(300);
		$(this).fadeOut(350);
	});


	/**
	* Utility function to display and hide infoBox - a popup message when
	* the user interacts with buttons "add", "flag" and "like".
	*
	* @param {string} imgClicked
	* @param {string} message
	* @param {boolean} filled
	* @param {string} imgPath
	*/
	function displayInfoBox(imgClicked, message, filled, imgPath){
		var infoBox = $("#infoBox").stop();
		infoBox.hide();
		var messageTag = document.getElementById("infoMessage");
		if(!filled){
			$(imgClicked).attr('src', imgPath);
			messageTag.innerHTML = message;
			infoBox.stop(true).hide().fadeIn(300);
			infoBox.delay(2000).fadeOut(500);
		}else{
			$(imgClicked).attr('src', imgPath);
			messageTag.innerHTML = message;
			infoBox.stop(true).hide().fadeIn(300);
			infoBox.delay(2000).fadeOut(500);
		}
	}


	// Add author as favourite
	var filled = false;
	$("#favouriteAuthor").click(function() {
		if(!filled){
			filled = true;
			var message = "Added as favourite author";
			var path = "assets/web/addFilled.png";
			displayInfoBox(this, message, filled, path);

			var authorName = document.getElementById("singleContributionAuthor").innerHTML;
			SimpleText.database.favouriteAuthor(authorName);

		}else{
			filled = false;
			var message = "Removed author from favourites";
			var path = "assets/web/add.png";
			displayInfoBox(this, message, filled, path);

			var authorName = document.getElementById("singleContributionAuthor").innerHTML;
			SimpleText.database.defavouriteAuthor(authorName);
		}

	});


	// Flag single contribution
	var flagged = false;
	$("#flagSingleContribution").click(function() {
		if(!flagged){
			flagged = true;
			var message = "Marked content as inappropriate";
			var path = "assets/web/flagFilled.png";
			displayInfoBox(this, message, flagged, path);

			var questID = document.getElementById("singleContributionQuestID").innerHTML;
			var contID = document.getElementById("singleContributionContID").innerHTML;
			SimpleText.database.addFlag(questID, contID);

		}else{
			flagged = false;
			var message = "Removed inappropriate marking";
			var path = "assets/web/flag.png";
			displayInfoBox(this, message, flagged, path);

			var questID = document.getElementById("singleContributionQuestID").innerHTML;
			var contID = document.getElementById("singleContributionContID").innerHTML;
			SimpleText.database.removeFlag(questID, contID);
		}

	});


	// Like single contribution
	var likesAuthor = false;
	$("#likeContribution").click(function() {
		if(!likesAuthor){
			likesAuthor = true;
			var message = "You like this contribution";
			var path = "assets/web/likeFilled.png";
			displayInfoBox(this, message, likesAuthor, path);

			var questID = document.getElementById("singleContributionQuestID").innerHTML;
			var contID = document.getElementById("singleContributionContID").innerHTML;
			SimpleText.database.addVote(questID, contID);

		}else{
			likesAuthor = false;
			var message = "Like removed";
			var path = "assets/web/like.png";
			displayInfoBox(this, message, likesAuthor, path);

			var questID = document.getElementById("singleContributionQuestID").innerHTML;
			var contID = document.getElementById("singleContributionContID").innerHTML;
			SimpleText.database.removeVote(questID, contID);
		}

	});


	// Flag that simple text is needed on original quest text
	var stNeeded = false;
	$("#flagButton").click(function() {
		var infoBox = $("#infoBox").stop();
		infoBox.hide();
		var messageTag = document.getElementById("infoMessage");

		if(!stNeeded){
			stNeeded = true;
			$(this).attr('src', "assets/web/flagFilled.png");
			/*messageTag.innerHTML = "Marked text as complex";
			infoBox.stop(true).hide().fadeIn(300);
			infoBox.delay(2000).fadeOut(500);*/
		}else{
			stNeeded = false;
			$(this).attr('src', "assets/web/flag.png");
			/*messageTag.innerHTML = "Removed marking";
			infoBox.stop(true).hide().fadeIn(300);
			infoBox.delay(2000).fadeOut(500);*/
		}

	});



	// Makes cursor into hand when hovering over buttons: add, comment, flag, like
	$('#favouriteAuthor').hover(function() {
        $(this).css('cursor','pointer');
    });

    $('#flagSingleContribution').hover(function() {
        $(this).css('cursor','pointer');
    });

    $('#likeContribution').hover(function() {
        $(this).css('cursor','pointer');
    });

    $('#commentContribution').hover(function() {
        $(this).css('cursor','pointer');
    });

    // Makes cursor into hand when hovering over items in the contributions list
    $('.itemWrapper').hover(function() {
        $(this).css('cursor','pointer');
    });

    // Makes cursor into hand when hovering over guidelines close window image
    $('#closeGuidelines').hover(function() {
        $(this).css('cursor','pointer');
    });

		// Makes cursor into hand when hovering over flag at first quest text window
		$('#flagButton').hover(function() {
				$(this).css('cursor','pointer');
		});

}); // Document has finished loading.



/**
* View a single contribution. Reached by clicking a contribution from the contributions list.
*
* @param {Contribution} contributon
* The contribution to view.
*/
function viewSingleContribution(contribution){
	var questID = document.getElementById("questID").innerHTML;

	document.getElementById("commentAuthorName").innerHTML = contribution.author;
	document.getElementById("singleContributionAuthor").innerHTML = contribution.author;
	document.getElementById("singleContributionQuestID").innerHTML = questID;
	document.getElementById("singleContributionContID").innerHTML = contribution.contID;

	var singCont = document.getElementById("viewSingleContribution");
	singCont.getElementsByTagName("textarea")[0].innerHTML = contribution.text;

	// Load data into viewSingleContribution before showing it.
	loadAudio(questID, contribution.contID);
	loadImages(questID, contribution.contID);

	document.getElementById("contributions").style.visibility = "hidden";
	document.getElementById("viewSingleContribution").style.visibility = "visible";

	// Adjust the submit comment function.
	document.getElementById("commentContribution").onclick = (function(oldFunc){
		return function(){
			oldFunc();
			listComments(questID, contribution.contID);
		};
	})(document.getElementById("commentContribution").onclick);
} // viewSingleContribution



/**
* Check if the contribution has images, load if there are some.
* If there are none, do nothing.
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to add the img.
*/
function loadImages(questID, contID){
	var images = SimpleText.database.fetchPictures(questID, contID);
	//Both fancyBox wrapper and the img tag needs the source to the actual image
	var fancyBoxWrappers = document.getElementsByClassName("fancybox");
	var documentImages = document.getElementsByClassName("user-image");
	for(var i = 0; i < images.length; ++i){
		var imgPath = images[i];
		fancyBoxWrappers[i].removeAttribute("hidden");
		fancyBoxWrappers[i].setAttribute("href", imgPath);
		documentImages[i].setAttribute("src", imgPath);
	}
}

/**
* Hide images that have been made visible when changing single contribution.
* Used when going back from viewing single contribution.
*/
function hideAndResetContributionImages(){
	var fancyBoxWrappers = document.getElementsByClassName("fancybox");
	var documentImages = document.getElementsByClassName("user-image");
	for(var i = 0; i < 3; ++i){
		fancyBoxWrappers[i].setAttribute("hidden", true);
		fancyBoxWrappers[i].setAttribute("href", "");
		documentImages[i].setAttribute("src", "");
	}
}

/**
* Check if there is audio, load placeholder image if there is none.
* Create and insert audioplayer if audio exists.
* Audioplayers are removed when going back to contributions list
*
* @param {string} questID
* The ID of the quest to which the contribution belongs.
*
* @param {string} contID
* The ID of the contribution for which to add the sound file.
*/
function loadAudio(questID, contID){

	var soundArray = SimpleText.database.fetchSound(questID, contID);
	if(soundArray.length < 1){
		document.getElementById("audioplayerNoSound").removeAttribute("hidden");
	}else{
		var soundSrc = soundArray[0];
		var audioContainer = document.getElementsByClassName("bottomAreaWrapper")[0];
		var auidoTag = "<audio controls id=\"audioplayerHasSound\"><source src=" + "\"" + soundSrc + "\" type=\"audio/mpeg\"></audio>";
		audioContainer.insertAdjacentHTML('afterbegin', auidoTag);
	}
}


/**
* Lists all SimpleText contributions for the current quest.
*/
function listContributions(){
	removeAllChildren(document.getElementById("contributionsList"));

	var questID = document.getElementById("questID").innerHTML;
	var contributions = SimpleText.database.fetchContributions(questID);

	// Filter contributions if author is selected.
	if (document.getElementById("sortContributions").value === "author"){
		var FavAuthors = SimpleText.database.fetchFavouriteAuthors(SimpleText.username);
		contributions = contributions.filter(function(elem){
			var author = elem.author;
			if (FavAuthors.indexOf(author) >= 0){
				return true;
			}
			return false;
		});
	}
	// Sort the contributions.
	contributions.sort(contributionsSortFunction());

	// Template for each contribution.
	var template = document.getElementById("contWrapper");
	var currItem;
	for (var i=0; i < contributions.length; ++i){
		currItem = template.cloneNode(true);
		currItem.getElementsByTagName("img")[0].removeAttribute("hidden");

		// Takes the beginning of the comment as excerpt.
		currItem.getElementsByClassName("textExcerpt")[0].innerHTML = (function(){
			var intro;
			var maxLength = 30;
			if (contributions[i].text.length > maxLength){
				var endIdx = contributions[i].text.lastIndexOf(" ", maxLength);
				intro = contributions[i].text.substr(0, endIdx) + " [...]";
			} else {
				intro = contributions[i].text;
			}
			return intro;
		})();

		currItem.getElementsByClassName("numberLikes")[0].innerHTML = contributions[i].votes;
		currItem.getElementsByClassName("authorWrapper")[0].childNodes[1].innerHTML = contributions[i].author;

		// To avoid that all onclick-functionss point to the last contribution reference.
		(function (contribution){
			currItem.onclick = function(){
				viewSingleContribution(contribution);
			};
		})(contributions[i]);

		document.getElementById("contributionsList").appendChild(currItem);
	} // for-loop
} // listContributions

/**
* Checks which sort function that should be used to sort the contributions
* and returns it.
*
* @return {function}
* The sort function to be used for contribution sorting.
*/
function contributionsSortFunction(){
	var sortFunc;
	var sortOn = document.getElementById("sortContributions").value;
	switch (sortOn){
  		case "highest":
			sortFunc = function(rhs, lhs){
				return lhs.votes - rhs.votes;
			};
			break;
  		case "newest":
			sortFunc = function(rhs, lhs){
				return rhs.timestamp - lhs.timestamp;
			};
			break;
  		case "oldest":
			sortFunc = function(rhs, lhs){
				return lhs.timestamp - rhs.timestamp;
			};
			break;
  		case "author":
			sortFunc = function(rhs, lhs){
				return lhs.votes - rhs.votes;
			};
			break;
		default:
			throw "Invalid attribute to sort by.";
	}
	return sortFunc;
}

/**
* Removes all children from the given parent node.
*
* @param {HTMLElement} parent
* The parent to free from children
*/
function removeAllChildren(parent){
	while (parent.hasChildNodes()){
		parent.removeChild(parent.firstChild);
	}
}

/**
* Lists all comments for the contribution of the specified quest.
*
* @param {string} questID
* Id of the quest in question.
*
* @param {string} contID
* Id of the contribution.
*/
function listComments(questID, contID){
	removeAllChildren(document.getElementById("commentsWrapper"));

	var comments = SimpleText.database.fetchComments(questID, contID);

	// Template for each comment.
	var template = document.getElementById("singleCommentTemplate");
	var currItem;
	for (var i=0; i < comments.length; ++i){
		currItem = template.cloneNode(true);

		// Takes the beginning of the comment as excerpt.
		currItem.getElementsByClassName("comment")[0].innerHTML = comments[i].text;
		currItem.getElementsByClassName("commenter")[0].innerHTML = comments[i].author;

		document.getElementById("commentsWrapper").appendChild(currItem);
	} // for-loop

	// Adjust the submit comment function.
	document.getElementById("submitCommment").onclick = (function(oldFunc){
		return function(){
			var text = document.getElementById("createCommentArea").value.trim();
			if (text.length > 0) {
				SimpleText.database.addComment(questID,
											contID,
											SimpleText.username,
											text);
				oldFunc();
				listComments(questID, contID);
			}
		};
	})(document.getElementById("submitCommment").onclick);
} // listComments
