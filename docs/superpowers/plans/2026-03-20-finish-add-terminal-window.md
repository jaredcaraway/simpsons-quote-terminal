# Finish add-terminal-window Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix CSS bugs, implement variable-speed typewriter animation, and wire up the `r` keypress shortcut to complete the `add-terminal-window` branch.

**Architecture:** All work is in three files — `css/style.css` (direct edits, no build step since Gulp 3 + Node 20 is unreliable), `scss/style.scss` (keep source in sync), and `js/index.js` (typewriter + keypress). Gulpfile path references are corrected for future use. No test framework exists; verification is manual browser testing via opening `index.html` directly.

**Tech Stack:** Vanilla HTML, jQuery 3.2.1, SCSS (source only — CSS edited directly), Bootstrap 3, FontAwesome. No build step required to run the app.

---

## File Map

| File | Change |
|---|---|
| `css/style.css` | Fix stray `*/` (line 13), fix malformed color (line 79), remove `opacity: 0%` (line 100) |
| `scss/style.scss` | Remove `opacity: 0%` from `#twitterButton` to keep source in sync |
| `js/index.js` | Implement `typeWrite()`, move keypress handler inside document-ready, remove `displayQuote()` |
| `gulpfile.js` | Fix `scripts.js` → `index.js` and `styles.scss` → `style.scss` |

---

## Task 1: Fix CSS Bugs

**Files:**
- Modify: `css/style.css:13` — remove stray `*/`
- Modify: `css/style.css:79` — fix malformed color
- Modify: `css/style.css:100` — remove invalid opacity

**Context:** The spec's preferred path is to fix SCSS and recompile. However, `node_modules` are not installed and Gulp 3 (`^3.9.1`) has known compatibility issues with Node 20 — running `gulp styles` is unreliable without first verifying the install works. To avoid a build tooling rabbit hole, CSS is edited directly here. The SCSS source is updated in Task 2 to stay in sync. The resulting CSS remains human-readable rather than minified, which is fine for this project.

- [ ] **Step 1: Fix line 13 — remove stray comment-close**

  In `css/style.css`, line 13 currently reads:
  ```
  } */
  ```
  Change it to:
  ```
  }
  ```

- [ ] **Step 2: Fix line 79 — correct malformed color**

  Line 79 currently reads:
  ```css
  color: #dd4 614;
  ```
  Change it to:
  ```css
  color: rgb(221, 70, 20);
  ```

- [ ] **Step 3: Fix line 100 — remove invalid opacity**

  Line 100 currently reads:
  ```css
  opacity: 0%;
  ```
  Delete this line entirely. The `display: none` on the line above already hides the button; jQuery's `fadeIn` will handle the opacity animation.

- [ ] **Step 4: Verify in browser**

  Open `index.html` in a browser (File → Open, or `open index.html` on macOS). The page should:
  - Show a purple background with the terminal window centered
  - Show the FreeCodeCamp icon (red/orange) on the left — if it shows no color, the color fix didn't take
  - Show no JavaScript errors in the console

- [ ] **Step 5: Commit**

  ```bash
  git add css/style.css
  git commit -m "Fix broken CSS: remove stray comment-close, malformed color, invalid opacity"
  ```

---

## Task 2: Keep SCSS Source in Sync

**Files:**
- Modify: `scss/style.scss:124`

**Context:** The SCSS is the source of truth. We edited CSS directly in Task 1, so we must also remove `opacity: 0%` from the SCSS so future recompiles don't reintroduce the bug.

- [ ] **Step 1: Remove opacity from SCSS**

  In `scss/style.scss`, find the `#twitterButton` rule (around line 120–129):
  ```scss
  #twitterButton {
    position: absolute;
    bottom: 18%;
    display: none;
    opacity: 0%;

    i {
      padding-left: 15%;
    }
  }
  ```
  Remove the `opacity: 0%;` line so it reads:
  ```scss
  #twitterButton {
    position: absolute;
    bottom: 18%;
    display: none;

    i {
      padding-left: 15%;
    }
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add scss/style.scss
  git commit -m "Remove invalid opacity from twitterButton SCSS source"
  ```

---

## Task 3: Fix Gulpfile Path References

**Files:**
- Modify: `gulpfile.js:11` — `js/scripts.js` → `js/index.js`
- Modify: `gulpfile.js:31` — `scss/styles.scss` → `scss/style.scss`

**Context:** These mismatches cause `gulp watch` to silently fail. Runtime behavior is unaffected (the app loads `js/index.js` directly, not any compiled output).

- [ ] **Step 1: Fix the scripts task source path**

  In `gulpfile.js` line 11, change:
  ```js
  return gulp.src('js/scripts.js')
  ```
  to:
  ```js
  return gulp.src('js/index.js')
  ```

- [ ] **Step 2: Fix the styles task source path**

  In `gulpfile.js` line 31, change:
  ```js
  return gulp.src('./scss/styles.scss')
  ```
  to:
  ```js
  return gulp.src('./scss/style.scss')
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add gulpfile.js
  git commit -m "Fix gulpfile source paths to match actual filenames"
  ```

---

## Task 4: Implement typeWrite() and Fix Keypress

**Files:**
- Modify: `js/index.js`

**Context:** `typeWrite()` is currently an empty stub. `displayQuote()` does a raw `innerHTML` dump and is deleted entirely. The keypress handler lives outside the `$(function(){...})` wrapper, making `generateButton` out of scope — it must be moved inside. `showTweetButton()` is moved from the Ajax callback into the end of `typeWrite()` so the tweet button only appears after the animation finishes.

- [ ] **Step 1: Replace `typeWrite()` with the full implementation**

  Find the empty `typeWrite` function in `js/index.js`:
  ```js
  function typeWrite(data) {
   // console.log("typeWrite function called");
  }
  ```

  Replace it with:
  ```js
  function typeWrite(data) {
    var quote = data[0].quote;
    var character = data[0].character;
    var fullText = quote;
    var attribution = '-' + character;
    var index = 0;

    quoteOutput.innerHTML = '<br>';

    function typeChar() {
      if (index < fullText.length) {
        var char = fullText[index];
        quoteOutput.innerHTML += char;
        index++;

        var delay = Math.floor(Math.random() * 50) + 30; // 30–80ms base
        if ('.!?,'.indexOf(char) !== -1) {
          delay += 200; // pause after punctuation
        }
        setTimeout(typeChar, delay);
      } else {
        // Quote done — pause then type attribution
        setTimeout(function() {
          quoteOutput.innerHTML += '<br>';
          var attrIndex = 0;
          function typeAttr() {
            if (attrIndex < attribution.length) {
              quoteOutput.innerHTML += attribution[attrIndex];
              attrIndex++;
              var delay = Math.floor(Math.random() * 50) + 30;
              setTimeout(typeAttr, delay);
            } else {
              showTweetButton();
            }
          }
          typeAttr();
        }, 400);
      }
    }

    typeChar();
  }
  ```

- [ ] **Step 2: Delete `displayQuote()` and remove its call from the Ajax callback**

  Delete this function entirely:
  ```js
  function displayQuote(data) {
    quoteOutput.innerHTML = "<br>" + data[0].quote + "<br><br>-" + data[0].character;
  }
  ```

  The current Ajax success callback has three calls — remove two of them. It currently reads:
  ```js
  success: function(data) {
    tweetQuote = tweetifyQuote(data);
    showTweetButton();
    typeWrite(data);
    displayQuote(data);
  }
  ```
  Remove `showTweetButton()` (now called at the end of `typeWrite`) and `displayQuote(data)` (deleted above). Result:
  ```js
  success: function(data) {
    tweetQuote = tweetifyQuote(data);
    typeWrite(data);
  }
  ```

- [ ] **Step 3: Move the keypress handler inside the document-ready wrapper and fix it**

  Delete the keypress handler currently at the bottom of the file (outside `$(function(){...})`):
  ```js
  $(document).keypress(function(event){
    //alert(String.fromCharCode(event.which));
    var keyPressed = String.fromCharCode(event.which);
    if (keyPressed.toLowerCase() === "r") {
      alert("Generating new quote!");
    }
  });
  ```

  Add this replacement inside `$(function(){ ... })`, just before the closing `});`:
  ```js
  $(document).keypress(function(event) {
    var keyPressed = String.fromCharCode(event.which);
    if (keyPressed.toLowerCase() === 'r') {
      generateButton.click();
    }
  });
  ```

- [ ] **Step 4: Verify in browser**

  Open `index.html` in a browser. Test:
  1. Click "Generate Quote" — quote text should type out character by character with variable speed; attribution (`-Character Name`) should appear after a short pause; tweet button should fade in only after animation completes
  2. Press `r` — should trigger a new quote fetch (same behavior as clicking Generate)
  3. Click "Tweet Quote" after a quote loads — should open a Twitter intent popup

- [ ] **Step 5: Commit**

  ```bash
  git add js/index.js
  git commit -m "Implement typeWrite() animation, fix r keypress shortcut, remove displayQuote()"
  ```

---

## Task 5: Final Check and Branch Summary

- [ ] **Step 1: Confirm git log looks clean**

  ```bash
  git log --oneline origin/master..HEAD
  ```

  Expected output (roughly):
  ```
  <hash> Implement typeWrite() animation, fix r keypress shortcut, remove displayQuote()
  <hash> Fix gulpfile source paths to match actual filenames
  <hash> Remove invalid opacity from twitterButton SCSS source
  <hash> Fix broken CSS: remove stray comment-close, malformed color, invalid opacity
  <hash> Update design spec with implementation details and correct commit order
  <hash> Add design spec for finishing add-terminal-window branch
  ```

- [ ] **Step 2: Final browser smoke test**

  Open `index.html`. Run through:
  - Generate a quote (click button) — typewriter works
  - Generate another quote while animation may still be running — page handles it gracefully (clears and restarts)
  - Press `r` — triggers new quote
  - Tweet button appears only after animation finishes
  - Icons are red/orange colored (RGB fix worked)
  - No console errors
