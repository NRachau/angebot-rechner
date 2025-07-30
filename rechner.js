document.addEventListener("DOMContentLoaded", () => {
  const workflowCheckboxes = document.querySelectorAll('.workflow input[type="checkbox"]');
  const zusatzCheckboxes = document.querySelectorAll('.zusatzpaket input[type="checkbox"]');
  const leadDropdown = document.getElementById("lead-dropdown");
  const summaryOutput = document.getElementById("summary-output");
  const bundles = [
    {
      name: "Bundle A – Starter",
      includes: ["KI Lead Generierung", "Telegram Automatisierung"],
      price: 899,
      regular: 999 + 499
    },
    {
      name: "Bundle B – Content & Automation",
      includes: ["Content Generator", "Instagram Workflow"],
      price: 849,
      regular: 499 + 499
    },
    {
      name: "Bundle C – Leads & Qualität",
      includes: ["KI Lead Generierung", "Datenqualitäts-Check"],
      price: 799,
      regular: 999 + 399
    },
    {
      name: "Bundle D – Komplettsystem",
      includes: [
        "KI Lead Generierung",
        "Telegram Automatisierung",
        "Instagram Workflow",
        "Content Generator",
        "Website-Crawler",
        "Datenqualitäts-Check"
      ],
      price: 2_999,
      regular: 999 + 499 + 499 + 499 + 399 + 399
    }
  ];

  const workflowPrices = {
    "KI Lead Generierung": 999,
    "Telegram Automatisierung": 499,
    "Instagram Workflow": 499,
    "Content Generator": 499,
    "Website-Crawler": 399,
    "Datenqualitäts-Check": 399
  };

  const zusatzPrices = {
    "Zielgruppen-/Suchkriterien-Anpassung": 199,
    "Datenschutzpaket": 299,
    "Elite Verkaufsstrategie (KI-Setup)": 999,
    "Schulungspaket (zur eigenen Anpassung)": 399,
    "Support monatlich": 29,
    "Support jährlich": 299,
    "Datenpflege monatlich": 99,
    "Datenpflege jährlich": 999
  };

  const leadPrices = {
    "50 Leads": 49,
    "100 Leads": 79,
    "250 Leads": 149,
    "500 Leads": 249,
    "1000 Leads": 399,
    "1000+ Leads": 599
  };

  function calculate() {
    const selectedWorkflows = Array.from(workflowCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.name);

    const selectedZusatz = Array.from(zusatzCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.name);

    const selectedLead = leadDropdown.value;
    const summary = [];

    let total = 0;
    let bundleUsed = null;

    // Bundles prüfen
    for (let bundle of bundles) {
      if (bundle.includes.every(wf => selectedWorkflows.includes(wf)) &&
          selectedWorkflows.length === bundle.includes.length) {
        total += bundle.price;
        bundleUsed = bundle;
        summary.push(`✅ ${bundle.name} – ${bundle.price} € (statt ${bundle.regular} €, Ersparnis: ${Math.round((1 - bundle.price / bundle.regular) * 100)} %)`);
        break;
      }
    }

    // Einzelpreise Workflows, wenn kein Bundle
    if (!bundleUsed) {
      selectedWorkflows.forEach(name => {
        total += workflowPrices[name] || 0;
        summary.push(`+ ${name} – ${workflowPrices[name]} €`);
      });
    }

    // Zusatzpakete (nur wenn mind. 1 Workflow aktiv)
    if (selectedWorkflows.length > 0) {
      selectedZusatz.forEach(name => {
        total += zusatzPrices[name] || 0;
        summary.push(`+ ${name} – ${zusatzPrices[name]} €`);
      });
    } else if (selectedZusatz.length > 0) {
      summary.push("⚠️ Zusatzpakete nur mit mind. 1 gebuchtem Workflow möglich!");
    }

    // Leadpaket
    if (selectedLead && leadPrices[selectedLead]) {
      total += leadPrices[selectedLead];
      summary.push(`+ Lead-Paket (${selectedLead}) – ${leadPrices[selectedLead]} €`);
    }

    summary.push(`——————`);
    summary.push(`Gesamtkosten: ${total.toLocaleString("de-DE")} €`);

    summaryOutput.innerText = summary.join("\n");
  }

  // Event Listener
  workflowCheckboxes.forEach(cb => cb.addEventListener("change", calculate));
  zusatzCheckboxes.forEach(cb => cb.addEventListener("change", calculate));
  leadDropdown.addEventListener("change", calculate);

  // Export-Buttons
  document.getElementById("pdf-btn").addEventListener("click", () => {
    window.print(); // Für PDF Export einfach Druckdialog nutzen
  });

  document.getElementById("druck-btn").addEventListener("click", () => {
    window.print();
  });

  document.getElementById("email-btn").addEventListener("click", () => {
    const body = encodeURIComponent(summaryOutput.innerText);
    window.location.href = `mailto:kontakt@ki-beratung-rachau.de?subject=Angebotsanfrage&body=${body}`;
  });

  calculate(); // Initial ausführen
});
