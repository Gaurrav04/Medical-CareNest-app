export function getFormattedDate(): string {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const today = new Date();
    const dayName = dayOfWeek[today.getDay()]; 
    const monthName = monthOfYear[today.getMonth()]; 
    const day = today.getDate(); 
  
    return `${dayName}, ${monthName} ${day}`;
  }
  