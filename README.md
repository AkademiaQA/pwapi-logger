# ⚡ pwapi-logger

A minimal Playwright project demonstrating how to add a **colorful API request/response logger** using a custom [fixture](https://playwright.dev/docs/test-fixtures).

🚫 No plugins, no extra libraries beyond `chalk` — just a Playwright fixture that wraps `APIRequestContext` with a transparent `Proxy`.

---

## 🔍 How it works

The logger is implemented as a single fixture file: `src/fixtures/test.ts`.

```
src/fixtures/test.ts   ← custom fixture (logger lives here)
tests/                 ← your test files
playwright.config.ts   ← baseURL loaded from .env
.env                   ← API_URL and LOGGER flag
```

### 🧩 The fixture pattern

```ts
export const test = base.extend<{ request: APIRequestContext }>({
  request: async ({ request }, use) => {
    await use(wrapRequest(request));
  },
});
```

`wrapRequest` wraps the built-in `request` fixture with a `Proxy` that intercepts every HTTP method call (`get`, `post`, `put`, `patch`, `delete`, `head`, `fetch`), logs the request and response, and returns the original response untouched.

### ✍️ Using it in tests

Import `test` and `expect` from the fixture instead of `@playwright/test`:

```ts
import { test, expect } from "@fixtures/test";

test("GET /users/1", async ({ request }) => {
  const response = await request.get("/users/1");
  expect(response.ok()).toBeTruthy();
});
```

That's it — no other changes needed.

---

## 🖥️ Console output

When `LOGGER=true`, each request/response pair is printed as two clearly separated sections:

```
⚡ REQUEST  ──────────────────────────────────────  11:03:09.861
  [ POST ]  https://api.example.com/users
  ┃  headers
        │  "X-Custom-Header": "pwapi-logger"
  ┃  payload
        "name": "John Doe",
        "email": "john@example.com"

📥 RESPONSE  ─────────────────────────────────────  11:03:09.963
  ✓  201  ·  102ms

  headers
        │  "content-type": "application/json"
        │  "x-request-id": "abc123"

  body
  {
    "id": 42,
    "name": "John Doe"
  }

────────────────────────────────────────────────────────────────
```

🎨 **Color legend:**
| Color | Meaning |
|---|---|
| 🟢 Neon green | Section headers, timing, separators |
| 🏷️ Colored badge | HTTP method (`GET` green, `POST` purple, `DELETE` red, …) |
| ⚪ White bold | URL, section labels (`headers`, `payload`, `body`) |
| 🔵 Cyan | JSON / header keys |
| 🩶 Gray | JSON / header values |
| ✅ Green `✓` | 2xx status |
| ⚠️ Yellow `→` | 3xx status |
| ❌ Red `✗` | 4xx status |
| 💥 Red `💥` | 5xx status |

---

## 🚀 Setup

### 1. 📦 Install dependencies

```bash
npm install
npx playwright install chromium
```

### 2. ⚙️ Configure environment

Create a `.env` file in the project root:

```env
API_URL=https://your-api-base-url.com
LOGGER=true
```

`API_URL` is used as Playwright's `baseURL`, so tests can use relative paths like `/users/1`.  
💡 Set `LOGGER=false` (or omit it) to silence the logger output.

### 3. 🧪 Run tests

```bash
LOGGER=true npx playwright test
```

---

## 📁 Project structure

```
src/
  fixtures/
    test.ts          # custom fixture with the logger
tests/
  jsonplaceholder-api-logger.spec.ts   # example CRUD tests
playwright.config.ts
.env
```

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `@playwright/test` | Test runner and API client |
| `chalk` | Terminal colors (v4, CommonJS) |
| `dotenv` | Load `.env` into `process.env` |

---


Happy testing! 🚀

Created with 🧉 by [@bkita](https://github.com/bkita) x [@akademiaqa](https://github.com/akademiaqa)