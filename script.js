// =====================
// STREAK SYSTEM
// =====================

let streak =
parseInt(
localStorage.getItem("streak")
) || 1;

const streakEl =
document.getElementById(
"streak"
);

function updateStreak(){

let lastVisit =
localStorage.getItem(
"lastVisit"
);

let today =
new Date()
.toDateString();

if(lastVisit){

let previous =
new Date(lastVisit);

let current =
new Date(today);

let difference =
Math.floor(
(current - previous)
/
(1000*60*60*24)
);

if(difference === 1){

streak++;

}

if(difference > 1){

streak = 1;

}

}

localStorage.setItem(
"lastVisit",
today
);

localStorage.setItem(
"streak",
streak
);

streakEl.textContent =
streak;

}

// =====================
// XP SYSTEM
// =====================

let xp =
parseInt(
localStorage.getItem("xp")
) || 0;

let level =
parseInt(
localStorage.getItem("level")
) || 1;

// =====================
// ELEMENTS
// =====================

const xpEl =
document.getElementById("xp");

const levelEl =
document.getElementById("level");

const progressFill =
document.getElementById(
"progressFill"
);

// =====================
// UPDATE UI
// =====================

function updateXPUI(){

xpEl.textContent = xp;

levelEl.textContent = level;

let progress =
xp % 100;

progressFill.style.width =
progress + "%";

}

// =====================
// ADD XP
// =====================

function addXP(amount){

xp += amount;

let newLevel =
Math.floor(xp / 100) + 1;

if(newLevel > level){

level = newLevel;

alert(
"🏆 Level Up! Level "
+ level
);

}

localStorage.setItem(
"xp",
xp
);

localStorage.setItem(
"level",
level
);

updateXPUI();

}

// =====================
// LOAD
// =====================

// =====================
// POMODORO TIMER
// =====================

const timerDisplay =
document.getElementById(
"timerDisplay"
);

const startBtn =
document.getElementById(
"startBtn"
);

const pauseBtn =
document.getElementById(
"pauseBtn"
);

const resetBtn =
document.getElementById(
"resetBtn"
);

const DEFAULT_TIME =
25 * 60;

let timeLeft =
DEFAULT_TIME;

let timerRunning =
false;

let timerInterval =
null;

function updateTimerDisplay(){

let minutes =
Math.floor(
timeLeft / 60
);

let seconds =
timeLeft % 60;

timerDisplay.textContent =

`${String(minutes)
.padStart(2,"0")}:${String(seconds)
.padStart(2,"0")}`;

}

function startTimer(){

if(timerRunning)
return;

timerRunning = true;

timerInterval =
setInterval(()=>{

timeLeft--;

updateTimerDisplay();

if(timeLeft <= 0){

completeSession();

}

},1000);

}

function pauseTimer(){

timerRunning = false;

clearInterval(
timerInterval
);

}

function resetTimer(){

pauseTimer();

timeLeft =
DEFAULT_TIME;

updateTimerDisplay();

}

function completeSession(){

pauseTimer();

addXP(15);

alert(
"🎉 Focus Session Complete!\n\n+15 XP Earned"
);

timeLeft =
DEFAULT_TIME;

updateTimerDisplay();

}

startBtn.addEventListener(
"click",
startTimer
);

pauseBtn.addEventListener(
"click",
pauseTimer
);

resetBtn.addEventListener(
"click",
resetTimer
);

// =====================
// GOALS
// =====================

let goals =

JSON.parse(
localStorage.getItem(
"goals"
)
) || [];

const goalInput =
document.getElementById(
"goalInput"
);

const goalDate =
document.getElementById(
"goalDate"
);

const addGoalBtn =
document.getElementById(
"addGoalBtn"
);

const goalList =
document.getElementById(
"goalList"
);

function saveGoals(){

localStorage.setItem(
"goals",
JSON.stringify(
goals
));

}

function addGoal(){

const text =
goalInput.value.trim();

const deadline =
goalDate.value;

if(
text === "" ||
deadline === ""
){
return;
}

goals.push({

text:text,

deadline:deadline

});

saveGoals();

renderGoals();

goalInput.value="";

goalDate.value="";

}

function deleteGoal(index){

goals.splice(index,1);

saveGoals();

renderGoals();

}

function completeGoal(index){

addXP(50);

alert(
"🎉 Goal Completed!\n\n+50 XP"
);

goals.splice(index,1);

saveGoals();

renderGoals();

}

function renderGoals(){

goalList.innerHTML="";

goals.forEach((goal,index)=>{

const today =
new Date();

const target =
new Date(
goal.deadline
);

const daysLeft =
Math.ceil(

(target - today)

/

(1000*60*60*24)

);

const div =
document.createElement(
"div"
);

div.className =
"goal-item";

div.innerHTML = `

<div>

<b>
${goal.text}
</b>

<br>

<small>
📅 ${goal.deadline}
</small>

<br>

<small>
⏳ ${daysLeft} days left
</small>

</div>

<div>

<button
onclick="
completeGoal(${index})
"
>
✔
</button>

<button
onclick="
deleteGoal(${index})
"
>
🗑
</button>

</div>

`;

goalList.appendChild(
div
);

});

}

addGoalBtn.addEventListener(
"click",
addGoal
);

// =====================
// ACHIEVEMENTS
// =====================

let achievements =

JSON.parse(
localStorage.getItem(
"achievements"
)
) || [];

function unlockAchievement(name){

const exists =
achievements.some(
a => a.name === name
);

if(exists)
return;

achievements.push({

name:name,

date:
new Date()
.toLocaleDateString()

});

localStorage.setItem(
"achievements",
JSON.stringify(
achievements
));

renderAchievements();

}

function renderAchievements(){

const container =
document.getElementById(
"achievementList"
);

container.innerHTML="";

if(
achievements.length===0
){

container.innerHTML=`

<div class="achievement">

No achievements yet

</div>

`;

return;

}

achievements.forEach(item=>{

container.innerHTML += `

<div class="achievement">

🏆 ${item.name}

<br>

<small>

${item.date}

</small>

</div>

`;

});

}

if(xp >= 10){

unlockAchievement(
"First XP"
);

}

if(xp >= 100){

unlockAchievement(
"Level One Scholar"
);

}

if(xp >= 500){

unlockAchievement(
"Knowledge Seeker"
);

}

if(xp >= 1000){

unlockAchievement(
"XP Master"
);

}

