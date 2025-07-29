document.addEventListener("DOMContentLoaded", () => {
  const optionsEl = document.getElementById("options");
  const summaryEl = document.getElementById("summary-output");
  const statusEl = document.getElementById("status-message");

  const workflows = [
    { id: "leadgen", name: "KI-Leadgenerierung", price: 499 },
    { id: "dashboard", name: "Dashboard & Berichte", price: 199 },
    { id: "elite", name: "Elite Verkaufsstrategie", price: 999 },
  ];

  function renderOptions() {
    optionsEl.innerHTML = "";
    workflows.forEach((wf) => {
      const div = document.createElement("div");
      div.className = "option-block";
      div.innerHTML = `
        <label>
          <span><input type="checkbox" data-id="${wf.id}" /> ${wf.name}</span>
          <span>${wf.price} €</span>
        </label>
      `;
      optionsEl.appendChild(div);
    });
  }

  function calculateSummary() {
    const selected = [...document.querySelectorAll("input[type='checkbox']:checked")];
    let sum = 0;
    let list = [];

    selected.forEach((el) => {
      const id = el.getAttribute("data-id");
      const wf = workflows.find((w) => w.id === id);
      if (wf) {
        sum += wf.price;
        list.push(`• ${wf.name} (${wf.price} €)`);
      }
    });

    summaryEl.innerHTML = `
      ${list.length > 0 ? list.join("<br>") : "Keine Auswahl getroffen."}
      <hr style="margin: 15px 0;" />
      <strong>Gesamtkosten: ${sum} €</strong>
    `;
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      statusEl.textContent = "✅ In Zwischenablage kopiert!";
    });
  }

  function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Ausgewählte Optionen:", 20, 20);

    let y = 30;
    const lines = summaryEl.innerText.split("\n");
    lines.forEach((line) => {
      doc.text(line, 20, y);
      y += 10;
    });

    doc.save("angebot.pdf");
  }

  function printPage() {
    window.print();
  }

  document.getElementById("action-dropdown").addEventListener("change", (e) => {
    const value = e.target.value;
    if (value === "print") printPage();
    else if (value === "pdf") exportPDF();
    else if (value === "copy") copyToClipboard(summaryEl.innerText);
    e.target.value = "";
  });

  optionsEl.addEventListener("change", calculateSummary);

  renderOptions();
  calculateSummary();
});
