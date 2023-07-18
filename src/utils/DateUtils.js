class DateUtil {
  static getDateRange(option) {
    //options:  "This Week","Last 7 Days","Last 30 Days","More than 30 Days"
    const now = new Date();
    const startDate = new Date();
    const endDate = new Date();

    if (option === "This Week") {
      const currentDay = now.getDay();
      const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Calculate the first day of the current week
      startDate.setDate(diff);
    } else if (option === "Last 7 Days") {
      startDate.setDate(now.getDate() - 6);
    } else if (option === "Last 30 Days") {
      startDate.setDate(now.getDate() - 29);
    } else if (option === "More than 30 Days") {
      startDate.setDate(now.getDate() - 30);
    }

    return {
      startDate: startDate.toISOString().slice(0, 10), // Convert to ISO string and extract the date part
      endDate: endDate.toISOString().slice(0, 10), // Convert to ISO string and extract the date part
    };
  }
}

export default DateUtil;
