const questions = [
    { q: "HTML stands for?", o: ["Hyper Text Markup Language", "High Text Language", "Hyper Tool Language", "Home Text Language"], a: 0 },
    { q: "Which is used for styling?", o: ["HTML", "CSS", "Java", "Python"], a: 1 },
    { q: "Which is used for web programming?", o: ["CSS", "HTML", "JavaScript", "SQL"], a: 2 },
    { q: "Paragraph tag?", o: ["h1", "p", "div", "br"], a: 1 },
    { q: "JavaScript comment symbol?", o: ["<!-- -->", "##", "//", "**"], a: 2 }
];

let student = {}, time = 300, submitted = false, timer;

function login() {
    let name = studentName.value.trim();
    let id = studentId.value.trim();

    if (!name || !id) return alert("Enter Name and ID");

    student = { name, id };
    displayName.textContent = name;

    loginSection.classList.add("hidden");
    examSection.classList.remove("hidden");

    loadQuestions();
    startTimer();
}

function loadQuestions() {
    questionsDiv.innerHTML = questions.map((q, i) =>
        `<p>${i + 1}. ${q.q}</p>` +
        q.o.map((x, j) =>
            `<label><input type="radio" name="q${i}" value="${j}">${x}</label><br>`
        ).join("")
    ).join("");
}

function startTimer() {
    timer = setInterval(() => {
        time--;

        document.getElementById("time").textContent =
            `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`;

        if (time <= 0) submitExam();
    }, 1000);
}

function submitExam() {
    if (submitted) return;
    submitted = true;
    clearInterval(timer);

    let correct = 0, wrong = 0, unanswered = 0;

    questions.forEach((q, i) => {
        let ans = document.querySelector(`input[name="q${i}"]:checked`);

        if (!ans) unanswered++;
        else if (+ans.value === q.a) correct++;
        else wrong++;
    });

    let total = questions.length;
    let percent = correct / total * 100;

    resultName.textContent = student.name;
    resultId.textContent = student.id;

    document.getElementById("total").textContent = total;
    document.getElementById("correct").textContent = correct;
    document.getElementById("wrong").textContent = wrong;
    document.getElementById("unanswered").textContent = unanswered;

    marks.textContent = `${correct}/${total}`;
    percentage.textContent = percent.toFixed(2);

    status.textContent = percent >= 40 ? "PASS" : "FAIL";
    status.style.color = percent >= 40 ? "green" : "red";

    examSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
}