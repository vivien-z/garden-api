const onclickToClipboard = () => {
  const token = document.getElementById("apiToken");
  token.select();
  document.execCommand("copy");
  console.log("test")
}

export { onclickToClipboard };
