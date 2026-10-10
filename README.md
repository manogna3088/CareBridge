# CareBridge — Community Volunteering Portal

A responsive React + Vite frontend prototype for Team Aurora's CareBridge project.

## Requirements
- Node.js 20.19+ or 22.12+ recommended for Vite 6
- Visual Studio Code
- Internet connection for Google Fonts and the illustrative Unsplash photos

## Run locally
1. Extract the ZIP file.
2. Open the `carebridge-frontend` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL Vite prints, usually `http://localhost:5173`.

## Features in this prototype
- Responsive landing page and navigation
- Opportunity cards with sample event data
- Search by keyword and location
- Category filters
- Event detail modal
- Demo apply interaction and toast feedback
- Login and sign-up UI with volunteer / NGO role selection
- Responsive layouts for mobile, tablet and desktop
- Accessible labels and reduced-motion support

## Important prototype notes
- Event content and locations are illustrative sample data.
- Login, sign-up, applications and saved-event buttons are not connected to a backend.
- Forms show demo feedback only; they do not send or store account data.
- Photos are loaded from Unsplash over the internet.
- Google Maps, Cloud Run APIs and Cloud Firestore integration are not implemented yet.

## Next development steps
1. Agree on backend API contracts.
2. Connect authentication.
3. Load opportunities from Cloud Firestore through backend APIs.
4. Submit and persist volunteer registrations.
5. Add Google Maps-based event location discovery.
6. Add protected volunteer and NGO dashboards.
