function filesubmit() {
  const repairType = document.getElementById("repairType").value;
  const model = document.getElementById("model").value;
  const price = document.getElementById("price").value;

  const currentDateTime = new Date().toLocaleString();

  const textArea = document.querySelector("textarea");
  const newEntry = `Repair: ${repairType}, Model: ${model}, Price: $${price}, Date: ${currentDateTime}\n`;

  textArea.value += newEntry;

  return false;
}
