const onclickToClipboard = () => {
  const btn = document.getElementById("apiTokenBtn");
  const token = document.getElementById("apiToken");
  if (btn) {
    btn.addEventListener('click', (e) => {
      if (document.selection) {
        const range = document.body.createTextRange();
        range.moveToElementText(token);
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(token);
        window.getSelection().addRange(range);
        document.execCommand("copy");
      }
      btn.innerHTML = "Copied";
    });
  }

}

export { onclickToClipboard };
