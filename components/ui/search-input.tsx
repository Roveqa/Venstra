import clsx from "clsx";
import { Search } from "lucide-react";
import { Input, type InputProps } from "./input";
import styles from "./search-input.module.css";

/**
 * Source: Figma "Input Search" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:12, ComponentSet 1657:8786). Same
 * 7-state x 2-size anatomy as Input Text — it's structurally an Input
 * Text instance with a permanently-on search icon in the left slot
 * (no separate master/boolean props; every one of the 14 state
 * variants has the icon baked in), so this wraps Input and fixes
 * leftIcon to the lucide Search glyph.
 *
 * The icon's color is NOT static like Input Text/Password's icon
 * slots: verified via raw SVG stroke across every state — it's
 * foreground-muted (#b3b3b3) only in the bare empty/Placeholder
 * state, and foreground-subtle (#4a4a4a) in every other state
 * (Hover, Focus, Filled, Error, Error focus, Disabled). Implemented
 * in search-input.module.css via a --icon-color custom property that
 * Input's own .icon rule already consumes (with a foreground-weak
 * fallback, so Input Text/Password are unaffected).
 */
export type SearchInputProps = Omit<InputProps, "leftIcon">;

export function SearchInput({ wrapperClassName, ...props }: SearchInputProps) {
  return (
    <Input
      {...props}
      wrapperClassName={clsx(styles.wrapper, wrapperClassName)}
      leftIcon={<Search />}
    />
  );
}
