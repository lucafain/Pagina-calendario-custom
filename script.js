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

const themeLibrary = [
  {
    name: "Nocturno Digital",
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
    keywords: {
      colors: ["azul", "morado"],
      moods: ["oscuro", "futurista", "vibrante"],
      extras: ["tecnologico", "neon", "digital"],
    },
  },
  {
    name: "Minimal Boreal",
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
    keywords: {
      colors: ["azul", "blanco"],
      moods: ["minimalista", "ordenado", "calmo"],
      extras: ["limpio", "moderno"],
    },
  },
  {
    name: "Pastel Orgánico",
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
    keywords: {
      colors: ["rosa", "amarillo", "verde"],
      moods: ["suave", "romantico", "natural"],
      extras: ["organico", "flores", "artesanal"],
    },
  },
  {
    name: "Vintage Cálido",
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
    keywords: {
      colors: ["naranja", "marron"],
      moods: ["retro", "nostalgico", "calido"],
      extras: ["artesanal", "texturas"],
    },
  },
  {
    name: "Bold Pop",
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
    keywords: {
      colors: ["morado", "naranja", "cyan"],
      moods: ["vibrante", "creativo", "atrevido"],
      extras: ["pop", "grafico", "ilustrado"],
    },
  },
];

const colorKeywordGroups = {
  azul: ["azul", "azules", "celeste", "turquesa", "marino", "cobalto"],
  verde: ["verde", "verdes", "esmeralda", "menta", "bosque"],
  rosa: ["rosa", "rosado", "rosados", "magenta", "fucsia"],
  morado: ["morado", "violeta", "purpura", "lila"],
  naranja: ["naranja", "naranjas", "coral", "terracota"],
  amarillo: ["amarillo", "dorado", "ocre", "miel"],
  rojo: ["rojo", "rojos", "granate", "vino", "burgundy"],
  negro: ["negro", "oscuridad", "nocturno"],
  blanco: ["blanco", "blanca", "marfil"],
  marron: ["marron", "cafe", "chocolate", "caramelo"],
  gris: ["gris", "grises", "plata"],
  cyan: ["cyan", "cian", "aqua", "acqua"],
};

const moodKeywordGroups = {
  oscuro: ["oscuro", "dark", "nocturno", "profundo"],
  luminoso: ["luminoso", "luminosos", "brillante", "claro"],
  elegante: ["elegante", "sofisticado", "lujoso"],
  minimalista: ["minimalista", "minimal", "simple", "limpio", "ordenado"],
  retro: ["retro", "vintage", "nostalgico"],
  natural: ["natural", "organico", "botanico"],
  vibrante: ["vibrante", "energetico", "intenso", "atrevido"],
  creativo: ["creativo", "artistico", "ilustrado"],
  calmo: ["calmo", "relajante", "sereno", "tranquilo"],
  romantico: ["romantico", "amoroso", "soñador"],
};

const extraKeywordGroups = {
  neon: ["neon", "neon"],
  tecnologico: ["tecnologico", "ciber", "digital"],
  flores: ["flores", "floral", "floreado"],
  artesanal: ["artesanal", "hecho", "manual"],
  texturas: ["texturas", "grain", "papel"],
  grafico: ["grafico", "tipografico", "poster"],
  ilustrado: ["ilustrado", "dibujo", "dibujado"],
  moderno: ["moderno", "actual", "contemporaneo"],
};

const palettePresets = {
  azul: {
    label: "Cobalto",
    light: {
      palette: ["#e0f2fe", "#bae6fd", "#1d4ed8", "#0f172a"],
      tokens: {
        background: "linear-gradient(180deg,#e0f2fe,#f8fafc)",
        card: "rgba(255,255,255,0.92)",
        accent: "#2563eb",
        accentStrong: "#1d4ed8",
        text: "#0f172a",
        muted: "#475569",
        border: "rgba(37, 99, 235, 0.2)",
        highlight: "rgba(59, 130, 246, 0.18)",
        font: '"Poppins", "Segoe UI", sans-serif',
      },
    },
    dark: {
      palette: ["#0b1120", "#1d2a4a", "#38bdf8", "#60a5fa"],
      tokens: {
        background: "#0b1120",
        card: "rgba(15,23,42,0.85)",
        accent: "#38bdf8",
        accentStrong: "#0284c7",
        text: "#e2e8f0",
        muted: "#94a3b8",
        border: "rgba(56, 189, 248, 0.3)",
        highlight: "rgba(56, 189, 248, 0.18)",
        font: '"Space Grotesk", "Poppins", sans-serif',
      },
    },
  },
  verde: {
    label: "Bosque",
    light: {
      palette: ["#ecfdf5", "#bbf7d0", "#34d399", "#047857"],
      tokens: {
        background: "linear-gradient(180deg,#ecfdf5,#f7fee7)",
        card: "rgba(255,255,255,0.9)",
        accent: "#10b981",
        accentStrong: "#047857",
        text: "#064e3b",
        muted: "#0f766e",
        border: "rgba(16, 185, 129, 0.25)",
        highlight: "rgba(187, 247, 208, 0.28)",
        font: '"Poppins", "Segoe UI", sans-serif',
      },
    },
    dark: {
      palette: ["#022c22", "#064e3b", "#34d399", "#a7f3d0"],
      tokens: {
        background: "#022c22",
        card: "rgba(5,46,36,0.85)",
        accent: "#34d399",
        accentStrong: "#059669",
        text: "#ecfdf5",
        muted: "#6ee7b7",
        border: "rgba(52, 211, 153, 0.28)",
        highlight: "rgba(52, 211, 153, 0.18)",
        font: '"Space Grotesk", "Poppins", sans-serif',
      },
    },
  },
  rosa: {
    label: "Atardecer",
    light: {
      palette: ["#fff0f7", "#fbcfe8", "#f472b6", "#be123c"],
      tokens: {
        background: "linear-gradient(180deg,#fff0f7,#f8fafc)",
        card: "rgba(255,255,255,0.92)",
        accent: "#ec4899",
        accentStrong: "#db2777",
        text: "#831843",
        muted: "#be185d",
        border: "rgba(236, 72, 153, 0.25)",
        highlight: "rgba(236, 72, 153, 0.2)",
        font: '"Playfair Display", "Poppins", serif',
      },
    },
    dark: {
      palette: ["#3f021f", "#831843", "#ec4899", "#f9a8d4"],
      tokens: {
        background: "#3f021f",
        card: "rgba(88,28,50,0.85)",
        accent: "#ec4899",
        accentStrong: "#db2777",
        text: "#fce7f3",
        muted: "#f472b6",
        border: "rgba(236, 72, 153, 0.28)",
        highlight: "rgba(244, 114, 182, 0.22)",
        font: '"Playfair Display", "Poppins", serif',
      },
    },
  },
  naranja: {
    label: "Solar",
    light: {
      palette: ["#fff7ed", "#fed7aa", "#fb923c", "#9a3412"],
      tokens: {
        background: "linear-gradient(180deg,#fff7ed,#fef3c7)",
        card: "rgba(255,255,255,0.92)",
        accent: "#fb923c",
        accentStrong: "#f97316",
        text: "#78350f",
        muted: "#c2410c",
        border: "rgba(249, 115, 22, 0.25)",
        highlight: "rgba(251, 146, 60, 0.22)",
        font: '"Poppins", "Segoe UI", sans-serif',
      },
    },
    dark: {
      palette: ["#431407", "#7c2d12", "#f97316", "#fdba74"],
      tokens: {
        background: "#431407",
        card: "rgba(67,20,7,0.85)",
        accent: "#f97316",
        accentStrong: "#ea580c",
        text: "#ffedd5",
        muted: "#fbbf24",
        border: "rgba(251, 146, 60, 0.28)",
        highlight: "rgba(234, 88, 12, 0.22)",
        font: '"Playfair Display", "Poppins", serif',
      },
    },
  },
  morado: {
    label: "Galaxia",
    light: {
      palette: ["#f5f3ff", "#ddd6fe", "#a855f7", "#6b21a8"],
      tokens: {
        background: "linear-gradient(180deg,#f5f3ff,#ede9fe)",
        card: "rgba(255,255,255,0.92)",
        accent: "#a855f7",
        accentStrong: "#7c3aed",
        text: "#3b0764",
        muted: "#7c3aed",
        border: "rgba(168, 85, 247, 0.25)",
        highlight: "rgba(168, 85, 247, 0.18)",
        font: '"Space Grotesk", "Poppins", sans-serif',
      },
    },
    dark: {
      palette: ["#2e1065", "#4c1d95", "#a855f7", "#c4b5fd"],
      tokens: {
        background: "#2e1065",
        card: "rgba(46,16,101,0.85)",
        accent: "#a855f7",
        accentStrong: "#7c3aed",
        text: "#ede9fe",
        muted: "#c4b5fd",
        border: "rgba(168, 85, 247, 0.28)",
        highlight: "rgba(124, 58, 237, 0.2)",
        font: '"Space Grotesk", "Poppins", sans-serif',
      },
    },
  },
  neutro: {
    label: "Zen",
    light: {
      palette: ["#f8fafc", "#e2e8f0", "#94a3b8", "#1e293b"],
      tokens: {
        background: "linear-gradient(180deg,#f8fafc,#e2e8f0)",
        card: "rgba(255,255,255,0.92)",
        accent: "#64748b",
        accentStrong: "#334155",
        text: "#0f172a",
        muted: "#475569",
        border: "rgba(148, 163, 184, 0.25)",
        highlight: "rgba(148, 163, 184, 0.18)",
        font: '"Poppins", "Segoe UI", sans-serif',
      },
    },
    dark: {
      palette: ["#0f172a", "#1e293b", "#475569", "#cbd5f5"],
      tokens: {
        background: "#0f172a",
        card: "rgba(15,23,42,0.85)",
        accent: "#38bdf8",
        accentStrong: "#0ea5e9",
        text: "#e2e8f0",
        muted: "#94a3b8",
        border: "rgba(148, 163, 184, 0.25)",
        highlight: "rgba(148, 163, 184, 0.18)",
        font: '"Space Grotesk", "Poppins", sans-serif',
      },
    },
  },
};

const moodLabels = {
  oscuro: "Nocturno",
  luminoso: "Lumínico",
  elegante: "Elegante",
  minimalista: "Minimal",
  retro: "Retro",
  natural: "Natural",
  vibrante: "Vibrante",
  creativo: "Creativo",
  calmo: "Sereno",
  romantico: "Romántico",
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

function tokenize(text) {
  return normalizeText(text)
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
}

function extractMatches(groups, tokens) {
  const tokenSet = new Set(tokens);
  const matches = new Map();

  Object.entries(groups).forEach(([category, synonyms]) => {
    synonyms.forEach((synonym) => {
      if (tokenSet.has(synonym)) {
        if (!matches.has(category)) {
          matches.set(category, new Set());
        }
        matches.get(category).add(synonym);
      }
    });
  });

  return matches;
}

function pickFirstKey(map) {
  const iterator = map.keys();
  const result = iterator.next();
  return result.done ? null : result.value;
}

function buildCustomTheme(insights) {
  if (!insights.colors.size && !insights.moods.size) {
    return null;
  }

  const colorKey = pickFirstKey(insights.colors) || "neutro";
  const palette = palettePresets[colorKey] || palettePresets.neutro;
  const prefersDark = insights.moods.has("oscuro");
  const variant = prefersDark ? "dark" : "light";
  const config = palette[variant];
  const moodKey = pickFirstKey(insights.moods);
  const moodLabel = moodKey ? moodLabels[moodKey] || capitalize(moodKey) : "Fusión";
  const colorLabel = palette.label;
  const matchedColors = insights.colors.get(colorKey);
  const colorWords = matchedColors ? Array.from(matchedColors) : [];

  const name = `${moodLabel} ${colorLabel}`.trim();
  const description = `Creamos una propuesta personalizada con tonos ${
    colorWords.length ? colorWords.join(", ") : colorLabel
  } y una vibra ${moodKey ? moodKey : "equilibrada"}.`;

  return {
    name,
    description,
    palette: config.palette,
    tokens: config.tokens,
    keywords: {
      colors: [colorKey],
      moods: moodKey ? [moodKey] : [],
      extras: [],
    },
    generated: true,
  };
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatList(items) {
  const uniqueItems = [...new Set(items)];
  if (uniqueItems.length === 0) return "";
  if (uniqueItems.length === 1) return uniqueItems[0];
  const last = uniqueItems.pop();
  return `${uniqueItems.join(", ")} y ${last}`;
}

function buildExplanation(theme, matches, insights) {
  const fragments = [];

  if (matches.moods.length) {
    fragments.push(`responde a la vibra ${formatList(matches.moods)}`);
  }

  if (matches.colors.length) {
    fragments.push(`potencia los tonos ${formatList(matches.colors)}`);
  }

  if (matches.extras.length) {
    fragments.push(`integra detalles ${formatList(matches.extras)}`);
  }

  if (!fragments.length && insights.colors.size) {
    const colorKey = pickFirstKey(insights.colors);
    if (colorKey) {
      const colorWords = Array.from(insights.colors.get(colorKey));
      fragments.push(`mezcla la paleta ${formatList(colorWords)}`);
    }
  }

  if (!fragments.length) {
    fragments.push("te ofrece una combinación equilibrada para tu idea");
  }

  const [first, ...rest] = fragments;
  let explanationBody = first;

  if (rest.length === 1) {
    explanationBody = `${first} y ${rest[0]}`;
  } else if (rest.length > 1) {
    const trailing = rest.slice(-1)[0];
    const middle = rest.slice(0, -1).join(", ");
    explanationBody = `${first}, ${middle} y ${trailing}`;
  }

  return `IA: ${capitalize(explanationBody)}.`;
}

function generateThemeSuggestions(preference) {
  const tokens = tokenize(preference);
  const insights = {
    tokens,
    colors: extractMatches(colorKeywordGroups, tokens),
    moods: extractMatches(moodKeywordGroups, tokens),
    extras: extractMatches(extraKeywordGroups, tokens),
  };

  const evaluated = themeLibrary.map((theme) => {
    const matches = { colors: [], moods: [], extras: [] };
    let score = 0;

    theme.keywords.colors.forEach((color) => {
      if (insights.colors.has(color)) {
        score += 4;
        matches.colors.push(...insights.colors.get(color));
      }
    });

    theme.keywords.moods.forEach((mood) => {
      if (insights.moods.has(mood)) {
        score += 3;
        matches.moods.push(...insights.moods.get(mood));
      }
    });

    theme.keywords.extras.forEach((extra) => {
      if (insights.extras.has(extra) || insights.tokens.includes(extra)) {
        score += 2;
        if (insights.extras.has(extra)) {
          matches.extras.push(...insights.extras.get(extra));
        } else {
          matches.extras.push(extra);
        }
      }
    });

    if (!score) {
      score = 1;
    }

    return {
      theme,
      score,
      matches,
    };
  });

  const customTheme = buildCustomTheme(insights);
  if (customTheme) {
    evaluated.push({
      theme: customTheme,
      score: 10,
      matches: {
        colors: customTheme.keywords.colors.flatMap((color) =>
          insights.colors.has(color) ? Array.from(insights.colors.get(color)) : []
        ),
        moods: customTheme.keywords.moods.flatMap((mood) =>
          insights.moods.has(mood) ? Array.from(insights.moods.get(mood)) : []
        ),
        extras: [],
      },
    });
  }

  evaluated.sort((a, b) => b.score - a.score);

  return {
    suggestions: evaluated.slice(0, 3),
    insights,
  };
}

function applyTheme(theme) {
  selectedTheme = theme;
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

  calendarThemeLabel.textContent = `Tema seleccionado: ${theme.name}`;
  calendarContainer.classList.remove("hidden");
  renderCalendar();
}

function renderSuggestions(preference) {
  const { suggestions, insights } = generateThemeSuggestions(preference);

  suggestionList.replaceChildren();

  suggestions.forEach(({ theme, matches }, index) => {
    const card = suggestionTemplate.content.cloneNode(true);
    const palette = card.querySelector(".palette");

    palette.replaceChildren();
    theme.palette.forEach((color) => {
      const span = document.createElement("span");
      span.style.background = color;
      palette.appendChild(span);
    });

    card.querySelector(".suggestion-title").textContent = theme.name;
    card.querySelector(".suggestion-description").textContent = theme.description;

    const explanation = buildExplanation(theme, matches, insights);
    card.querySelector(".suggestion-explanation").textContent = explanation;

    const chooseButton = card.querySelector(".secondary-button");
    chooseButton.addEventListener("click", () => {
      applyTheme(theme);
    });

    if (theme.generated) {
      card.querySelector(".suggestion-card").classList.add("generated-theme");
    }

    suggestionList.appendChild(card);
  });

  emptyState.hidden = true;
  emptyState.setAttribute("aria-hidden", "true");
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
