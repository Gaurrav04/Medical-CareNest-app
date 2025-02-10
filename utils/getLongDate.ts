export function getLongDate(dateString: string): string {
    const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months: string[] = ["January", "February", "March", "April", "May", "June", 
         "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);
    const dayName = daysOfWeek[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayOfMonth = date.getDate();
  
    return `${dayName}, ${monthName} ${dayOfMonth}`;
  }
  