# Candelia — React + Node Web Prototype

The supplied Candelia Expo prototype has been converted to a regular React DOM application using **JavaScript and JSX**, with a **Node.js server**. It preserves all 27 original screens, local images, sample content and interactive demo flows. No Expo, React Native, TypeScript, Docker or mobile emulator is required.

## Start the demo on Windows

1. Extract the entire ZIP folder.
2. Install Node.js 22.12 or newer if it is not already installed.
3. Double-click **START-WEB.bat** inside the `candelia-web` folder.
4. Open **http://localhost:3000**. If the browser opens before the server is ready, refresh it.

Keep the command window open while demonstrating. Close it to stop the server.
The included `dist` folder is already built, so this launcher needs no dependency installation or internet access. Images are included locally.

Alternatively, on Windows, macOS or Linux:

```bash
cd candelia-web
node server.js --production
```

If port 3000 is busy, close the other application or select another port:

```powershell
$env:PORT=3005
node server.js --production
```

Then open http://localhost:3005.

## Mobile simulation in the browser

- Desktop: an interactive phone frame with a simulated status bar, scrollable screen and bottom navigation.
- A searchable screen list lets you jump directly to any of the 27 screens.
- Device selector: 375 px, 390 px and 430 px viewport widths.
- Focus button hides the screen list; restart returns to Welcome while keeping demo data.
- On a narrow phone browser, the app fills the screen without the desktop controls or phone border.
- Internal app back buttons preserve the original navigation flow.
- Direct links work, e.g. `http://localhost:3000/?screen=discover` or `?screen=provider`.

## Suggested walkthrough

1. Welcome → Begin your journey.
2. Discover → Fair Saloon → select service → Book → choose date/time → Confirm demo booking.
3. More → Your appointments → view or cancel the booking.
4. Visualize → sample portrait or local photo → select style/occasion → preview concept → save.
5. Home → Find your transformation → Wedding Transformation → goal/date → plan → Start this journey.
6. Journey → check milestones; select a membership.
7. More → Shop the edit → add products → shopping bag → demo checkout.
8. More → Academy → course → enter a name/email → save demo enrolment.
9. More → Provider workspace → explore appointments, staff, payments, reviews and customers.
10. Explore professional onboarding, franchise and corporate enquiry forms.

## Development / editing

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The Node server serves the React development app through Vite, handles API requests on the same origin, and supports hot reload. On Windows, `START-DEV.bat` does this automatically.

After editing, regenerate the included build:

```bash
npm run build
npm start
```

`START-PRODUCTION.bat` installs dependencies if needed, builds and starts the server.

## What is included

| File | Purpose |
| --- | --- |
| `src/App.jsx` | All 27 screen implementations, interactions and navigation |
| `src/main.jsx` | Browser simulator, device controls, screen navigator |
| `src/ui.jsx` | Standard HTML elements and SVG icons used by the screens |
| `src/styles.css` | Mobile app styling and responsive simulator layout |
| `src/data.js` | Original sample providers, services, programs, products and courses |
| `src/store.js` | Browser cache and Node API synchronization |
| `server.js` | Node HTTP server, development/production hosting and JSON persistence |
| `public/assets/` | Original supplied images |
| `dist/` | Ready-to-run production build |
| `tests/api.test.js` | API persistence, session separation, validation and file-serving tests |
| `SCREEN-COVERAGE.md` | Original presentation-to-screen mapping |
| `VALIDATION.md` | Checks performed on this conversion |

## Demo data and Node API

Demo data is kept separately for each browser using a random session identifier. Bookings, cancellations, cart contents, membership, saved style preferences, journey progress, enrolments and enquiries persist across refreshes and server restarts.

- `GET /api/health` — server availability.
- `GET /api/state` — retrieve the current browser's demo state.
- `PUT /api/state` — validate and save that state.

State requests carry an `x-demo-session` header. JSON is saved in `.demo-data/` (created on first save). Do not include this folder when distributing your project. `DEMO_DATA_DIR` can select another location. Browser storage provides a fallback if the server is unavailable. The simulator footer shows whether data is saved or offline. Clearing browser storage creates a new session; data is not shared across browsers/devices.

Use **More → Reset demo data** for a fresh demonstration.

## Prototype boundaries

AI results are preset style concepts; they do not generate or alter photos. A chosen photo is displayed in the browser and is not uploaded. Checkout, bookings, membership and enrolments are simulations. No payment, email, provider notification, real reservation, certification or credential verification occurs. The provider workspace is a demonstration, with no sign-in or access controls. The server is intended for local demonstrations and is not a production backend.

Original sample amounts are in Indian rupees (INR). Provider and image content is preserved from the supplied prototype. Fair Saloon is a real-business demo listing, not a claim of an actual Candelia partnership; its service prices and slots are illustrative. Other providers, staff, products and courses are sample data. See `SCREEN-COVERAGE.md` for the original content coverage.

## Checks

```bash
npm run build
npm run test:api
```

The built-in API tests use temporary folders and do not alter demonstration data.
