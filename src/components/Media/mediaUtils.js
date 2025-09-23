// Validate image URL
export const validateImage = (url) =>
  new Promise((resolve) => {
    if (!url) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

// Validate video URL via HEAD request
export const validateVideo = async (url) => {
  if (!url) return false;
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
};

// Retry helper with attempt callback
export const retryAsync = async (fn, maxAttempts = 3, delay = 500, onRetry) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      if (result) return { success: true, attempt };
    } catch {}
    if (attempt < maxAttempts) {
      onRetry?.(attempt);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  return { success: false };
};

// Validate media URL based on type with retries
export const getValidMediaUrl = async ({ mediaType, hdurl, url, retryCount = 3, retryDelay = 500, onRetry }) => {
  let validUrl = null;

  if (mediaType === "image") {
    if ((await retryAsync(() => validateImage(hdurl), retryCount, retryDelay, onRetry)).success)
      validUrl = hdurl;
    else if ((await retryAsync(() => validateImage(url), retryCount, retryDelay, onRetry)).success)
      validUrl = url;
  } else if (mediaType === "video") {
    if ((await retryAsync(() => validateVideo(url), retryCount, retryDelay, onRetry)).success)
      validUrl = url;
  }

  return validUrl;
};

// Generate alien-style skeleton text
export const getAlienText = (length = 20) => {
  const chars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};
