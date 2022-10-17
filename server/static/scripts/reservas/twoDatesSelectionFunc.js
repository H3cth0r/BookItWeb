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
    for(let i = 0; i < 30; i++){
        var date = new Date();
        date.setDate(date.getDate() + i);
        let thisHtml = "<div><p>";
        thisHtml += weekday[date.getDay()] + "<br> " + date.getDate() + "th <br>" + month[date.getMonth()] + "<br> " + date.getFullYear();
        let thisHtml1 = thisHtml + `</p><input class="statsButton1" type="image" src="/static/resources/buttonSelect-2.png" value="`+ i +`"></div>`;
        let thisHtml2 = thisHtml + `</p><input class="statsButton2" type="image" src="/static/resources/buttonSelect-2.png" value="`+ i +`"></div>`;
        
        $("#uBand").append(thisHtml1);
        $("#lBand").append(thisHtml2);
        dates[i] = date;
    }

    

    $(".statsButton1").click(function () {
        let index = $(this).val();
        selectedDate1 = dates[index]
        $("#selectText1").html("INICIO: " + weekday[selectedDate1.getDay()] + " " + selectedDate1.getDate() + "th " + month[selectedDate1.getMonth()] + " " + selectedDate1.getFullYear());
    }
    );
    $(".statsButton2").click(function () {
        let index = $(this).val();
        if(selectedDate1 == null){
            selectedDate1 = null
            $("#selectText1").html("Favor de seleccionar una fecha");
        }
        else if (dates[index] <= selectedDate1){
            selectedDate1 = null
            $("#selectText2").html("Seleccionar una fecha mayor");
        }
        else{
            selectedDate2 = dates[index]
            $("#selectText2").html("FIN: " + weekday[selectedDate2.getDay()] + " " + selectedDate2.getDate() + "th " + month[selectedDate2.getMonth()] + " " + selectedDate2.getFullYear());
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
            var stringDate = selectedDate1.getFullYear() + "-";
            stringDate += (selectedDate1.getMonth() + 1).toString().padStart(2, '0') + "-";
            stringDate += selectedDate1.getDate().toString().padStart(2, '0') + " ";
            stringDate += selectedDate1.toTimeString().split(' ')[0] + '000';
            objectData.startDate = stringDate;

            stringDate = selectedDate2.getFullYear() + "-";
            stringDate += (selectedDate2.getMonth() + 1).toString().padStart(2, '0') + "-";
            stringDate += selectedDate2.getDate().toString().padStart(2, '0') + " ";
            stringDate += selectedDate2.toTimeString().split(' ')[0] + '000';
            objectData.endDate = stringDate;

            $.redirect("/reservations/showTicket", objectData);
        }
    }
    );
    
});