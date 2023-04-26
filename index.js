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
  employeeObj.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(dateStamp.slice(11), 10),
    date: dateStamp.slice(0, 10)
  });

  return employeeObj;

}

function createTimeOutEvent(employeeObj, dateStamp) {
  employeeObj.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(dateStamp.slice(11), 10),
    date: dateStamp.slice(0, 10)
  });

  return employeeObj;

}

function hoursWorkedOnDate(employeeObj, dateToCheck) {

  try {
    if (employeeObj.timeInEvents.length !== employeeObj.timeOutEvents.length) {
      throw ('Number of timeInEvents does not match number of timeOutEvents');
    }
  } catch(err) {
    console.log(err);
  }

  let timeIn = employeeObj.timeInEvents.find(timeInEvent => timeInEvent.date === dateToCheck);
  let timeInHour = timeIn.hour;

  let timeOut = employeeObj.timeOutEvents.find(timeOutEvent => timeOutEvent.date === dateToCheck);
  let timeOutHour = timeOut.hour;

  let hoursWorked = (timeOutHour - timeInHour) / 100;
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
  return totalWagesForAllEmployees;
}

