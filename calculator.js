document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rechner-form");
  const kostenanzeige = document.getElementById("kostenanzeige");

  // Preise pro Modul
  const preise = {
    "setup": 499,
    "leads-50": 149,
    "leads-100": 249,
    "training": 399,
    "support-monat": 29,
    "support-jahr": 299,
    "pflege-monat": 99,
    "pflege-jahr": 999
  };

  // Eventlistener bei jeder Änderung im Formular
  form.addEventListener("change", () => {
    let gesamt = 0;

    const ausgewaehlt = form.querySelectorAll("input[type='checkbox']:checked");

    ausgewaehlt.forEach(checkbox => {
      const modul = checkbox.value;
      if (preise[modul]) {
        gesamt += preise[modul];
      }
    });

    // Formatierung als Euro-Wert mit Leerzeichen
    kostenanzeige.textContent = `${gesamt.toLocaleString("de-DE")} €`;
  });
});
