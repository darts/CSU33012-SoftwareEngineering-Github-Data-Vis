let buildTimes = function () {
    let days = ["Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat ", "Sun "]
    let hours = [...Array(24).keys()]
    let X_AXIS_VALS = []

    days.forEach(day => {
        hours.forEach(hour => {
            X_AXIS_VALS.push((day + "@ "+ String(hour)))
        })
    })
    return X_AXIS_VALS
}
