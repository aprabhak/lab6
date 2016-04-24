var userInputMajor;
var arrTracks = [];
var core = [];
var SE = false;
var S = false;
var SP = false;

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
			if (arrTracks[i] === "Systems Programming") {
				SP = true;
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
		for (var i = 0; i < finalSRequired.length; i++) {    //This is a bad approach. Use approach from line 142 onwards.
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

		/*for (var i = 0; i < finalSelective.length; i++) { //There is something wrong with this one.
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
		} */
				for (var i = 0; i < finalSelective.length; i++) {   //this is a much nicer way.
  					var indexInB = finalSEelective.indexOf(finalSelective[i]);
 					 if (indexInB > -1){
    						SEelecSelec.push(finalSelective[i]);
    						//SEelecnum++;
    						//Selecnum++;
    						finalSelective.splice(i, 1);
    						finalSEelective.splice(indexInB, 1);
    						i--;
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
		var finalSEnum2 = SoftwareEngineering.elective-SEelecnum;
		var finalSnum2 = Security.elective-Selecnum;
		document.getElementById("demo2").innerHTML = "You must take 4 required courses for Software Engineering from "+SoftwareEngineering.arrRequired.join(', ');
		document.getElementById("demo3").innerHTML = "You must take 3 elective courses for Software Engineering from "+SoftwareEngineering.arrElective.join(', ');
		document.getElementById("demo4").innerHTML = "You must take 3 required courses for Security from "+Security.arrRequired.join(', ');
		document.getElementById("demo5").innerHTML = "You must take 3 elective courses for Security from "+Security.arrElective.join(', ');
		document.getElementById("demo6").innerHTML = "You should take the common required courses "+finalComRequired.join(', ');
		document.getElementById("demo9").innerHTML = "You should take the common courses for Security requirements and Software Engineering electives "+SreqSEelec.join(', ');
		document.getElementById("demo10").innerHTML = "You should take the common courses for Software Engineering requirements and Security electives "+SEreqSelec.join(', ');
		document.getElementById("demo11").innerHTML = "You should take "+(finalSEnum2-1)+" Security electives and "+finalSEnum2+" Software Engineering electives from common electives "+SEelecSelec.join(', ');
		//document.getElementById("demo10").innerHTML = "You should take "+Selecnum+" courses from the Sec elec "+finalSelective.join(', ');
		//document.getElementById("demo11").innerHTML = "You should take "+SEelecnum+" courses from Software elec "+finalSEelective.join(', ');
		//document.getElementById("demo7").innerHTML ="You are required to take "+finalSEnum+" Software Engineering core courses from " +finalSERequired.join(', ');
		document.getElementById("demo8").innerHTML ="You should take "+finalSnum+" Security required courses from " +finalSRequired.join(', ');
	}
	if (SE == true && SP == true) {
		var SErq = SoftwareEngineering.arrRequired.slice();
		var SEel = SoftwareEngineering.arrElective.slice();
		var SPrq = SystemsProgramming.arrRequired.slice();
		var SPel = SystemsProgramming.arrElective.slice();
		var SErqSPrq = []; //fulfills required core for SE and SP
		var SErqSPel = []; //fulfulls SE required and SP elective
		var SPrqSEel = []; //fulfills SP required and SE elective
		var SEelSPel = []; //fulfills SE elective and SP elective

	for (var i = 0; i < SErq.length; i++) {   //Gets common core courses.
  		var indexInB = SPrq.indexOf(SErq[i]);
 		if (indexInB > -1){
    		SErqSPrq.push(SErq[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		SErq.splice(i, 1);
    		SPrq.splice(indexInB, 1);
    		i--;
  			}
		}


	for (var i = 0; i < SErq.length; i++) {   //Gets common courses for SE required and SP electives.
  		var indexInB = SPel.indexOf(SErq[i]);
 		if (indexInB > -1){
    		SErqSPel.push(SErq[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		SErq.splice(i, 1);
    		SPel.splice(indexInB, 1);
    		i--;
  			}
		}
	for (var i = 0; i < SEel.length; i++) {   //Gets common courses for SP required and SE electives.
  		var indexInB = SPrq.indexOf(SEel[i]); //The first for loop must contain array with longer length.
 		if (indexInB > -1){
    		SPrqSEel.push(SEel[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		SEel.splice(i, 1);
    		SPrq.splice(indexInB, 1);
    		i--;
  			}
		}
	/*for (var i = 0; i < SEel.length; i++) {   //Gets common courses for SP required and SE electives.
  		var indexInB = SPrq.indexOf(SEel[i]); //The first for loop must contain array with longer length.
 		if (indexInB > -1){
    		SPrqSEel.push(SEel[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		SEel.splice(i, 1);
    		SPrq.splice(indexInB, 1);
    		i--;
  			}
		} */
	for (var i = 0; i < SEel.length; i++) {   //Gets common courses for SP electives and SE electives.
  		var indexInB = SPel.indexOf(SEel[i]); //The first for loop must contain array with longer length.
 		if (indexInB > -1){
    		SEelSPel.push(SEel[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		SEel.splice(i, 1);
    		SPel.splice(indexInB, 1);
    		i--;
  			}
		}
		document.getElementById("demo2").innerHTML = "You must take 4 required courses for Software Engineering "+SoftwareEngineering.arrRequired.join(', ');
		document.getElementById("demo3").innerHTML = "You must take 3 elective courses for Software Engineering "+SoftwareEngineering.arrElective.join(', ');
		document.getElementById("demo4").innerHTML = "You must take 3 required courses for Systems Programming "+SystemsProgramming.arrRequired.join(', ');
		document.getElementById("demo5").innerHTML = "You must take 3 elective courses for Systems Programming "+SystemsProgramming.arrElective.join(', ');
		document.getElementById("demo6").innerHTML = "You should take the common required courses "+SErqSPrq.join(', ');
		document.getElementById("demo7").innerHTML = "You should take the common courses for Software Engineering requirements and Systems Programming electives "+SErqSPel.join(', ');
		document.getElementById("demo8").innerHTML = "You should take the common courses for Systems Programming requirements and Software Engineering electives "+SPrqSEel.join(', ');
		document.getElementById("demo9").innerHTML = "You should take 2 common courses for Systems Programming electives and Software Engineering electives from "+SEelSPel.join(', ');
		document.getElementById("demo10").innerHTML = "You should take the required course CS408 for Software Engineering";
	}
	if (S == true && SP == true) {
		var Srq = Security.arrRequired.slice();
		var Sel = Security.arrElective.slice();
		var SPrq = SystemsProgramming.arrRequired.slice();
		var SPel = SystemsProgramming.arrElective.slice();
		var SrqSPrq = []; //fulfills required core for S and SP
		var SrqSPel = []; //fulfulls S required and SP elective
		var SPrqSel = []; //fulfills SP required and S elective
		var SelSPel = []; //fulfills SE elective and SP elective

	for (var i = 0; i < Srq.length; i++) {   //Gets common core courses.
  		var indexInB = SPrq.indexOf(Srq[i]);
 		if (indexInB > -1){
    		SrqSPrq.push(Srq[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		Srq.splice(i, 1);
    		SPrq.splice(indexInB, 1);
    		i--;
  			}
		}


	for (var i = 0; i < Srq.length; i++) {   //Gets common courses for S required and SP electives.
  		var indexInB = SPel.indexOf(Srq[i]);
 		if (indexInB > -1){
    		SrqSPel.push(Srq[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		Srq.splice(i, 1);
    		SPel.splice(indexInB, 1);
    		i--;
  			}
		}
	for (var i = 0; i < Sel.length; i++) {   //Gets common courses for SP required and S electives.
  		var indexInB = SPrq.indexOf(Sel[i]); //The first for loop must contain array with longer length.
 		if (indexInB > -1){
    		SPrqSel.push(Sel[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		Sel.splice(i, 1);
    		SPrq.splice(indexInB, 1);
    		i--;
  			}
		}
	for (var i = 0; i < Sel.length; i++) {   //Gets common courses for SP electives and S electives.
  		var indexInB = SPel.indexOf(Sel[i]); //The first for loop must contain array with longer length.
 		if (indexInB > -1){
    		SelSPel.push(Sel[i]);
    		//SEelecnum++;
    		//Selecnum++;
    		Sel.splice(i, 1);
    		SPel.splice(indexInB, 1);
    		i--;
  			}
		}   //*/ 
		document.getElementById("demo2").innerHTML = "You must take 3 required courses for Security "+Security.arrRequired.join(', ');
		document.getElementById("demo3").innerHTML = "You must take 3 elective courses for Security "+Security.arrElective.join(', ');
		document.getElementById("demo4").innerHTML = "You must take 3 required courses for Systems Programming "+SystemsProgramming.arrRequired.join(', ');
		document.getElementById("demo5").innerHTML = "You must take 3 elective courses for Systems Programming "+SystemsProgramming.arrElective.join(', ');
		document.getElementById("demo6").innerHTML = "You should take the common required courses "+SrqSPrq.join(', ');
		document.getElementById("demo7").innerHTML = "You should take the common courses for Security requirements and Systems Programming electives "+SrqSPel.join(', ');
		document.getElementById("demo8").innerHTML = "You should take the common courses for Systems Programming requirements and Security electives "+SPrqSel.join(', ');
		document.getElementById("demo9").innerHTML = "You should take 2 common courses for Systems Programming electives and Security electives from "+SelSPel.join(', ');
		document.getElementById("demo10").innerHTML = "You should take the required course CS355 for Security";
	}
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

