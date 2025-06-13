const adjectives = [
  "Swift",
  "Silent",
  "Brave",
  "Mighty",
  "Clever",
  "Gentle",
  "Bold",
  "Calm",
  "Eager",
  "Fancy",
  "Rapid",
  "Fierce",
  "Sly",
  "Noble",
  "Vivid",
  "Radiant",
  "Daring",
  "Lively",
  "Graceful",
  "Frosty",
];

const nouns = [
  "Lion",
  "Tiger",
  "Eagle",
  "Shark",
  "Wolf",
  "Falcon",
  "Panther",
  "Bear",
  "Leopard",
  "Fox",
  "Hawk",
  "Jaguar",
  "Cobra",
  "Dolphin",
  "Otter",
  "Coyote",
  "Sparrow",
  "Puma",
  "Cougar",
  "Viper",
];

const generateRandomElement = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateUsername = (): string => {
  const adjective = generateRandomElement(adjectives);
  const noun = generateRandomElement(nouns);
  const number = Math.floor(100 + Math.random() * 9000); // Generates a number between 100 and 9999
  return `${adjective}-${noun}-${number}`;
};
