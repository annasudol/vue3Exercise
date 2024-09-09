import moment from "moment"
function dateFormat(date, hours = 0) {
    return moment(new Date(date)).format('hh:mm');
}

export default dateFormat;