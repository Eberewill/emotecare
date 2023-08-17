 export function getTimestampWithOffset() {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
  
    // Get the timezone offset in minutes
    const timezoneOffset = currentDate.getTimezoneOffset();
  
    // Convert the timezone offset to hours and minutes
    const hours = Math.floor(Math.abs(timezoneOffset) / 60);
    const minutes = Math.abs(timezoneOffset) % 60;
  
    // Determine the sign of the offset
    const offsetSign = timezoneOffset < 0 ? '+' : '-';
  
    // Construct the offset string
    const offsetString = `${offsetSign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    // Add the offset to the timestamp
    const timestampWithOffset = `${timestamp.substring(0, timestamp.length - 1)}${offsetString}`;
  
    return timestampWithOffset;
  }

  export function generateUniqueId() {
    const uniqueId = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    return uniqueId;
  }
  
