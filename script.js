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

const DEFAULT_THEME = {
  name: "Clásico Azul",
  description: "Un punto de partida equilibrado con azules suaves, detalles modernos y un toque profesional.",
  explanation:
    "Tema base para explorar la app mientras la IA genera propuestas personalizadas.",
  palette: ["#e0f2fe", "#bae6fd", "#3b82f6", "#1e3a8a"],
  tokens: {
    background: "linear-gradient(180deg,#e0f2fe,#f8fafc)",
    card: "rgba(255,255,255,0.92)",
    accent: "#3b82f6",
    accentStrong: "#1e3a8a",
    text: "#0f172a",
    muted: "#475569",
    border: "rgba(59,130,246,0.18)",
    highlight: "rgba(59,130,246,0.2)",
    font: '"Poppins", "Segoe UI", sans-serif',
  },
};

const state = {
  suggestions: [],
  currentDate: new Date(),
  selectedTheme: DEFAULT_THEME,
  isLoading: false,
};

styleForm.addEventListener("submit", handleFormSubmit);
prevMonthBtn.addEventListener("click", () => changeMonth(-1));
nextMonthBtn.addEventListener("click", () => changeMonth(1));

applyTheme(DEFAULT_THEME);
renderCalendar();
calendarThemeLabel.textContent = `${DEFAULT_THEME.name} (base)`;
calendarContainer.classList.remove("hidden");

async function handleFormSubmit(event) {
  event.preventDefault();
  const preferences = styleInput.value.trim();
  if (!preferences) return;

  updateStatus("Buscando estilos con ayuda de la IA…", "loading");
  setLoading(true);

  try {
    const suggestions = await generateThemesWithAI(preferences);
    state.suggestions = suggestions;
    renderSuggestions();
    if (suggestions.length) {
      updateStatus("Elegí uno de los estilos sugeridos para aplicarlo al calendario.");
    } else {
      updateStatus(
        "La IA no pudo generar ideas con esa descripción. Probá con más detalles o referencias.",
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    updateStatus(error.message || "Ocurrió un error al generar sugerencias.", "error");
    suggestionList.innerHTML = "";
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading) {
  state.isLoading = isLoading;
  styleForm.querySelector("button[type='submit']").disabled = isLoading;
}

function updateStatus(message, variant = "info") {
  if (!emptyState) return;
  emptyState.textContent = message;
  emptyState.classList.remove("error", "loading");
  if (variant !== "info") emptyState.classList.add(variant);
}

function renderSuggestions() {
  suggestionList.innerHTML = "";
  state.suggestions.forEach((suggestion, index) => {
    const card = createSuggestionCard(suggestion, index);
    suggestionList.appendChild(card);
  });
}

function createSuggestionCard(suggestion, index) {
  const node = suggestionTemplate.content.firstElementChild.cloneNode(true);
  const palette = node.querySelector(".palette");
  const title = node.querySelector(".suggestion-title");
  const description = node.querySelector(".suggestion-description");
  const explanation = node.querySelector(".suggestion-explanation");
  const button = node.querySelector(".secondary-button");

  title.textContent = suggestion.name || `Estilo ${index + 1}`;
  description.textContent = suggestion.description?.trim() || "Estilo sugerido por la IA.";
  explanation.textContent = suggestion.explanation?.trim() ||
    suggestion.reason?.trim() ||
    "Generado automáticamente a partir de tus preferencias.";

  palette.innerHTML = "";
  (suggestion.palette || []).forEach((color) => {
    const swatch = document.createElement("span");
    swatch.style.background = color;
    swatch.title = color;
    palette.appendChild(swatch);
  });

  button.addEventListener("click", () => {
    state.selectedTheme = suggestion;
    applyTheme(suggestion);
    highlightSelectedCard(node);
  });

  if (state.selectedTheme && state.selectedTheme === suggestion) {
    node.classList.add("selected");
  }

  return node;
}

function highlightSelectedCard(selectedNode) {
  suggestionList.querySelectorAll(".suggestion-card").forEach((card) => {
    card.classList.toggle("selected", card === selectedNode);
  });
}

function applyTheme(theme) {
  if (!theme) return;

  const tokens = withFallbackTokens(theme.tokens || {});
  const root = document.documentElement.style;
  root.setProperty("--background-color", tokens.background);
  root.setProperty("--card-background", tokens.card);
  root.setProperty("--accent-color", tokens.accent);
  root.setProperty("--accent-color-strong", tokens.accentStrong);
  root.setProperty("--text-color", tokens.text);
  root.setProperty("--muted-text", tokens.muted);
  root.setProperty("--calendar-border", tokens.border);
  root.setProperty("--highlight-color", tokens.highlight);
  if (tokens.font) {
    root.setProperty("--font-family", tokens.font);
  }

  calendarThemeLabel.textContent = theme.name || "Tema personalizado";
  calendarContainer.classList.remove("hidden");
  document.body.classList.toggle("auto-dark", prefersDarkPalette(tokens));
  renderCalendar();
}

function withFallbackTokens(tokens) {
  return {
    background: tokens.background || DEFAULT_THEME.tokens.background,
    card: tokens.card || DEFAULT_THEME.tokens.card,
    accent: tokens.accent || DEFAULT_THEME.tokens.accent,
    accentStrong: tokens.accentStrong || tokens.accent || DEFAULT_THEME.tokens.accentStrong,
    text: tokens.text || "#111827",
    muted: tokens.muted || "#4b5563",
    border: tokens.border || "rgba(148, 163, 184, 0.25)",
    highlight: tokens.highlight || "rgba(148, 163, 184, 0.2)",
    font: tokens.font || DEFAULT_THEME.tokens.font,
  };
}

function prefersDarkPalette(tokens) {
  const textColor = tokens.text?.replace("#", "");
  if (!textColor) return false;
  const r = parseInt(textColor.substring(0, 2), 16);
  const g = parseInt(textColor.substring(2, 4), 16);
  const b = parseInt(textColor.substring(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.75; // texto muy claro implica fondo oscuro
}

async function generateThemesWithAI(preferences) {
  const apiKey = await requestApiKey();
  if (!apiKey) {
    throw new Error("Necesitás proporcionar una API key válida para usar la generación por IA.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "Sos un diseñador de interfaces que responde en formato JSON válido. Siempre devolvé un objeto con el array 'suggestions'. Cada elemento debe incluir: name, description, explanation, palette (array de 4-5 colores hex) y tokens (background, card, accent, accentStrong, text, muted, border, highlight, font).",
        },
        {
          role: "user",
          content: `Generá entre 3 y 5 propuestas de temas para un calendario digital según estas preferencias del usuario: "${preferences}". Describí cada estilo en una oración y asegurate de que la paleta y los tokens sean coherentes entre sí.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail?.error?.message || "La API devolvió un error. Revisá tu API key o vuelve a intentar.");
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  const payload = extractJson(content);
  if (!payload?.suggestions?.length) {
    throw new Error("La IA no devolvió sugerencias válidas. Probá con más contexto o reintentá.");
  }

  return payload.suggestions.map(normalizeSuggestion);
}

function normalizeSuggestion(raw) {
  return {
    name: raw.name?.trim() || "Tema personalizado",
    description: raw.description?.trim() || raw.summary?.trim() || "Estilo sugerido por IA.",
    explanation:
      raw.explanation?.trim() ||
      raw.reason?.trim() ||
      raw.justification?.trim() ||
      "Propuesta generada automáticamente para reflejar tus preferencias.",
    palette: Array.isArray(raw.palette) ? raw.palette.slice(0, 6) : [],
    tokens: raw.tokens || {},
  };
}

function extractJson(text) {
  if (!text) return null;
  const codeBlockMatch = text.match(/```json([\s\S]*?)```/i);
  const jsonString = codeBlockMatch ? codeBlockMatch[1] : text;
  try {
    return JSON.parse(jsonString.trim());
  } catch (error) {
    console.error("No se pudo parsear la respuesta de la IA", error, text);
    return null;
  }
}

async function requestApiKey() {
  let apiKey = localStorage.getItem("openai-calendar-api-key");
  if (!apiKey) {
    apiKey = window.prompt(
      "Pegá tu API key de OpenAI para generar estilos con IA. Quedará guardada localmente en este navegador."
    );
    if (apiKey) {
      apiKey = apiKey.trim();
      localStorage.setItem("openai-calendar-api-key", apiKey);
    }
  }
  return apiKey;
}

function changeMonth(offset) {
  const current = state.currentDate;
  const newDate = new Date(current.getFullYear(), current.getMonth() + offset, 1);
  state.currentDate = newDate;
  renderCalendar();
}

function renderCalendar() {
  const date = state.currentDate;
  const year = date.getFullYear();
  const month = date.getMonth();

  calendarGrid.innerHTML = "";
  calendarMonthLabel.textContent = `${monthNames[month]} ${year}`;

  weekDays.forEach((day) => {
    const cell = document.createElement("div");
    cell.className = "calendar-cell header";
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7; // Lunes como primer día
  for (let i = 0; i < offset; i += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-cell empty";
    calendarGrid.appendChild(emptyCell);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
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

window.resetStoredApiKey = function resetStoredApiKey() {
  localStorage.removeItem("openai-calendar-api-key");
  updateStatus("La API key guardada se eliminó. Se solicitará nuevamente al generar estilos.");
};
