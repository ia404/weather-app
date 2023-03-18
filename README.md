# Weather App For Hikers

## Set-Up Guide
**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**
```sh
node -v
npm -v
```

## Installation
**1. Install the dependencies which are required for the weather app to be launched :**

```sh
npm install
```

## Development Workflow
**2. Start a live-reload development server :**

```sh
npm run dev
```

**3. Generate a production build in `./build` :**

```sh
npm run build
```

**4. Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

## Quick App Overview
- The initial run will display the iPhone version (iPhone 6/7 Plus screen size).
- The CSS pre-processor in use is Less.
- Arrow buttons can be used to navigate to the forecast page or warning page (if there is a warning)
- Circular butons can be used to move directly to a chosen page by clicking on the button that corresponds to be page
- e.g middle button would direct you to the forecast page.

```