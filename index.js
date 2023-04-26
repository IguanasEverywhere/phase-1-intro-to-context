// Your code here
function createEmployeeRecord([firstName, familyName, title, payRate]) {
  let employeeObj = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: [],
  }

  return employeeObj;
}

function createEmployeeRecords(arrayOfEmployeeDataArrays) {

  let arrayOfEmployeeObjects = arrayOfEmployeeDataArrays.map(employeeArr => {
    return createEmployeeRecord(employeeArr)
  });

  return arrayOfEmployeeObjects;
}

function createTimeInEvent(employeeObj, dateStamp) {

  // let parsedDate = new Date();
  // parsedDate.setFullYear(parseInt(dateStamp.slice(0, 4)));
  // parsedDate.setMonth(parseInt(dateStamp.slice(5, 7)) - 1);
  // parsedDate.setDate(parseInt(dateStamp.slice(8, 10)))
  // parsedDate.setHours(parseInt(dateStamp.slice(11, 13)));
  // parsedDate.setMinutes(parseInt(dateStamp.slice(13)))

  let parsedDate = new Date(
    parseInt(dateStamp.slice(0, 4)),
    parseInt(dateStamp.slice(5, 7)) - 1,
    parseInt(dateStamp.slice(8, 10)),
    parseInt(dateStamp.slice(11, 13)),
    parseInt(dateStamp.slice(13)),
  );


  employeeObj.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(dateStamp.slice(11), 10),
    date: dateStamp.slice(0, 10),
    parsedDate: parsedDate
  });

  return employeeObj;

}

function createTimeOutEvent(employeeObj, dateStamp) {

  // let parsedDate = new Date();
  // parsedDate.setFullYear(parseInt(dateStamp.slice(0, 4)));
  // parsedDate.setMonth(parseInt(dateStamp.slice(5, 7)) - 1);
  // parsedDate.setDate(parseInt(dateStamp.slice(8, 10)))
  // parsedDate.setHours(parseInt(dateStamp.slice(11, 13)));
  // parsedDate.setMinutes(parseInt(dateStamp.slice(13)))

    let parsedDate = new Date(
    parseInt(dateStamp.slice(0, 4)),
    parseInt(dateStamp.slice(5, 7)) - 1,
    parseInt(dateStamp.slice(8, 10)),
    parseInt(dateStamp.slice(11, 13)),
    parseInt(dateStamp.slice(13)),
  );


  employeeObj.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(dateStamp.slice(11), 10),
    date: dateStamp.slice(0, 10),
    parsedDate: parsedDate
  });

  return employeeObj;

}

function hoursWorkedOnDate(employeeObj, dateToCheck) {

  if (employeeObj.timeInEvents.length !== employeeObj.timeOutEvents.length) {
    throw ('Number of timeInEvents does not match number of timeOutEvents')
  }

  // maybe all of this could be within a try block, and catch the error if needed. But for now,
  // I'm simply doing one check of the timein/out lengths and throwing a custom error if they
  // dont match

  // let timeIn = employeeObj.timeInEvents.find(timeInEvent => timeInEvent.date === dateToCheck);
  let timeOut = employeeObj.timeOutEvents.find(timeOutEvent => timeOutEvent.date === dateToCheck);
  let timeOutIdx = ('index of timeOut', employeeObj.timeOutEvents.indexOf(timeOut))
  let timeIn = employeeObj.timeInEvents[timeOutIdx];

// Subtracts the difference in time between the two actual dates in milliseconds, then
// divides that number by 1000 to get seconds, then 60 for minutes, then 60 again for hours
  let hoursWorked = Math.abs((timeOut.parsedDate-timeIn.parsedDate) / (60 * 60 * 1000));

  return hoursWorked;
}

function wagesEarnedOnDate(employeeObj, dateToCheck) {
  let hoursWorkedByEmployeeOnDate = hoursWorkedOnDate(employeeObj, dateToCheck);
  return hoursWorkedByEmployeeOnDate * employeeObj.payPerHour;
}

function allWagesFor(employeeObj) {
  let allDatesForEmployee = employeeObj.timeOutEvents.map(timeOutEvent => timeOutEvent.date);
  let totalWagesForEmployee = allDatesForEmployee.reduce(
    (accumulatedWages, currentDate) => {
      return accumulatedWages + wagesEarnedOnDate(employeeObj, currentDate)
    }, 0);
  return totalWagesForEmployee;
}

function calculatePayroll(arrOfEmployees) {
  let totalWagesForAllEmployees = arrOfEmployees.reduce((accumulatedWages, currentEmployee) => {
    return accumulatedWages + allWagesFor(currentEmployee);
  }, 0);

  //rounding for full dollar amts to satisfy tests
  return Math.round(totalWagesForAllEmployees);
}

