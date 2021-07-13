var clicked=0;
function showCalender(){
	if(clicked==0){
		var gotoWindow=document.getElementById("cal");
		if(gotoWindow){
			gotoWindow.innerHTML="";
		}
		console.log(clicked);
		var calWindow=window.open("calender.html","myCal","height=350,width=350");
		document.getElementById("cal").style.display="none";
		var calWindowDoc=calWindow.document;
		calWindow.moveTo(140,171);
		calWindowDoc.title = "Calender Window";
		calWindow.opener.document.bgColor='gray';
		clicked=1;
	}
	else{
		console.log(clicked);
		goToDate(clicked);
		console.log(clicked);
		clicked=0;
	}
	
}
function displayDate(t,mn,yr){
	
	var textField=window.opener.document.getElementById("selectedDate");
	textField.value=t.innerHTML+" "+mn+" "+yr;
	localStorage.setItem("month", t.innerHTML+" "+mn+" "+yr);
	console.log(t.innerHTML+" "+mn+" "+yr);
	//var convertedVal=new Date('yr mn t.innerHTML');
	console.log(t);
	window.opener.document.bgColor='#fff';
	window.close();
	
}