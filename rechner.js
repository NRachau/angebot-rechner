
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rechner-form");
  const kostenanzeige = document.getElementById("kostenanzeige");

  const preise = {
    "setup": 499,
    "profiling": 299,
    "mailing": 499,
    "responder": 799,
    "followup": 399,
    "dashboard": 199,
    "verkauf": 999,
    "anpassung": 199,
    "training": 399,
    "support-m": 29,
    "support-j": 299,
    "pflege-m": 99,
    "pflege-j": 999,
    "leads-50": 149,
    "leads-100": 249,
    "leads-250": 449,
    "leads-500": 749,
    "leads-1000": 1199,
    "leads-1500": 1500
  };

  form.addEventListener("change", () => {
    let gesamt = preise["setup"]; // Setup ist Pflichtmodul
    const ausgewaehlt = form.querySelectorAll("input[type='checkbox']:checked");

    ausgewaehlt.forEach(input => {
      const key = input.value;
      if (preise[key]) gesamt += preise[key];
    });

    kostenanzeige.textContent = `${gesamt.toLocaleString("de-DE")} €`;
  });
});
