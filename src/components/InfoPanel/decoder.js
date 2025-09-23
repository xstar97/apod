export const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";

export const getRandomChar = () =>
  alienChars[Math.floor(Math.random() * alienChars.length)];

export const initAlienText = (text) =>
  text.split("").map(() => getRandomChar()).join("");

export const decodeText = (arr, text, setFn, steps = 10, charDelay = 30) =>
  new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      const step = Math.max(1, Math.floor(text.length / steps));
      let done = true;
      for (let i = 0; i < step && index < text.length; i++, index++) {
        arr[index] = text[index];
      }
      setFn([...arr].join(""));
      if (index < text.length) done = false;
      if (done) {
        clearInterval(interval);
        resolve();
      }
    }, charDelay);
  });
