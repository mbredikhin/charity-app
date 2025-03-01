export const dateTimeToDate = (dateTime: Date | string) => {
  const value = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
  return value.toISOString().split('T')[0];
};
