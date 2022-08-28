const timeStampToTimeString = (timeStamp) => {
    const date = timeStamp.toDate();
    const hour = '0' + date.getHours();
    const minute = '0' + date.getMinutes();
    return hour.substring(hour.length - 2) + ':' + minute.substring(minute.length - 2);
}

const timeStampToDate = (timeStamp) => {
    if (!!timeStamp) {
        return timeStamp.toDate().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
    } else {
        return '';
    }
}

const timeStampToDateWithTime = (timeStamp) => {
    const date = timeStamp.toDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + ",  " + strTime;
}

const currentDate = () => {
    const curDate = new Date();
    return curDate.toISOString().slice(0, 10);
}

const stringToTimeStamp = (strDate) => {
    const date = new Date(new Date(strDate).toUTCString());
    return date.getTime() / 1000;
}

const currentTimeStamp = () => {
    const date = new Date(new Date().toUTCString());
    return date.getTime() / 1000;
}

export { timeStampToDate, timeStampToTimeString, currentDate, stringToTimeStamp, timeStampToDateWithTime, currentTimeStamp };