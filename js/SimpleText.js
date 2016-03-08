//run when the DOM is loaded and ready
document.addEventListener("DOMContentLoaded", function(event) { 
    

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

function test(){
	alert("Hello");
	console.log("hej");
}



});