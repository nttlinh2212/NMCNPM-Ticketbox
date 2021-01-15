$('#viewRevenueTheater').click(function(e) {
    var beginningday = $('#beginningday').val();
    var endday = $('#endday').val();
    const idtheater = $('#idtheater').val();
    if (beginningday === "") {
        alert(`Please enter "The Beginning Day" field`);
        return false;
    }
    if (endday === "") {
        alert(`Please enter "The End Day" field`);
        return false;
    }
    if (idtheater === 'null') {
        alert(`Please choose a theater to view`);
        return false;
    }
    if ((beginningday != "") && (endday != "")) {
        var beginningdayCompare = new Date(beginningday);
        var enddayCompare = new Date(endday);

        if (enddayCompare >= beginningdayCompare) {
            const idfilm = 'null';
            const starttime = 'null';
            beginningday = moment(beginningday, "YYYY-MM-DD").format("D/M/YYYY");
            endday = moment(endday, "YYYY-MM-DD").format("D/M/YYYY");
            send = {
                idfilm,
                idtheater,
                beginningday,
                endday,
                starttime
            };
            $.getJSON(`/admin/report/get-revenue-by-film`, send, function(data) {
                console.log(data);
                if (data) {
                    var dateHTML = ``;
                    var filmHTML = `<th>Film</th>`;
                    data[0].films.forEach(element => {
                        filmHTML += `<th>${element.title}</th>`;
                    })
                    filmHTML += `<th>Total</th>`;
                    var rev = ``;
                    data.forEach(element => {
                        rev = ``;
                        rev += `<tr><td>${element.date}</td>`;
                        element.films.forEach(ele => {
                            rev += `<td>${ele.revenue}</td>`;
                        });
                        rev += `<td>${element.total}</td></tr>`;
                        dateHTML += rev;
                    });
                    $('#films').html(filmHTML);
                    $('#dates').html(dateHTML);
                }
            })
        }


    } else {
        alert(`"The End Day" is required after "The Beginning Day"`);
    }
});
$('#viewRevenueFilm').click(function(e) {
    var beginningday = $('#beginningday').val();
    var endday = $('#endday').val();
    const idtheater = 'null';
    const idfilm = $('#idfilm').val();
    if (beginningday === "") {
        alert(`Please enter "The Beginning Day" field`);
        return false;
    }
    if (endday === "") {
        alert(`Please enter "The End Day" field`);
        return false;
    }
    if (idfilm === 'null') {
        alert(`Please choose a film to view`);
        return false;
    }
    if ((beginningday != "") && (endday != "")) {
        var beginningdayCompare = new Date(beginningday);
        var enddayCompare = new Date(endday);

        if (enddayCompare >= beginningdayCompare) {
            const starttime = 'null';
            beginningday = moment(beginningday, "YYYY-MM-DD").format("D/M/YYYY");
            endday = moment(endday, "YYYY-MM-DD").format("D/M/YYYY");
            send = {
                idfilm,
                idtheater,
                beginningday,
                endday,
                starttime
            };
            $.getJSON(`/admin/report/get-revenue-by-theater`, send, function(data) {
                console.log(data);
                if (data) {
                    var dateHTML = ``;
                    var filmHTML = `<th>Film</th>`;
                    data[0].films.forEach(element => {
                        filmHTML += `<th>${element.name}</th>`;
                    })
                    filmHTML += `<th>Total</th>`;
                    var rev = ``;
                    data.forEach(element => {
                        rev = ``;
                        rev += `<tr><td>${element.date}</td>`;
                        element.films.forEach(ele => {
                            rev += `<td>${ele.revenue}</td>`;
                        });
                        rev += `<td>${element.total}</td></tr>`;
                        dateHTML += rev;
                    });
                    $('#films').html(filmHTML);
                    $('#dates').html(dateHTML);
                }
            })
        }


    } else {
        alert(`"The End Day" is required after "The Beginning Day"`);
    }
});
$('table').dataTable({ searching: false, paging: false, info: false });