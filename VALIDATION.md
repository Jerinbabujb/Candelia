# Conversion verification — 5 October 2026

## Stack and build

- React DOM 19.2.3; JavaScript and JSX screen components.
- Vite 7.1.3 production build completed successfully.
- Node HTTP server; no Expo or React Native dependencies.
- Development app entry, JSX module and API health endpoint returned HTTP 200.
- Production assets served correctly through the Node server.

## Browser verification

Actual automated browser checks performed in Chromium:

- All 27 original screens rendered; screen navigator and URL query stayed in sync.
- Provider search, service booking, confirmation and persistence after refresh.
- Cancellation updated saved appointment status.
- Add to bag, increase/decrease quantity and simulated checkout.
- Academy course selection, name/email entry and saved enrolment.
- Invalid target date was rejected; valid goal generated a plan and started a journey.
- Preset style concept was previewed and saved.
- Membership selection was saved.
- Provider appointments, staff, payments, reviews and customers tabs were usable.
- Device widths measured correctly at 375, 390 and 430 pixels; focus mode hid the navigator.
- Full-screen phone layouts checked at 375 × 844, 390 × 844 and 430 × 844.
- Mobile content scrolled vertically with no page-level horizontal overflow.
- Reset cleared saved bookings, enrolments, journey and style data.
- 16 browser API saves succeeded; no browser runtime errors or failed HTTP responses.

## Node API tests

`npm run test:api` — 4 tests passed:

1. New session state, booking/cart save round trip and separation between sessions.
2. Invalid session, malformed JSON, missing state fields and negative prices rejected.
3. Rejected writes left saved state intact; reset cleared state.
4. Built app hosting, missing assets/API routes, unsupported methods and traversal rejection.

`preview.png` is an actual desktop screenshot of the converted application.

## Scope

This validates a local web demonstration, not real AI generation, provider integrations, payments, authentication or physical device testing. Original prototype simulations remain clearly marked.
