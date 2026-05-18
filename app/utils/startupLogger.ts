type StartupMeta = Record<string, unknown> | undefined;

const STARTUP_PREFIX = '[startup]';

const withMeta = (event: string, meta?: StartupMeta) => {
  if (!meta) {
    return [`${STARTUP_PREFIX} ${event}`];
  }

  return [`${STARTUP_PREFIX} ${event}`, meta];
};

export const startupLog = (event: string, meta?: StartupMeta) => {
  console.log(...withMeta(event, meta));
};

export const startupWarn = (event: string, meta?: StartupMeta) => {
  console.warn(...withMeta(event, meta));
};

export const startupError = (
  event: string,
  error?: unknown,
  meta?: StartupMeta,
) => {
  if (error) {
    console.error(...withMeta(event, meta), error);
    return;
  }

  console.error(...withMeta(event, meta));
};
