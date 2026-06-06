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

let username =
localStorage.getItem(
"username"
);

const loginScreen =
document.getElementById(
"loginScreen"
);

const joinBtn =
document.getElementById(
"joinBtn"
);

const usernameInput =
document.getElementById(
"usernameInput"
);

// =====================
// ELEMENTS
// =====================

function createProfile(){

const name =
usernameInput.value.trim();

if(name==="")
return;

username = name;

localStorage.setItem(
"username",
name
);

if(
!localStorage.getItem(
"xp"
)
){

xp = 9;

level = 1;

localStorage.setItem(
"xp",
xp
);

localStorage.setItem(
"level",
level
);

}

loginScreen.style.display =
"none";

updateXPUI();

renderLeaderboard();

renderProfile();

}

function renderProfile(){

document.getElementById(
"profileName"
).textContent =
username || "Guest";

document.getElementById(
"profileXP"
).textContent =
xp;

document.getElementById(
"profileLevel"
).textContent =
level;

}

function renderLeaderboard(){

const board =
document.getElementById(
"leaderboard"
);

if(!board) return;

board.innerHTML = "";

if(!username) return;

board.innerHTML = `

<div class="leader-row">

🥇 ${username}

<span>

${xp} XP

</span>

</div>

`;

}

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

renderProfile();

renderLeaderboard();

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

if(xp >= 10){
unlockAchievement("First XP");
}

if(xp >= 100){
unlockAchievement("Level One Scholar");
}

if(xp >= 500){
unlockAchievement("Knowledge Seeker");
}

if(xp >= 1000){
unlockAchievement("XP Master");
}

updateXPUI();

}

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

unlockAchievement(
"Goal Crusher"
);

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

// =====================
// FILE UPLOAD SYSTEM
// =====================

let uploadedFiles =

JSON.parse(
localStorage.getItem(
"uploadedFiles"
)
) || [];

const fileInput =
document.getElementById(
"fileInput"
);

const uploadBtn =
document.getElementById(
"uploadBtn"
);

const fileList =
document.getElementById(
"fileList"
);

const fileModal =
document.getElementById(
"fileModal"
);

const closeBtn =
document.querySelector(
".close"
);

function getFileIcon(filename){

const ext =
filename.split('.')
.pop()
.toLowerCase();

if(ext === "pdf")
return "📄";

if(ext === "txt")
return "📝";

if(ext === "docx")
return "📋";

return "📁";

}

function saveFiles(){

localStorage.setItem(
"uploadedFiles",
JSON.stringify(
uploadedFiles
));

}

function renderFiles(){

fileList.innerHTML = "";

if(uploadedFiles.length === 0){

fileList.innerHTML = `

<p style="
color:var(--muted);
text-align:center;
padding:20px;
">

No files uploaded yet

</p>

`;

return;

}

uploadedFiles.forEach(
(file, index) => {

const div =
document.createElement("div");

div.className =
"file-item";

div.innerHTML = `

<div class="file-item-info"
onclick="
viewFile(${index})
">

<span class="file-item-icon">
${getFileIcon(file.name)}
</span>

<div>

<div class="file-item-name">
${file.name}
</div>

<div class="file-item-size">
${(file.size /
1024).toFixed(2)} KB
</div>

</div>

</div>

<div class="file-item-actions">

<button
onclick="
deleteFile(${index})
">
Delete
</button>

</div>

`;

fileList.appendChild(div);

});

}

function viewFile(index){

const file =
uploadedFiles[index];

const modal =
document.getElementById(
"fileModal"
);

const modalTitle =
document.getElementById(
"modalTitle"
);

const modalBody =
document.getElementById(
"modalBody"
);

modalTitle.textContent =
file.name;

modalBody.textContent =
file.content;

modal.style.display = "block";

addXP(10);

unlockAchievement(
"Study Material Read"
);

}

function deleteFile(index){

uploadedFiles.splice(index, 1);

saveFiles();

renderFiles();

}

function handleFileUpload(file){

if(!file)
return;

const allowedTypes =
[
"application/pdf",
"text/plain",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

if(!allowedTypes.includes(
file.type)){

alert(
"❌ Unsupported file type. Please upload PDF, TXT, or DOCX."
);

return;

}

if(file.size > 5 *
1024 * 1024){

alert(
"❌ File size exceeds 5MB limit."
);

return;

}

const reader =
new FileReader();

reader.onload = (e) => {

let content = e.target.result;

if(file.type === "application/pdf"){

content =
"[PDF File - Content preview not available]";

}

uploadedFiles.push({

name: file.name,

size: file.size,

content: content,

uploadedAt:
new Date()
.toLocaleDateString()

});

saveFiles();

renderFiles();

addXP(5);

alert(
"✅ File uploaded successfully! +5 XP"
);

};

reader.readAsText(file);

}

// =====================
// FILE INPUT LISTENERS
// =====================

if(uploadBtn){
uploadBtn.addEventListener(
"click",
function(e){
e.preventDefault();
fileInput.click();
}
);
}

if(fileInput){
fileInput.addEventListener(
"change",
(e) => {
handleFileUpload(
e.target.files[0]
);
}
);
}

// =====================
// DRAG & DROP LISTENERS
// =====================

const uploadArea =
document.getElementById(
"uploadArea"
);

if(uploadArea){

uploadArea.addEventListener(
"dragover",
(e) => {
e.preventDefault();
e.stopPropagation();
uploadArea.style.borderColor =
"var(--primary)";
}
);

uploadArea.addEventListener(
"dragleave",
(e) => {
e.preventDefault();
e.stopPropagation();
uploadArea.style.borderColor =
"var(--border)";
}
);

uploadArea.addEventListener(
"drop",
(e) => {
e.preventDefault();
e.stopPropagation();
uploadArea.style.borderColor =
"var(--border)";
handleFileUpload(
e.dataTransfer.files[0]
);
}
);

}

// =====================
// MODAL LISTENERS
// =====================

if(closeBtn){
closeBtn.addEventListener(
"click",
() => {
fileModal.style.display = "none";
}
);
}

if(fileModal){
window.addEventListener(
"click",
(e) => {
if(e.target === fileModal){
fileModal.style.display = "none";
}
}
);
}

// =====================
// EVENT LISTENERS
// =====================

joinBtn.addEventListener(
"click",
createProfile
);

// =====================
// LOAD
// =====================

updateXPUI();

updateStreak();

updateTimerDisplay();

renderGoals();

renderAchievements();

renderFiles();

renderProfile();

renderLeaderboard();

if(username){

loginScreen.style.display =
"none";

}else{

loginScreen.style.display =
"flex";

}
