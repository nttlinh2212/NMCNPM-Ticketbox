// Confilm Delete
$('button.btn-del').on('click', function() {
    return confirm('Are you sure you want to delete this item?');
});

$('#searchbar').on('keyup', function() {
    var key = $('#searchbar').val();
    $.getJSON(`/find-films?key=${key}`, function(data) {
        if (data.length != 0) {
            $('#resultbar').text("");
            $('#resultbar').addClass("show");
            $('#searchdropdown').addClass("show");
            data.forEach(element => {
                $('#resultbar').append('<a href="/film?id=' + element.id + '" class="dropdown-item">' + element.title + '</a>');
            });
        } else {
            $('#resultbar').removeClass("show");
        }
    })
})

window.onclick = function(event) {
    if (!event.target.matches('#searcharea')) {
        if ($('#resultbar').hasClass("show")) {
            $('#searchbar').val("");
            $('#resultbar').removeClass("show");
            $('#searchdropdown').removeClass("show");
        }
    }
}