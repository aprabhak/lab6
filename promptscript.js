var SoftwareEngineering = {
	required: 3,
	electiveNum: 2,
	requiredCourses: ["CS307","CS408","CS407"],
	choices: [["CS352", "CS354"]],
	arrRequired: ["CS307","CS352","CS354","CS408","CS407"],
	electives: ["CS348","CS352","CS353","CS354","CS381","CS422","CS426","CS448","CS456","CS473","CS481","CS454"],
};

var Security = {
	required: 3,
	electiveNum: 3,
	choices: [],
	requiredCourses: ["CS354","CS355","CS426"],
	arrRequired: ["CS354","CS355","CS426"],
	electives: ["CS307","CS348","CS352","CS353","CS381","CS408","CS422","CS448","CS454","CS481"],
}; 

var coursesTaking = [];
var tracks = [SoftwareEngineering, Security];

var userInputMajor;
var arrTracks = [];
var core = [];
var SE = false;
var S = false;

function promptMajor() {
    userInputMajor = document.getElementById("userInputMajor").value;
    //userInputTrack = document.getElementById("userInputTrack").value;
    document.getElementById("demo0").innerHTML = "Your Major is "+userInputMajor;
    //document.getElementById("demo2").innerHTML = "Your Track is "+userInputTrack;
    if (userInputMajor === "Computer Science" || userInputMajor === "ComputerScience") {
    	var nTracks = prompt("How many tracks?");
    	for (var i = 0; i < nTracks; i++) {              // loop n times
  			arrTracks.push(prompt('Enter track ' + (i+1))); // push the value into the array
			}
			//alert('Full array: ' + arrTracks.join(', '));
			document.getElementById("demo1").innerHTML ="Your tracks are " +arrTracks.join(', ');
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
function arrayContains(array, element) {
	for(var i = 0; i < array.length; i++) {
    if (array[i] == element) {
        return true;
    	}
	}
}

function howManyChoicesThisSatisfies(element) {
	var num = 0;
	for(var i = 0; i < tracks.length; i++) {
		//Cycle through each required course
		for(var j = 0; j < tracks[i].choices.length; j++) {
			//If a choice is already in the list then this choice is being satisfied
			if(arrayContains(tracks[i].choices[j], element)) {
				num++;
			}
		}
	}
	return num;
}

function howManyElectivesThisSatisfies(element, index) {
	var num = 0;
	for(var i = 0; i < tracks.length; i++) {
		//Classes can't double count for electives also
		if(i != index) {
			//Cycle through each required course
			//If a choice is already in the list then this choice is being satisfied
			if(arrayContains(tracks[i].electives, element)) {
				num++;
			}
		}
		return num;
	}
}

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

function fastestPath() {
	//Process requirements
	for(var i = 0; i < tracks.length; i++) {
		//Cycle through each required course
		for(var j = 0; j < tracks[i].requiredCourses.length; j++) {
			//If the course is already in the list do not add
			if(!arrayContains(coursesTaking, tracks[i].requiredCourses[j]))
				coursesTaking.push(tracks[i].requiredCourses[j]);
		}
	}

	//Process choices
	for(var i = 0; i < tracks.length; i++) {
		//Cycle through each choice
		for(var j = 0; j < tracks[i].choices.length; j++) {
			//Cycle through all of the courses that can be chosen
			var foundCourse = false;
			for(var k = 0; k < tracks[i].choices[j].length; k++) {
				//If a choice is already in the list then this choice is being satisfied
				if(arrayContains(coursesTaking, tracks[i].choices[j][k])) {
					foundCourse = true;
					break;
				}
			}

			//If a course was not found we need to pick which one to take
			var courseRanking = new Array(tracks[i].choices[j].length); //Will store the number of other choices each course can satisfy
			if(!foundCourse) {
				//Cycle through each course again.
				for(var p = 0; p < tracks[i].choices[j].length; p++) {
					//count number of choices it fulfills
					courseRanking[p] = parseInt(howManyChoicesThisSatisfies(tracks[i].choices[j][p]));

					//count number of electives it fills
					courseRanking[p] += parseInt(howManyElectivesThisSatisfies(tracks[i].choices[j][p]), i);
				}
				var bestChoiceIndex = Array.max(courseRanking);
				coursesTaking.push(tracks[i].choices[j][courseRanking.indexOf(bestChoiceIndex)]);
			}
		}
	}

	//Process electives
	for(var i = 0; i < tracks.length; i++) {
		var numElectivesSelected = 0;
		//Cycle until number of electives needed are found
		console.log(tracks[i].electiveNum);
		//Count all possible electives already being taken
		for(var k = 0; k < tracks[i].electives.length; k++) {
			if(arrayContains(coursesTaking, tracks[i].electives[k]) && !arrayContains(tracks[i].arrRequired, tracks[i].electives[k])) {
				numElectivesSelected++;
				console.log(tracks[i].electives[k]);
			}
		}

		if(numElectivesSelected < tracks[i].electiveNum) {
			var courseRanking = new Array(tracks[i].electives.length);
			//Cycle through each course again.
			for(var p = 0; p < tracks[i].electives.length; p++) {
				//count number of other electives it fills
				courseRanking[p] = parseInt(howManyElectivesThisSatisfies(tracks[i].electives[p], i));
			}
			var bestChoiceIndex = Array.max(courseRanking);
			var temp = 0;
			while (numElectivesSelected <= tracks[i].electiveNum) {
				var l = 0;
				while (l < tracks[i].electives.length && numElectivesSelected <= tracks[i].electiveNum ) {
					if((courseRanking[l] == bestChoiceIndex - temp) && !arrayContains(coursesTaking, tracks[i].electives[l])) {
						coursesTaking.push(tracks[i].electives[l]);
						numElectivesSelected++;
					}
					l++;
				}
				temp++;
			}

		}
	}

	console.log(coursesTaking);
	return;
}

function reqCourses() {
	core.push("CS180");
	core.push("CS182");
	core.push("CS240");
	core.push("CS250");
	core.push("CS251");
	core.push("CS252");
	//document.getElementById("demo3").innerHTML ="You must take the courses "+core.join(', ');
}

