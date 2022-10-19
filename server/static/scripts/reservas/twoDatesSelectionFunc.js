let someDate = "WEDNESDAY 14th AUGUST 2022";

var weekday=new Array(7);
weekday[0]="SUNDAY";
weekday[1]="MONDAY";
weekday[2]="TUESDAY";
weekday[3]="WEDNESDAY";
weekday[4]="THURSDAY";
weekday[5]="FRIDAY";
weekday[6]="SATURDAY";

var month=new Array(12);
month[0]="JANUARY";
month[1]="FEBRUARY";
month[2]="MARCH";
month[3]="APRIL";
month[4]="MAY";
month[5]="JUNE";
month[6]="JULY";
month[7]="AUGUST";
month[8]="SEPTEMBER";
month[9]="OCTOBER";
month[10]="NOVEMBER";
month[11]="DECEMBER";

var selectedDate1 = null;
var selectedDate2 = null;

var dates = [];
$( document ).ready(function() {
    
    var dates = [];
    var dayCounter = 0;
    var currDay = days[0];
    var extraClass = "enabled";
    var value;
    console.log(days)
    for(let i = 0; i < 30; i++){
        var date = new Date();
        date.setHours(0,0,0,0);
        date.setDate(date.getDate() + i);
        
        dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        if(dateString == currDay){
            extraClass = "disabled";
            value = -1;
            dayCounter = dayCounter + 1;
            currDay = days[dayCounter];
        }
        else{
            extraClass = "enabled";
            value = i;
        }


        let thisHtml = `<div class="` + extraClass + `"><p>`;
        thisHtml += weekday[date.getDay()] + "<br> " + date.getDate() + "th <br>" + month[date.getMonth()] + "<br> " + date.getFullYear();
        let thisHtml1 = thisHtml + `</p><input class="statsButton1" type="image" src="/static/resources/buttonSelect-2.png" value="`+ value +`"></div>`;
        let thisHtml2 = thisHtml + `</p><input class="statsButton2" type="image" src="/static/resources/buttonSelect-2.png" value="`+ value +`"></div>`;
        
        $("#uBand").append(thisHtml1);
        $("#lBand").append(thisHtml2);
        dates[i] = date;
    }

    

    $(".statsButton1").click(function () {
        let index = $(this).val();
        if(index != -1){
            selectedDate1 = dates[index]
            $("#selectText1").html("INICIO: " + weekday[selectedDate1.getDay()] + " " + selectedDate1.getDate() + "th " + month[selectedDate1.getMonth()] + " " + selectedDate1.getFullYear());
        }
    }
    );
    $(".statsButton2").click(function () {
        let index = $(this).val();
        if(index != -1){
            if(selectedDate1 == null){
                selectedDate1 = null
                $("#selectText1").html("Favor de seleccionar una fecha");
            }
            else if (dates[index] <= selectedDate1){
                selectedDate1 = null
                $("#selectText2").html("Seleccionar una fecha mayor");
            }
            else{
                console.log("Before for")
                for(var i = 0; i < days.length; i++){
                    console.log("Checking for day " + days[i])
                    let dayInDate = new Date(days[i]);
                    if(dayInDate > selectedDate1 && dayInDate < dates[index]){
                        $("#selectText2").html("No están todos los dias disponibles para el rango seleccionado");
                        return;
                    }
                }
                selectedDate2 = dates[index]
                $("#selectText2").html("FIN: " + weekday[selectedDate2.getDay()] + " " + selectedDate2.getDate() + "th " + month[selectedDate2.getMonth()] + " " + selectedDate2.getFullYear());
            }
        }   
    }
    );

    $("#nextButton").click(function () {
        if(selectedDate1 == null){
            $("#selectText1").html("Favor de seleccionar una fecha");
        }
        else if(selectedDate2 == null){
            $("#selectText2").html("Favor de seleccionar una fecha");
        }
        else{
            selectedDate1.setHours(0,0,0);
            var stringDate = selectedDate1.getFullYear() + "-";
            stringDate += (selectedDate1.getMonth() + 1).toString().padStart(2, '0') + "-";
            stringDate += selectedDate1.getDate().toString().padStart(2, '0') + " ";
            stringDate += selectedDate1.toTimeString().split(' ')[0];
            objectData.startDate = stringDate;

            selectedDate2.setHours(23,59,59);
            stringDate = selectedDate2.getFullYear() + "-";
            stringDate += (selectedDate2.getMonth() + 1).toString().padStart(2, '0') + "-";
            stringDate += selectedDate2.getDate().toString().padStart(2, '0') + " ";
            stringDate += selectedDate2.toTimeString().split(' ')[0]; // + '.000'
            objectData.endDate = stringDate;

            $.redirect("/reservations/showTicket", objectData);
        }
    }
    );
    
});