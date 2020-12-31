const moment = require('moment');
module.exports = {
    generateDate(begindate,enddate) {
        var dateArray = [];
        var currentDate = moment(begindate);
        var stopDate = moment(enddate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
}   