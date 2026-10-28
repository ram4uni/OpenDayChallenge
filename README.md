# Open Day – Starter Game Concept Card Challenge (Complete Source — Full Card Artwork Edition)

This is the **four-cards-per-deck beginner edition** for A-level and BTEC Open Day visitors. It is a static website, not an Unreal Engine project. There are **20 original card images** (four in each of five decks), a five-card brief showing **all of each card (no cropping)**, **Are You Ready?** screen, and an accurate countdown timer.

## Folder structure

```text
OpenDay_StarterCardChallenge_Complete_GitHubPages/
├── index.html       Main screens, buttons and HTML structure
├── style.css        Visual design, fonts, colours, card size and responsive layout
├── cards.js         Card categories, labels, descriptions and image file paths
├── game.js          Card flipping, round progression, results and countdown timer
├── CardImages/      20 original illustrations, organised into five folders
│   ├── Genre/
│   ├── TargetAudience/
│   ├── CoreMechanic/
│   ├── VisualStyle/
│   └── SpecialConstraint/
├── .nojekyll        Empty GitHub Pages configuration marker (NOT Node.js)
└── README.md        These instructions
```

## Play or edit locally

1. Extract the ZIP file.
2. Double-click `index.html` to open the activity in Edge or Chrome, or right-click `index.html` in Visual Studio Code and choose **Open with Live Server**.
3. Press **F11** for full-screen mode on the projector.
4. To change a **font size, colour or card dimensions**, edit `style.css` and refresh the page. The variables `--title-size` and `--card-width` are near the top.
5. To replace the **20 card options or images**, edit `cards.js`. New images can be PNG, JPG or WebP: place them inside `CardImages`, then update the relevant `image:` path.
6. To modify interactions or timer behaviour, edit `game.js`. The default timer is 15 minutes; presets are 10, 15 and 20 minutes, and whole-minute values from 1 to 180 are accepted.

There is **no build step**. No Visual Studio compiler, Node.js, Unreal Engine, Git LFS or external services are required.

## Publish on GitHub Pages (new repository)

1. Create a **new public GitHub repository**, such as `OpenDay-Starter-Card-Challenge`.
2. Extract the ZIP and add **all extracted files and the CardImages folder** to the **root** of the new repository. Don't upload the ZIP as a single file and don't nest everything in an extra folder.
3. Using GitHub Desktop, **Commit to main**, then **Publish branch** or **Push origin**, depending on what it displays.
4. On GitHub, go to **Settings → Pages**. Set **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)** and **Save**.
5. Once deployment finishes, visit `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`.

The `index.html` file loads `style.css`, then `cards.js`, then `game.js`, **in that order**. Keep these files together at the root. Each reference contains `?v=2.0.0` to reduce the risk of using old cached files. When you make later website updates, change the version number in `index.html` for each edited CSS/JS file (e.g. `?v=2.0.1`), then commit and push. This forces browsers to request the new version.

## Beginner deck choices

| Deck | Four choices |
|---|---|
| Genre | Adventure · Platformer · Puzzle · Racing |
| Target Audience | Ages 9–12 · Ages 13–15 · Ages 16–18 · Family |
| Core Mechanic | Collect · Jump & Traverse · Move & Dodge · Build & Place |
| Visual Style | Cartoon · Pixel Art · Low Poly · Comic |
| Special Constraint | No Combat · One Button · One Room Only · 60-Second Session |

All four cards appear in every category, with randomly shuffled positions. One card is selected from each category.

## Full artwork on the results screen

- All five cards are displayed in their **original full portrait proportions**, from top title through Design DNA, your game should include, and design limitation. The artwork is never cropped.
- Click or tap **any result card** to open a larger view. Press **Zoom in to read** to see higher-detail text and scroll down through the complete image. Use **Fit entire card** to return to a whole-card view.
- The original card-selection and countdown timer behaviours are unchanged.
- Result-card layout automatically shifts to three columns on tablets and two columns on small mobiles; mobile visitors can scroll vertically.

## Timer notes

- Counts down in `MM:SS`, for example 15:00 → 14:59 → 14:58.
- Start, Pause, Resume and Reset are supported.
- Silent during countdown; plays a short, cheerful `timer-finish.wav` flourish once at 00:00 for any chosen duration.
- At completion, displays “TIME’S UP! 🎉 Get ready to present your game!”; reset silences the sound.
- Sound playback depends on browser audio permissions, device volume and the tab remaining open.
- Uses a real-time deadline (`Date.now()`), which avoids a countdown drifting while the browser tab is inactive.
- A countdown does **not** survive a full page refresh or closing the browser.

## Helpful troubleshooting

- **No styling or interactions:** Verify that all four files (`index.html`, `style.css`, `cards.js`, `game.js`) are at the same level.
- **Missing card artwork:** Verify that `CardImages` was uploaded and that filenames/capitalisation match the paths in `cards.js` exactly. GitHub Pages is case-sensitive.
- **Old version shown on GitHub Pages:** Check deployment status under **Actions**, hard-refresh with `Ctrl + Shift + R`, or increase the `?v=` parameters in `index.html` before pushing.
- `.nojekyll` is an empty file that tells GitHub Pages not to run Jekyll; it is **not** a Node.js file.

The previous eight-card, advanced edition is separate and is not changed by this package.
