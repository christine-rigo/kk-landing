export async function getGames() {
    try {
      const res = await fetch('https://api.kalokalo.workers.dev/games');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
}