import YahooFinance from "yahoo-finance2";

export async function quoteOne(symbol) {
  const s = String(symbol).trim().toUpperCase();
  const q = await YahooFinance.quote(s);

  const price = q?.regularMarketPrice ?? q?.postMarketPrice ?? q?.preMarketPrice;
  const currency = q?.currency ?? q?.financialCurrency ?? "USD";
  const t = q?.regularMarketTime ? new Date(q.regularMarketTime * 1000).toISOString() : new Date().toISOString();

  if (price == null) {
    throw new Error(`Sem preço disponível para ${s}`);
  }

  return {
    symbol: s,
    price: Number(price),
    currency: String(currency),
    fetched_at: t
  };
}
