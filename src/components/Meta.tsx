/**
 * Obviously this functionality needs to be built out, but you get the idea
 */

import { PropsWithChildren } from "hyposcript";

let title = "My Cool Site";
let description = "";
let image = "";

export function Title({ children }: PropsWithChildren<{}>) {
  // @ts-ignore
  title = [].concat(children).filter(Boolean)[0] || title;
  return null;
}

export function Description({
  content,
}: PropsWithChildren<{ content: string }>) {
  description = content || description;
  return null;
}

export function Image({ content }: PropsWithChildren<{ content: string }>) {
  image = content || image;
  return null;
}

export const Meta = {
  Title,
  Description,
  Image,
};

export function flush() {
  return {
    title,
    description,
    image,
  };
}
