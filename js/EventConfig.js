/**
* @module EventConfig
*/

// Run when the DOM is loaded and ready
$(document).ready(function(){

	//Needed to be able to fade-in/fade-out infoBox when user clicks any icon
	//when viewing a single contribution.
	//If visibility is set with css, jQuery function fadeIn() & fadeOut() can't
	//be used
	$("#infoBox").hide();

	//Load fancybox
	$(".fancybox").fancybox();

	//Hide guidelines so they can be shown later using jquery
	$("#guidelinesWrapper").hide();

	//Show tooltip on mouse over icons
	$('[data-toggle="tooltip"]').tooltip();

	// Close simpleTextStart window
	document.getElementById("okButton").onclick = function () {
		document.getElementById("simpleTextStart").style.visibility = "hidden";
	};

	// Open contribution list
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

	// Go back to simpleTextStart from contribution list
	document.getElementById("viewContributionBack").onclick = function () {
		document.getElementById("viewSingleContribution").style.visibility = "hidden";
		document.getElementById("contributions").style.visibility = "visible";

	};

	// go to comment quest contribution
	document.getElementById("commentContribution").onclick = function () {
		document.getElementById("viewSingleContribution").style.visibility = "hidden";
		document.getElementById("createComment").style.visibility = "visible";
		document.getElementById("createCommentArea").focus();
	};

	// submit written comment
	document.getElementById("submitCommment").onclick = function () {
		//TODO - sort comments and show the user the newely added comment
		//stay on page, user sees its own comment and chooses to go back

		//Disabeling textarea & submit button after submitting comment.
		//Forces user to go back after viewing the cubmitted comment
		document.getElementById("createCommentArea").disabled = true;
		document.getElementById("submitCommment").disabled = true;
	};


	// cancel comment
	document.getElementById("cancelComment").onclick = function () {
		document.getElementById("createComment").style.visibility = "hidden";
		//TODO - must show the right contribution when going back
		document.getElementById("viewSingleContribution").style.visibility = "visible";

		//enable submit button & comment textarea if they have been disabled
		document.getElementById("submitCommment").disabled = false;
		document.getElementById("createCommentArea").disabled = false;
	};


	// Show create simple text / contribution
	document.getElementById("contributeCreate").onclick = function () {
		document.getElementById("contributions").style.visibility = "hidden";
		document.getElementById("createContribution").style.visibility = "visible";
		document.getElementById("newTextArea").focus();
	};


	// Go back to contributions list from create simple text
	document.getElementById("cancelCreateText").onclick = function () {
		document.getElementById("createContribution").style.visibility = "hidden";
		document.getElementById("contributions").style.visibility = "visible";

	};

	// show guidelines
	document.getElementById("guidelines").onclick = function () {
		$("#closeGuidelines").fadeIn(350);
		$("#guidelinesWrapper").fadeIn(400);

	};

	// Submit simple text contribution
	document.getElementById("submitCreateText").onclick = function () {
		document.getElementById("createContribution").style.visibility = "hidden";

		//Database
		//	- add new contribution
		//	- update contributions list before making it visible

		document.getElementById("contributions").style.visibility = "visible";
		var infoBox = $("#infoBox").fadeIn(300);
		var message = document.getElementById("infoMessage").innerHTML = "Thank you, your contribution has been added!";

		infoBox.delay(3000).fadeOut(500);
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

    // Makes cursor into hand when hovering over guidelines close window image
    $('#closeGuidelines').hover(function() {
        $(this).css('cursor','pointer');
    });

		// Makes cursor into hand when hovering over flag at first quest text window
		$('#flagButton').hover(function() {
				$(this).css('cursor','pointer');
		});







});//document has finished loading



/**
* View a single contribution. Reached by clicking a contribution from the contributions list.
*/
function viewSingleContribution(contribution){
	var questID = document.getElementById("questID").innerHTML;

	document.getElementById("singleContributionAuthor").innerHTML = contribution.author;
	document.getElementById("singleContributionQuestID").innerHTML = questID;
	document.getElementById("singleContributionContID").innerHTML = contribution.contID;

	var singCont = document.getElementById("viewSingleContribution");
	singCont.getElementsByTagName("textarea")[0].innerHTML = contribution.text;

	// Load data into viewSingleContribution before showing it.
	document.getElementById("contributions").style.visibility = "hidden";
	document.getElementById("viewSingleContribution").style.visibility = "visible";
}

function listContributions(){
	var questID = document.getElementById("questID").innerHTML;
	var contributions = SimpleText.database.fetchContributions(questID);

	var template = document.getElementById("contWrapper");
	var currItem;
	for (var i=0; i < contributions.length; ++i){
		currItem = template.cloneNode(true);

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
		currItem.getElementsByClassName("authorWrapper")[0].childNodes[1].innerHTML = contributions[i].votes;

		// To avoid that all onclicks point to the last contribution reference.
		(function (contribution){
			currItem.onclick = function(){
				viewSingleContribution(contribution);
			};
		})(contributions[i]);

		document.getElementById("contributionsList").appendChild(currItem);
	} // for-loop
}

