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
	if (SE === true && S === true) {
		var same = false;
		var finalSERequired = SoftwareEngineering.arrRequired.slice();
		var finalSRequired = Security.arrRequired.slice();
		var finalComRequired = []; //fulfills required core for both SE and S
		var commonNum = 0;
		var finalSEelective = SoftwareEngineering.arrElective.slice();
		var SreqSEelec = []; //fulfills S required and SE elective.
		var Sreqnum = 0;
		var SEelecnum = 0;
		var finalSelective = Security.arrElective.slice();
		var SEreqSelec = [] //fulfills SE required and S elective.
		var SEreqnum = 0;
		var Selecnum = 0;
		var SEelecSelec = [] //fulfills SE elective and S elective.
		for (var i = 0; i < finalSRequired.length; i++) {
			//same = false;
			for (var j = 0; j < finalSERequired.length; j++) {
				if (finalSERequired[j] === finalSRequired[i]) {
					//same = true;
					finalComRequired.push(finalSERequired[j]);
					commonNum = commonNum + 1;
					var x = finalSERequired.indexOf(finalSERequired[j]);
					if (x != -1) {
						finalSERequired.splice(x,1);
					}
					x = finalSRequired.indexOf(finalSRequired[i]);
					if (x != -1) {
						finalSRequired.splice(x,1);
					}
				}
			}
			for (var j = 0; j < finalSEelective.length; j++) {
				if (finalSEelective[j] === finalSRequired[i]) {
					//same = true;
					SreqSEelec.push(finalSEelective[j]);
					Sreqnum = Sreqnum + 1;
					SEelecnum = SEelecnum + 1;
					var x = finalSEelective.indexOf(finalSEelective[j]);
					if (x != -1) {
						finalSEelective.splice(x,1);
					}
					x = finalSRequired.indexOf(finalSRequired[i]);
					if (x != -1) {
						finalSRequired.splice(x,1);
					}
				}
			}
		}
		for (var i = 0; i < finalSERequired.length; i++) {
			for (var j = 0; j < finalSelective.length; j++) {
				if (finalSelective[j] == finalSERequired[i]) {
					SEreqSelec.push(finalSelective[j]);
					SEreqnum = SEreqnum + 1;
					Selecnum = Selecnum + 1;
					var x = finalSelective.indexOf(finalSelective[j]);
					if (x != -1) {
						finalSelective.splice(x,1);
					}
					x = finalSERequired.indexOf(finalSERequired[i]);
					if (x != -1) {
						finalSERequired.splice(x,1);
					}
				}
			}
		}

		for (var i = 0; i < finalSelective.length; i++) { //There is something wrong with this one.
			for (var j = 0; j < finalSEelective.length;j++){ //It does not show the correct repeats.
				if (finalSelective[i] == finalSEelective[j]) {
					SEelecSelec.push(finalSEelective[j]);
					var x = finalSelective.indexOf(finalSelective[i]);
					if (x != -1) {
						finalSelective.splice(x,1);
					}
					x = finalSEelective.indexOf(finalSEelective[j]);
					if (x != -1) {
						finalSEelective.splice(x,1);
					}
				}
			}
		}
		var finalSEnum = SoftwareEngineering.required-commonNum-SEreqnum;
		if (finalSEnum < 0) {
			finalSEnum = 0;
		}
		var finalSnum = Security.required-commonNum-Sreqnum;
		if (finalSnum < 0) {
			finalSnum = 0;
		}
		document.getElementById("demo6").innerHTML = "You should take the common core courses "+finalComRequired.join(', ');
		document.getElementById("demo7").innerHTML = "You should take the common course for S req and SE elec "+SreqSEelec.join(', ');
		document.getElementById("demo8").innerHTML = "You should take the common courses for SE req and S elec "+SEreqSelec.join(', ');
		document.getElementById("demo9").innerHTML = "You should take the common courses for SE elec and S elec "+SEelecSelec.join(', ');
		document.getElementById("demo10").innerHTML = "You should take the Security elec "+finalSelective.join(', ');
		document.getElementById("demo11").innerHTML = "You should take the Software elec "+finalSEelective.join(', ');
		document.getElementById("demo4").innerHTML ="You are required to take "+finalSEnum+" Software Engineering core courses from " +finalSERequired.join(', ');
		document.getElementById("demo5").innerHTML ="You are required to take "+finalSnum+" Security core courses from " +finalSRequired.join(', ');
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

