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
  const thumbnail = document.getElementById("thumbnail").value;
  const payload = thumbnail
    ? {
        embeds: [{ description: message, thumbnail: { url: thumbnail } }],
      }
    : { content: message };
  await fetch("/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
