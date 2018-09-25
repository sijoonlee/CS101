const sets = {
    month : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    week : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};

const events = [ //month 0 means Jan // month 8 means Sep
    {year: 2018, month: 8, day: 5, type: "Intro", comment: null }, //SEP
    {year: 2018, month: 8, day: 6, type: "Variable", comment: null },
    {year: 2018, month: 8, day: 12, type: "IF", comment: null},
    {year: 2018, month: 8, day: 13, type: "For", comment: null },
    {year: 2018, month: 8, day: 19, type: "While", comment: null },
    {year: 2018, month: 8, day: 20, type: "Summary", comment: "Quiz" },
    {year: 2018, month: 8, day: 26, type: "Function", comment: null },
    {year: 2018, month: 8, day: 27, type: "Function", comment: "Assignment 1 Due" },
    {year: 2018, month: 9, day: 3, type: "TEST day", comment: "TEST 1"}, //OCT
    {year: 2018, month: 9, day: 4, type: "Array", comment: null},
    {year: 2018, month: 9, day: 8, type: "No Class", comment: "Thanksgiving Day"},
    {year: 2018, month: 9, day: 10, type: "Array", comment: null },
    {year: 2018, month: 9, day: 11, type: "Pointer", comment:null },
    {year: 2018, month: 9, day: 17, type: "Pointer", comment:null },
    {year: 2018, month: 9, day: 18, type: "Pointer", comment:null },
 /*   {year: 2018, month: 9, day: 22, type: "No Class", comment:"Break week" },
    {year: 2018, month: 9, day: 23, type: "No Class", comment:"Break week" },
    {year: 2018, month: 9, day: 24, type: "No Class", comment: "Break week"},
    {year: 2018, month: 9, day: 25, type: "No Class", comment: "Break week"},
    {year: 2018, month: 9, day: 26, type: "No Class", comment: "Break week" }, */
    {year: 2018, month: 9, day: 31, type: "Function(Advanced)", comment:null },
    {year: 2018, month: 10, day: 1, type: "Function(Advanced)", comment: "Assignment 2 Due" }, //NOV
    {year: 2018, month: 10, day: 7, type: "TEST day", comment: "TEST 2"},
    {year: 2018, month: 10, day: 8, type: "Sorting Algorithm", comment:null },
    {year: 2018, month: 10, day: 14, type: "Bubble Sort", comment:null },
    {year: 2018, month: 10, day: 15, type: "Selection Sort", comment:null },
    {year: 2018, month: 10, day: 21, type: "Inserstion Sort", comment:null },
    {year: 2018, month: 10, day: 22, type: "Merge Sort", comment:null },
    {year: 2018, month: 10, day: 28, type: "Quick Sort", comment:null },
    {year: 2018, month: 10, day: 29, type: "Summary", comment:null },
    {year: 2018, month: 11, day: 5, type: "TEST day", comment: "TEST 3"}, //DEC
    {year: 2018, month: 11, day: 14, type: "No Class", comment: "Assignment 3 Due" },
    {year: 2018, month: 11, day: 17, type: "Semester Ends", comment:null }
];

function calInit(a_year,a_month, calId, eventsListId){
    var today = new Date();        
    var year =  ( a_year != null ? a_year : today.getFullYear());
    var month = ( a_month != null ? a_month : today.getMonth());
    createCal(year, month, calId, eventsListId);
}

function createCal(year, month, calId = "calendar", eventsListId="eventsList"){
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month+1, 0);

    var markup = 
            `<table>
			<tr>
                <th class=\"day-name\">${sets.week[0]}</th>
                <th class=\"day-name\">${sets.week[1]}</th>
                <th class=\"day-name\">${sets.week[2]}</th>
                <th class=\"day-name\">${sets.week[3]}</th>
                <th class=\"day-name\">${sets.week[4]}</th>
                <th class=\"day-name\">${sets.week[5]}</th>
                <th class=\"day-name\">${sets.week[6]}</th>
              </tr>`;

    var date = 1;
    var abort = false;
    for (var i = 0; i < 6 && !abort; i++){ //make rows
        markup = markup + "<tr>";
        for (var j=0; j < 7 && !abort; j++){
            if(i===0 && j < firstDay.getDay()) { // fill the cell with blank before the first day
                markup = markup + `<td class="day blank"></td>`;
            }
            else if ( (date === lastDay.getDate()+1) && j >0){ // fill the cell with blank after the last day
                for (var k = 0; 7-j-k > 0 ;  k++){
                    markup = markup + `<td class="day"><div class="blank"></div></td>`;
                    date++;
                }
                markup = markup + "</tr>";
                abort = true; // break double loop all at once
            }
            else if (date > lastDay.getDate()){
                markup = markup.slice(0,-4); // remove unnecessary <tr>
                abort = true; // break double loop all at once
            }
            else { // fill the cell with number
                markup = markup + `<td class="day number-${date}">${date}</td>`;
                date ++;
            }
        }
    }
	markup = markup + "</table>";
	
	var tbl = document.getElementById(calId);
	tbl.innerHTML = markup;  //put table into HTML
	
	var eventPage = document.getElementById(eventsListId);
    eventPage.innerHTML = ""; // initiation
	markEventsOnCal(year, month, lastDay.getDate(), tbl);
    showEventsList(year,month, lastDay.getDate(), eventPage);
}

function markEventsOnCal(year, month, lastDate, tbl){
	for(var i =1; i<lastDate+1;i++){
		var found = events.find(item => (item.year === year) && (item.month === month) && (item.day === i));
		if (found){
			var numCell = tbl.getElementsByClassName(`number-${i}`)[0];
			var eventElem = document.createElement("div");
			if (found.comment){
				eventElem.classList.add("eventComment");
			} else {
				eventElem.classList.add("event");
			}
			eventElem.innerHTML = "&nbsp;"
			numCell.appendChild(eventElem);
		}
	}
}


function showEventsList(year, month, lastDate, eventPage){
	var markup = `
			<table><tr>
				<th>Day</th><th>Lecture Topic</th><th>Quiz, Test</th>
			</tr>`;
	for(var i =1; i<lastDate+1;i++){
		var found = events.find(item => (item.year === year) && (item.month === month) && (item.day === i));
		if (found){
			if (found.comment){
				markup = markup + `
					<tr><td>${found.day}</td><td>${found.type}</td><td>${found.comment}</td></tr>`;
			} else {
				markup = markup + `
					<tr><td>${found.day}</td><td>${found.type}</td><td></td></tr>`; 
			}
		}
	}
	markup = markup + "</table>";
	eventPage.innerHTML = markup;
}

calInit(2018,8,"calendar-sep","eventsList-sep");
calInit(2018,9,"calendar-oct","eventsList-oct");
calInit(2018,10,"calendar-nov","eventsList-nov");
calInit(2018,11,"calendar-dec","eventsList-dec");

