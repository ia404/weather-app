# Weather App For Hikers
## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Quick App Overview](#quick-app-overview)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**
```sh
node -v
npm -v
```

## Installation
**1. Make the project your own :**
```sh
npm init
```

**2. Install the dependencies which are required for the weather app to be launched :**
```sh
npm install
```

## Development Workflow
**3. Start a live-reload development server :**

```sh
npm run dev
```

**4. Generate a production build in `./build` :**

```sh
npm run build
```

**5. Start local production server with [serve](https://github.com/zeit/serve):**
```sh
npm start
```

## Quick App Overview
- The initial run will display the iPhone version (iPhone 6/7 Plus screen size).
- The CSS pre-processor in use is Less.
- In the first page, the weather page information for the day will be shown.
- In the second page, the forecast for the week would be shown alongside any warnings.
- In the third page, if there is a warning, warning information will be shown.
- Arrow buttons can be used to navigate to the forecast page or warning page (if there is a warning)
- Circular butons can be used to move directly to a chosen page by clicking on the button that corresponds to be page
- e.g middle button would direct you to the forecast page.