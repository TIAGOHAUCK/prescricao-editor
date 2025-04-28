export const formatDate = (date: string): string => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year.slice(2)}`;
};

export const reverseFormatDate = (date: string): string => {
  if (!date) return '';
  const [day, month, year] = date.split('/');
  return `20${year}-${month}-${day}`;
}; 