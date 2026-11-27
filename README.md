
# Mixtape – Music Playlist Manager

A modern, responsive Music Playlist Manager web application built using React, Tailwind CSS, Axios, and localStorage.

Developed as part of the Frontend Developer assignment for Micro Integrated Semiconductor Systems Pvt. Ltd.

## Live Demo

- **Live Application:** https://bejewelled-peony-157996.netlify.app/
- **GitHub Repository:** https://github.com/saurabh-karale/music-playlist-manager

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- Custom CSS
- Axios
- localStorage
- Git and GitHub
- Netlify

## Features

### Song Library

- Browse 12 songs with title, artist, genre, and duration.
- Search songs by title, artist, or genre.
- Filter songs by genre.
- Display song duration in mm:ss format.
- Fetch song data from a local JSON file using Axios.

### Playlist Management

- Create, rename, and delete playlists.
- Confirmation modal before deleting a playlist.
- Playlist names are required and must be unique.
- Add and remove songs from playlists.
- Prevent duplicate songs within the same playlist.
- Reorder songs using up and down buttons.
- Display total song count and playlist duration.

### Music Player

- Play and Pause controls.
- Next and Previous track navigation.
- Display current song information.
- Display elapsed time and total song duration.
- Interactive and seekable progress bar.
- Automatic transition to the next song.
- Pause and resume playback without losing elapsed time.

Playback is simulated as specified in the assignment. No real audio streaming is required.

### Data Persistence

- Playlists are saved using browser localStorage.
- Playlist data and song order persist across page refreshes.

### Responsive UI

- Mobile layout (375px).
- Tablet layout (768px).
- Desktop layout (1440px).
- Reusable UI components.
- Consistent colors, typography, and spacing.
- Loading, empty playlist, no-results, and error states.

## Installation and Setup

### Prerequisites

- Node.js 22 or newer
- npm
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/saurabh-karale/music-playlist-manager.git
```

### Step 2: Navigate to the Project Directory

```bash
cd music-playlist-manager
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal, normally:

http://localhost:5173

## Available Commands

| Command | Description |
| --- | --- |
| npm install | Install project dependencies |
| npm run dev | Start the development server |
| npm test | Run automated unit tests |
| npm run build | Create a production build |
| npm run preview | Preview the production build |

## Project Structure

```text
music-playlist-manager/
├── public/
│   ├── songs.json
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── lib/
│   │   ├── api.js
│   │   ├── songs.js
│   │   ├── playlists.js
│   │   └── player.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tests/
│   └── logic.test.js
├── index.html
├── package.json
├── package-lock.json
├── netlify.toml
└── README.md
```

## Reusable Components

The application uses reusable React components to maintain consistent styling and improve code maintainability.

- Button
- Input
- Modal
- SongRow
- PlaylistCard
- PlayerBar
- SongLibrary
- PlaylistDetails

## How to Use

1. Create a new playlist using the New Playlist button.
2. Enter a unique playlist name.
3. Browse, search, or filter songs in the song library.
4. Add songs to the selected playlist.
5. Rename, delete, remove, or reorder songs as required.
6. Select a song or click Play Mix to simulate playback.
7. Use the player controls to pause, resume, navigate tracks, or seek through the progress bar.

Playlist changes are automatically saved using localStorage.

## Assumptions Made

- Song information is illustrative mock data stored in `public/songs.json`.
- Real audio playback is not required for this assignment.
- A starter playlist is provided for first-time users.
- Playlist names are trimmed, case-insensitively unique, and limited to 60 characters.
- A song can belong to multiple playlists but cannot appear twice in the same playlist.
- Playlist duration is displayed in whole minutes, while individual song durations use mm:ss format.
- Playback progress is simulated using a one-second interval.
- Next and Previous controls navigate the current playback queue.
- Only playlist data is persisted across page refreshes.
- No backend, database, authentication, or external music API is required.
- If localStorage is unavailable, the application remains usable in memory and displays a warning.

## Testing and Verification

The project includes 13 automated unit tests covering:

- Song data validation
- Duration formatting
- Song search and genre filtering
- Playlist name validation
- Duplicate song prevention
- Song removal and reordering
- Playlist storage
- Playback queue navigation
- Playback timing
- Progress bar seeking

All 13 unit tests passed in the preparation environment.

Responsive layouts and playback interactions were also checked using an offline Chromium browser with a mock Axios adapter and locally available React 18.2.

To run the tests locally:

```bash
npm test
```

### Manual Testing Checklist

- Create, rename, and delete playlists.
- Validate empty and duplicate playlist names.
- Add, remove, and reorder songs.
- Verify search and genre filtering.
- Verify Play, Pause, Next, and Previous controls.
- Verify playback timer and progress bar.
- Refresh the page and verify playlist persistence.
- Check responsive layouts at 375px, 768px, and 1440px.
- Verify song loading and error states.

The offline browser checks do not replace full end-to-end testing with the production dependencies and deployed application.

## Deployment

The application is deployed on Netlify.

**Live URL:** https://bejewelled-peony-157996.netlify.app/

### Netlify Configuration

| Setting | Value |
| --- | --- |
| Build command | npm run build |
| Publish directory | dist |
| Node.js version | 22 |

The project includes a `netlify.toml` configuration file.

To deploy manually:

1. Install dependencies using `npm install`.
2. Generate the production build using `npm run build`.
3. Upload the generated `dist` folder to Netlify.
4. Open the deployed application URL.

Alternatively, the GitHub repository can be connected directly to Netlify for automatic deployments.

No environment variables or backend configuration are required.

## Git Version Control

The project uses incremental Git commits to track feature development, testing, documentation, and deployment configuration.

To view the commit history:

```bash
git log --oneline
```

## Future Improvements

- Add drag-and-drop playlist reordering.
- Add optional real audio playback.
- Add custom playlist artwork.
- Add additional song sorting options.
- Add user authentication and cloud synchronization.
- Expand automated end-to-end testing.
- Improve accessibility through additional testing.

## Developer

**Saurabh Karale**

Frontend Developer

GitHub: https://github.com/saurabh-karale

---

Developed for the Frontend Developer technical assignment at Micro Integrated Semiconductor Systems Pvt. Ltd.
