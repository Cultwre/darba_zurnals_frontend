const btnPieteikums = document.querySelector(`.create2`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(".close-modal");
const pieteikumuForm = document.querySelector(".form2");
const tableBody = document.querySelector(".issues2");

const title = document.querySelector(`#title`);
const user = document.querySelector(`#users`);
const status = document.querySelector(`#statuses`);
const issue = document.querySelector(`#issuesId`);

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnPieteikums.addEventListener(`click`, openModal);
overlay.addEventListener(`click`, closeModal);
btnCloseModal.addEventListener(`click`, closeModal);

const fetchData = async function () {
  const fetchUser = await fetch(
    `https://blossom-futuristic-continent.glitch.me/user`
  );
  const parseUser = await fetchUser.json();

  for (let i = 0; i < parseUser.length; i++) {
    user.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseUser[i].id}">${parseUser[i].vards} ${parseUser[i].uzv}</option>`
    );
  }

  const fetchStatus = await fetch(
    `https://blossom-futuristic-continent.glitch.me/status`
  );
  const parseStatus = await fetchStatus.json();

  for (let i = 0; i < parseStatus.length; i++) {
    status.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseStatus[i].id}">${parseStatus[i].name_lv}</option>`
    );
  }

  const fetchIssue = await fetch(
    `https://blossom-futuristic-continent.glitch.me/issues`
  );
  const parseIssue = await fetchIssue.json();

  for (let i = 0; i < parseIssue.length; i++) {
    issue.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseIssue[i].id}">${parseIssue[i].id}</option>`
    );
  }

  const fetchIssues = await fetch(
    `https://blossom-futuristic-continent.glitch.me/action`
  );
  const parseIssues = await fetchIssues.json();

  for (let i = 0; i < parseIssues.length; i++) {
    const row = tableBody.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    cell1.innerHTML = `${parseIssues[i].id}`;
    cell2.innerHTML = `${parseIssues[i].name}`;
    cell3.innerHTML = `${parseIssues[i].id_status}`;
    cell4.innerHTML = `${parseIssues[i].date.slice(0, 10)}`;
    cell5.innerHTML = `${parseIssues[i].time}`;
    cell6.innerHTML = `${parseIssues[i].id_user}`;
    cell7.innerHTML = `${parseIssues[i].id_report}`;
  }
};

fetchData();

pieteikumuForm.addEventListener(`submit`, (e) => {
  const date = new Date();
  const dateFormat =
    date.getFullYear() +
    "-" +
    ((date.getMonth() + 1).length != 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate().length != 2 ? "0" + date.getDate() : date.getDate());
  const time = new Date();

  const obj = {
    date: dateFormat,
    time: time.toLocaleTimeString(),
    title: title.value,
    user: users.value,
    status: statuses.value,
    issue: issuesId.value,
  };

  console.log(obj);

  fetch("https://blossom-futuristic-continent.glitch.me/post2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((result) => result.json())
    .then((result) => console.log(result));
});
