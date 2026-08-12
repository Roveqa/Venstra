import clsx from "clsx";
import { Mail } from "lucide-react";
import { Input, type InputProps } from "./input";
import styles from "./email-input.module.css";

/**
 * Source: Figma "Input Email" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:12, ComponentSet 1753:17527). Same
 * 7-state x 2-size anatomy as Input Text — structurally an Input Text
 * instance with a mail icon in the left slot, so this wraps Input and
 * fixes leftIcon to the lucide Mail glyph.
 *
 * Checked the real configurable master (1753:17556/1753:17557, same
 * pattern as Input Text/Search/Number's own masters) before building:
 * it exposes iconLeft (default true)/iconRight/suffix/label/hintText
 * — no kbd (that's Search-only). iconRight/suffix are left as regular
 * passthrough props (Input already supports them); leftIcon is the
 * only one fixed/omitted here.
 *
 * The icon's color is NOT static like Input Text/Password's icon
 * slots — same dynamic rule as Input Search, re-verified via raw SVG
 * stroke across every state: foreground-muted (#b3b3b3) only in the
 * bare empty/Placeholder state, foreground-subtle (#4a4a4a) in every
 * other state (Hover, Focus, Filled, Error, Error focus, Disabled).
 * Implemented the same way as Search, via --icon-color/
 * --icon-color-hover custom properties consumed by Input's .icon
 * rule, with the actual hover/focus/filled/disabled/error scoping
 * living in input.module.css itself (scoped to .box, the real field)
 * so hovering the label/hint text doesn't also darken the icon.
 *
 * type="email" is fixed (not in Figma, but the defining native
 * behavior of an email field — browser format validation/autofill),
 * matching how PasswordInput fixes type="password"/"text".
 */
export type EmailInputProps = Omit<InputProps, "leftIcon" | "kbd" | "type">;

export function EmailInput({ wrapperClassName, ...props }: EmailInputProps) {
  return (
    <Input
      {...props}
      type="email"
      wrapperClassName={clsx(styles.wrapper, wrapperClassName)}
      leftIcon={<Mail />}
    />
  );
}
