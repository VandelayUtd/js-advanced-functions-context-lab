/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees){
    return employees.map(function(e){
      return createEmployeeRecord(e)  
    })
}

let createTimeInEvent = function(dateTime){
    let [date, hour] = dateTime.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return this 
}

let createTimeOutEvent = function(dateTime){
    let [date, hour] = dateTime.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

let hoursWorkedOnDate = function(dateEvent){
    let eventStart = this.timeInEvents.find(function(e){
       return e.date === dateEvent
    })

    let eventEnd = this.timeOutEvents.find(function(e){
        return e.date === dateEvent
    })

    return (eventEnd.hour - eventStart.hour) / 100
}

let wagesEarnedOnDate = function(date){
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return wage
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }