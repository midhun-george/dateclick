
var doneDays ={};
var doneText ={};
function calendar(date,clicked) {
	doneDays={
		doneDays7_2021:[10,11],
		doneDays8_2021:[20,12],
		doneDays1_2022:[5,8]
	}
	doneText = {
		doneText7:[{date:7,text:"dsfffff"},{date:23,text:"fggggdsfffffdds"}]
	}
	var b = localStorage.getItem("doneDays");
	if(b)
		doneDays = JSON.parse(b);
	else{
		doneDays = doneDays;
	}
	
	var c= localStorage.getItem("doneText");
	debugger;
	if(c)
		doneText = JSON.parse(c);
	else{
		doneText = doneText;
	}

	if(date == null){
		date = new Date();
	}
	else{
		date = new Date(date);
	}
	getData(date);
	function getData(date){
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		console.log(day);
		console.log("Month= " +month);
		console.log(year);	 
		 months=["January","February","March","April","May","June","July","August","September","October","November"	,"December"];
		 first=new Date(year, month, 1);
		console.log("First= "+first);
		firstDay = first.getDay();
		console.log("firstDay "+firstDay);
		var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
		//var daysInMonthLeapYr=[31,29,31,30,31,30,31,31,30,31,30,31];
		days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		var number_Days=checkLeapYear(month,year,daysInMonth);
		var calender=createCalender(month,year,day,number_Days);
		displayCalender(calender);
	}
	function checkLeapYear(month,year,daysInMonth){
		if((year%4)!=0&&month!=1){
			numberOfDays=daysInMonth[month];
			console.log(numberOfDays);
			return numberOfDays;
		}
		else if((year%4)!=0&&month==1){
			return 28;
		}
		else if((year%4)==0&&month==1){
			return 29
		}
		else{
			numberOfDays=daysInMonth[month];
			console.log(numberOfDays);
			return numberOfDays;
		}
		
	}	
	function createCalender(month,year,day,numberOfDays){
		
		calenderInTab = '<table>';
		calenderInTab += '<tr><td colspan="7" id="header">' +'Calendar'+' '+ year +'</td></tr>';
		calenderInTab += '<tr><td colspan="7" class="monthSection">' +months[month] + ' ' + year + '</td></tr>';
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
				calenderInTab += '<td class="current" onclick="displayDate(this,'+month+','+year+')">' + day_counter + '</td>';
			else{
				if(jQuery.inArray(day_counter, doneDays['doneDays'+Number(month+1)+'_'+year])!=-1){
					
					color = "green"
				}
				else{
					color = "gray";
				}
				let comments = "";
				if(doneText['doneText'+Number(month+1)+'_'+year]){
				for(var cm=0;cm<doneText['doneText'+Number(month+1)+'_'+year].length;cm++){
					if(doneText['doneText'+Number(month+1)+'_'+year][cm]["date"]==day_counter){
						comments = doneText['doneText'+Number(month+1)+'_'+year][cm]["text"]
					}
				}
			}
				var cmnt = comments?comments:"";
				var view_more="hidden-more";
				if(cmnt.length>40){
					view_more="show-more";
				}
				calenderInTab += '<td data-attr = '+ day_counter +'  data-comment="'+cmnt+'" style="background-color:'+color+'"; onclick="displayDate(this,'+month+','+year+')"><button class="add-icon"><span><i class="fa fa-plus" aria-hidden="true"></i><span></button>' + day_counter + '<p>'+cmnt+'</p> <button class='+view_more+'><span><i class="fa fa-eye" aria-hidden="true"></i><span></button></td>';

				
				
			}
			week_day++;
		
		}
		//dateStore=months[month]+" "+year;
		//console.log("Ds "+dateStore);
		//localStorage.setItem("month", dateStore);
		//....Different color for empty cells At the end.... 
		for(var i = week_day; i < 7; i++) {
			calenderInTab += '<td class="emptyLast"> </td>';
		}
		console.log("wk= "+week_day);
	
		calenderInTab += '</tr>';  
		calenderInTab += '<tr class="next-prev-row">'; 
		calenderInTab += '<td><input type="submit" value="<<< Prev" onclick="prev('+month+','+year+')"></td>';
		calenderInTab += '<td><input type="submit" value="Next >>>" onclick="next('+month+','+year+')"></td>';   
		
		calenderInTab += '</table>';
		return calenderInTab;
	}
	function displayCalender(calender){
		if(clicked!=1)
			document.getElementById("calDiv").innerHTML=calender;
		else{
			document.getElementById("cal").innerHTML=calender;
			document.getElementById("cal").style.display="block";
		}
	}
			
}
calendar();
function next(month,year){
	console.log(month);
	document.getElementById("calDiv").innerHTML="";
	var nextMonth=new Date(year,month+1, 1);
	console.log("Next= "+nextMonth);
	calendar(nextMonth);
	
}
function prev(month,year){
	document.getElementById("calDiv").innerHTML="";
	var prevMonth=new Date(year,month-1, 1);
	console.log(prevMonth);
	calendar(prevMonth);
}
function goToDate(clicked){
	
	console.log(clicked);
	var goTo=localStorage.getItem("month");
	console.log(goTo);
	calendar(goTo,clicked);
	
}