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
