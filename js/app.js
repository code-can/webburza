$(window).load(function() {
    $("#sticky-nav").sticky({
        topSpacing: 0
    });
});

$(function() {
    var form = $('#ajax-contact');

    form.on("submit", function(e) {
        e.preventDefault();
        formData = form.serialize();

        var proccedName = true;
        var proccedEmail = true;
        var proccedText = true;

        var name = $("input[name='name']");
        var email = $("input[name='email']");
        var text = $("textarea[name='message']");

        var errorName = 'Enter valid name';
        var errorEmail = 'Enter valid email';
        var errorText = 'Enter valid message';

        if (!name.val() == "") {
            proccedName = true;
        } else {
            proccedName = false;
            name.parent().append(errorName);
        }

        if (!email.val() == "" && email.val().indexOf(".com") >= 0) {
            proccedEmail = true;
        } else {
            email.parent().append(errorEmail);
            proccedEmail = false;
        }

        if (!text.val() == "") {
            proccedText = true;
        } else {
            text.parent().append(errorText);
            proccedText = false;
        }
        if (proccedName == true && proccedEmail == true && proccedText == true) {
            $.ajax({
                    type: 'POST',
                    url: form.attr('action'),
                    data: formData
                })
                .done(function(response) {
                    $('body').append('<div class="alert alert-success alert-dismissible fade in" role="alert">\
										<strong>You have successfuly contact us.</strong>\
									</div>');
                    $('.alert').fadeOut(3000);
                    setTimeout(function() {
                        $('.alert').remove();
                    }, 2000);
                })
                .fail(function(data) {
                    alert("ERROR");
                });
        }
    });
});