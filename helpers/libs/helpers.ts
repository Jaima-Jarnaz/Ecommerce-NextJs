export const ClearButtonState = () => {
  // Loop through localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
    // Check if the key matches the pattern buttonState_${id}
    const key = localStorage.key(i);
    if (key && key.startsWith("buttonState_")) {
      localStorage.removeItem(key);
    }
  }
};
