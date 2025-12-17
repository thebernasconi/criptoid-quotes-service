# CRIPTOID — Quotes Service (API Secundária)

Componente secundária que busca cotações no Yahoo Finance e expõe rotas REST para a API principal.

## Rotas (>= 4)

- GET  `/health`
- GET  `/v1/symbols`
- GET  `/v1/quote/:symbol`
- POST `/v1/quotes`

## Como rodar (somente Docker)

```bash
docker build -t criptoid-quotes-service .
docker run -d --name criptoid-quotes --network criptoid-net \
  -e PORT=9000 \
  -p 9000:9000 \
  criptoid-quotes-service
