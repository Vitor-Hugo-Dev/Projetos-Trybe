const handleDateFormat = (date) => {
  const fullDate = new Date(date);
  const day = String(fullDate.getDate()).padStart(2, '0');
  const month = String(fullDate.getMonth() + 1).padStart(2, '0');
  const year = String(fullDate.getFullYear());

  return `${day}/${month}/${year}`;
};

export default handleDateFormat;
