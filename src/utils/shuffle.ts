export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function seededShuffle<T>(array: T[], seed: number): T[] {
  const seededRandom = (s: number) => {
    return () => {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  };

  const random = seededRandom(seed);
  return array
    .map(value => ({ value, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
