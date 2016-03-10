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

	//Change the default name on file upload
	$('#choose-file').inputFileText({ 
		text: 'Select File' 
	});

	// Close simpleTextStart window
	document.getElementById("okButton").onclick = function () { 
		document.getElementById("simpleTextStart").style.visibility = "hidden";
	};

	// Open contribution list
	document.getElementById("simpleTextButton").onclick = function () { 
		document.getElementById("simpleTextStart").style.visibility = "hidden";
		document.getElementById("contributions").style.visibility = "visible";
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


	// comment quest contribution
	document.getElementById("commentContribution").onclick = function () { 
		//document.getElementById("viewSingleContribution").style.visibility = "hidden";
		// show comments on contribution

	};

	// Show create simple text / contribution
	document.getElementById("contributeCreate").onclick = function () { 
		document.getElementById("contributions").style.visibility = "hidden";
		document.getElementById("createContribution").style.visibility = "visible";

	};


	createContribution


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
			var message = "Added as favourite author.";
			var path = "assets/web/addFilled.png";
			displayInfoBox(this, message, filled, path);

			var authorName = document.getElementById("singleContributionAuthor").innerHTML;
			SimpleText.database.favouriteAuthor(authorName);

		}else{
			filled = false;
			var message = "Removed author from favourites.";
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
			var message = "Marked content as inappropriate.";
			var path = "assets/web/flagFilled.png";
			displayInfoBox(this, message, flagged, path);

			var questID = document.getElementById("singleContributionQuestID").innerHTML;
			var contID = document.getElementById("singleContributionContID").innerHTML;
			SimpleText.database.addFlag(questID, contID);

		}else{
			flagged = false;
			var message = "Removed inappropriate marking.";
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
			var message = "You like this contribution.";
			var path = "assets/web/likeFilled.png";
			displayInfoBox(this, message, likesAuthor, path);

			var questID = document.getElementById("singleContributionQuestID").innerHTML;
			var contID = document.getElementById("singleContributionContID").innerHTML;
			SimpleText.database.addVote(questID, contID);

		}else{
			likesAuthor = false;
			var message = "Like removed.";
			var path = "assets/web/like.png";
			displayInfoBox(this, message, likesAuthor, path);

			var questID = document.getElementById("singleContributionQuestID").innerHTML;
			var contID = document.getElementById("singleContributionContID").innerHTML;
			SimpleText.database.removeVote(questID, contID);
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



});//document has finished loading



/**
* View a single contribution. Reached by clicking a contribution from the contributions list.
*/
function viewSingleContribution(){
	var author = document.getElementById("author");

	// var questID = TODO Get quest ID
	// var contID = TODO Get cont ID

	//database stuff...
	//load data into viewSingleContribution before showing it

	/*
	document.getElementById("singleContributionAuthor").innerHTML = ;
	document.getElementById("singleContributionQuestID").innerHTML = ;
	document.getElementById("singleContributionContID").innerHTML = ;
	*/
	
	//just for now
	document.getElementById("contributions").style.visibility = "hidden";
	document.getElementById("viewSingleContribution").style.visibility = "visible";

}

function listContributions(){
	var questID = ;
	var contributions = SimpleText.database.fetchContributions(questID);
	for (var i=0; i < contributions.length; ++i){
		contributions[i].




	}
}



