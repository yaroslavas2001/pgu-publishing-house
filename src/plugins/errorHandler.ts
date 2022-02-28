import { App } from "vue";

type ErrorHandlerFuncType = (err: Error) => {};

const install = (app: App, options: { handler: ErrorHandlerFuncType }) => {
  if ((options || {}).handler == null) {
    console.error("Необходимо передать обработчик функцию. Используйте поле handler в параметре options");
    return;
  }

  const errorHandler = options.handler;
  app.config.errorHandler = (error: Error) => {
    errorHandler(error);
    console.error("vue-error:", error);
    // throw err;
  };
  window.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
    errorHandler(error);
    console.error("windows-error:", error);
    // throw error;
  };
};

const plugin = {
  install,
};

export default plugin;
