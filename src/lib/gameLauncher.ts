export async function launchGame(
  game_id: string,
  jwt: string,
  type: "FREE" | "CHARGED",
  currency_code: string,
  lang: string = "en",
  test: boolean = false
) {
  try {
    const res = await fetch(`https://api.kalokalo.workers.dev/user/game_sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        game_id,
        type,
        currency_code,
        lang,
        test,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
}
