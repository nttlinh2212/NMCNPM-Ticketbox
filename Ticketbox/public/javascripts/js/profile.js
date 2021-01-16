$(function() {
    $('#dobInput').datetimepicker({
        format: 'DD/MM/YYYY'
    });
});
$('#inputPassword, #inputCfPassword').on('keyup', function() {
    if ($('#inputPassword').val() === $('#inputCfPassword').val()) {
        $('#inputCfPassword').parent().removeClass('has-danger');
        $('#inputCfPassword').parent().addClass('has-success');
    } else {
        $('#inputCfPassword').parent().removeClass('has-success');
        $('#inputCfPassword').parent().addClass('has-danger');
    }
});
$(document).ready(function() {
    $("#info-alert").hide();
    $("#password-alert").hide();
});

function showAlert(alert, success, message) {
    alert.html('<button type="button" class="close" data-dismiss="alert">x</button>');
    if (success) {
        if (alert.hasClass("alert-danger")) {
            alert.removeClass("alert-danger");
        }
        alert.addClass("alert-success")
        alert.append(message);
    } else {
        if (alert.hasClass("alert-success")) {
            alert.removeClass("alert-success");
        }
        alert.addClass("alert-danger")
        alert.append(message);
    }
    alert.slideDown(500, function() {
        alert.fadeTo(2000, 500).slideUp(500, function() {
            alert.slideUp(500);
        });
    });
}
$('#frm-info').on('submit', function(e) {
    e.preventDefault();
    const fullname = $('#inputFullname').val();
    const phonenum = $('#phoneInput').val();
    const dob = $('#dobInput').val();
    const alert = $("#info-alert");
    if (fullname.length < 3 || fullname.length > 35) {
        $('#inputFullname').val("");
        showAlert(alert, false, 'Fullname must have more than 3 characters and less than 35 charaters!');
        return false;
    }
    if (/^[a-zA-Z- ]*$/.test(fullname) == false) {
        $('#inputFullname').val("");
        showAlert(alert, false, 'Please insert a valid fullname!');
        return false;
    }
    if (phonenum.length != 0 && phonenum.length != 10) {
        $('#phoneInput').val("");
        showAlert(alert, false, 'Phone must be empty or have 10 numbers!');
        return false;
    }
    if (/^[0-9]*$/.test(phonenum) == false) {
        $('#phoneInput').val("");
        showAlert(alert, false, 'Phone must contains only number!');
        return false;
    }
    $.post("/customer/update-info", { fullname: fullname, phone: phonenum, dob: dob });
    showAlert(alert, true, '<strong>Success! </strong> Your information is changed successfully.');
});

$('#frm-password').on('submit', function(e) {
    e.preventDefault();
    const oldPassword = $('#oldPassword').val();
    const inputPassword = $('#inputPassword').val();
    const inputCfPassword = $('#inputCfPassword').val();
    const alert = $("#password-alert");
    if (oldPassword.length == 0 || inputPassword == 0 || inputCfPassword == 0) {
        showAlert(alert, false, 'You must fill in all fields!');
        return false;
    }
    if (inputPassword.length < 5 || inputPassword.length > 35) {
        showAlert(alert, false, 'Password must have more than 5 characters and less than 35 charaters!');
        return false;
    }
    if (inputPassword != inputCfPassword) {
        showAlert(alert, false, 'Confirm password is wrong!');
        return false;
    }
    $.post("/customer/change-password", { oldPassword: oldPassword, newPassword: inputPassword }, function(result) {
        if (result) {
            showAlert(alert, result, '<strong>Success! </strong> Your password is changed successfully.');
        } else {
            $('#oldPassword').val("");
            showAlert(alert, result, 'Your password is incorrect!');
        }
    });
});