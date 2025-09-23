export const TITLE = 'Astronomy Picture of the Day'
export const API_ROUTE = `https://api.apod.xstar97thenoob.com`
export const DATE_EARLIEST = '1995-06-20'

export const updateUrlQueryParam = (key, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
  };

export const isValidDate = (date) => {
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  };

  export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  export const formatDate = (dateObj) => {
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      console.error('Invalid date object:', dateObj);
      return null;
    }
  
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
export const setFavicon = (url) => {
  const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.href = url;
  document.head.appendChild(link);
};

export const setMetaTags = (data) => {
  // Set Open Graph meta tags
  document.title = data.title || 'Default Page Title';
  document.querySelector('meta[property="og:title"]').content = data.title || TITLE;
  document.querySelector('meta[property="og:description"]').content = data.explanation || '';
  document.querySelector('meta[property="og:image"]').content = data.hdurl || data.url || '';
  document.querySelector('meta[property="og:url"]').content = window.location.href;
};