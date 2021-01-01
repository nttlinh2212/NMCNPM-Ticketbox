$('#frmRegister').on('submit', function(e) {
    e.preventDefault();
    const inputUsername = $('#inputUsername').val();
    $.getJSON(`/is-available?user=${inputUsername}`, function(data) {
        if (data === true) {
            if ($('#inputPassword').val() === $('#inputCfPassword').val()) {
                $('#frmRegister').off('submit').submit();
            }
        } else {
            $('#err_mess').text("Email already exists")
        }
    })
});
$('#inputPassword, #inputCfPassword').on('keyup', function() {
    if ($('#inputPassword').val() === $('#inputCfPassword').val()) {
        $('#inputCfPassword').removeClass('border-danger')
        $('#inputCfPassword').addClass('border border-success')
    } else {
        $('#inputCfPassword').addClass('border border-danger thick-border')
    }
});