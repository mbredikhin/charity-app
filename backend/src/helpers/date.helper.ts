export const dateTimeToDate = (dateTime: Date) =>
  dateTime.toISOString().split('T')[0];
