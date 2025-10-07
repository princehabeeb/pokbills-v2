const FormatTime = (timestamp) => {
  // Check if time is valid
  if (!timestamp) return '';

  // Parse the timestamp in YYYY-MM-DD HH:mm:ss format
  const [datePart, timePart] = timestamp.split(' ');
  const [hours, minutes] = timePart.split(':');

  // Create Date object with parsed values
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  // Format the time to 12-hour format with AM/PM
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export default FormatTime;
