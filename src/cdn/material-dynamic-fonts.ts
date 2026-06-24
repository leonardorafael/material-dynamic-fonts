let _icons:any = null;
let _font = "";
let _selector = "";
let _url = "";
let _timeoutMutation: ReturnType<typeof setTimeout>;
let _mutation: MutationObserver | null;

const _urlFromScript = new URL(import.meta.url);
const _fontFromQuery = _urlFromScript.searchParams.get("font") || undefined;
const _selectorFromQuery = _urlFromScript.searchParams.get("selector") || undefined;

function onMutation() {
  if (_timeoutMutation) clearTimeout(_timeoutMutation);
  _timeoutMutation = setTimeout(() => updateAllFonts(), 180);
}

function setup() {
  if (_mutation || !globalThis.MutationObserver) return;
  _mutation = new MutationObserver(onMutation);
  _mutation.observe(document.body, { childList: true, subtree: true });
}

function updateUrl() {
  if (!_font || !_selector) return false;

  let hasNewIcons = false;
  if (!_icons) {
    _icons = { "check": true, "check_box": true, "check_box_outline_blank": true, "indeterminate_check_box": true, "radio_button_checked": true, "radio_button_unchecked": true };
    hasNewIcons = true;
  }

  const icons = document.querySelectorAll(_selector);
  for(let i=0; i<icons.length; i++) {
    const icon = icons[i].textContent?.trim();
    if (!icon) continue;
    if (!_icons[icon]) {
      _icons[icon] = true;
      hasNewIcons = true;
    }
  }

  _url = `https://fonts.googleapis.com/css2?family=${_font}:FILL@0..1&icon_names=${Object.keys(_icons).sort().join(',')}&display=swap`;
  return hasNewIcons;
}

async function updateFont() {
  if (!_font || !_selector || !_url) return;

  const response = await fetch(_url);
  const text = await response.text() || "";
  const rules = `${_selector} ${text.substring(text.lastIndexOf('{')).trim()}`;
  const urls = text.match(/url.+?\)/);
  if (!urls || !rules) return;

  document.fonts.add(new FontFace(_font, urls[0], {
    weight: "400",
    style: "normal",
    display: "swap"
  }));

  if (document.getElementById("material-dynamic-fonts")) return;

  const style = document.createElement("style");
  style.innerHTML = rules;
  style.id = "material-dynamic-fonts";
  document.head.appendChild(style);
}

function updateAllFonts() {
  if (updateUrl()) updateFont();
}

function updateOptions(font?: string, selector?: string) {
  _font = font || "Material Symbols Outlined";
  _selector = selector || `.${_font.toLowerCase().replace(/\s/g, '-')}`;
  _icons = null;
  _url = "";
}

export function run(font?: string, selector?: string): string {
  updateOptions(font, selector);
  updateAllFonts();
  setup();
  return _url;
}

if (_fontFromQuery || _selectorFromQuery) run(_fontFromQuery, _selectorFromQuery);

(globalThis as any).materialDynamicFonts = run;
export default (globalThis as any).materialDynamicFonts;