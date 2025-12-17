import express from "express";
import cors from "cors";
import { quoteOne } from "./yahoo.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

const DEFAULT_SYMBOLS = ["BTC-USD", "ETH-USD", "SOL-USD", "XRP-USD", "ADA-USD"];

// 1) health
app.get("/health", (req, res) => {
  res.json({ message: "ok" });
});

// 2) lista símbolos suportados
app.get("/v1/symbols", (req, res) => {
  res.json({ symbols: DEFAULT_SYMBOLS });
});

// 3) quote única
app.get("/v1/quote/:symbol", async (req, res) => {
  try {
    const data = await quoteOne(req.params.symbol);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// 4) múltiplas quotes (usada pela API principal)
app.post("/v1/quotes", async (req, res) => {
  try {
    const symbols = Array.isArray(req.body?.symbols) && req.body.symbols.length
      ? req.body.symbols
      : DEFAULT_SYMBOLS;

    const results = [];
    for (const s of symbols) {
      results.push(await quoteOne(s));
    }

    res.json({ prices: results });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CRIPTOID Quotes Service listening on port ${PORT}`);
});
