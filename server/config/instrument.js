import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://38e06eb430b5e64e749b6f05337c9f37@o4509546253975552.ingest.us.sentry.io/4509546259546112",
  integrations: [Sentry.mongooseIntegration()],

  sendDefaultPii: true,
});
