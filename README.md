# CRIPTOID — Quotes Service (API Secundária)

O **Quotes Service** é a **API secundária** do projeto **CRIPTOID**. Ele é responsável por:

- Consultar cotações de criptomoedas usando a **API externa Yahoo Finance**
- Normalizar a resposta (para facilitar o consumo pela API Principal)
- Expor endpoints simples que a **API Principal (FastAPI)** consome

> Este repositório contém **apenas** a API Secundária. O Frontend e a API Principal estão em repositórios separados.

---

## Arquitetura (fluxograma)

<img width="1018" height="283" alt="Captura de tela 2025-12-17 204358" src="https://github.com/user-attachments/assets/cd998ffd-0f04-46a8-b46b-f6782f0033b6" />

## Repositórios do projeto

Substitua SEU_USUARIO pelo seu usuário do GitHub:

Quotes Service (este): https://github.com/thebernasconi/criptoid-quotes-service

API Principal: https://github.com/thebernasconi/criptoid-api

Frontend: https://github.com/thebernasconi/criptoid-frontend

## Endpoints
Saúde

GET /health
Retorna {"message":"ok"}

Cotação por símbolo

GET /v1/quote/:symbol
Exemplo:

/v1/quote/BTC-USD

/v1/quote/ETH-USD

(Opcional) Lista de símbolos

GET /v1/symbols
Lista alguns símbolos suportados (se implementado no código).

(Opcional) Cotação em lote

POST /v1/quotes
Consulta vários símbolos de uma vez (se implementado no código).

Exemplo de body:

{ "symbols": ["BTC-USD", "ETH-USD"] }


Observação: normalmente o navegador não chama este serviço diretamente. Quem chama é a API Principal.

## API Externa (Yahoo Finance)

Este serviço obtém cotações via Yahoo Finance (API externa).

Cadastro: não é necessário para o MVP.

Símbolos usados: por exemplo BTC-USD, ETH-USD, SOL-USD, XRP-USD, etc.

Observação importante: o consumo é feito dentro da aplicação (sem redirecionar o usuário para outro app/site).

## Pré-requisitos

Docker Desktop instalado e funcionando

Porta 9000 livre no host

## Como rodar (sem docker compose)
## 1) Criar a network (apenas 1 vez)

Se você já criou a criptoid-net para o projeto, pode pular este passo:

docker network create criptoid-net

## 2) Build da imagem

Na pasta criptoid-quotes-service:

docker build -t criptoid-quotes-service .

## 3) Subir o container
docker run -d --name criptoid-quotes --network criptoid-net `
  --restart unless-stopped `
  -p 9000:9000 `
  criptoid-quotes-service

## Testes rápidos (iniciante)
1) Confirmar que está rodando
docker ps

2) Health check
curl http://localhost:9000/health

3) Consultar uma cotação
curl http://localhost:9000/v1/quote/BTC-USD

4) (Se existir no seu código) consultar em lote

PowerShell:

$body = @{ symbols = @("BTC-USD","ETH-USD") } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://localhost:9000/v1/quotes" -ContentType "application/json" -Body $body

Como rodar junto com o projeto completo

Este serviço deve estar na mesma Docker network que:

criptoid-api (API principal)

criptoid-db (Postgres)

A API Principal deve receber:

QUOTES_SERVICE_URL="http://criptoid-quotes:9000"

Troubleshooting
Ver logs
docker logs criptoid-quotes --tail 200

Reiniciar o container
docker restart criptoid-quotes

Parar e remover
docker rm -f criptoid-quotes

::contentReference[oaicite:0]{index=0}
