var mail  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
$(document).ready(function () {
    if ($("#send").click(function () {
        var email = $("#email").val();
        if (!mail.test(email)) {
            $("#email").focus();
        }
        else if (email == '') {
            alert("Please Enter Email");
        } else {
            $.ajax({
                type: "POST",
                url: "/forgott",
                data: email,
                cache: false,
                success: function (html) {
                    alert(html);
                }
            });
            alert("Please check your email");
        }
        return false;
    }));
});

