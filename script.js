let courses = JSON.parse(localStorage.getItem("courses")) || {};
let currentCourse = null;

function saveData() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

function createCourse() {
  const name = prompt("Enter course name:");
  if (!name) return;

  courses[name] = [];
  currentCourse = name;
  saveData();
  renderCourses();
  renderGrades();
}

function switchCourse(name) {
  currentCourse = name;
  renderGrades();
}

function addItem() {
  if (!currentCourse) {
    alert("Create or select a course first.");
    return;
  }

  const grade = Number(document.getElementById("itemGrade").value);
  const weight = Number(document.getElementById("itemWeight").value);

  if (grade < 0 || grade > 100 || weight <= 0 || weight > 100) {
    alert("Invalid input.");
    return;
  }

  courses[currentCourse].push({ grade, weight });
  saveData();
  renderGrades();
}

function renderCourses() {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  Object.keys(courses).forEach(course => {
    const btn = document.createElement("button");
    btn.textContent = course;
    btn.onclick = () => switchCourse(course);
    container.appendChild(btn);
  });
}

function renderGrades() {
  const list = document.getElementById("gradeList");
  list.innerHTML = "";

  if (!currentCourse) return;

  let totalWeight = 0;
  let currentPoints = 0;

  courses[currentCourse].forEach((item, i) => {
    totalWeight += item.weight;
    currentPoints += item.grade * (item.weight / 100);

    const div = document.createElement("div");
    div.textContent = `${item.grade}% (${item.weight}%)`;
    list.appendChild(div);
  });

  const avg = totalWeight === 0 ? 0 : (currentPoints / totalWeight) * 100;

  document.getElementById("completedWeight").textContent =
    `${totalWeight.toFixed(2)}%`;

  document.getElementById("currentPoints").textContent =
    `${currentPoints.toFixed(2)}%`;

  document.getElementById("completedAverage").textContent =
    `${avg.toFixed(2)}%`;
}

function calculateNeeded() {
  const target = Number(document.getElementById("targetGrade").value);
  const finalWeight = Number(document.getElementById("finalWeight").value);

  let currentPoints = 0;

  courses[currentCourse].forEach(item => {
    currentPoints += item.grade * (item.weight / 100);
  });

  const needed = (target - currentPoints) / (finalWeight / 100);

  const result = document.getElementById("finalResult");

  if (needed > 100) {
    result.textContent = `Need ${needed.toFixed(2)}% (not possible)`;
  } else if (needed <= 0) {
    result.textContent = `Target already secured`;
  } else {
    result.textContent = `Need ${needed.toFixed(2)}% on final`;
  }
}

window.onload = () => {
  renderCourses();
};