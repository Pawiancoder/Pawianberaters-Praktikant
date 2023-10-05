
function convertTime(t) {
    // Create a new Date object representing the date and time "17.07.2023 20:00:00"
    const targetDate = new Date('2023-07-17T20:00:00');

    // Get the Unix timestamp (in milliseconds) for the target date
    const unixTimestamp = targetDate.getTime();

    console.log(unixTimestamp);
}