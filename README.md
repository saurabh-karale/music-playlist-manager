# Mixtape — Music Playlist Manager

A responsive React application for browsing songs, organizing playlists, and simulating music playback. Built for the Frontend Developer assignment at Micro Integrated Semiconductor Systems Pvt. Ltd.

## Tech stack

- React 19 + Vite
- Tailwind CSS 4 with custom CSS for responsive layouts and artwork
- Axios for fetching `public/songs.json`
- Browser localStorage for saving playlists

## Run locally

Prerequisites: Node.js 22 or newer, npm, and Git. An internet connection is required for the first dependency installation.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Do not open `index.html` directly.

```bash
npm test         # Run the automated unit tests
npm run build    # Generate production files in dist/
npm run preview  # Serve the production build locally
```

## Features

- Song library of 12 mock tracks, searchable by title, artist or genre, with a genre filter and `mm:ss` duration.
- Create, rename and delete playlists (confirmation before deletion); blank and duplicate names are rejected.
- Add songs to the selected playlist; duplicate songs are prevented. Remove songs and change order using up/down arrows.
- View song count and total duration for each playlist.
- Simulated Play/Pause, Next, Previous and Play mix controls, elapsed/total time and a seekable progress bar. No audio files or streaming API are used.
- Playlists and their song order persist across refreshes through localStorage.
- Responsive layouts, reusable components, loading, no-results, empty and network-error states.

## How to use

1. Click **New playlist** and enter a unique name. The new playlist is selected automatically.
2. Search or filter the song library. Click **+** next to a song to add it. A check mark means it is already in the selected playlist.
3. Select any playlist in the sidebar to view or edit it. On smaller screens, use **View mix** to jump to the playlist details.
4. Use the arrows to change song order or the **×** button to remove a song. Rename or delete with the buttons next to **Play mix**.
5. Click a track's artwork or **Play mix** to simulate playback. Use the bottom player to pause, resume, navigate tracks or seek to another position using the progress bar.

## Project structure

```text
public/
  songs.json              # 12 mock songs with durations in seconds
  favicon.svg
src/
  main.jsx                # React entry point
  App.jsx                 # State, side effects and feature handlers
  index.css               # Tailwind import and custom visual styles
  components/             # Button, Input, Modal, SongRow, PlaylistCard,
                          # PlayerBar, SongLibrary, PlaylistDetails, etc.
  lib/
    api.js                # Axios request
    songs.js              # Duration formatting and library filtering
    playlists.js          # Playlist validation, storage, song operations
    player.js             # Queue navigation and simulated playback timing
tests/logic.test.js      # Built-in Node test runner
```

## Assumptions made

- A starter playlist, **My first mix**, contains three songs on first use. Users can rename or delete it. An empty saved collection is not replaced by starter data.
- Names are trimmed, case-insensitively unique and limited to 60 characters. Songs can appear in different playlists, but never twice in the same playlist.
- The playlist total displays whole minutes (rounded down); individual tracks use exact minutes and seconds.
- Playback is simulated using a one-second interval. Pause preserves the elapsed time; changing tracks resets it. Seeking changes the simulated position. At the end of a track, the next track starts automatically. Next/Previous wrap around the current source queue (all library songs or the playlist from which playback started). The library search/filter does not change its playback queue. The current playing track and filter settings are not persisted; only playlists are required to persist.
- No backend, authentication or external assets are needed. Artwork is original CSS decoration, not album covers. Song metadata is illustrative mock data.
- If storage is blocked, the app remains usable in memory and shows a warning.

## Tests and verification

`npm test` runs thirteen tests covering mock data, duration formatting, search/filter, playlist names, duplicates, removal, reordering, storage, queue navigation, playback timing and seeking.

All 13 unit tests passed in the preparation environment. The updated JSX and Tailwind CSS were also checked in an offline Chromium smoke test using locally available React 18.2, a mock Axios adapter and the sample song data. Timer progression, pause, resume, seeking, automatic next track, previous track, and no horizontal overflow at 375, 768 and 1440 pixels were verified. The standard npm installation, actual React 19/Vite production build, Axios request, and real browser storage across page reloads still need to be checked on a machine with npm registry access. The actual Netlify deployment is not yet performed.

Manual verification checklist after installing the project:

- Create empty/duplicate names (reject); create a unique playlist; rename it; cancel and confirm deletion.
- Add two songs; attempt duplicate addition; move up/down; remove a song; refresh and verify the playlist stays saved.
- Search for a nonexistent track; change genre; reset filters.
- Play a library song and playlist; verify Pause, Next and Previous, including wraparound. Check that elapsed time advances, pauses and resumes, seeking works, and the next song starts at 0:00.
- Inspect widths of 375, 768 and 1440 pixels. Confirm no horizontal scrolling and that all buttons are reachable.
- Use browser network throttling or temporarily block `songs.json` to check loading and error/retry states.

## What I would improve

- Add drag-and-drop as an alternative to up/down buttons.
- Add more end-to-end tests with the actual Vite server and Axios.
- Add custom playlist artwork and sorting options.
- Add an optional backend with login and cloud synchronization if future requirements need it.

## Deploy on Netlify

1. Push the existing project repository to GitHub (keep its Git history).
2. In Netlify, import the GitHub repository as a new project.
3. Leave the base directory blank if `package.json` is at the root. The included `netlify.toml` sets Node.js 22, build command `npm run build` and publish directory `dist`.
4. Deploy and open the generated live URL. Verify the songs load, the player timer works and playlists survive a refresh.
5. Add the actual live link to this README before submitting.

There are no environment variables containing secrets or backend setup requirements. The Vercel configuration has been removed; this version is configured for Netlify.

## Git history

The project is organized into incremental local commits. Run `git log --oneline` to review the history. Use your own Git identity for future commits. Publish the existing repository rather than creating a new repository inside the project folder.
