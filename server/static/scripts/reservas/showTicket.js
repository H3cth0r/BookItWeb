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

$(document).ready(function(){
    let sd = new Date(ticket.startDate)
    let startDateString = weekday[sd.getDay()] + "<br> " + sd.getDate() + "th <br>" + month[sd.getMonth()] + "<br>" + sd.getFullYear() + "<br>" + sd.toTimeString().split(' ')[0];
    let ed = new Date(ticket.endDate)
    let endDateString = weekday[ed.getDay()] + "<br> " + ed.getDate() + "th <br>" + month[ed.getMonth()] + "<br> " + ed.getFullYear() + "<br>" + ed.toTimeString().split(' ')[0];
    $('#startDate').html(startDateString);
    $('#endDate').html(endDateString);
    $('#objectName').html(ticket.objectName);
    ticket.description = " ";

    console.log(ticket);

    $("#saveButton").click(function () {
        $.ajax({
            url: "/api/newTicket",
            type: "POST",
            data: JSON.stringify(ticket),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if(data.ticketSaved){
                    window.location.replace("/reservations/currentBookings")
                }
            }

        });
    })

})