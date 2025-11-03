function getData() {
  return JSON.parse(localStorage.getItem("jamiyahData")) || {};
}

const savedData = getData();
const container = document.getElementById("subscribersContainer");

for (const [monthKey, data] of Object.entries(months)) {
  const monthDiv = document.createElement("div");
  monthDiv.style.marginBottom = "25px";

  const title = document.createElement("h3");
  title.textContent = `${monthKey} - Recipient: ${data.recipient}`;
  monthDiv.appendChild(title);

  const table = document.createElement("table");
  table.innerHTML = "<tr><th>Subscriber</th><th>Status</th><th>Proof</th></tr>";

  data.users.forEach(user => {
    const tr = document.createElement("tr");
    const tdUser = document.createElement("td");
    tdUser.textContent = user;

    const status = savedData[monthKey]?.[user]?.status || "Pending";
    const tdStatus = document.createElement("td");
    tdStatus.textContent = status;
    tdStatus.style.color = status === "Paid" ? "green" : "red";

    const tdProof = document.createElement("td");
    const proof = savedData[monthKey]?.[user]?.proof;
    if (proof) {
      const img = document.createElement("img");
      img.src = proof;
      img.className = "proof-img";
      tdProof.appendChild(img);
    } else {
      tdProof.textContent = "Pending";
    }

    tr.appendChild(tdUser);
    tr.appendChild(tdStatus);
    tr.appendChild(tdProof);
    table.appendChild(tr);
  });

  monthDiv.appendChild(table);
  container.appendChild(monthDiv);
}
