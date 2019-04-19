function calculateDaysToSubstract(currentDay) {
	return currentDay == 0 ? 6 : currentDay -1;
}

var currentDay = new Date().getDay();
var daysToSubtract = calculateDaysToSubstract(currentDay);
var beginningOfWeek = moment().subtract(daysToSubtract, "days").format("dddd MMM Do, YYYY");

// get transactions from today to beginningOfWeek