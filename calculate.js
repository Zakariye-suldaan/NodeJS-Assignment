const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateSalesTarget(startDate, endDate, totalTarget) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate total days between start and end dates
  const workingDays = getWorkingDays(start, end); // Calculate working days between start and end dates

  const dailyTarget = totalTarget / workingDays; // Calculate daily sales target

  console.log(`Daily Sales Target: ${dailyTarget.toFixed(6)}`);
  console.log(`Total Target Sales: ${totalTarget.toFixed(2)}`);
}

function getWorkingDays(startDate, endDate) {
  let workingDays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !==6) { // Exclude Sundays (0) and Saturdays (5)
      workingDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workingDays;
}

// Prompt the user to input values
rl.question('Enter the start date (YYYY-MM-DD): ', startDate => {
  rl.question('Enter the end date (YYYY-MM-DD): ', endDate => {
    rl.question('Enter the total target sales: ', totalTarget => {
      calculateSalesTarget(startDate, endDate, parseFloat(totalTarget));
      rl.close();
    });
  });
});