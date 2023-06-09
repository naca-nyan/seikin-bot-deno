const textarea = document.getElementById("message");
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) send();
});
const button = document.querySelector("#send");
button.addEventListener("click", async () => {
  const message = textarea.value;
  if (message) {
    await send(message);
    textarea.value = "";
  }
});

const send = async (message) => {
  const payload = { content: message };
  await fetch("/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
