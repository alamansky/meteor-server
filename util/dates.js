const dates = {
    full: () =>
        `${new Date().getMonth() +
        1}-${new Date().getDate()}-${new Date().getFullYear()}`,
    relative: (firstTime, secondTime) => {
        let seconds = Math.round(Math.abs((firstTime - secondTime) / 1000));
        if (seconds < 60) {
            return `${seconds} seconds`;
        }
        let minutes = Math.round(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minutes`;
        }
        let hours = Math.round(minutes / 60);
        let remainingMinutes = Math.round(minutes % 60);
        return `${hours} ${
            hours == 1 ? "hour" : "hours"
            } and ${remainingMinutes} minutes`;
    }
};

module.exports = dates;