export const setItemIntoStorage = (key: string, value: any): void => {
  try {
    const serializedValue = value;
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item to localStorage: ${error}`);
  }
};

export const getItem = (key: string): any | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }

    if (typeof serializedValue === "string") {
      return serializedValue;
    }

    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`);
    return null;
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
  }
}
