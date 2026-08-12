"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "./input";
import styles from "./password-input.module.css";

/**
 * Source: Figma "Input Password" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:12, ComponentSet 1654:7703). Same
 * anatomy/tokens/states as Input Text (14 = 7 states × 2 sizes,
 * verified Placeholder/Filled/Error/Disabled directly) — the one
 * structural difference is the master component's `iconRight`
 * boolean defaults to true here (vs false on Input Text), i.e. the
 * eye/eye-off visibility toggle is a built-in, not opt-in, and its
 * icon color is foreground-muted (#b3b3b3, confirmed from the icon's
 * own SVG stroke) rather than Input Text's foreground-weak
 * (#5f5f5f) — a real, deliberate difference, not an inconsistency to
 * "fix".
 *
 * Figma's static demo instances pair eye-off with the empty
 * Placeholder state and eye (open) with the masked Filled state — the
 * opposite of the "eye = currently visible" convention most UI
 * libraries use. Since these are non-interactive snapshots (not an
 * actual toggle sequence), that pairing can't be taken as confirmed
 * intended behavior one way or the other. Implemented the standard,
 * widely-expected convention instead: EyeOff = currently masked
 * (click to reveal), Eye = currently visible (click to mask again).
 */
export type PasswordInputProps = Omit<InputProps, "type" | "rightIcon">;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      rightIcon={
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <Eye /> : <EyeOff />}
        </button>
      }
    />
  );
}
