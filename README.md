# Users Frontend

Detta är ett frontend-projekt byggt med **React** och **TypeScript** (Create React App).  
Applikationen innehåller inloggning, registrering och en skyddad Orders-sida.


## Förutsättningar

- **Node.js**: >= 20.17.0 (se `.nvmrc`)
- **npm**: >= 10.0.0

## Installera beroenden

Kör följande kommando från projektets rotmapp:

```bash
npm install
```

> [!TIP]
> Om du får problem med beroenden (peer dependency conflicts), prova:
> `npm install --legacy-peer-deps`

## Miljövariabler

Kopiera `.env.example` till `.env` (om den inte redan finns) och fyll i eventuella värden.
Starta applikationen

```bash
npm start
```

## Åtkomst till Orders utan backend (endast utveckling)

Eftersom backend ännu inte är implementerad används Local Storage för att simulera inloggning.

Öppna applikationen i webbläsaren

Öppna DevTools (F12) → Console

Kör följande kommando:

```bash
localStorage.setItem("jwt", "dev-token");
```

Uppdatera sidan och gå till:
```bash
http://localhost:3000/orders
```

För att logga ut:
```bash
localStorage.removeItem("jwt");
```