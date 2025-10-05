const PASSWORD = "0729";
let currentUser = "yuma";
let events = JSON.parse(localStorage.getItem("calendarEvents") || "{}");

// 🔒 ログイン処理
document.getElementById("loginBtn").addEventListener("click", () => {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    renderCalendar();
  } else {
    document.getElementById("loginError").innerText = "パスワードが違います。";
  }
});

// 👤 ユーザー切り替え
document.getElementById("userSelect").addEventListener("change", (e) => {
  currentUser = e.target.value;
  renderCalendar();
});

// ➕ 予定追加
document.getElementById("addBtn").addEventListener("click", () => {
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value;
  const title = document.getElementById("eventTitle").value.trim();
  if (!date || !time || !title) return alert("すべて入力してね！");

  if (!events[currentUser]) events[currentUser] = [];
  events[currentUser].push({ date, time, title });

  localStorage.setItem("calendarEvents", JSON.stringify(events));
  document.getElementById("eventTitle").value = "";
  renderCalendar();
});

// 📅 カレンダー描画
function renderCalendar() {
  const container = document.getElementById("calendar");
  container.innerHTML = `<h3>${currentUser === "yuma" ? "🌸ゆまの予定" : "🌻しんちゃんの予定"}</h3>`;

  const userEvents = (events[currentUser] || []).sort((a, b) => {
    if (a.date === b.date) return a.time.localeCompare(b.time);
    return a.date.localeCompare(b.date);
  });

  if (userEvents.length === 0) {
    container.innerHTML += "<p>予定がありません。</p>";
    return;
  }

  userEvents.forEach(ev => {
    const div = document.createElement("div");
    div.className = "event";
    div.innerHTML = `<strong>${ev.date} ${ev.time}</strong> - ${ev.title}`;
    container.appendChild(div);
  });
}
