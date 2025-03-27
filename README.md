# Canvas Game with Persistent Data - Ocean Adventure

![Game Screenshot](https://users.aber.ac.uk/eds/CS25320_teaching_materials/2022/falling_stuff.html)

A horizontally-scrolling ocean-themed game where players avoid sharks and collect treasure, featuring persistent leaderboard data.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [How to Play](#how-to-play)
5. [Development](#development)
6. [Technologies Used](#technologies-used)
7. [Future Improvements](#future-improvements)
8. [Credits](#credits)

## Overview
This game transforms the original falling_stuff.html concept into an underwater adventure. Instead of vertically falling objects, players navigate horizontally moving sea creatures, collecting coins while avoiding sharks.

## Features
- 🎮 Interactive canvas gameplay
- 🦈 Shark enemies with collision detection
- 💰 Collectible coins for scoring
- ❤️ Health power-ups
- 🎵 Background music and sound effects
- 📊 Persistent leaderboard (PHP/MySQL)
- 📱 Responsive design with fullscreen option
- ℹ️ Help and About pages

## Installation
1. Clone the repository to your web server
2. Ensure PHP and MySQL are configured
3. Set up the database using the provided SQL schema
4. Update database connection details in `leaderboard.php`
5. Set proper file permissions

## How to Play
1. Use mouse movement to control your fish
2. Avoid sharks (3 hits ends the game)
3. Collect gold coins for points
4. Grab purple health power-ups to restore hits
5. Try to achieve the highest score!

## Development
Developed in VS Code with:
- LiveServer extension for testing
- Prettier for code formatting
- Chrome Developer Tools for debugging

## Technologies Used
- HTML5 Canvas
- JavaScript (ES6)
- CSS3
- PHP
- MySQL
- Web Audio API

## Future Improvements
- Implement requestAnimationFrame() for smoother animation
- Add object removal on collision
- Develop level progression system
- Improve leaderboard functionality
- Enhance graphics quality

## Credits
**Code References:**
- Collision detection: [YouTube Tutorial](https://www.youtube.com/watch?v=rtBCVe3j_24)
- Fullscreen implementation: [h3manth.com](https://h3manth.com/content/html5-canvas-full-screen-and-full-page)
- Canvas image rendering: [StackOverflow](https://stackoverflow.com/questions/62616484/im-trying-to-put-an-image-for-a-player-on-an-html5-canvas-in-a-io-game)

**Assets:**
- Background music: "Gone Fishin'"
- Sound effects: [OpenGameArt](https://opengameart.org/content/hit-sound-effects)
- Background image: [Freepik](https://www.freepik.com/free-vector/coral-reef-ocean-sea-underwater-background_22753076.htm)
- Header image: [Unsplash](https://unsplash.com/photos/9kSZdpIf_Fo)

University of Aberystwyth - CS25320 Coursework 2022-23
