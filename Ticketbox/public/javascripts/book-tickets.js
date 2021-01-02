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
    const price = active.data("price");
    $.getJSON(`/Customer/Cart/add?idshowtime=${showtimeid}&idrow=${idrow}&idcolumn=${idcol}`, function(data) {
        if (data === 1) {
            if (type === "vip") {
                active.removeClass('btn-rose');
            } else {
                active.removeClass('btn-info');
            }
            money += price;
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
                    } else {
                        active.addClass('btn-info');
                    }
                    money -= price;
                    seats = seats.replace(String(idrow) + String(idcol) + " ", "");
                    $('#price').text("Price: " + String(money));
                    $('#seats').text("Seat: " + seats);
                }
            });
        }
    })
});
$('#frmCheckout').on('submit', function(e) {
    e.preventDefault();
    const idcus = $('#idcus').val();
    $.getJSON(`/Customer/Cart/checkout?idcus=${idcus}`, function(data) {
        if (data > 0) {
            // $('#successModal').modal();
            if (!alert('Book Ticket Successfully!')) { window.location.reload(); }
        } else {
            if (!alert('Sorry cannot book your tickets. Please try again!')) { window.location.reload(); }
        }
    })
})