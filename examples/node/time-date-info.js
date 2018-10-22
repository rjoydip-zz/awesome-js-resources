
module.exports = () => {
    const d = new Date();
    const day = d.getDay();

    return {
        day,
        date: d.getDate(),
        month: (d.getMonth() + 1),
        fullYear: d.getFullYear(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
        milliseconds: d.getMilliseconds(),
        week: ((day + 6) % 6),
        time: d.getTime(),
        timezoneOffset: d.getTimezoneOffset(),
        UTCFullYear: d.getUTCFullYear(),
        UTCMonth: d.getUTCMonth(),
        UTCDate: d.getUTCDate(),
        UTCDay: d.getUTCDay(),
        UTCHours: d.getUTCHours(),
        UTCMinutes: d.getUTCMinutes(),
        UTCSeconds: d.getUTCSeconds(),
        UTCMilliseconds: d.getUTCMilliseconds(),

        get: () => {
            return d;
        }
    };
}