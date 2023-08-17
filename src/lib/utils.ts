
import  Notify  from '../../static/sound.mp3'

import moment from 'moment';


export function formatRelativeTime(timestamp : string) {
  return moment(timestamp).fromNow();
}

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
  
  export const playSound = () => {
    const audio = new Audio(Notify);
    audio.volume = 0.2; // Set volume to 50%
    audio.play();
  };
  

  export function truncateText(text : string, numWords : number) {
    // Split the text into an array of words
    const words = text.split(' ');
  
    // Check if the number of words in the text is greater than or equal to the desired number of words
    if (words.length <= numWords) {
      return text; // Return the original text if it has fewer or equal words
    } else {
      const truncatedText = words.slice(0, numWords).join(' '); // Join the desired number of words
      return truncatedText + '...'; // Add the ellipsis at the end
    }
  }
  
