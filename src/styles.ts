/**
 * Everything related to styling goes here.
 */
import { hypostyle as hypo } from "hypostyle";
import * as presets from "hypostyle/presets";

/**
 * Strictly type your theme here
 */
declare module "hypostyle" {
  interface UserTheme {
    tokens: {
      color: {
        primary: "#ff4567";
      };
    };
  }
}

/**
 * The main hypostyle instance. You'll use this to configure `hypobox`, for
 * global styles, and to extract static CSS for server rendering.
 */
export const hypostyle = hypo({
  ...presets,
  tokens: {
    ...presets.tokens,
    color: {
      primary: "#ff4567",
    },
  },
});

/**
 * Global styles
 */
export const globalStyles = hypostyle.createGlobal({
  "*": {
    boxSizing: "border-box",
  },
  "html, body": {
    margin: 0,
    fontFamily: "sans-serif",
  },
  a: {
    color: "#333",
    "&:hover": {
      color: "blue",
    },
  },
});
