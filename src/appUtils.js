import { TITLE, API_ROUTE } from "./Utils.js";

// Fetch APOD data for a given date
export const fetchAPODData = async (date) => {
  try {
    const res = await fetch(`${API_ROUTE}?date=${date}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch APOD data:", err);
    return null;
  }
};

// Update document title, favicon, and meta tags based on APOD data
export const updateDocumentMeta = (data, setFavicon, setMetaTags) => {
  document.title = data.title || TITLE;
  document.description = data.description || "";
  const faviconUrl = data.hdurl || data.url;
  if (faviconUrl) setFavicon(faviconUrl);
  setMetaTags(data);
};

// Determine initial date from URL or fallback
export const getInitialDateFromUrl = (isValidDate, getCurrentDate) => {
  const params = new URLSearchParams(window.location.search);
  const queryDate = params.get("date");
  if (queryDate && isValidDate(queryDate)) return queryDate;
  return getCurrentDate();
};

// Increment/decrement date and update URL
export const changeDate = (currentDate, increment, updateUrlQueryParam) => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + increment);
  const formatted = newDate.toISOString().split("T")[0];
  updateUrlQueryParam("date", formatted);
  return formatted;
};

// Format selected calendar date and update URL
export const formatCalendarDate = (newDate, updateUrlQueryParam) => {
  const formatted = new Date(newDate).toISOString().split("T")[0];
  updateUrlQueryParam("date", formatted);
  return formatted;
};
