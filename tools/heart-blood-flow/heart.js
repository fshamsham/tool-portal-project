// Blood Flow Through the Heart: step-through diagram and ordering quiz.
// All the text lives in STEPS and QUIZ_ORDER below, so it's easy to edit.

(function () {
  // "part" must match a data-part attribute in the SVG.
  // "oxygen" is "poor", "rich", "poor-to-rich" or "rich-to-poor".
  var STEPS = [
    {
      part: "vena-cavae",
      name: "Vena cavae",
      oxygen: "poor",
      text: "Blood that has already given its oxygen to the body comes back to the heart through two big veins: the superior (upper) and inferior (lower) vena cava."
    },
    {
      part: "right-atrium",
      name: "Right atrium",
      oxygen: "poor",
      text: "This upper chamber on the heart's right side collects the returning blood. An atrium is like a waiting room: it fills up, then passes the blood down."
    },
    {
      part: "tricuspid-valve",
      name: "Tricuspid valve",
      oxygen: "poor",
      text: "A one-way door with three flaps. It opens to let blood drop into the right ventricle, then snaps shut so blood can't flow back."
    },
    {
      part: "right-ventricle",
      name: "Right ventricle",
      oxygen: "poor",
      text: "This lower chamber squeezes to pump blood out toward the lungs. The ventricles are the heart's pumps."
    },
    {
      part: "pulmonary-valve",
      name: "Pulmonary valve",
      oxygen: "poor",
      text: "Another one-way door. It lets blood out of the right ventricle and stops it sliding back in."
    },
    {
      part: "pulmonary-artery",
      name: "Pulmonary artery",
      oxygen: "poor",
      text: "This vessel carries blood from the heart to the lungs. Arteries always carry blood away from the heart, even here, where the blood is still oxygen-poor."
    },
    {
      part: "lungs",
      name: "Lungs",
      oxygen: "poor-to-rich",
      text: "In tiny blood vessels wrapped around the air sacs, blood drops off carbon dioxide (a waste gas you breathe out) and picks up oxygen from the air you breathe in."
    },
    {
      part: "pulmonary-veins",
      name: "Pulmonary veins",
      oxygen: "rich",
      text: "These veins bring the fresh, oxygen-rich blood back to the heart. Veins always carry blood toward the heart."
    },
    {
      part: "left-atrium",
      name: "Left atrium",
      oxygen: "rich",
      text: "The upper chamber on the heart's left side collects the oxygen-rich blood arriving from the lungs."
    },
    {
      part: "mitral-valve",
      name: "Mitral valve",
      oxygen: "rich",
      text: "A one-way door with two flaps, which is why it's also called the bicuspid valve. It lets blood into the left ventricle and stops it flowing back."
    },
    {
      part: "left-ventricle",
      name: "Left ventricle",
      oxygen: "rich",
      text: "The heart's strongest chamber. Its thick muscle wall pumps blood hard enough to reach every part of the body."
    },
    {
      part: "aortic-valve",
      name: "Aortic valve",
      oxygen: "rich",
      text: "The last one-way door. It lets blood out into the aorta and stops it flowing back into the left ventricle."
    },
    {
      part: "aorta",
      name: "Aorta",
      oxygen: "rich",
      text: "The body's largest artery. It branches into smaller and smaller arteries that carry oxygen-rich blood everywhere."
    },
    {
      part: "body",
      name: "Body",
      oxygen: "rich-to-poor",
      text: "Cells all over the body take oxygen from the blood and hand back carbon dioxide. The now oxygen-poor blood heads back to the vena cavae, and the loop starts again."
    }
  ];

  var OXYGEN_TEXT = {
    "poor": "Oxygen-poor blood",
    "rich": "Oxygen-rich blood",
    "poor-to-rich": "Oxygen-poor → oxygen-rich",
    "rich-to-poor": "Oxygen-rich → oxygen-poor"
  };

  // The quiz uses the main stops, in the correct order.
  var QUIZ_ORDER = [
    "Right atrium",
    "Right ventricle",
    "Pulmonary artery",
    "Lungs",
    "Pulmonary veins",
    "Left atrium",
    "Left ventricle",
    "Aorta"
  ];

  // ---------- Part 1: step through the diagram ----------

  var current = 0;
  var backButton = document.getElementById("step-back");
  var nextButton = document.getElementById("step-next");

  function showStep(index) {
    current = index;
    var step = STEPS[index];

    document.querySelectorAll(".part").forEach(function (part) {
      part.classList.toggle("is-active", part.dataset.part === step.part);
    });

    document.getElementById("step-count").textContent = "Step " + (index + 1) + " of " + STEPS.length;
    document.getElementById("step-name").textContent = step.name;
    document.getElementById("step-oxygen").textContent = OXYGEN_TEXT[step.oxygen];
    document.getElementById("step-text").textContent = step.text;

    backButton.disabled = index === 0;
    nextButton.textContent = index === STEPS.length - 1 ? "Start again ↺" : "Next →";
  }

  function goBack() {
    if (current > 0) showStep(current - 1);
  }

  function goNext() {
    showStep(current === STEPS.length - 1 ? 0 : current + 1);
  }

  backButton.addEventListener("click", goBack);
  nextButton.addEventListener("click", goNext);

  // Arrow keys move through the steps, except while using the quiz.
  document.addEventListener("keydown", function (event) {
    if (event.target.closest("#quiz")) return;
    if (event.key === "ArrowLeft") goBack();
    if (event.key === "ArrowRight") goNext();
  });

  showStep(0);

  // ---------- Part 2: ordering quiz ----------

  var list = document.getElementById("quiz-list");
  var result = document.getElementById("quiz-result");
  var order = [];
  // After "Check answer", holds true/false per position; null when not checked.
  var marks = null;

  function shuffled(items) {
    var copy = items.slice();
    // Fisher-Yates shuffle: swap each item with a random earlier one.
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function newQuiz() {
    do {
      order = shuffled(QUIZ_ORDER);
    } while (order.join() === QUIZ_ORDER.join());
    marks = null;
    result.textContent = "";
    renderQuiz();
  }

  function makeMoveButton(name, index, direction) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "button move";
    button.dataset.direction = direction;
    button.textContent = direction === "up" ? "↑" : "↓";
    button.setAttribute("aria-label", "Move " + name + " " + direction);
    button.disabled = direction === "up" ? index === 0 : index === order.length - 1;
    button.addEventListener("click", function () {
      move(index, direction);
    });
    return button;
  }

  function renderQuiz() {
    list.innerHTML = "";
    order.forEach(function (name, index) {
      var item = document.createElement("li");

      var label = document.createElement("span");
      label.className = "quiz-item-name";
      label.textContent = name;

      var status = document.createElement("span");
      status.className = "quiz-item-result";

      if (marks) {
        if (marks[index]) {
          item.className = "correct";
          status.textContent = "✓ Correct";
        } else {
          item.className = "incorrect";
          status.textContent = "✗ Should be number " + (QUIZ_ORDER.indexOf(name) + 1);
        }
      }

      item.append(label, status, makeMoveButton(name, index, "up"), makeMoveButton(name, index, "down"));
      list.appendChild(item);
    });
  }

  function move(index, direction) {
    var target = direction === "up" ? index - 1 : index + 1;
    var temp = order[index];
    order[index] = order[target];
    order[target] = temp;

    // Moving a stop clears the old marks.
    marks = null;
    result.textContent = "";
    renderQuiz();

    // Keep keyboard focus on the item that moved, so it can keep moving.
    var buttons = list.children[target].querySelectorAll(".move");
    var same = direction === "up" ? buttons[0] : buttons[1];
    (same.disabled ? (direction === "up" ? buttons[1] : buttons[0]) : same).focus();
  }

  function check() {
    marks = order.map(function (name, index) {
      return name === QUIZ_ORDER[index];
    });
    var score = marks.filter(Boolean).length;
    result.textContent = score === order.length
      ? "All " + score + " in the right place. Well done!"
      : score + " of " + order.length + " in the right place.";
    renderQuiz();
  }

  document.getElementById("quiz-check").addEventListener("click", check);

  document.getElementById("quiz-show").addEventListener("click", function () {
    order = QUIZ_ORDER.slice();
    marks = order.map(function () { return true; });
    result.textContent = "This is the correct order.";
    renderQuiz();
  });

  document.getElementById("quiz-reset").addEventListener("click", newQuiz);

  newQuiz();
})();
