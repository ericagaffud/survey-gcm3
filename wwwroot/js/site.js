// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$('#survey button').on('click', function () {
    var questionContainer = $(this).closest('#survey > div');

    var className = questionContainer.attr('class');
    var questionNumber = className.split("-")[1];

    var buttonName = $(this).attr('name');
    var buttonNumber = buttonName.charAt(buttonName.length - 1);

    $('#' + questionNumber).val(buttonNumber);
    $('.' + className + '> div > button').removeClass('button-active');
    $('.' + className + '> div > button:nth-child(' + buttonNumber + ')').addClass('button-active');
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
            Swal.fire({
                title: "SUBMITTED",
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                $('#question1, #question2, #question3').val('');
                $('#survey button').removeClass('button-active');
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
});