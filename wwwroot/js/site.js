// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$('#survey button').on('click', function () {
    console.log();
    var questionContainer = $(this).closest('#survey > div');

    var className = questionContainer.attr('class');
    var questionNumber = className.split("-")[1];

    var buttonName = $(this).attr('name');
    var buttonNumber = buttonName.charAt(buttonName.length - 1);

    $('#' + questionNumber).val(buttonNumber);
});

$('#survey').on('submit', function (e) {
    e.preventDefault();

    let question1 = $('#question1').val();
    let question2 = $('#question2').val();
    let question3 = $('#question3').val();

    var formData = {
        Q1: question1,
        Q2: question2,
        Q3: question3
    };

    console.log(formData);

    $.ajax({
        url: "/Home/SaveSurveyAnswers",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
            console.log("Saved Successfully", response);
            Swal.fire("Working");
            $('#question1').val('');
            $('#question2').val('');
            $('#question3').val('');
        },
        error: function (error) {
            console.log(error);
        }
    });
});