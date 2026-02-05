# Users Frontend

Detta är ett frontend-projekt byggt med **React** och **TypeScript** (Create React App).  
Applikationen innehåller inloggning, registrering och en skyddad Orders-sida.


## Installera beroenden

Kör följande kommando från projektets rotmapp:


```bash
npm install
```
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