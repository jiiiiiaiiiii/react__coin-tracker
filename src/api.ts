export function fectchCoins() {
  return fetch('https://api.coinpaprika.com/v1/coins')
	.then((response) => response.json()
  );
}

// fetch: API -> return: json