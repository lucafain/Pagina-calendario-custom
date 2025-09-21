const styleForm = document.getElementById("preferences-form");
const styleInput = document.getElementById("style-input");
const suggestionList = document.getElementById("suggestion-list");
const emptyState = document.querySelector(".empty-state");
const suggestionTemplate = document.getElementById("suggestion-card-template");
const calendarContainer = document.getElementById("calendar-container");
const calendarGrid = document.querySelector(".calendar-grid");
const calendarMonthLabel = document.getElementById("calendar-month");
const calendarThemeLabel = document.getElementById("calendar-theme");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let selectedTheme = null;
let currentDate = new Date();

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const themeLibrary = {
  "Nocturno Digital": {
    description:
      "Estilo oscuro con acentos neón y tipografía futurista. Ideal para quienes aman lo tecnológico y vibrante.",
    palette: ["#0f172a", "#1e293b", "#38bdf8", "#a855f7"],
    tokens: {
      background: "#0f172a",
      card: "rgba(15,23,42,0.82)",
      accent: "#38bdf8",
      accentStrong: "#0ea5e9",
      text: "#e2e8f0",
      muted: "#94a3b8",
      border: "rgba(56, 189, 248, 0.25)",
      highlight: "rgba(56, 189, 248, 0.22)",
      font: '"Space Grotesk", "Poppins", sans-serif',
    },
  },
  "Minimal Boreal": {
    description:
      "Paleta fría, delicada y con mucho aire en blanco. Transmite calma, orden y modernidad minimalista.",
    palette: ["#ecf2ff", "#dbeafe", "#2563eb", "#1e40af"],
    tokens: {
      background: "#ecf2ff",
      card: "rgba(255,255,255,0.9)",
      accent: "#2563eb",
      accentStrong: "#1e40af",
      text: "#0f172a",
      muted: "#475569",
      border: "rgba(37, 99, 235, 0.2)",
      highlight: "rgba(37, 99, 235, 0.18)",
      font: '"Poppins", "Segoe UI", sans-serif',
    },
  },
  "Pastel Orgánico": {
    description:
      "Combinación pastel con detalles orgánicos y cálidos, perfecta para transmitir suavidad y cercanía.",
    palette: ["#fce7f3", "#fde68a", "#bbf7d0", "#fbcfe8"],
    tokens: {
      background: "linear-gradient(160deg,#fff7f9,#f5f3ff)",
      card: "rgba(255,255,255,0.86)",
      accent: "#ec4899",
      accentStrong: "#db2777",
      text: "#701a3d",
      muted: "#a85574",
      border: "rgba(236, 72, 153, 0.2)",
      highlight: "rgba(251, 191, 217, 0.28)",
      font: '"Playfair Display", "Poppins", serif',
    },
  },
  "Vintage Cálido": {
    description:
      "Texturas suaves, tonos terracota y vibra nostálgica. Ideal para un calendario con alma artesanal.",
    palette: ["#fef3c7", "#fcd34d", "#f97316", "#78350f"],
    tokens: {
      background: "#f7efe5",
      card: "rgba(255,250,245,0.92)",
      accent: "#f97316",
      accentStrong: "#c2410c",
      text: "#3a1f0b",
      muted: "#92400e",
      border: "rgba(249, 115, 22, 0.22)",
      highlight: "rgba(254, 215, 170, 0.25)",
      font: '"Playfair Display", "Poppins", serif',
    },
  },
  "Bold Pop": {
    description:
      "Estética pop con colores saturados, contrastes fuertes y energía creativa. Perfecta para destacar eventos.",
    palette: ["#f5f3ff", "#a855f7", "#f97316", "#22d3ee"],
    tokens: {
      background: "#faf5ff",
      card: "rgba(255,255,255,0.9)",
      accent: "#a855f7",
      accentStrong: "#7c3aed",
      text: "#2e1065",
      muted: "#6b21a8",
      border: "rgba(168, 85, 247, 0.22)",
      highlight: "rgba(168, 85, 247, 0.18)",
      font: '"Space Grotesk", "Poppins", sans-serif',
    },
  },
};

function normalizeText(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getThemesForPreference(text) {
  const normalized = normalizeText(text);
  const suggestions = new Set();

  if (/(oscuro|dark|noche|negro)/.test(normalized)) {
    suggestions.add("Nocturno Digital");
  }

  if (/(minimal|simple|limpio|ordenado)/.test(normalized)) {
    suggestions.add("Minimal Boreal");
  }

  if (/(pastel|suave|romantico|flores|dulce)/.test(normalized)) {
    suggestions.add("Pastel Orgánico");
  }

  if (/(retro|vintage|nostalgia|calido|tiempo)/.test(normalized)) {
    suggestions.add("Vintage Cálido");
  }

  if (/(colorido|vibrante|pop|llamativo|creativo|neon)/.test(normalized)) {
    suggestions.add("Bold Pop");
  }

  if (suggestions.size < 3) {
    const allThemes = Object.keys(themeLibrary);
    while (suggestions.size < 3) {
      const randomTheme = allThemes[Math.floor(Math.random() * allThemes.length)];
      suggestions.add(randomTheme);
    }
  }

  return Array.from(suggestions).slice(0, 3);
}

function renderSuggestions(preference) {
  const themes = getThemesForPreference(preference);

  suggestionList.replaceChildren();
  themes.forEach((themeName) => {
    const theme = themeLibrary[themeName];
    const card = suggestionTemplate.content.cloneNode(true);

    const palette = card.querySelector(".palette");
    theme.palette.forEach((color) => {
      const span = document.createElement("span");
      span.style.background = color;
      palette.appendChild(span);
    });

    card.querySelector(".suggestion-title").textContent = themeName;
    card.querySelector(".suggestion-description").textContent = theme.description;

    const chooseButton = card.querySelector(".secondary-button");
    chooseButton.addEventListener("click", () => {
      applyTheme(themeName);
    });

    suggestionList.appendChild(card);
  });

  emptyState.hidden = true;
  emptyState.setAttribute("aria-hidden", "true");
}

function applyTheme(themeName) {
  selectedTheme = themeLibrary[themeName];
  if (!selectedTheme) return;

  const tokens = selectedTheme.tokens;
  const body = document.body;
  body.style.setProperty("--background-color", tokens.background);
  body.style.setProperty("--card-background", tokens.card);
  body.style.setProperty("--accent-color", tokens.accent);
  body.style.setProperty("--accent-color-strong", tokens.accentStrong);
  body.style.setProperty("--text-color", tokens.text);
  body.style.setProperty("--muted-text", tokens.muted);
  body.style.setProperty("--calendar-border", tokens.border);
  body.style.setProperty("--highlight-color", tokens.highlight);
  body.style.setProperty("--font-family", tokens.font);

  calendarThemeLabel.textContent = `Tema seleccionado: ${themeName}`;
  calendarContainer.classList.remove("hidden");
  renderCalendar();
}

function renderCalendar() {
  calendarGrid.replaceChildren();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  calendarMonthLabel.textContent = `${monthNames[month]} ${year}`;

  weekDays.forEach((day) => {
    const cell = document.createElement("div");
    cell.className = "calendar-cell header";
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDay; i += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-cell empty";
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";
    cell.textContent = day;

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    calendarGrid.appendChild(cell);
  }
}

styleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const preference = styleInput.value.trim();
  if (!preference) {
    return;
  }

  renderSuggestions(preference);
});

prevMonthBtn.addEventListener("click", () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  renderCalendar();
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("auto-dark");
  }
});
