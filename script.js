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
const heroSection = document.querySelector(".hero");
const preferencesSection = document.querySelector(".preferences");
const suggestionsSection = document.querySelector(".suggestions");

const sessionOverlay = document.getElementById("session-overlay");
const sessionForm = document.getElementById("session-form");
const sessionNameInput = document.getElementById("session-name");
const knownUsersList = document.getElementById("known-users");
const syncInput = document.getElementById("sync-input");
const sessionError = document.getElementById("session-error");
const sessionInfoSection = document.getElementById("session-info");
const sessionGreeting = document.getElementById("session-greeting");
const sessionDeviceLabel = document.getElementById("session-device");
const sessionThemeLabel = document.getElementById("session-theme");
const syncCodeElement = document.getElementById("sync-code");
const copySyncButton = document.getElementById("copy-sync-button");
const syncFeedback = document.getElementById("sync-feedback");
const switchUserButton = document.getElementById("switch-user");

const eventModal = document.getElementById("event-modal");
const eventForm = document.getElementById("event-form");
const eventTitleInput = document.getElementById("event-title");
const eventTimeInput = document.getElementById("event-time");
const eventDateLabel = document.getElementById("event-date-label");
const closeEventModalBtn = document.getElementById("close-event-modal");

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

const MOOD_PRESETS = [
  {
    id: "minimal",
    name: "Minimalismo Nórdico",
    description: "Líneas limpias, fondos suaves y énfasis en la organización.",
    keywords: ["minimal", "simple", "limpio", "ordenado", "escandinavo", "blanco", "sutil"],
    basePalette: ["#f8fafc", "#e2e8f0", "#0f172a", "#38bdf8"],
    tone: "light",
    font: '"Poppins", "Segoe UI", sans-serif',
  },
  {
    id: "tropical",
    name: "Explosión Tropical",
    description: "Combinaciones vibrantes inspiradas en playas y atardeceres.",
    keywords: ["tropical", "verano", "playa", "coral", "vibrante", "divertido", "energico", "energía"],
    basePalette: ["#fff7ed", "#fde68a", "#f97316", "#10b981"],
    tone: "light",
    font: '"Poppins", "Segoe UI", sans-serif',
  },
  {
    id: "midnight",
    name: "Nocturno Neón",
    description: "Contraste de luces brillantes sobre un fondo oscuro futurista.",
    keywords: ["oscuro", "nocturno", "neon", "neón", "futurista", "cyber", "galaxia", "gamer"],
    basePalette: ["#020617", "#1e293b", "#38bdf8", "#f472b6"],
    tone: "dark",
    font: '"Space Grotesk", "Poppins", sans-serif',
  },
  {
    id: "nature",
    name: "Raíces Naturales",
    description: "Verdes orgánicos, texturas orgánicas y sensaciones de calma.",
    keywords: ["naturaleza", "bosque", "verde", "hojas", "orgánico", "eco", "montaña", "tierra"],
    basePalette: ["#f1f5f2", "#d1fae5", "#22c55e", "#166534"],
    tone: "light",
    font: '"Poppins", "Segoe UI", sans-serif',
  },
  {
    id: "luxury",
    name: "Elegancia Dorada",
    description: "Contraste sofisticado con destellos metálicos y tipografía refinada.",
    keywords: ["elegante", "lujoso", "glam", "dorado", "oro", "evento", "boda", "premium"],
    basePalette: ["#0f172a", "#1f2937", "#fbbf24", "#f59e0b"],
    tone: "dark",
    font: '"Playfair Display", "Poppins", serif',
  },
  {
    id: "retro",
    name: "Retro Pastel",
    description: "Colores suaves y nostalgia moderna inspirada en los 80s y 90s.",
    keywords: ["retro", "vintage", "nostalgia", "pastel", "suave", "ochentas", "noventas"],
    basePalette: ["#f5f3ff", "#fde2f3", "#f472b6", "#6366f1"],
    tone: "light",
    font: '"Space Grotesk", "Poppins", sans-serif',
  },
  {
    id: "productivity",
    name: "Productividad Pro",
    description: "Claridad profesional con jerarquías marcadas y enfoque en la agenda.",
    keywords: ["profesional", "corporativo", "oficina", "negocios", "productivo", "planificacion", "planificación"],
    basePalette: ["#f8fafc", "#e0f2fe", "#2563eb", "#1e40af"],
    tone: "light",
    font: '"Poppins", "Segoe UI", sans-serif',
  },
];

const COLOR_KEYWORDS = [
  { labels: ["azul", "azules", "blue", "marino"], hex: "#2563eb" },
  { labels: ["celeste", "turquesa", "cyan"], hex: "#0ea5e9" },
  { labels: ["verde", "esmeralda", "menta"], hex: "#22c55e" },
  { labels: ["rosa", "rosado", "magenta"], hex: "#f472b6" },
  { labels: ["rojo", "granate", "bordo", "burgundy"], hex: "#ef4444" },
  { labels: ["naranja", "coral", "mandarina"], hex: "#fb923c" },
  { labels: ["amarillo", "dorado", "oro"], hex: "#facc15" },
  { labels: ["violeta", "morado", "lila"], hex: "#8b5cf6" },
  { labels: ["negro", "grafito", "carbon"], hex: "#111827" },
  { labels: ["blanco", "marfil", "nieve"], hex: "#f8fafc" },
];

const ADJECTIVE_KEYWORDS = [
  { labels: ["minimal", "simple", "limpio", "ordenado"], tag: "minimalista" },
  { labels: ["elegante", "lujoso", "premium", "sofisticado"], tag: "elegante" },
  { labels: ["divertido", "vibrante", "energetico", "energico", "colorido"], tag: "vibrante" },
  { labels: ["calido", "cálido", "acogedor", "hogareno", "hogareño"], tag: "cálido" },
  { labels: ["fresco", "natural", "relajante", "zen"], tag: "relajante" },
  { labels: ["retro", "vintage", "nostalgico", "nostálgico"], tag: "retro" },
  { labels: ["futurista", "cyber", "digital", "tecnologico", "tecnológico"], tag: "futurista" },
];

const SPECIAL_OCCASIONS = [
  {
    labels: ["navidad", "christmas", "festivo"],
    name: "Magia Navideña",
    palette: ["#fef3c7", "#fcd34d", "#dc2626", "#166534"],
    tone: "light",
    description: "Brillos cálidos, rojos intensos y verdes clásicos para celebraciones de fin de año.",
  },
  {
    labels: ["halloween", "calabaza", "oscuro terror"],
    name: "Noche de Halloween",
    palette: ["#1f2937", "#312e81", "#f97316", "#f59e0b"],
    tone: "dark",
    description: "Contrastes dramáticos con acentos naranja y violeta que evocan misterio.",
  },
  {
    labels: ["primavera", "flores", "floral"],
    name: "Flores de Primavera",
    palette: ["#fdf2f8", "#fce7f3", "#f472b6", "#10b981"],
    tone: "light",
    description: "Paleta floral llena de luz y matices suaves inspirados en jardines en flor.",
  },
  {
    labels: ["otoño", "fall", "hojas secas"],
    name: "Otoño Cálido",
    palette: ["#fff7ed", "#fed7aa", "#fb923c", "#92400e"],
    tone: "light",
    description: "Colores terrosos, cálidos y envolventes para un ambiente acogedor.",
  },
];

const FONT_PREFERENCES = [
  {
    labels: ["serif", "editorial", "clasico", "classy"],
    font: '"Playfair Display", "Poppins", serif',
  },
  {
    labels: ["tecnico", "tech", "futurista", "digital"],
    font: '"Space Grotesk", "Poppins", sans-serif',
  },
  {
    labels: ["mano", "handwriting", "caligrafia", "caligrafia"],
    font: '"Playfair Display", "Poppins", serif',
  },
  {
    labels: ["redondeado", "amigable", "friendly"],
    font: '"Poppins", "Segoe UI", sans-serif',
  },
];

const STORAGE_KEY = "customCalendar.users";
const LAST_USER_KEY = "customCalendar.lastUser";

const deviceInputs = sessionForm
  ? Array.from(sessionForm.querySelectorAll('input[name="device"]'))
  : [];

let syncFeedbackTimeout = null;

const state = {
  suggestions: [],
  currentDate: new Date(),
  selectedTheme: DEFAULT_THEME,
  isLoading: false,
  events: {},
  themeLocked: false,
  activeDateKey: null,
  profile: null,
};

styleForm.addEventListener("submit", handleFormSubmit);
prevMonthBtn.addEventListener("click", () => changeMonth(-1));
nextMonthBtn.addEventListener("click", () => changeMonth(1));
eventForm.addEventListener("submit", handleEventSubmit);
closeEventModalBtn.addEventListener("click", closeEventModal);
eventModal.addEventListener("click", (event) => {
  if (event.target === eventModal) {
    closeEventModal();
  }
});
document.addEventListener("keydown", handleGlobalKeydown);

sessionForm?.addEventListener("submit", handleSessionSubmit);
sessionNameInput?.addEventListener("input", handleNameInputChange);
copySyncButton?.addEventListener("click", handleCopySyncCode);
switchUserButton?.addEventListener("click", () => {
  syncInput.value = "";
  showSessionOverlay(true);
});

applyTheme(DEFAULT_THEME);
renderCalendar();
calendarThemeLabel.textContent = `${DEFAULT_THEME.name} (base)`;
calendarContainer.classList.remove("hidden");

initializeSession();

async function handleFormSubmit(event) {
  event.preventDefault();
  if (state.themeLocked) {
    return;
  }
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
    finalizeThemeSelection();
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

function finalizeThemeSelection() {
  if (state.themeLocked) return;
  state.themeLocked = true;
  updateThemeLockUI();
  styleForm.reset();
  persistUserState();
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

  const themeName = theme.name || "Tema personalizado";
  const shouldShowBase = themeName === DEFAULT_THEME.name && !state.themeLocked;
  calendarThemeLabel.textContent = shouldShowBase
    ? `${themeName} (base)`
    : themeName;
  calendarContainer.classList.remove("hidden");
  document.body.classList.toggle("auto-dark", prefersDarkPalette(tokens));
  renderCalendar();
  if (state.profile) {
    persistUserState();
  }
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
  const analysis = analyzePreferences(preferences);
  await simulateThinkingDelay(analysis);

  const suggestions = buildSuggestionsFromAnalysis(analysis);
  if (!suggestions.length) {
    throw new Error("No se pudieron componer estilos con esa descripción. Probá con más detalles o referencias.");
  }

  return suggestions;
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
  const todayReference = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = buildDateKey(year, month, day);
    const cell = document.createElement("div");
    cell.className = "calendar-cell day-cell";
    cell.dataset.dateKey = dateKey;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", buildCellAriaLabel(year, month, day));
    cell.tabIndex = 0;

    const cellDate = new Date(year, month, day);
    if (cellDate < todayReference) {
      cell.classList.add("past-day");
    }

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    const eventsContainer = document.createElement("div");
    eventsContainer.className = "events-container";

    const eventsForDay = getEventsForDate(dateKey);
    if (eventsForDay.length) {
      cell.classList.add("has-events");
      eventsForDay.forEach((event) => {
        const eventChip = document.createElement("div");
        eventChip.className = "event-chip";

        const timeElement = document.createElement("strong");
        timeElement.textContent = event.time;

        const titleElement = document.createElement("span");
        titleElement.textContent = event.title;

        eventChip.appendChild(timeElement);
        eventChip.appendChild(titleElement);
        eventsContainer.appendChild(eventChip);
      });
    }

    const resetButton = buildDayResetButton(dateKey);
    const dayNumber = document.createElement("span");
    dayNumber.className = "day-number";
    dayNumber.textContent = day;

    cell.appendChild(resetButton);
    cell.appendChild(eventsContainer);
    cell.appendChild(dayNumber);

    cell.addEventListener("click", () => openEventModal(dateKey));
    cell.addEventListener("keydown", (event) => handleDayKeydown(event, dateKey));

    calendarGrid.appendChild(cell);
  }
}

function buildDateKey(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildDayResetButton(dateKey) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "day-reset-button";
  button.setAttribute("aria-label", `Limpiar eventos del ${formatDateLabel(dateKey)}`);

  const icon = document.createElement("span");
  icon.className = "reset-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "⟳";

  const srLabel = document.createElement("span");
  srLabel.className = "sr-only";
  srLabel.textContent = "Reiniciar día";

  button.appendChild(icon);
  button.appendChild(srLabel);

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    clearEventsForDate(dateKey);
  });

  return button;
}

function buildCellAriaLabel(year, monthIndex, day) {
  const key = buildDateKey(year, monthIndex, day);
  const base = `${day} de ${monthNames[monthIndex]} de ${year}`;
  const events = getEventsForDate(key);
  if (!events.length) return base;
  const suffix = events.length === 1 ? "1 evento" : `${events.length} eventos`;
  return `${base}, ${suffix}`;
}

function getEventsForDate(dateKey) {
  const events = state.events[dateKey] || [];
  return [...events].sort((a, b) => a.time.localeCompare(b.time));
}

function openEventModal(dateKey) {
  if (!state.profile) {
    return;
  }
  state.activeDateKey = dateKey;
  eventForm.reset();
  eventModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  eventDateLabel.textContent = formatDateLabel(dateKey);
  window.setTimeout(() => eventTimeInput.focus(), 50);
}

function closeEventModal() {
  eventModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  state.activeDateKey = null;
}

function handleEventSubmit(event) {
  event.preventDefault();
  const title = eventTitleInput.value.trim();
  const time = eventTimeInput.value;

  if (!title || !time || !state.activeDateKey) {
    return;
  }

  if (!state.events[state.activeDateKey]) {
    state.events[state.activeDateKey] = [];
  }

  state.events[state.activeDateKey].push({
    title,
    time,
  });

  state.events[state.activeDateKey].sort((a, b) => a.time.localeCompare(b.time));

  renderCalendar();
  persistUserState();
  closeEventModal();
}

function handleDayKeydown(event, dateKey) {
  if (event.target !== event.currentTarget) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEventModal(dateKey);
  }
}

function handleGlobalKeydown(event) {
  if (event.key === "Escape" && !eventModal.classList.contains("hidden")) {
    closeEventModal();
  }
}

function formatDateLabel(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const readableMonth = monthNames[month - 1] || "";
  return `${day} de ${readableMonth} de ${year}`;
}

function clearEventsForDate(dateKey) {
  if (!state.events[dateKey] || state.events[dateKey].length === 0) {
    return;
  }

  delete state.events[dateKey];
  renderCalendar();
  persistUserState();
}

function analyzePreferences(preferences) {
  const raw = preferences.trim();
  const normalized = normalizeText(raw);

  const colors = detectPreferredColors(normalized);
  const adjectives = detectAdjectives(normalized);
  const special = detectSpecialOccasion(normalized);
  const moodScores = scoreMoods(normalized);
  const preferredFont = detectFontPreference(normalized);

  const wantsDark = /(oscuro|dark|nocturn|galaxia|noche)/.test(normalized);
  const wantsLight = /(claro|luminoso|brillante|radiante)/.test(normalized);
  const wantsPastel = /(pastel|suave|apagad)/.test(normalized);
  const wantsGradient = /(degrad|gradient|gradiente)/.test(normalized);
  const wantsGlass = /(vidrio|cristal|glass|translucid|translucido)/.test(normalized);
  const wantsTexture = /(textura|acuarela|papel|granulado|grain)/.test(normalized);
  const wantsWarm = /(calid|sunset|atardecer|otono|oto\b)/.test(normalized);
  const wantsNature = /(naturaleza|bosque|hoja|eco|botanic)/.test(normalized);
  const wantsModern = /(moderno|tech|digital|futurista|minimal)/.test(normalized);

  return {
    raw,
    normalized,
    colors,
    adjectives,
    special,
    moodScores,
    font: preferredFont,
    wantsDark,
    wantsLight,
    wantsPastel,
    wantsGradient,
    wantsGlass,
    wantsTexture,
    wantsWarm,
    wantsNature,
    wantsModern,
  };
}

function buildSuggestionsFromAnalysis(analysis) {
  const candidates = selectMoodCandidates(analysis);
  return candidates.map((preset, index) => createSuggestionFromPreset(preset, analysis, index));
}

function selectMoodCandidates(analysis) {
  const ranked = [...analysis.moodScores].sort((a, b) => b.score - a.score);
  const selected = [];

  if (analysis.special) {
    selected.push({
      ...analysis.special,
      id: `special-${analysis.special.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      basePalette: analysis.special.palette,
      tone: analysis.special.tone,
      font: analysis.special.font || '"Poppins", "Segoe UI", sans-serif',
    });
  }

  ranked.forEach(({ preset, score }) => {
    if (selected.length >= 4) return;
    if (score <= 0 && selected.length >= 3) return;
    if (!selected.some((item) => item.id === preset.id)) {
      selected.push(preset);
    }
  });

  if (selected.length < 3) {
    MOOD_PRESETS.forEach((preset) => {
      if (selected.length >= 3) return;
      if (!selected.some((item) => item.id === preset.id)) {
        selected.push(preset);
      }
    });
  }

  return selected.slice(0, 4);
}

function createSuggestionFromPreset(preset, analysis, index) {
  const tone = resolveTone(preset, analysis);
  const palette = createPaletteFromPreferences(preset, analysis, index, tone);
  const tokens = composeTokens(preset, analysis, palette, tone, index);

  return {
    name: composeName(preset, analysis, index),
    description: composeDescription(preset, analysis, tone, palette),
    explanation: composeExplanation(preset, analysis, tone),
    palette,
    tokens,
  };
}

function resolveTone(preset, analysis) {
  if (analysis.wantsDark && !analysis.wantsLight) return "dark";
  if (analysis.wantsLight && !analysis.wantsDark) return "light";
  if (analysis.special?.tone) return analysis.special.tone;
  return preset.tone || "light";
}

function createPaletteFromPreferences(preset, analysis, index, tone) {
  let palette = [...(analysis.special?.palette || preset.basePalette || DEFAULT_THEME.palette)];
  const userColors = analysis.colors;

  if (userColors.length) {
    const primary = userColors[0].hex;
    const secondary = userColors[1]?.hex || adjustColor(primary, index % 2 === 0 ? -25 : 20);
    const baseSoft = lightenColor(primary, analysis.wantsPastel ? 55 : 35);
    const baseMid = lightenColor(primary, analysis.wantsPastel ? 40 : 18);
    palette = [baseSoft, baseMid, primary, secondary];
  }

  if (analysis.wantsPastel) {
    palette = palette.map((hex, idx) => lightenColor(hex, idx < 2 ? 20 : 8));
  }

  if (analysis.wantsWarm && !analysis.colors.length) {
    palette = palette.map((hex, idx) => (idx < 2 ? warmColor(hex, 12) : warmColor(hex, 6)));
  }

  if (analysis.wantsNature && !analysis.colors.length && preset.id !== "nature") {
    palette = palette.map((hex, idx) => (idx > 1 ? mixColor(hex, "#166534", 0.35) : mixColor(hex, "#bbf7d0", 0.25)));
  }

  if (tone === "dark" && !analysis.wantsPastel) {
    palette = palette.map((hex, idx) => (idx < 2 ? darkenColor(hex, 25) : hex));
  }

  return palette.map(normalizeHex);
}

function composeTokens(preset, analysis, palette, tone, index) {
  const accent = palette[2] || preset.basePalette?.[2] || DEFAULT_THEME.palette[2];
  const accentStrong = palette[3] || adjustColor(accent, tone === "dark" ? -30 : -18);
  let background;

  if (analysis.wantsGradient || analysis.wantsPastel) {
    background = `linear-gradient(180deg, ${palette[0]}, ${palette[1]})`;
  } else if (tone === "dark") {
    const glowColor = hexToRgba(accent, 0.35);
    background = `radial-gradient(circle at ${index % 2 === 0 ? "20%" : "80%"} 0%, ${glowColor}, #020617 70%)`;
  } else {
    background = `linear-gradient(180deg, ${palette[0]}, ${lightenColor(palette[1], 12)})`;
  }

  if (analysis.special && index === 0) {
    background = `linear-gradient(160deg, ${palette[0]}, ${palette[2]})`;
  }

  const textColor = tone === "dark" ? "#e2e8f0" : "#0f172a";
  const muted = tone === "dark" ? "#94a3b8" : "#475569";

  const font = analysis.font || preset.font || DEFAULT_THEME.tokens.font;
  const card = tone === "dark" ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.92)";

  return {
    background,
    card,
    accent,
    accentStrong,
    text: textColor,
    muted,
    border: hexToRgba(accentStrong, tone === "dark" ? 0.38 : 0.22),
    highlight: hexToRgba(accent, tone === "dark" ? 0.24 : 0.18),
    font,
  };
}

function composeName(preset, analysis, index) {
  if (analysis.special && index === 0) {
    return decorateName(analysis.special.name, analysis.colors, analysis.adjectives);
  }

  const colorTag = analysis.colors[0]?.label;
  const adjective = analysis.adjectives[0];
  let baseName = preset.name;

  if (colorTag && !baseName.toLowerCase().includes(colorTag)) {
    baseName = `${baseName} ${capitalize(colorTag)}`;
  }

  if (adjective && !baseName.toLowerCase().includes(adjective)) {
    baseName = `${baseName} ${capitalize(adjective)}`;
  }

  if (index === 1) {
    baseName = `${baseName} Alterno`;
  } else if (index === 2) {
    baseName = `${baseName} Concepto`;
  }

  return baseName.trim();
}

function composeDescription(preset, analysis, tone, palette) {
  const fragments = [];

  if (analysis.colors.length) {
    const colorLabels = analysis.colors.map((c) => c.label).join(" y ");
    fragments.push(`paleta protagonista en ${colorLabels}`);
  }

  if (analysis.adjectives.length) {
    fragments.push(`sensación ${analysis.adjectives.join(" y ")}`);
  }

  if (analysis.wantsGradient) {
    fragments.push("degradados suaves para dar profundidad");
  }

  if (analysis.wantsGlass) {
    fragments.push("detalles translúcidos estilo glassmorphism");
  }

  if (analysis.wantsTexture) {
    fragments.push("texturas ligeras que aportan carácter");
  }

  if (tone === "dark") {
    fragments.push("contraste alto sobre fondo profundo");
  }

  if (analysis.wantsModern) {
    fragments.push("geometría moderna para mantener la interfaz limpia");
  }

  if (analysis.wantsNature) {
    fragments.push("inspiración orgánica en cada bloque del calendario");
  }

  if (analysis.wantsWarm) {
    fragments.push("matices cálidos que evocan atardeceres");
  }

  const details = fragments.length ? `${capitalizeFirst(fragments[0])}${fragments.slice(1).map((item) => `, ${item}`).join("")}.` : "";

  const baseDescription = analysis.special?.description || preset.description || DEFAULT_THEME.description;
  const closing = palette && palette.length ? ` Paleta sugerida: ${palette.map((color) => color.toUpperCase()).join(", ")}.` : "";

  return `${baseDescription}${details ? ` ${details}` : ""}${closing}`.trim();
}

function composeExplanation(preset, analysis, tone) {
  const reasons = [];

  if (analysis.special) {
    reasons.push(`la temática ${analysis.special.name.toLowerCase()}`);
  }

  if (analysis.adjectives.length) {
    reasons.push(`tu pedido ${analysis.adjectives.join(" y ")}`);
  }

  if (analysis.colors.length) {
    reasons.push(`los colores ${analysis.colors.map((c) => c.label).join(" y ")}`);
  }

  if (analysis.wantsGradient) {
    reasons.push("el interés por usar degradados");
  }

  if (analysis.wantsGlass) {
    reasons.push("la referencia a cristales y transparencias");
  }

  if (analysis.wantsTexture) {
    reasons.push("las texturas mencionadas");
  }

  if (analysis.wantsNature) {
    reasons.push("el enfoque natural que mencionaste");
  }

  if (analysis.wantsModern) {
    reasons.push("tu pedido de un estilo moderno");
  }

  if (!reasons.length) {
    reasons.push("las palabras clave que compartiste");
  }

  const toneNote = tone === "dark" ? "Se ajustó el contraste para que los eventos destaquen sin perder legibilidad." : "Los contrastes se equilibraron para mantener una lectura cómoda.";

  return `Pensado a partir de ${enumerateList(reasons)}. ${toneNote}`;
}

function simulateThinkingDelay(analysis) {
  const base = analysis.raw.length > 160 ? 500 : 320;
  const variance = analysis.moodScores.some((item) => item.score > 1) ? 180 : 80;
  return new Promise((resolve) => {
    setTimeout(resolve, base + variance);
  });
}

function scoreMoods(normalized) {
  return MOOD_PRESETS.map((preset) => ({
    preset,
    score: preset.keywords.reduce((total, keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      return normalized.includes(normalizedKeyword) ? total + 1 : total;
    }, 0),
  }));
}

function detectPreferredColors(normalized) {
  const colors = [];
  COLOR_KEYWORDS.forEach((entry) => {
    if (entry.labels.some((label) => normalized.includes(normalizeText(label)))) {
      colors.push({ label: entry.labels[0], hex: entry.hex });
    }
  });
  return colors.slice(0, 3);
}

function detectAdjectives(normalized) {
  const tags = [];
  ADJECTIVE_KEYWORDS.forEach((entry) => {
    if (entry.labels.some((label) => normalized.includes(normalizeText(label)))) {
      tags.push(entry.tag);
    }
  });
  return [...new Set(tags)].slice(0, 3);
}

function detectSpecialOccasion(normalized) {
  for (const occasion of SPECIAL_OCCASIONS) {
    if (occasion.labels.some((label) => normalized.includes(normalizeText(label)))) {
      return occasion;
    }
  }
  return null;
}

function detectFontPreference(normalized) {
  const match = FONT_PREFERENCES.find((entry) =>
    entry.labels.some((label) => normalized.includes(normalizeText(label)))
  );
  return match ? match.font : null;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitalizeFirst(text) {
  if (!text) return "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function decorateName(base, colors, adjectives) {
  let name = base;
  if (colors.length) {
    name += ` ${capitalize(colors[0].label)}`;
  }
  if (adjectives.length) {
    name += ` ${capitalize(adjectives[0])}`;
  }
  return name.trim();
}

function enumerateList(items) {
  if (items.length === 1) return items[0];
  const last = items[items.length - 1];
  return `${items.slice(0, -1).join(", ")} y ${last}`;
}

function adjustColor(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: clampColor(r + amount),
    g: clampColor(g + amount),
    b: clampColor(b + amount),
  });
}

function lightenColor(hex, amount) {
  return adjustColor(hex, Math.abs(amount));
}

function darkenColor(hex, amount) {
  return adjustColor(hex, -Math.abs(amount));
}

function warmColor(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: clampColor(r + amount),
    g: clampColor(g + Math.round(amount / 4)),
    b: clampColor(b - Math.round(amount / 3)),
  });
}

function mixColor(hexA, hexB, ratio) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex({
    r: clampColor(a.r * (1 - ratio) + b.r * ratio),
    g: clampColor(a.g * (1 - ratio) + b.g * ratio),
    b: clampColor(a.b * (1 - ratio) + b.b * ratio),
  });
}

function normalizeHex(hex) {
  if (!hex) return "#ffffff";
  const stripped = hex.replace("#", "");
  if (stripped.length === 3) {
    return `#${stripped
      .split("")
      .map((char) => char + char)
      .join("")}`.toLowerCase();
  }
  return `#${stripped.substring(0, 6).toLowerCase()}`;
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex).replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16) || 0;
  const g = parseInt(normalized.substring(2, 4), 16) || 0;
  const b = parseInt(normalized.substring(4, 6), 16) || 0;
  return { r, g, b };
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) => clampColor(Math.round(value)).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function clampColor(value) {
  return Math.min(255, Math.max(0, value));
}

function initializeSession() {
  updateThemeLockUI();
  const users = getStoredUsers();
  populateNameSuggestions(users);

  const lastUser = localStorage.getItem(LAST_USER_KEY);
  const defaultDevice = detectDefaultDevice();

  if (sessionNameInput) {
    if (lastUser) {
      const stored = users[normalizeName(lastUser)];
      sessionNameInput.value = stored?.name || lastUser;
      selectDeviceRadio(stored?.profile?.device || defaultDevice);
    } else {
      selectDeviceRadio(defaultDevice);
    }
  }

  applyDeviceClass(defaultDevice);
  showSessionOverlay(Boolean(lastUser));
}

function handleSessionSubmit(event) {
  event.preventDefault();
  clearSessionError();

  if (!sessionForm) return;

  const name = sessionNameInput?.value.trim();
  if (!name) {
    showSessionError("Necesitamos tu nombre para guardar tu calendario.");
    sessionNameInput?.focus();
    return;
  }

  const device = getSelectedDevice();
  if (!device) {
    showSessionError("Elegí si estás desde un celular o una computadora.");
    return;
  }

  const syncCode = syncInput?.value.trim();
  const users = getStoredUsers();
  const stored = users[normalizeName(name)];
  let snapshot = stored || {};

  if (syncCode) {
    const decoded = decodeSyncSnapshot(syncCode);
    if (!decoded) {
      showSessionError("El código de sincronización no es válido.");
      return;
    }
    snapshot = decoded;
  }

  state.profile = {
    name,
    device,
  };

  applyDeviceClass(device);
  hydrateStateFromSnapshot(snapshot);
  applyTheme(state.selectedTheme || DEFAULT_THEME);
  updateThemeLockUI();
  hideSessionOverlay();
  updateSessionInfo();
}

function handleNameInputChange() {
  if (!sessionNameInput) return;
  const value = sessionNameInput.value.trim();
  if (!value) return;
  const users = getStoredUsers();
  const record = users[normalizeName(value)];
  if (record?.profile?.device) {
    selectDeviceRadio(record.profile.device);
  }
}

function hydrateStateFromSnapshot(snapshot) {
  const safeEvents = deepCloneEvents(snapshot?.events || {});
  const theme = cloneTheme(snapshot?.selectedTheme) || DEFAULT_THEME;
  state.events = safeEvents;
  state.selectedTheme = theme;
  state.themeLocked = Boolean(snapshot?.themeLocked);
}

function showSessionOverlay(prefillCurrent = false) {
  if (!sessionOverlay) return;
  sessionOverlay.classList.remove("hidden");
  sessionOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("session-locked");
  clearSessionError();

  if (prefillCurrent && state.profile?.name && sessionNameInput) {
    sessionNameInput.value = state.profile.name;
    selectDeviceRadio(state.profile.device || detectDefaultDevice());
  } else if (sessionNameInput && !sessionNameInput.value) {
    selectDeviceRadio(detectDefaultDevice());
  }

  window.setTimeout(() => sessionNameInput?.focus(), 80);
}

function hideSessionOverlay() {
  if (!sessionOverlay) return;
  sessionOverlay.classList.add("hidden");
  sessionOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("session-locked");
  clearSessionError();
  if (syncInput) {
    syncInput.value = "";
  }
}

function showSessionError(message) {
  if (!sessionError) return;
  sessionError.textContent = message;
}

function clearSessionError() {
  if (!sessionError) return;
  sessionError.textContent = "";
}

function selectDeviceRadio(device) {
  if (!deviceInputs.length) return;
  deviceInputs.forEach((input) => {
    input.checked = input.value === device;
  });
}

function getSelectedDevice() {
  const selected = deviceInputs.find((input) => input.checked);
  return selected ? selected.value : null;
}

function detectDefaultDevice() {
  if (typeof window.matchMedia !== "function") {
    return "desktop";
  }
  return window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop";
}

function applyDeviceClass(device) {
  const className = device === "mobile" ? "device-mobile" : "device-desktop";
  document.body.classList.remove("device-mobile", "device-desktop");
  document.body.classList.add(className);
  if (state.profile) {
    state.profile.device = device;
  }
}

function normalizeName(name) {
  return name.trim().toLowerCase();
}

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error("No se pudieron leer los perfiles guardados", error);
  }
  return {};
}

function saveUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("No se pudo guardar el perfil", error);
  }
}

function persistUserState() {
  if (!state.profile?.name) {
    return;
  }

  const key = normalizeName(state.profile.name);
  const users = getStoredUsers();
  users[key] = {
    name: state.profile.name,
    profile: { name: state.profile.name, device: state.profile.device },
    events: deepCloneEvents(state.events),
    selectedTheme: cloneTheme(state.selectedTheme),
    themeLocked: state.themeLocked,
  };

  saveUsers(users);
  localStorage.setItem(LAST_USER_KEY, state.profile.name);
  populateNameSuggestions(users);
  updateSessionInfo();
}

function populateNameSuggestions(users = getStoredUsers()) {
  if (!knownUsersList) return;
  knownUsersList.innerHTML = "";
  const names = Object.values(users)
    .map((entry) => entry?.name || entry?.profile?.name)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const unique = [...new Set(names)];
  unique.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    knownUsersList.appendChild(option);
  });
}

function deepCloneEvents(events) {
  return JSON.parse(JSON.stringify(events || {}));
}

function cloneTheme(theme) {
  if (!theme) return null;
  return JSON.parse(JSON.stringify(theme));
}

function generateSyncCode() {
  if (!state.profile?.name) {
    return "";
  }

  const snapshot = {
    v: 1,
    name: state.profile.name,
    device: state.profile.device,
    events: deepCloneEvents(state.events),
    selectedTheme: cloneTheme(state.selectedTheme),
    themeLocked: state.themeLocked,
  };

  return encodeSnapshot(snapshot);
}

function encodeSnapshot(payload) {
  try {
    const json = JSON.stringify(payload);
    const bytes = new TextEncoder().encode(json);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  } catch (error) {
    console.error("No se pudo generar el código de sincronización", error);
    return "";
  }
}

function decodeSyncSnapshot(code) {
  if (!code) return null;
  try {
    const sanitized = code.replace(/\s+/g, "");
    const binary = atob(sanitized);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (error) {
    console.error("No se pudo decodificar el código", error);
  }
  return null;
}

function updateSessionInfo() {
  if (!sessionInfoSection) return;

  if (!state.profile?.name) {
    sessionInfoSection.classList.add("hidden");
    return;
  }

  sessionInfoSection.classList.remove("hidden");
  sessionGreeting.textContent = `¡Hola, ${state.profile.name}!`;
  sessionDeviceLabel.textContent =
    state.profile.device === "mobile"
      ? "Estás usando la versión adaptada para celular."
      : "Estás usando la versión adaptada para computadora.";
  const themeName = state.selectedTheme?.name || "Tema personalizado";
  sessionThemeLabel.textContent = `Tu estilo actual: ${themeName}`;

  const code = generateSyncCode();
  syncCodeElement.textContent = code;
  if (copySyncButton) {
    copySyncButton.disabled = !code;
  }
}

function updateThemeLockUI() {
  if (state.themeLocked) {
    heroSection?.classList.add("collapsed");
    preferencesSection?.classList.add("collapsed");
    suggestionsSection?.classList.add("collapsed");
    suggestionList.innerHTML = "";
    if (emptyState) {
      emptyState.textContent = "";
      emptyState.classList.remove("error", "loading");
    }
  } else {
    heroSection?.classList.remove("collapsed");
    preferencesSection?.classList.remove("collapsed");
    suggestionsSection?.classList.remove("collapsed");
    if (emptyState) {
      updateStatus("Ingresá tus preferencias para ver propuestas.");
    }
  }
}

function handleCopySyncCode() {
  if (!syncCodeElement) return;
  const code = syncCodeElement.textContent.trim();
  if (!code) {
    showSyncFeedback("Todavía no hay nada para copiar.");
    return;
  }

  const copyPromise = navigator.clipboard
    ? navigator.clipboard.writeText(code)
    : fallbackCopyText();

  Promise.resolve(copyPromise)
    .then(() => {
      showSyncFeedback("Código copiado.");
    })
    .catch(() => {
      showSyncFeedback("No se pudo copiar automáticamente. Copialo manualmente.");
    });
}

function fallbackCopyText() {
  const range = document.createRange();
  range.selectNodeContents(syncCodeElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    document.execCommand("copy");
    selection.removeAllRanges();
    return Promise.resolve();
  } catch (error) {
    selection.removeAllRanges();
    return Promise.reject(error);
  }
}

function showSyncFeedback(message) {
  if (!syncFeedback) return;
  syncFeedback.textContent = message;
  if (syncFeedbackTimeout) {
    clearTimeout(syncFeedbackTimeout);
  }
  if (message) {
    syncFeedbackTimeout = window.setTimeout(() => {
      syncFeedback.textContent = "";
    }, 3000);
  }
}
