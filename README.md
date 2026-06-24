<p align="center">
    <a href="https://github.com/leonardorafael/material-dynamic-fonts/blob/main/LICENSE"><img src="https://img.shields.io/github/license/leonardorafael/material-dynamic-fonts" alt="License"></a>
    <a href="https://bundlephobia.com/package/material-dynamic-fonts" target="_blank"><img src="https://img.shields.io/bundlephobia/minzip/material-dynamic-fonts" alt="minzipped size"></a>
    <a href="https://www.npmjs.com/package/material-dynamic-fonts"><img src="https://img.shields.io/npm/v/material-dynamic-fonts" alt="Version"></a>
    <a href="https://github.com/leonardorafael/material-dynamic-fonts/pulls"><img src="https://img.shields.io/github/issues-pr/leonardorafael/material-dynamic-fonts" alt="Pull Request"></a>
    <a href="https://github.com/leonardorafael/material-dynamic-fonts/issues"><img src="https://img.shields.io/github/issues/leonardorafael/material-dynamic-fonts" alt="Issues"></a>
</p>

# Material Dynamic Fonts

This project is based on https://fonts.google.com/icons. This is a microlib to fetch only the icons used in page automatically. No code required. Just drop it in your HTML. The expected result is to reduce the font file to about ~1kb.

## Getting Started

### CDN

#### Auto load
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/material-dynamic-fonts@1.1.4/dist/cdn/material-dynamic-fonts.min.js?font=Material Symbols Outlined"></script>
```

#### Manual load

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/material-dynamic-fonts@1.1.4/dist/cdn/material-dynamic-fonts.min.js"></script>
```

```js
materialDynamicFonts("Material Symbols Outlined");
```

### NPM

```bash
npm i material-dynamic-fonts
```

```js
import "material-dynamic-fonts";
```

```js
materialDynamicFonts("Material Symbols Outlined");
```

## License

[MIT](https://opensource.org/licenses/MIT)

## Thank you!
[![Stargazers repo roster for @leonardorafael/material-dynamic-fonts](https://reporoster.com/stars/notext/leonardorafael/material-dynamic-fonts)](https://github.com/leonardorafael/material-dynamic-fonts/stargazers)
