const MONTHS = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

// "08 Dec 2015" -> "08/12/2015"
export function formatDateFr(omdbDate) {
  if (!omdbDate || omdbDate === "N/A") {
    return "Non disponible";
  }

  const [day, month, year] = omdbDate.split(" ");
  return `${day.padStart(2, "0")}/${MONTHS[month]}/${year}`;
}