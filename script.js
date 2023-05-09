const btnPieteikums = document.querySelector(`.create`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(".close-modal");
const pieteikumuForm = document.querySelector(".form");
const tableBody = document.querySelector(".issues");

const title = document.querySelector(`#title`);
const status = document.querySelector(`#statuses`);
const user = document.querySelector(`#users`);
const source = document.querySelector(`#sources`);
const object = document.querySelector(`#objects`);
const device = document.querySelector(`#devices`);
const type = document.querySelector(`#types`);

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
  const fetchUser = await fetch(`http://127.0.0.1:3000/user`);
  const parseUser = await fetchUser.json();

  // for (let i = 0; i < parseUser.length; i++) {
  //   user.insertAdjacentHTML(
  //     `beforeend`,
  //     `<option value=${parseUser[i].id}>${parseUser[i].vards} ${parseUser[i].uzv}</option>`
  //   );
  // }

  for (let i = 0; i < parseUser.length; i++) {
    user.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseUser[i].id}">${parseUser[i].vards} ${parseUser[i].uzv}</option>`
    );
  }

  const fetchSource = await fetch(`http://127.0.0.1:3000/source`);
  const parseSource = await fetchSource.json();

  for (let i = 0; i < parseSource.length; i++) {
    source.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseSource[i].id}">${parseSource[i].name_lv}</option>`
    );
  }

  const fetchObject = await fetch(`http://127.0.0.1:3000/object`);
  const parseObject = await fetchObject.json();

  for (let i = 0; i < parseObject.length; i++) {
    object.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseObject[i].id}">${parseObject[i].name}</option>`
    );
  }

  const fetchDevice = await fetch(`http://127.0.0.1:3000/device`);
  const parseDevice = await fetchDevice.json();

  for (let i = 0; i < parseDevice.length; i++) {
    device.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseDevice[i].id}">${parseDevice[i].name_lv}</option>`
    );
  }

  const fetchType = await fetch(`http://127.0.0.1:3000/type`);
  const parseType = await fetchType.json();

  for (let i = 0; i < parseType.length; i++) {
    type.insertAdjacentHTML(
      `beforeend`,
      `<option value="${parseType[i].id}">${parseType[i].name_lv}</option>`
    );
  }

  const fetchIssue = await fetch(`http://127.0.0.1:3000/issue`);
  const parseIssue = await fetchIssue.json();

  for (let i = 0; i < parseIssue.length; i++) {
    const row = tableBody.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);
    const cell9 = row.insertCell(8);
    const cell10 = row.insertCell(9);
    cell1.innerHTML = `${parseIssue[i].id}`;
    cell2.innerHTML = `${parseIssue[i].date.slice(0, 10)}`;
    cell3.innerHTML = `${parseIssue[i].time}`;
    cell4.innerHTML = `${parseIssue[i].id_user}`;
    cell5.innerHTML = `${parseIssue[i].id_source}`;
    cell6.innerHTML = `${parseIssue[i].name}`;
    cell7.innerHTML = `${parseIssue[i].id_obj}`;
    cell8.innerHTML = `${parseIssue[i].id_device}`;
    cell9.innerHTML = `${parseIssue[i].id_type}`;
    cell10.innerHTML = `${parseIssue[i].note}`;
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
    source: sources.value,
    object: objects.value,
    device: devices.value,
    type: types.value,
    note: note.value,
  };

  console.log(obj);

  fetch("http://127.0.0.1:3000/post", {
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
