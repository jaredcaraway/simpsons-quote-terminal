# Design: Finish `add-terminal-window` Branch

**Date:** 2026-03-20
**Branch:** `add-terminal-window`
**Project:** Simpsons Quote Terminal (FreeCodeCamp)

---

## Overview

Finish the `add-terminal-window` branch: implement the typewriter animation, fix two bugs, correct gulpfile paths, and regenerate `css/style.css` from SCSS. The current `css/style.css` has two bugs (a stray `} */` on line 13 and a malformed color `#dd4 614` on line 79); both disappear when the file is properly regenerated from the SCSS source, so no manual CSS edits are needed.

---

## Scope

### 1. Fix SCSS and Recompile CSS

In `scss/style.scss`, remove `opacity: 0%;` from `#twitterButton` (the only SCSS change needed). Then recompile to regenerate `css/style.css`. The regenerated file will be clean: no stray `} */`, correct color `rgb(221, 70, 20)` matching the SCSS source, and no invalid `opacity: 0%`.

**Note:** `opacity: 0%` is invalid CSS (opacity takes 0–1, not a percentage). It also conflicts with jQuery's `fadeIn`, which animates opacity from 0 to 1. Removing it from the source lets `fadeIn` work correctly; `display: none` already handles the initial hidden state.

Recompile by running the `gulp styles` task (or equivalent). Note: the gulpfile uses `outputStyle: 'compressed'`, so the regenerated `css/style.css` will be minified (single line), unlike the current human-readable file.

Commit: _"Remove invalid opacity from twitterButton SCSS and recompile CSS"_

### 2. Implement `typeWrite(data)` — Variable Speed

Replace the empty stub in `js/index.js`. The function receives the API response array (`data[0].quote`, `data[0].character`).

**Behavior:**
- Set `#quoteOutput` innerHTML to `<br>` before typing begins (preserves the vertical spacing that `displayQuote()` used, which opened with `"<br>" + quote`)
- Type each character of `data[0].quote` into `#quoteOutput` using recursive `setTimeout`, one character per call
- Randomize delay per character: 30–80ms base; add ~200ms extra after `.`, `,`, `!`, `?`
- After the quote finishes, pause ~400ms, then append `<br>` via `quoteOutput.innerHTML += '<br>'`, then type `-` + `data[0].character` at the same variable speed character by character (use `innerHTML +=` consistently throughout — `#quoteOutput` is a `<span>` so `\n` does not produce line breaks)
- `#cursor` is a sibling div styled `display: inline-block` in CSS, which makes it sit inline after `#quoteOutput`. It naturally appears at the end of typed text with no explicit cursor movement needed
- If Generate is clicked while a typewriter animation is still running, the new call clears `#quoteOutput` and starts fresh — the old `setTimeout` chain will fire once more but find no more characters to append. This race condition is acceptable for a project of this scale; no cancellation logic is needed
- Call `showTweetButton()` only after the full typewriter animation completes (move it to the end of the animation, not in the Ajax success callback directly)

**Changes to `$.ajax` success callback:**
- Remove `displayQuote(data)` call
- Remove `showTweetButton()` call from here (moved inside typeWrite)
- Keep `tweetifyQuote(data)` and its result assignment
- Keep `typeWrite(data)` call (already wired)
- Delete `displayQuote()` function body entirely

### 3. Fix `r` Keypress Shortcut

The keypress handler (currently outside the `$(function(){...})` document-ready wrapper) must be moved inside the wrapper so that `generateButton` is in scope. Then replace `alert("Generating new quote!")` with `generateButton.click()` so pressing `r` triggers the same flow as clicking Generate.

### 4. Fix Gulpfile Filename References

In `gulpfile.js`, correct two path mismatches:
- `js/scripts.js` → `js/index.js`
- `scss/styles.scss` → `scss/style.scss`

Note: the `scripts` task output (a `.min.js` file) is not loaded by `index.html`, so fixing this path does not change runtime behavior — it only makes `gulp watch` not silently fail.

---

## Commit Order

1. Fix gulpfile paths + fix SCSS opacity + recompile CSS → commit (Steps 1 & 4 combined; gulpfile must be corrected before `gulp styles` can run)
2. Implement `typeWrite()`, fix `r` keypress → commit (Steps 2 & 3)

---

## Files Changed

| File | Change |
|---|---|
| `scss/style.scss` | Remove `opacity: 0%` from `#twitterButton` |
| `css/style.css` | Regenerated from SCSS (replaces broken manual output) |
| `js/index.js` | Implement `typeWrite()`, move `showTweetButton()` call, remove `displayQuote()`, fix `r` keypress |
| `gulpfile.js` | Fix `scripts.js` → `index.js` and `styles.scss` → `style.scss` |

---

## Out of Scope

- Any new features
- Changing the visual design of the terminal window
- Refactoring the API call logic
