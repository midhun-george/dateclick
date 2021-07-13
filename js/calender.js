//test to commit
function calendar(date) {
	
	if(date == null){
		date = new Date();
	}
	else{
		date = new Date(date);
	}
	day = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	console.log(day);
	console.log("Month= " +month);
	console.log(year);	 
	months=["January","February","March","April","May","June","July","August","September","October","November", "December"]
	var first=new Date(year, month, 1);
	console.log("First= "+first);
	firstDay = first.getDay();
    console.log("firstDay "+firstDay);
	
	var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
	var daysInMonthLeapYr=[31,29,31,30,31,30,31,31,30,31,30,31];
	var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	
	if((year%4==0)&&(year%100!=0)){
		numberOfDays=daysInMonthLeapYr[month];
		console.log("Number Of Days= "+numberOfDays);
	}
	else{
		numberOfDays=daysInMonth[month];
		console.log("Number Of Days(Not LeapYear)= "+numberOfDays);
	}
	
	//Display Calender In Table
	
	calenderInTab = '<table>';
	calenderInTab += '<tr><td colspan="7">' +months[month] + ' ' + year + '</td></tr>';
	calenderInTab += '<tr>';

	for(var dayIndex = 0; dayIndex < days.length; dayIndex++) {
		calenderInTab += '<th>'+days[dayIndex]+'</th>';
	}
	calenderInTab += '</tr>';
	calenderInTab += '<tr>';
  // Fill the first week of the month with the appropriate number of blanks.
	for(week_day = 0; week_day < firstDay; week_day++) {
		calenderInTab += '<td class="empty"> </td>';
	}

	week_day = firstDay;
	for(day_counter = 1; day_counter <= numberOfDays; day_counter++) {
		week_day %= 7;
		if(week_day == 0)
			calenderInTab += '</tr><tr>';

    // Check And Highlight Current Date.
		if(day == day_counter)
			calenderInTab += '<td class="current" onclick="displayDate(this,months[month],year)">' + day_counter + '</td>';
		else
			calenderInTab += '<td onclick="displayDate(this,months[month],year)">' + day_counter + ' </td>';
		week_day++;
	}
	
	
	calenderInTab += '</tr>';  
	calenderInTab += '<tr>'; 
	
	calenderInTab += '<td><input type="submit" value="Next" onclick="next()"></td>';   
	calenderInTab += '<td><input type="submit" value="Prev" onclick="prev()"></td>';
	calenderInTab += '</table>';
	//newdocument.write(calenderInTab);
	document.getElementById("calDiv").innerHTML=calenderInTab;
}
calendar();

function next(){
	document.getElementById("calDiv").innerHTML="";
	var nextMonth=new Date(year,month+1, 1);
	console.log(nextMonth);
	calendar(nextMonth);
}
function prev(){
	document.getElementById("calDiv").innerHTML="";
	var prevMonth=new Date(year,month-1, 1);
	console.log(prevMonth);
	calendar(prevMonth);
}

