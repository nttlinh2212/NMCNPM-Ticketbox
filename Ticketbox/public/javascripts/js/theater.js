$('#frmDate').on('submit', function(e) {
    e.preventDefault();
    const date = $('#datepicker').val();
    if (date === '') {
        $('#showtimes').html('<h5>Please pick a day</h5>');
        return;
    } else {
        $('#showtimes').text("");
    }
    const id = $('#theaterid').val();
    $.getJSON(`/showtimes-groupby-film?id=${id}&date=${date}`, function(data) {
        if (data != null) {
            data.forEach(element => {
                $('#showtimes').append(createShowtime(element));
            });
        } else {
            $('#showtimes').html('<h5>No showtimes on this day.</h5>');
        }
    })
});

function createShowtime(data) {
    var html = "";
    html += '<div class="showtime-theater"><div class="title"><h4>' + data[0].title + '</h4></div><div class="row">';
    data.forEach(element => {
        html += '<div class="col-md-2 text-center"><button class="btn"' +
            ' formaction="/customer/book-tickets/' + element.id + '">' + element.starttime.substring(0, 5) + '</button></div>';
    });
    html += '</div></div>';
    return html;
}