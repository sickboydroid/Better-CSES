import { questionData } from "./data.js";

function giveDifficulty() {
  const res = [];
  questionData.sort((q1, q2) => {
    const a1 = (q1.acceptedCount / q1.submissionCount) * 100;
    const a2 = (q2.acceptedCount / q2.submissionCount) * 100;
    return a1 - a2;
  });
  const count = questionData.length;
  const extremeIdx = 0;
  const hardIdx = Math.ceil(0.1 * count);
  const mediumIdx = Math.ceil(0.3 * count);
  const easyIdx = Math.ceil(0.7 * count);
  let difficulty = 3;
  for (let i = extremeIdx; i < count; i++) {
    if (i == hardIdx) {
      difficulty--;
    } else if (i == mediumIdx) {
      difficulty--;
    } else if (i == easyIdx) {
      difficulty--;
    }
    questionData[i].difficulty = difficulty;
  }
}

function bringSolvedOnTop() {
  questionData.sort((a, b) => {
    if (isSolved(a.id)) return -1;
    return 1;
  });
}

function loadData() {
  //   giveDifficulty();
  shuffleArray(questionData);
  bringSolvedOnTop();
  //   console.log(JSON.stringify(questionData));
  for (const question of questionData) {
    addItem({
      id: question.id,
      link: question.link,
      linkText: question.name,
      difficulty: question.difficulty,
    });
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
  }
  return arr;
}

function createCheckbox() {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = `<label class="checkbox">
        <input type="checkbox" id="cb" />
        <span class="child1"></span>
      </label>`;
  return [tempDiv.firstChild, tempDiv.firstChild.childNodes[1]];
}

function addItem({ id, link, linkText, difficulty }) {
  const container = document.getElementById("item-list");

  const itemDiv = document.createElement("div");
  itemDiv.className = "item";

  const a = document.createElement("a");
  a.href = link;
  a.textContent = linkText;
  a.target = "_blank";
  a.className = "link";

  const label = document.createElement("span");
  label.className = `label ${difficultyMap[difficulty].class}`;
  label.textContent = difficultyMap[difficulty].text;

  const [checkboxContainer, checkbox] = createCheckbox();
  checkbox.checked = isSolved(id);

  if (checkbox.checked) itemDiv.classList.add("done");
  else itemDiv.classList.remove("done");
  checkbox.addEventListener("click", () => {
    setSolved(id, checkbox.checked);
    playSound(checkbox.checked);
    if (checkbox.checked) itemDiv.classList.add("done");
    else itemDiv.classList.remove("done");
  });

  itemDiv.appendChild(a);
  itemDiv.appendChild(label);
  itemDiv.appendChild(checkboxContainer);

  container.appendChild(itemDiv);
}

function isSolved(id) {
  return localStorage.getItem(id) === "true";
}
function setSolved(id, solved) {
  localStorage.setItem(id, solved);
}
function playSound(checked) {
  const checkSound = document.getElementById("checkSound");
  const uncheckSound = document.getElementById("uncheckSound");
  checkSound.pause();
  uncheckSound.pause();
  checkSound.currentTime = 0;
  uncheckSound.currentTime = 0;
  if (checked) {
    checkSound.play();
  } else {
    uncheckSound.play();
  }
}

const difficultyMap = {
  0: { text: "easy", class: "easy" },
  1: { text: "medium", class: "medium" },
  2: { text: "hard", class: "hard" },
  3: { text: "extreme", class: "extreme" },
};

loadData();
