const output = document.getElementById("output");

function onScanSuccess(decodedText) {
  output.innerText = decodedText;
  analyzeQR(decodedText);
}

const html5QrCode = new Html5Qrcode("reader");
html5QrCode.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 250 },
  onScanSuccess
);


function analyzeQR(text) {
  if (!text.startsWith("http")) {
    output.innerText += "\n\n⚠️ Not a URL. Content shown safely.";
    return;
  }

  let warnings = [];

  if (!text.startsWith("https://")) {
    warnings.push("Uses HTTP instead of HTTPS");
  }

  if (text.length > 100) {
    warnings.push("URL is very long");
  }

  const shorteners = ["bit.ly", "tinyurl", "t.co"];
  if (shorteners.some(s => text.includes(s))) {
    warnings.push("Uses a URL shortener");
  }

  showResult(warnings);
}


function showResult(warnings) {
  if (warnings.length === 0) {
    output.innerText += "\n\n🟢 This link looks safe.";
  } else {
    output.innerText += "\n\n⚠️ Potential risks:\n- " + warnings.join("\n- ");
  }
}


function checkPhishing(url) {
  // Simulated response (for learning)
  const knownBadPatterns = ["login", "verify", "free", "reward"];

  let risky = knownBadPatterns.some(word =>
    url.toLowerCase().includes(word)
  );

  return risky;
}


const phishingRisk = checkPhishing(text);

if (phishingRisk) {
  warnings.push("May be a phishing link");
}

function showResult(warnings) {
  if (warnings.length === 0) {
    output.className = "safe";
    output.innerText += "\n\n🟢 Safe: No risks detected.";
  } else if (warnings.length <= 2) {
    output.className = "warning";
    output.innerText += "\n\n🟡 Be Careful:\n- " + warnings.join("\n- ");
  } else {
    output.className = "danger";
    output.innerText += "\n\n🔴 Dangerous:\n- " + warnings.join("\n- ");
  }
}

