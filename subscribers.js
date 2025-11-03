const container = document.getElementById("subscribersContainer");

for (const [monthKey, data] of Object.entries(months)) {
  const monthDiv = document.createElement("div");
  monthDiv.style.marginBottom = "25px";

  const title = document.createElement("h3");
  title.textContent = `${monthKey} - Recipient: ${data.recipient}`;
  monthDiv.appendChild(title);

  const table = document.createElement("table");
  table.innerHTML = "<tr><th>Subscriber</th><th>Status</th><th>Proof</th></tr>";

  data.users.forEach((user, index) => {
    const tr = document.createElement("tr");

    // اسم المستخدم
    const tdUser = document.createElement("td");
    tdUser.textContent = user;

    // الحالة (Paid / Pending)
    const status = savedData[monthKey]?.[user]?.status || "Pending";
    const tdStatus = document.createElement("td");
    tdStatus.textContent = status;
    tdStatus.style.color = status === "Paid" ? "green" : "red";

    // إثبات الدفع
    const tdProof = document.createElement("td");
    let proofPath = `proof/${user.toLowerCase().replace(/\s/g,'')}_${monthKey.toLowerCase()}.jpg`;
    
    // تحقق إن الصورة موجودة (لـ GitHub Pages)
    const img = document.createElement("img");
    img.src = proofPath;
    img.className = "proof-img";
    img.style.cursor = "pointer";

    img.onerror = () => {
      tdProof.textContent = "Pending";
      img.remove();
    }

    // Pop-up عند الضغط على الصورة
    img.onclick = () => {
      const popup = document.getElementById("popup");
      const popupImg = document.getElementById("popupImg");
      popup.style.display = "block";
      popupImg.src = proofPath;
    }

    tdProof.appendChild(img);

    tr.appendChild(tdUser);
    tr.appendChild(tdStatus);
    tr.appendChild(tdProof);
    table.appendChild(tr);
  });

  monthDiv.appendChild(table);
  container.appendChild(monthDiv);
}

// إغلاق Pop-up
document.getElementById("closePopup").onclick = () => {
  document.getElementById("popup").style.display = "none";
};
