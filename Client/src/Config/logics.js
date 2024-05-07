export const formatDate = (date) => {
  date = new Date(date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  date = date.toLocaleDateString("en-GB", options); // 'en-GB' locale uses the dd/mm/yyyy format
  return date.split("T")[0];
};
