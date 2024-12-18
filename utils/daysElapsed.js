function getDaysElapsed(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    
    // Convert to Date objects and set time to midnight (00:00:00) for both start and end dates
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Reset start date to midnight
    
    const end = new Date(); // Use current date and time
    end.setHours(0, 0, 0, 0); // Reset end date to midnight
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Invalid date');
        return NaN;
    }
  
    // Calculate the difference in time
    const differenceInTime = end - start;
    
    // Convert time difference to days
    const differenceInDays = Math.round(differenceInTime / oneDay);
    
    return differenceInDays;
  }
  
  // Example start date
  const startDate = '2024-08-25';
  // Using today's date as the end date (implicitly)
  const daysElapsed = getDaysElapsed(startDate);
  console.log(`Start Date: ${startDate}`);
  console.log(`Today's Date: ${new Date().toISOString().split('T')[0]}`);
  console.log(`Days Elapsed: ${daysElapsed}`);
  
  
  export{
      daysElapsed
    }