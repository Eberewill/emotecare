export function getTimestampWithOffset() {
  var date = new Date();

  // get the date as a string
  var dateStr = new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
                  .toISOString().substr(0, 23);

  // get the offset in minutes, convert it to hours:minutes
  var offset = -date.getTimezoneOffset();
  var offsetStr = (offset >= 0 ? "+" : "-") + 
       Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0') + ":" + 
       (Math.abs(offset) % 60).toString().padStart(2, '0');

  return dateStr + offsetStr;
} 


  export function generateUniqueId() {
    const uniqueId = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    return uniqueId;
  }
  
