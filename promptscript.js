var userInputMajor;
var arrTracks = [];
var core = [];
var SE = false;
var S = false;

var SoftwareEngineering = {
	required: 3,
	elective: 2,
	arrRequired: ["CS307","CS352","CS354","CS408","CS490-SEP"],
	arrElective: ["CS348","CS352","CS353","CS354","CS381","CS422","CS426","CS448","CS456","CS473","CS490-DSO","CS490-ES0"],
}; 

var SystemsProgramming = {
	required: 3,
	elective: 3,
	arrRequired: ["CS352","CS354","CS422"],
	arrElective: ["CS307","CS334","CS353","CS381","CS426","CS448","CS456","CS490-DSO","CS490-ES0"],
};

var Security = {
	required: 3,
	elective: 3,
	arrRequired: ["CS354","CS355","CS426"],
	arrElective: ["CS307","CS348","CS352","CS353","CS381","CS408","CS422","CS448","CS490-ES0","CS490-DSO"],
}; 

function promptMajor() {
    userInputMajor = document.getElementById("userInputMajor").value;
    //userInputTrack = document.getElementById("userInputTrack").value;
    document.getElementById("demo").innerHTML = "Your Major is "+userInputMajor;
    //document.getElementById("demo2").innerHTML = "Your Track is "+userInputTrack;
    if (userInputMajor === "Computer Science" || userInputMajor === "ComputerScience") {
    	var nTracks = prompt("How many tracks?");
    	for (var i = 0; i < nTracks; i++) {              // loop n times
  			arrTracks.push(prompt('Enter track ' + (i+1))); // push the value into the array
			}
			//alert('Full array: ' + arrTracks.join(', '));
			document.getElementById("demo2").innerHTML ="Your tracks are " +arrTracks.join(', ');
			reqCourses();
		for (var i = 0; i < nTracks; i++) {
			if (arrTracks[i] === "Software Engineering") { //Check if track chose contains software engineering.
				//document.getElementById("demo4").innerHTML ="You are required to take "+SoftwareEngineering.required+" courses from " +SoftwareEngineering.arrRequired.join(', ');
				//document.getElementById("demo5").innerHTML ="Your are required to take "+SoftwareEngineering.elective+" courses from " +SoftwareEngineering.arrElective.join(', ');
				SE = true;
			}
			if (arrTracks[i] === "Security") {
				S = true;
			}
		}
			//document.write(Security.arrRequired[0]);
			fastestPath();
    }
}
function fastestPath() {
	//document.write("fuck");
	if (SE === true && S === true) {
		//document.write("fuck");
		
	}
}

function reqCourses() {
	core.push("CS180");
	core.push("CS182");
	core.push("CS240");
	core.push("CS250");
	core.push("CS251");
	core.push("CS252");
	document.getElementById("demo3").innerHTML ="You must take the courses "+core.join(', ');
}

