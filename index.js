const textarea = document.getElementById("message");
const jsonfield = document.getElementById("json");
const errorspan = document.getElementById("error");
textarea.addEventListener("change", updatePayload);
textarea.addEventListener("keyup", updatePayload);
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) send();
});
function getPayload() {
  try {
    return JSON.parse(jsonfield.value);
  } catch {
    return null;
  }
}
function updatePayload() {
  const payload = getPayload() ?? { content: textarea.value };
  payload.content = textarea.value;
  jsonfield.value = JSON.stringify(payload, null, 2);
}
function send() {
  const payload = getPayload();
  if (!payload) {
    errorspan.innerText = "不正な JSON だよ";
    return;
  }
  errorspan.innerText = "";
  fetch("/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) textarea.value = "";
    else errorspan.innerText = `だめでした: ${res.status} `;
    res.text().then((t) => (errorspan.innerText += t));
  });
}
