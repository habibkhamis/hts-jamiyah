// بيانات الشهر والأشخاص
const months = {
  "Oct-25": { 
    recipient:"ZUHAIR ALSAFFAR", 
    users:["HUSAIN YUSUF","HABIB KHAMIS","ABU ADEL","HASAN SAHWAN","RAJA","UM AHMED","JAFFAR JUMA","ABU HASAN1","ABU HASAN2"] 
  }
};

// LocalStorage (للبيانات اللي يتم تعديلها لاحقاً)
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

    // اسم المستخدم
    const tdUser = document.createElement("td");
    tdUser.textContent = user;

    // الحالة
    const status = savedData[monthKey]?.[user]?.status || "Pending";
    const tdStatus = document.createElement("td");
    tdStatus.textContent = status;
    tdStatus.style.color = status === "Paid" ? "green" : "red";

    // إثبات الدفع
    const tdProof = document.createElement("td");
    
    // تعديل أسماء الصور حسب ما أعطيت
    const nameMap = {
      "ABU ADEL": "abuadel",
      "ABU HASAN1": "abuhasan1",
      "ABU HASAN2": "abuhasan2",
      "HABIB KHAMIS": "habib",
      "HASAN SAHWAN": "hasan",
      "HUSAIN YUSUF": "husain",
      "JAFFAR JUMA": "jaffar",
      "RAJA": "raja",
      "UM AHMED": "umahmed",
      "ZUHAIR ALSAFFAR": "zuhair"
    };

    let proofPath = `proof/${nameMap[user.toUpperCase()] || user.toLowerCase().replace(/\s/g,'')}_oct25.jpg`;
    
    const img = document.createElement("img");
    img.src = proofPath;
    img.className = "proof-img";

    img.onerror = () => {
      tdProof.textContent = "Pending";
      img.remove();
    }

    img.onclick = () => {
      const popup = document.getElementById("popup");
      const popupImg = document.getElementById("popupImg");
      popup.style.display = "flex";
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
