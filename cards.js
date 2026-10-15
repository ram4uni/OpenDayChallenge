/* EDIT CARD OPTIONS HERE.
   The 20 images live in CardImages/; change the image: path to replace artwork.
   This file MUST load before game.js (see index.html). */
'use strict';
const DECKS = [
  {id:'genre', name:'Genre', title:'Choose your genre', tip:'What kind of game would you like to design?', cards:[
    {name:'Adventure', image:'CardImages/Genre/adventure.webp', desc:'Explore places and discover a story.'},
    {name:'Platformer', image:'CardImages/Genre/platformer.webp', desc:'Jump across platforms and overcome obstacles.'},
    {name:'Puzzle', image:'CardImages/Genre/puzzle.webp', desc:'Solve clues and interesting problems.'},
    {name:'Racing', image:'CardImages/Genre/racing.webp', desc:'Race to the finish or try to beat a time.'}
  ]},
  {id:'audience', name:'Target Audience', title:'Choose your audience', tip:'Who will enjoy playing your game?', cards:[
    {name:'Ages 9–12', image:'CardImages/TargetAudience/ages-9-12.webp', desc:'A game aimed at younger players.'},
    {name:'Ages 13–15', image:'CardImages/TargetAudience/ages-13-15.webp', desc:'A game aimed at early teenagers.'},
    {name:'Ages 16–18', image:'CardImages/TargetAudience/ages-16-18.webp', desc:'A game aimed at older teenagers.'},
    {name:'Family', image:'CardImages/TargetAudience/family.webp', desc:'Something that different ages can enjoy together.'}
  ]},
  {id:'mechanic', name:'Core Mechanic', title:'Choose your main action', tip:'What does the player do most often?', cards:[
    {name:'Collect', image:'CardImages/CoreMechanic/collect.webp', desc:'Pick up useful items to reach a goal.'},
    {name:'Jump & Traverse', image:'CardImages/CoreMechanic/jump-traverse.webp', desc:'Move, jump and cross gaps or obstacles.'},
    {name:'Move & Dodge', image:'CardImages/CoreMechanic/move-dodge.webp', desc:'Avoid obstacles and time your movement.'},
    {name:'Build & Place', image:'CardImages/CoreMechanic/build-place.webp', desc:'Place and combine objects to build something.'}
  ]},
  {id:'visual', name:'Visual Style', title:'Choose your visual style', tip:'What will your game look like?', cards:[
    {name:'Cartoon', image:'CardImages/VisualStyle/cartoon.webp', desc:'Colourful shapes and expressive characters.'},
    {name:'Pixel Art', image:'CardImages/VisualStyle/pixel-art.webp', desc:'A playful look built from tiny square pixels.'},
    {name:'Low Poly', image:'CardImages/VisualStyle/low-poly.webp', desc:'Clean, simple 3D shapes and colours.'},
    {name:'Comic', image:'CardImages/VisualStyle/comic.webp', desc:'Bold outlines and comic-book energy.'}
  ]},
  {id:'constraint', name:'Special Constraint', title:'Choose your special challenge', tip:'One simple rule makes your game more creative.', cards:[
    {name:'No Combat', image:'CardImages/SpecialConstraint/no-combat.webp', desc:'Create an exciting game without fighting.'},
    {name:'One Button', image:'CardImages/SpecialConstraint/one-button.webp', desc:'Use one main button to control the game.'},
    {name:'One Room Only', image:'CardImages/SpecialConstraint/one-room.webp', desc:'Keep the game in a single room or space.'},
    {name:'60-Second Session', image:'CardImages/SpecialConstraint/60-second-session.webp', desc:'Each complete play session lasts just one minute.'}
  ]}
];
