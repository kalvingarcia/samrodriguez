export const TWO_COLUMN_DEFAULTS = {ratio: "50/50", gap_px: 24, stack_breakpoint_px: 720};

export function ratioToFr(ratio) {
    // Falls back to an even split instead of producing "NaN fr" — a config saved
    // under an older/removed ratio option shouldn't break layout.
    const [a, b] = String(ratio ?? "").split("/").map(Number);
    if(!Number.isFinite(a) || !Number.isFinite(b)) return [1, 1];
    return [a, b];
}
