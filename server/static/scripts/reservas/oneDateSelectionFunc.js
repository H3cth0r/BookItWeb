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

var selectedDate = null;

$( document ).ready(function() {
    console.log(objectData);
        
    var dates = [];
    for(let i = 0; i < 30; i++){
        var date = new Date();
        date.setDate(date.getDate() + i);
        let thisHtml = "<div><p>";
        thisHtml += weekday[date.getDay()] + "<br> " + date.getDate() + "th <br>" + month[date.getMonth()] + "<br> " + date.getFullYear();
        thisHtml += `</p><input class="statsButton" type="image" src="/static/resources/buttonSelect-2.png" value="`+ i +`"></div>`;
        $(".date-selection-div").append(thisHtml);
        dates[i] = date;
    }

    

    $(".statsButton").click(function () {
        let index = $(this).val();
        selectedDate = dates[index]
        $("#selectText").html(weekday[selectedDate.getDay()] + " " + selectedDate.getDate() + "th " + month[selectedDate.getMonth()] + " " + selectedDate.getFullYear());
    }
    );

    $("#nextButton").click(function () {
        if(selectedDate == null){
            $("#selectText").html("Favor de seleccionar una fecha");
        }
        else{
            var stringDate = selectedDate.getFullYear() + "-";
            stringDate += (selectedDate.getMonth() + 1).toString().padStart(2, '0') + "-";
            stringDate += selectedDate.getDate().toString().padStart(2, '0') + " ";
            stringDate += selectedDate.toTimeString().split(' ')[0] + '000';
            objectData.startDate = stringDate;
            objectData.endDate = stringDate;
            $.redirect("/reservations/timeSelect", objectData);
        }
    }
    );
});