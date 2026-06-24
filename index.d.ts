declare global {
  function materialDynamicFonts(font?: string, selector?: string): Promise<string>;
}

declare module "material-dynamic-fonts";
export default materialDynamicFonts;