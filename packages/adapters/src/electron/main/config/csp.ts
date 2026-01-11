/**
 * Content Security Policy configuration for Electron
 */
export const isDev =
  process.env.NODE_ENV === "development" ||
  !process.env.NODE_ENV ||
  process.defaultApp;

export const cspPolicy = isDev
  ? [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self' ws://localhost:* http://localhost:*",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
    ].join("; ")
  : [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
    ].join("; ");
