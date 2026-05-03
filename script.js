let grades = [];

function addItem() {
  const name = document.getElementById("itemName").value;
  const grade = Number(document.getElementById("itemGrade").value);
  const weight = Number(document.getElementById("itemWeight").value);

  if (!name || grade < 0 || grade > 100 || weight <= 0 || weight > 100) {
    alert("Please enter a valid name, grade, and weight.");
    return;
  }

  grades.push({ name, grade, weight });

  document.getElementById("itemName").value = "";
  document.getElementById("itemGrade").value = "";
  document.getElementById("itemWeight").value = "";

  updateDisplay();
}

function removeItem(index) {
  grades.splice(index, 1);
  updateDisplay();
}

function updateDisplay() {
  const gradeList = document.getElementById("gradeList");
  gradeList.innerHTML = "";

  let completedWeight = 0;
  let currentPoints = 0;

  grades.forEach((item, index) => {
    completedWeight += item.weight;
    currentPoints += item.grade * (item.weight / 100);

    const div = document.createElement("div");
    div.className = "grade-item";

    div.innerHTML = `
      <span><strong>${item.name}</strong> — ${item.grade}% worth ${item.weight}%</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    gradeList.appendChild(div);
  });

  const completedAverage =
    completedWeight === 0 ? 0 : (currentPoints / completedWeight) * 100;

  document.getElementById("completedWeight").textContent =
    `${completedWeight.toFixed(2)}%`;

  document.getElementById("currentPoints").textContent =
    `${currentPoints.toFixed(2)}%`;

  document.getElementById("completedAverage").textContent =
    `${completedAverage.toFixed(2)}%`;
}

function calculateNeeded() {
  const targetGrade = Number(document.getElementById("targetGrade").value);
  const finalWeight = Number(document.getElementById("finalWeight").value);

  let currentPoints = 0;

  grades.forEach(item => {
    currentPoints += item.grade * (item.weight / 100);
  });

  if (targetGrade <= 0 || targetGrade > 100 || finalWeight <= 0 || finalWeight > 100) {
    alert("Please enter a valid target grade and final exam weight.");
    return;
  }

  const needed = (targetGrade - currentPoints) / (finalWeight / 100);
  const result = document.getElementById("finalResult");

  if (needed > 100) {
    result.textContent = `You need ${needed.toFixed(2)}% on the final. This target is not realistically possible.`;
  } else if (needed <= 0) {
    result.textContent = `You have already secured your target grade.`;
  } else {
    result.textContent = `You need ${needed.toFixed(2)}% on the final to finish with ${targetGrade.toFixed(2)}%.`;
  }
}