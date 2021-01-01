const moment = require('moment');
module.exports = {
    generateDate(begindate,enddate) {
        var dateArray = [];//moment("12-25-1995", "MM-DD-YYYY")
        var currentDate = moment(begindate,"DD/MM/YYYY");
        var stopDate = moment(enddate,"DD/MM/YYYY");
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
}   