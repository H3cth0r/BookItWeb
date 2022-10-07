var day = new Date();
var maxDays = 15;

$(document).ready(function() {
    for (var i = 0; i < maxDays; i++) {
        var day = new Date();
        day.setDate(day.getDate() + i);
        var dayStr = day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear();
        var option = '<option value="' + dayStr + '">' + dayStr + '</option>';
        $('#date').append(option);
    }
});
        