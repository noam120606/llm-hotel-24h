# LLM Hotel — 24h du Code 2025 (CCI Le Mans)

Projet réalisé dans le cadre de l’édition **2025 des 24h du Code**, organisée par la **CCI Le Mans**.

L’objectif du projet est de proposer une expérience “hôtel” pilotée par une couche applicative Node.js (Express + EJS), intégrant plusieurs services (API Hôtel, actualités locales, météo) et des briques LLM/outils (LangChain, etc. selon configuration).

---

## Stack technique

- **Node.js** / **Express**
- **EJS** (templates)
- **Socket.io** (temps réel)
- **express-session** (sessions)
- **dotenv** (configuration)
- Dépendances LLM / agents :
  - `@langchain/*`, `@langchain/langgraph`
  - `@langchain/mistralai`, `@langchain/google-genai`
  - `langfuse-langchain` (observabilité)
- Autres :
  - `zod`, `moment`, `colors`, etc.

---

## Fonctionnalités (côté code)

Le point d’entrée `index.js` initialise l’app et démarre le “bot” :

- Démarrage d’un **webserver** via `structure/Webserver/Webmanager.js`
- Accès à plusieurs APIs via `structure/Apis/*` :
  - **Hotel API** : client API basé sur une base URL (voir `structure/Apis/Hotel`)
  - **Actus** : récupération d’actualités (WorldNewsAPI) géolocalisées autour du Mans (coordonnées codées dans le module)
  - **Weather** : module météo (présent dans `structure/Apis/Weather`)

---

## Prérequis

- **Node.js** (version récente recommandée)
- Un gestionnaire de paquets (**npm**)

---

## Installation

```bash
npm install
```

---

## Configuration (.env)

Créer un fichier `.env` à la racine en se basant sur `.env.example` :

Variables principales :

- `WEB_PORT` : port du serveur web (ex: `3000`)
- `SESSION_SECRET` : secret de session Express
- Clés API (selon les features utilisées) :
  - `ACTUS_APIKEY`
  - `HOTEL_APIKEY`
  - `MISTRALAI_API_KEY` / `GOOGLE_API_KEY` / `TAVILY_API_KEY` (selon les modules activés)
- (Optionnel) Langfuse :
  - `LANGFUSE_SECRET_KEY`, `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_BASEURL`

---

## Lancer le projet

### Mode normal

```bash
node index.js
```

### Via npm

Le script `start` actuel fait un `npm install` puis lance l’app :

```bash
npm run start
```

---

## Structure du projet (résumé)

- `index.js` : point d’entrée
- `structure/Californyan/` : logique “bot” (initialisation, démarrage)
- `structure/Webserver/` : serveur web (Express, sessions, sockets, etc.)
- `structure/Apis/` : intégrations externes (Hôtel, Actus, Météo…)
- `views/` : vues EJS
- `public/` : assets statiques (CSS, images, etc.)

---

## Notes

- L’API Hôtel utilise une **base URL** configurée en dur dans le code (`structure/Apis/Hotel/index.js`). Url de base fourni par les organisateurs du hackathon qui n'existe evidement plus.
- Le module “Actus” requiert une clé `ACTUS_APIKEY` et effectue des requêtes vers WorldNewsAPI.

---

## Licence

Projet réalisé dans le cadre d’un hackathon (**24h du Code 2025 — CCI Le Mans**).  
Licence à préciser si vous souhaitez l’ouvrir officiellement (MIT, Apache-2.0, etc.).
