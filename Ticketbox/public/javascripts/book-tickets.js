var money = 0;
var seats = "";
$('#frmSeats').on('submit', function(e) {
    e.preventDefault();
    const showtimeid = $('#showtimeID').val();
    const active = $(document.activeElement);
    const seat = active.val();
    const idrow = seat.charAt(0);
    const idcol = seat.charAt(1);
    const type = seat.substring(2);
    $.getJSON(`/Customer/Cart/add?idshowtime=${showtimeid}&idrow=${idrow}&idcolumn=${idcol}`, function(data) {
        if (data === 1) {
            if (type === "vip") {
                active.removeClass('btn-rose');
                money += 60000;
            } else {
                active.removeClass('btn-info');
                money += 40000;
            }
            active.addClass('btn-success');
            seats = seats + String(idrow) + String(idcol) + " ";
            $('#price').text("Price: " + String(money));
            $('#seats').text("Seat: " + seats);
        } else {
            $.getJSON(`/Customer/Cart/remove?idshowtime=${showtimeid}&idrow=${idrow}&idcolumn=${idcol}`, function(data) {
                if (data == true) {
                    active.removeClass('btn-success')
                    if (type === "vip") {
                        active.addClass('btn-rose');
                        money -= 60000;
                    } else {
                        active.addClass('btn-info');
                        money -= 40000;
                    }
                    seats = seats.replace(String(idrow) + String(idcol) + " ", "");
                    $('#price').text("Price: " + String(money));
                    $('#seats').text("Seat: " + seats);
                }
            });
        }
    })
});