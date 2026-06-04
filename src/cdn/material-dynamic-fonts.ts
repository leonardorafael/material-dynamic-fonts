let _icons:any = null;
let _url = new URL(import.meta.url);
let _font = _url.searchParams.get("font") || "Material Symbols Outlined";
let _selector = "";
let _timeoutMutation: ReturnType<typeof setTimeout>;
let _mutation: MutationObserver | null;

function onMutation() {
  if (_timeoutMutation) clearTimeout(_timeoutMutation);
  _timeoutMutation = setTimeout(async () => updateAllFonts(), 180);
}

function setup() {
  if (_mutation || !globalThis.MutationObserver) return;
  _mutation = new MutationObserver(onMutation);
  _mutation.observe(document.body, { childList: true, subtree: true });
  onMutation();
}

function updateIcons() {
  let hasNewIcons = false;
  if (!_icons) {
    _icons = { "check": true, "check_box": true, "check_box_outline_blank": true, "indeterminate_check_box": true, "radio_button_checked": true, "radio_button_unchecked": true };
    hasNewIcons = true;
  }

  _selector = _selector || `.${_font.toLowerCase().replace(/\s/g, '-')}`;
  const icons = document.querySelectorAll(_selector);
  for(let i=0; i<icons.length; i++) {
    const icon = icons[i].textContent?.trim();
    if (!icon) continue;
    if (!_icons[icon]) {
      _icons[icon] = true;
      hasNewIcons = true;
    }
  }
  
  return hasNewIcons;
}

async function updateFont() {
  if (!_icons) return;

  const icons = Object.keys(_icons).sort().join(",");
  const font = _url.searchParams.get("font");
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${font}:opsz,wght,FILL,GRAD@24,400,0..1,0&icon_names=${icons}`);
  const text = await response.text() || "";
  const rules = text.split('}')[1]?.trim() || '';
  const urls = text.match(/url.+?\)/);
  if (!urls || !rules) return;

  document.styleSheets[0]?.insertRule(rules, 0);
  document.fonts.add(new FontFace(_font, urls[0], {
    weight: "400",
    style: "normal",
    display: "swap"
  }));
}

export async function updateAllFonts() {
  if (updateIcons()) updateFont();
}

(globalThis as any).materialDynamicFonts = updateAllFonts;
export default (globalThis as any).materialDynamicFonts;

setup();