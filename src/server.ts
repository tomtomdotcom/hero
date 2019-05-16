import Koa from 'koa';
import Router from 'koa-router';
import * as events from './endpoints/events';
import * as augmentedEvents from './endpoints/augmentedEvents';
import * as summary from './endpoints/summary';
import * as processedEvents from './endpoints/processedEvents';

function registerRoutes(router: Router) {
  router.get('/getEvents', events.handler);
  router.get('/getAugmentedEvents', augmentedEvents.handler);
  router.get('/getEventsSummary', summary.handler);
  router.get('/getProcessedEvents', processedEvents.handler);
}

export default async function createServer(): Promise<Koa> {
  const router = new Router();
  registerRoutes(router);
  const app = new Koa();

  app.use(router.routes()).use(router.allowedMethods());

  return Promise.resolve(app);
}
