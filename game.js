/* GAME LOGIC: Five rounds, reveal, results, readiness, and real-time timer.
   To change colours or font sizes, edit style.css instead. */
'use strict';
const $ = id => document.getElementById(id);
const SCREENS = ['welcome','pick','results','ready','timer'];
let roundIndex = 0;
let picked = [];
let currentCard = null;
let hasPicked = false;
let revealTimeout = 0;

function showScreen(id) {
  SCREENS.forEach(name => { $(name).hidden = name !== id; });
  $('restart-anytime').hidden = id === 'welcome';
  window.scrollTo(0, 0);
}
function shuffled(original) {
  const copy = original.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i],copy[j]] = [copy[j],copy[i]];
  }
  return copy;
}
function clearRevealTimer() { if (revealTimeout) clearTimeout(revealTimeout); revealTimeout = 0; }
function startChallenge() {
  clearRevealTimer();
  resetTimerState();
  picked = [];
  roundIndex = 0;
  loadRound();
}
function loadRound() {
  clearRevealTimer();
  hasPicked = false;
  currentCard = null;
  const deck = DECKS[roundIndex];
  $('round-eyebrow').textContent = `Round ${roundIndex + 1} of ${DECKS.length}`;
  $('round-title').textContent = deck.title;
  $('round-help').textContent = deck.tip;
  $('progress').replaceChildren();
  DECKS.forEach((step,i) => {
    const chip=document.createElement('span');
    chip.className='progress-step' + (i < roundIndex?' done':i===roundIndex?' current':'');
    chip.textContent=(i<roundIndex?'✓ ':'')+(i+1)+'. '+step.name;
    $('progress').append(chip);
  });
  $('reveal').hidden = true;
  $('round-next').hidden = true;
  const grid=$('card-grid');
  grid.replaceChildren();
  shuffled(deck.cards).forEach((card,index) => {
    const button=document.createElement('button');
    button.type='button'; button.className='flip-card';
    button.setAttribute('aria-label',`Choose mystery card ${index+1}`);
    button.innerHTML = `<span class="flip-card-inner">
      <span class="flip-face card-back"><span class="shape" aria-hidden="true">◆</span><span class="number">${index+1}</span><span class="label">PICK A CARD</span></span>
      <span class="flip-face card-front"><img alt="${card.name} card" src="${card.image}"></span>
    </span>`;
    button.addEventListener('click',()=>chooseCard(button,card));
    grid.append(button);
  });
  showScreen('pick');
}
function chooseCard(button,card) {
  if(hasPicked) return;
  hasPicked = true;
  currentCard = card;
  picked[roundIndex] = card;
  for(const item of $('card-grid').children) {
    item.disabled = true;
    if(item!==button) item.classList.add('not-picked');
  }
  button.classList.add('is-flipped');
  const showReveal = () => {
    $('reveal-title').textContent='Your choice: '+card.name;
    $('reveal-description').textContent=card.desc;
    $('reveal').hidden=false;
    $('round-next').hidden=false;
    $('round-next').textContent=roundIndex===DECKS.length-1?'Reveal my game brief →':'Next round →';
  };
  revealTimeout=window.setTimeout(showReveal, matchMedia('(prefers-reduced-motion: reduce)').matches?40:760);
}
function nextRound() {
  if(!hasPicked) return;
  if(roundIndex < DECKS.length - 1) { roundIndex++; loadRound(); }
  else showResults();
}
function showResults() {
  const grid = $('brief-grid');
  grid.replaceChildren();
  picked.forEach((card, i) => {
    const item = document.createElement('article');
    item.className = 'brief-card';
    const artButton = document.createElement('button');
    artButton.type = 'button';
    artButton.className = 'brief-card-art';
    artButton.setAttribute('aria-label', `View the full ${card.name} card and read its design details`);
    artButton.title = `Enlarge ${card.name} card`;
    const pic = document.createElement('img');
    pic.src = card.image;
    pic.alt = `Full ${card.name} card including Design DNA, design guidance and design limitation`;
    pic.loading = 'eager';
    artButton.append(pic);
    artButton.addEventListener('click', () => openArtwork(card));
    const label = document.createElement('span');
    label.className = 'mini-label';
    label.textContent = DECKS[i].name;
    const value = document.createElement('strong');
    value.textContent = card.name;
    item.append(artButton, label, value);
    grid.append(item);
  });
  showScreen('results');
}
function showReady() {
  const wrap=$('ready-chips'); wrap.replaceChildren();
  picked.forEach((card,i) => {
    const chip=document.createElement('div');chip.className='choice-chip';
    const label=document.createElement('small');label.textContent=DECKS[i].name;
    chip.append(label,document.createTextNode(card.name));wrap.append(chip);
  });
  showScreen('ready');
}
function openArtwork(card) {
  if (!card) return;
  const dialog = $('art-dialog');
  dialog.classList.remove('read-mode');
  $('zoom-art').textContent = 'Zoom in to read';
  $('zoom-art').setAttribute('aria-pressed', 'false');
  $('art-title').textContent = card.name;
  $('art-img').src = card.image;
  $('art-img').alt = `Full ${card.name} card artwork and design instructions`;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open','');
  dialog.scrollTop = 0;
}
function viewArtwork() { openArtwork(currentCard); }
function toggleArtworkZoom() {
  const dialog = $('art-dialog');
  const zoomed = dialog.classList.toggle('read-mode');
  $('zoom-art').textContent = zoomed ? 'Fit entire card' : 'Zoom in to read';
  $('zoom-art').setAttribute('aria-pressed', String(zoomed));
  dialog.scrollTop = 0;
}

/* TIMER: Calculate from a wall-clock deadline. SetInterval only updates
   the display; it does NOT determine elapsed time. This is why the
   countdown stays accurate if a browser tab becomes inactive. */
let timerInterval = null;
let timerMode = 'idle'; // idle | running | paused | finished
let endAtMs = 0;
let remainingMs = 15*60000;
// A single cheerful finish sound. Prime the local audio on the Start button
// to meet browsers' user-interaction playback policies.
const finishSound = $('timer-finish-sound');
function prepareFinishSound() {
  finishSound.muted = true;
  const attempt = finishSound.play();
  if (attempt && typeof attempt.then === 'function') {
    attempt.then(() => { finishSound.pause(); finishSound.currentTime = 0; finishSound.muted = false; })
      .catch(() => { finishSound.muted = false; });
  } else { finishSound.pause(); finishSound.currentTime = 0; finishSound.muted = false; }
}
function playFinishSound() {
  finishSound.pause();
  finishSound.currentTime = 0;
  finishSound.muted = false;
  const attempt = finishSound.play();
  if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
}
function stopFinishSound() {
  finishSound.pause();
  finishSound.currentTime = 0;
}

function validMinutes() {
  const n=Number($('minutes').value);
  if(!Number.isInteger(n) || n<1 || n>180){
    $('minutes').value=15;
    return 15;
  }
  return n;
}
function displayTime(ms) {
  const sec=Math.max(0,Math.ceil(ms/1000));
  return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
}
function updateTime(ms) { $('timer-display').textContent=displayTime(ms); }
function stopInterval() { if(timerInterval!==null){clearInterval(timerInterval);timerInterval=null;} }
function setTimerStatus(text,finish=false) {
  $('timer-status').textContent=text;
  $('timer-status').classList.toggle('finished',finish);
  $('timer').classList.toggle('done',finish);
}
function drawTimerControls() {
  const idle=timerMode==='idle', running=timerMode==='running', paused=timerMode==='paused';
  $('start-timer').hidden=!idle;
  $('pause-timer').hidden=!running;
  $('resume-timer').hidden=!paused;
  $('minutes').disabled=!idle;
  document.querySelectorAll('.preset').forEach(btn=>{
    btn.disabled=!idle;
    btn.classList.toggle('selected',idle&&Number(btn.dataset.minutes)===Number($('minutes').value));
  });
}
function resetTimerState() {
  stopInterval(); stopFinishSound(); timerMode='idle'; endAtMs=0;
  remainingMs=validMinutes()*60000;
  updateTime(remainingMs);
  setTimerStatus('Ready when you are');
  drawTimerControls();
}
function tick() {
  if(timerMode!=='running')return;
  remainingMs=Math.max(0,endAtMs-Date.now());
  updateTime(remainingMs);
  if(remainingMs<=0){
    timerMode='finished';stopInterval();
    setTimerStatus("TIME'S UP! 🎉 Get ready to present your game!",true);
    drawTimerControls();playFinishSound();
  }
}
function startTimer() {
  if(timerMode!=='idle')return;
  prepareFinishSound();
  remainingMs=validMinutes()*60000;
  endAtMs=Date.now()+remainingMs;
  timerMode='running';setTimerStatus('Countdown running');drawTimerControls();
  updateTime(remainingMs);stopInterval();timerInterval=setInterval(tick,100);tick();
}
function pauseTimer() {
  if(timerMode!=='running')return;
  tick();if(timerMode!=='running')return;
  timerMode='paused';stopInterval();setTimerStatus('Paused');drawTimerControls();
}
function resumeTimer() {
  if(timerMode!=='paused')return;
  endAtMs=Date.now()+remainingMs;timerMode='running';setTimerStatus('Countdown running');drawTimerControls();
  stopInterval();timerInterval=setInterval(tick,100);tick();
}
function chooseMinutes(value) {
  if(timerMode!=='idle')return;
  $('minutes').value=value;remainingMs=validMinutes()*60000;
  updateTime(remainingMs);drawTimerControls();
}
$('begin').addEventListener('click',startChallenge);
$('round-next').addEventListener('click',nextRound);
$('view-art').addEventListener('click',viewArtwork);
$('close-art').addEventListener('click',()=>$('art-dialog').close());
$('zoom-art').addEventListener('click',toggleArtworkZoom);
$('go-ready').addEventListener('click',showReady);
$('go-timer').addEventListener('click',()=>{resetTimerState();showScreen('timer');});
$('new-challenge').addEventListener('click',()=>{clearRevealTimer();resetTimerState();showScreen('welcome');});
$('restart-anytime').addEventListener('click',()=>{clearRevealTimer();resetTimerState();showScreen('welcome');});
$('start-timer').addEventListener('click',startTimer);
$('pause-timer').addEventListener('click',pauseTimer);
$('resume-timer').addEventListener('click',resumeTimer);
$('reset-timer').addEventListener('click',resetTimerState);
$('minutes').addEventListener('input',()=>{if(timerMode==='idle'){
  const n=Number($('minutes').value);
  if(Number.isInteger(n)&&n>=1&&n<=180){remainingMs=n*60000;updateTime(remainingMs);}drawTimerControls();
}});
document.querySelectorAll('.preset').forEach(btn=>btn.addEventListener('click',()=>chooseMinutes(Number(btn.dataset.minutes))));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
window.addEventListener('focus',tick);
// Set initial timer without starting it.
resetTimerState();
