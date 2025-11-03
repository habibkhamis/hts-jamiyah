const ADMIN_PASSWORD = "admin123";

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminSection").style.display = "block";
    loadAdminPanel();
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function getData() {
  return JSON.parse(localStorage.getItem("jamiyahData")) || {};
}

function saveData(data) {
  localStorage.setItem("jamiyahData", JSON.stringify(data));
}

function loadAdminPanel() {
  const savedData = getData();
  const container = document.getElementById("adminControls");
  container.innerHTML = "";

  for (const [monthKey, data] of Object.entries(months)) {
    const monthDiv = document.createElement("div");
    monthDiv.style.marginBottom = "25px";

    const title = document.createElement("h3");
    title.textContent = `${monthKey} - Recipient: ${data.recipient}`;
    monthDiv.appendChild(title);

    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Subscriber</th><th>Status</th><th>Upload Proof</th></tr>";

    data.users.forEach(user => {
      const tr = document.createElement("tr");

      const tdUser = document.createElement("td");
      tdUser.textContent = user;

      const tdStatus = document.createElement("td");
      const select = document.createElement("select");
      select.innerHTML = `
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
      `;
      select.value = savedData[monthKey]?.[user]?.status || "Pending";

      const tdUpload = document.createElement("td");
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";

      fileInput.onchange = e => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const data = getData();
            if (!data[monthKey]) data[monthKey] = {};
            data[monthKey][user] = {
              status: "Paid",
              proof: reader.result
            };
            saveData(data);
            select.value = "Paid";
            alert(`Proof uploaded for ${user} in ${monthKey}`);
          };
          reader.readAsDataURL(file);
        }
      };

      select.onchange = () => {
        const data = getData();
        if (!data[monthKey]) data[monthKey] = {};
        data[monthKey][user] = { ...(data[monthKey][user] || {}), status: select.value };
        saveData(data);
      };

      tdStatus.appendChild(select);
      tdUpload.appendChild(fileInput);
      tr.appendChild(tdUser);
      tr.appendChild(tdStatus);
      tr.appendChild(tdUpload);
      table.appendChild(tr);
    });

    monthDiv.appendChild(table);
    container.appendChild(monthDiv);
  }
}
