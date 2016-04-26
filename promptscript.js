var SoftwareEngineering = {
	name: "SoftwareEngineering",
	electiveNum: 2,
	requiredCourses: ["CS307","CS408","CS407"],
	choices: [["CS352", "CS354"]],
	arrRequired: [],
	electives: ["CS348","CS352","CS353","CS354","CS381","CS422","CS426","CS448","CS456","CS473","CS481","CS454"],
};

var Security = {
	name: "Security",
	electiveNum: 3,
	choices: [],
	requiredCourses: ["CS354","CS355","CS426"],
	arrRequired: [],
	electives: ["CS307","CS348","CS352","CS353","CS381","CS408","CS422","CS448","CS454","CS481"],
};

var SystemsProgramming = {
	name: "SystemsProgramming",	
	electiveNum: 3,
	choices: [],
	requiredCourses: ["CS352","CS354","CS422"],
	arrRequired: [],
	electives: ["CS307","CS334","CS353","CS381","CS426","CS448","CS456","CS454","CS481"],
}; 

var ProgrammingLanguage = {
	name: "ProgrammingLanguage",
	electiveNum: 3,
	choices: [],
	requiredCourses: ["CS352","CS354","CS456"],
	arrRequired: [],
	electives: ["CS307","CS353","CS381","CS422", "CS483"],
};

var MachineIntelligence = {
	name: "MachineIntelligence",
	electiveNum: 2,
	choices: [["CS471", "CS473"], ["STAT416", "MA416", "STAT512"]],
	requiredCourses: ["CS390","CS381"],
	arrRequired: ["CS390","CS381"],
	electives: ["CS348","CS352","CS448","CS456", "CS471", "CS473", "CS483"],
};  

var Foundations = {
	name: "Foundations",
	electiveNum: 4,
	choices: [],
	requiredCourses: ["CS352","CS381"],
	arrRequired: [],
	electives: ["CS314", "CS334","CS355","CS448","CS456", "CS471", "CS483"],
};

var Database = {
	name: "Database",
	electiveNum: 0,
	choices: [["CS390-DMO", "CS473"], ["CS352", "CS354"], ["CS355", "CS426"], 
	["CS390-DMO", "CS422", "CS471", "CS473", "CS478", "CS490"]],
	requiredCourses: ["CS348","CS381", "CS448"],
	arrRequired: [],
	electives: [],
};

var ComputerGraphics = {
	name: "ComputerGraphics",
	electiveNum: 4,
	choices: [["CS314", "CS381"]],
	requiredCourses: ["CS334"],
	arrRequired: [],
	electives: ["CS314", "CS352","CS354","CS381","CS422", "CS434", "CS448", "CS471"],
};

var ZComputanionalScienceAndEngineering = {
	name: "ComputerGraphics",
	electiveNum: 5,
	choices: [["MA266", "MA366"]],
	requiredCourses: ["CS314"],
	arrRequired: [],
	electives: [],
	electives1: [["CS307", "CS334"], ["CS352", "CS354", "CS381", "CS434", "CS348", 
	"CS448", "CS471", "CS490"], ["CS381"], ["CS354"], ["CS514", "CS515", "CS497"], ["CS334", "CS352", "CS456", "CS471", "CS483"]],
	electivesList1: ["CS307", "CS334", "CS352", "CS354", "CS381", "CS434", "CS348", 
	"CS448", "CS471", "CS490"],
	electivesList2: ["CS381","CS354","CS514", "CS515", "CS497","CS334", "CS352", "CS456", "CS471", "CS483"],
};


var coursesTaking = []; //Holds the courses which will be taken.
var tracks = []; //Holds the tracks the user wants us to compare.

/*
 * Populates the tracks array with the variable of the tracks according to how the checkboxes are clicked
 * will remove the track if it is already in the array and add it if it is not yet in the array.
 */
function updateTracks(key) {
	switch(key) {
		case "CSE":
			if(arrayContains(tracks, ZComputanionalScienceAndEngineering))
				tracks.splice(tracks.indexOf(ZComputanionalScienceAndEngineering), 1);
			else
				tracks.push(ZComputanionalScienceAndEngineering);
			break;
		case "CGV":
			if(arrayContains(tracks, ComputerGraphics))
				tracks.splice(tracks.indexOf(ComputerGraphics), 1);
			else
				tracks.push(ComputerGraphics);
			break;
		case "DBIS":
			if(arrayContains(tracks, Database))
				tracks.splice(tracks.indexOf(Database), 1);
			else
				tracks.push(Database);
			break;
		case "FCS":
			if(arrayContains(tracks, Foundations))
				tracks.splice(tracks.indexOf(Foundations), 1);
			else
				tracks.push(Foundations);
			break;
		case "MI":
			if(arrayContains(tracks, MachineIntelligence))
				tracks.splice(tracks.indexOf(MachineIntelligence), 1);
			else
				tracks.push(MachineIntelligence);
			break;	
		case "PL":
			if(arrayContains(tracks, ProgrammingLanguage))
				tracks.splice(tracks.indexOf(ProgrammingLanguage), 1);
			else
				tracks.push(ProgrammingLanguage);
			break;	
		case "SEC":
			if(arrayContains(tracks, Security))
				tracks.splice(tracks.indexOf(Security), 1);
			else
				tracks.push(Security);
			break;	
		case "SE":
			if(arrayContains(tracks, SoftwareEngineering))
				tracks.splice(tracks.indexOf(SoftwareEngineering), 1);
			else
				tracks.push(SoftwareEngineering);
			break;	
		case "SYS":
			if(arrayContains(tracks, SystemsProgramming))
				tracks.splice(tracks.indexOf(SystemsProgramming), 1);
			else
				tracks.push(SystemsProgramming);
			break;																		
		defualt:
			break;
	}
}

/*
 * Simple funciton which takes in an array and a possible element in that array and returns whether or not
 * that element is in the array already.
 */
function arrayContains(array, element) {
	for(var i = 0; i < array.length; i++) {
    	if (array[i] == element)
        	return true;
	}
}

/*
 * Function which takes the name of course and runs through all of the tracks counting the number of choices
 * in total from all the tracks in the array that the course will satisfy.
 */
function howManyChoicesThisSatisfies(element) {
	var num = 0; //Current number of choices being satisified.
	//Cycle through each track in array.
	for(var i = 0; i < tracks.length; i++) {
		//Cycle through each choice in the track.
		for(var j = 0; j < tracks[i].choices.length; j++) {
			//If course is in array that it can satisfy the choice and we need to increment counter.
			if(arrayContains(tracks[i].choices[j], element))
				num++;
		}
	}
	return num;
}

/*
 * Function which takes the name of course and runs through all of the tracks counting the number of electives
 * in total from all the tracks in the array that the course will satisfy. However this function also needs the
 * index of the track for the course being tested because courses cannot double count for requirements and electives.
 */
function howManyElectivesThisSatisfies(element, index) {
	var num = 0;//Current number of electives being satisified.
	for(var i = 0; i < tracks.length; i++) {
		//Classes can't double count for electives also.
		if(i != index) {
			//If course is in array that it can satisfy the elective and we need to increment counter.
			if(arrayContains(tracks[i].electives, element))
				num++;
		}
		return num;
	}
}

// Quick function which just returns the maximum value in an array.
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

/*
 * Function which finds the lowest number of courses necessary to satisfy the tracks in the 'tracks' array.
 */
function fastestPath() {
	tracks = tracks.sort(); // Alphabetize tracks.
	coursesTaking = []; // Courses which will be taken.

	// Process requirements: every required course for every track is added to the list. 
	// Cycle through each track.
	for(var i = 0; i < tracks.length; i++) {
		// Cycle through each required course.
		for(var j = 0; j < tracks[i].requiredCourses.length; j++) {
			// If the course is already in the list do not add again.
			if(!arrayContains(coursesTaking, tracks[i].requiredCourses[j]))
				coursesTaking.push(tracks[i].requiredCourses[j]);
		}
	}

	// Process choices
	// Cycle through each track.
	for(var i = 0; i < tracks.length; i++) {
		// Cycle through each choice that needs to be made if one of the courses for this choice is already
		// being taken then we can skip past this choice, but if none of the courses are already being taken
		// we need to make a decision and choose the best course to take in this situation.
		for(var j = 0; j < tracks[i].choices.length; j++) {
			var foundACourse = false; // Whether or not this course is already being taken.
			// Cycle through all of the courses that can be chosen.
			for(var k = 0; k < tracks[i].choices[j].length; k++) {
				// Check to see if this course is already being taken.
				if(arrayContains(coursesTaking, tracks[i].choices[j][k])) {
					foundACourse = true; //Set flag.
					break; // If at least one of these courses if being taken then the rest do not matter.
				}
			}

			//If a course was not found we need to pick which one to take.
			if(!foundACourse) {
				var courseRanking = new Array(tracks[i].choices[j].length); // Will store the number of other choices each course can satisfy.
				// Cycle through each course again.
				for(var p = 0; p < tracks[i].choices[j].length; p++) {
					// Count number of choices it fulfills.
					courseRanking[p] = parseInt(howManyChoicesThisSatisfies(tracks[i].choices[j][p]));

					// Count number of electives it fills.
					courseRanking[p] += parseInt(howManyElectivesThisSatisfies(tracks[i].choices[j][p]), i);
				}
				var bestChoiceIndex = Array.max(courseRanking); // The most satisfactions by a course.
				if(bestChoiceIndex) {
					coursesTaking.push(tracks[i].choices[j][courseRanking.indexOf(bestChoiceIndex)]); // Add the best course.
					tracks[i].arrRequired.push(tracks[i].choices[j][courseRanking.indexOf(bestChoiceIndex)]);
				}
				else {
					coursesTaking.push(tracks[i].choices[j][0]);
					tracks[i].arrRequired.push(tracks[i].choices[j][0]);
				}
			}
		}
	}

	// Process electives
	// Cycle through each track.
	for(var i = 0; i < tracks.length; i++) {
		if(tracks[i]  == ZComputanionalScienceAndEngineering) {
			var listCount = new Array(6);
			var countEleList1 = 0;
			var countEleList2 = 0;
			for(var m = 0; m < tracks[i].electives1.length; m++) {
				for(var n = 0; n < tracks[i].electives1[m].length; n++) {
					if(arrayContains(coursesTaking, tracks[i].electives1[m][n])) {
						listCount[m]++;
						if(m <= 2)
							countEleList1++;
						else
							countEleList2++;
					}
				}
			}
			console.log(countEleList1);
			console.log(countEleList2);
			if(countEleList1 < 5 && countEleList2 < 5) {
				console.log("here");
				if(countEleList1 >= countEleList2) {
					console.log("he222re");
					for(var b = 0; b < 2; b++) {
						if(listCount[b] == 0 && countEleList1 < 5) {
							console.log("he777re");
							for(var t = 0; t < ZComputanionalScienceAndEngineering.electives1[b].length; t++) {
								if(!arrayContains(coursesTaking, ZComputanionalScienceAndEngineering.electives1[b][t])) {
									coursesTaking.push(ZComputanionalScienceAndEngineering.electives1[b][t]);
									countEleList1++;
									break;
								}
							}
						}
					}
					console.log(coursesTaking);
					var t = 0;
					while(countEleList1 < 5 && t < ZComputanionalScienceAndEngineering.electivesList1.length) {
						console.log("back here");
						if(!arrayContains(coursesTaking, ZComputanionalScienceAndEngineering.electivesList1[t])) {
							coursesTaking.push(ZComputanionalScienceAndEngineering.electivesList1[t]);
							countEleList1++;
						}
						t++;						
					}
					console.log(coursesTaking);
				}
				else {
					for(var b = 2; b < ZComputanionalScienceAndEngineering.electives1.length; b++) {
						if(listCount[b] == 0 && countEleList2 < 5) {
							for(var t = 0; t < ZComputanionalScienceAndEngineering.electives1[b].length; t++) {
								if(!arrayContains(coursesTaking, ZComputanionalScienceAndEngineering.electives1[b][t])) {
									coursesTaking.push(ZComputanionalScienceAndEngineering.electives1[b][t]);
									countEleList2++;
									break;
								}
							}
						}
					}
					var t = 0;
					while(countEleList2 < 5 && t < ZComputanionalScienceAndEngineering.electivesList2.length) {
						if(!arrayContains(coursesTaking, ZComputanionalScienceAndEngineering.electivesList2[t])) {
							coursesTaking.push(ZComputanionalScienceAndEngineering.electivesList2[t]);
							countEleList2++;
						}
						t++;						
					}
				}
			}
		}
		else {
			var numElectivesSelected = 0; // Number of electives found.
			// Cycle through list of possible electives.
			for(var k = 0; k < tracks[i].electives.length; k++) {
				// Count all possible electives already being taken
				if(arrayContains(coursesTaking, tracks[i].electives[k]) && !arrayContains(tracks[i].arrRequired, tracks[i].electives[k]))
					numElectivesSelected++;
			}
			// Check to see if at least the number of electives needed are already being taken. If not enough possible
			// electives are already being taken then we need to make a selection.
			if(numElectivesSelected < tracks[i].electiveNum) {
				var courseRanking = new Array(tracks[i].electives.length); // Will store the number of other electives each course can satisfy.
				// Cycle through each course again.
				for(var p = 0; p < tracks[i].electives.length; p++) {
					// Count number of other electives it fills
					courseRanking[p] = parseInt(howManyElectivesThisSatisfies(tracks[i].electives[p], i));
				}
				var bestChoiceIndex = Array.max(courseRanking); // The most satisfactions by a course.
				var numberTimesRemoved = 0; // The number of places past the most satisfactions which we will chose.
				// Cycle and choce electives until the right number has been chosen. 
				while (numElectivesSelected < tracks[i].electiveNum) {
					var l = 0; // Temp.
					// Cycle until we have gone all the way through the list or until we have enough electives.
					while (l < tracks[i].electives.length && numElectivesSelected < tracks[i].electiveNum ) {
						// Check to see if this elective is not already in the list and if it is the current best choice. 
						// If so add the elective and icrement counter.
						if((courseRanking[l] == bestChoiceIndex - numberTimesRemoved) && !arrayContains(coursesTaking, tracks[i].electives[l])) {
							coursesTaking.push(tracks[i].electives[l]);
							console.log(tracks[i].electives[l]);
							numElectivesSelected++;
						}
						l++;
					}
					numberTimesRemoved++;
				}

			}
		}
	}
	displayCourses(); // Call to have courses displayed.
	return;
}

/*
 * Runs through the complete array of courses chosen and adds them as a paragraph on screen. This will need 
 * to be rewritten after we decide how we are actually showing the courses. 
 */
function displayCourses() {
	var courseList = document.getElementById('courses');
	courseList.innerHTML = "<h2>Courses To Take:</h2>"
	console.log(coursesTaking);
	coursesTaking = coursesTaking.sort();
	for(var i = 0; i < coursesTaking.length; i++) {
		var label = document.createElement("Paragraph");
		if(i < coursesTaking.length - 1)
			label.innerHTML = coursesTaking[i] + ", ";
		else
			label.innerHTML = coursesTaking[i];
		courseList.appendChild(label);
	}
}

