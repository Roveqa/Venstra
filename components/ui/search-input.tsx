import clsx from "clsx";
import { Search } from "lucide-react";
import { Input, type InputProps } from "./input";
import styles from "./search-input.module.css";

/**
 * Source: Figma "Input Search" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:12, ComponentSet 1657:8786). Same
 * 7-state x 2-size anatomy as Input Text — it's structurally an Input
 * Text instance with a search icon in the left slot, so this wraps
 * Input and fixes leftIcon to the lucide Search glyph.
 *
 * The icon's color is NOT static like Input Text/Password's icon
 * slots: verified via raw SVG stroke across every state — it's
 * foreground-muted (#b3b3b3) only in the bare empty/Placeholder
 * state, and foreground-subtle (#4a4a4a) in every other state
 * (Hover, Focus, Filled, Error, Error focus, Disabled). Implemented
 * via --icon-color/--icon-color-hover custom properties (set in
 * search-input.module.css) that Input's .icon rule consumes — the
 * actual hover/focus/filled/disabled/error scoping lives in
 * input.module.css itself, scoped to .box (the real field), so
 * hovering the label/hint text doesn't also darken the icon (an
 * earlier pass scoped this to the whole wrapper instead, which did
 * trigger on label/hint hover — caught and fixed).
 *
 * The real configurable master (1657:8762, a separate ComponentSet
 * from the 14 state variants — found via the "Input Search" doc
 * instance's applied master, same pattern as Input Text's 1648:13446)
 * exposes iconLeft/kbd/suffix/label/hintText booleans. suffix reuses
 * Input's existing suffix prop as-is (identical anatomy/tokens to
 * Input Text's). kbd is new — not present on Input Text/Password's
 * masters at all — and renders a Kbd/Outline chip (e.g. `<Kbd
 * variant="outline" icon={<Command />}>K</Kbd>`, matching the
 * existing Kbd component/playground convention for the ⌘ modifier)
 * between the field text and suffix; added as a dedicated `kbd` prop
 * on Input itself (input.tsx) since it needs to render unwrapped.
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
