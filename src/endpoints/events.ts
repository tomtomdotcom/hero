import * as Router from 'koa-router';
import { HeroApiHelper } from '../ApiHelper';

export const handler: Router.IMiddleware = async (ctx): Promise<void> => {
  try {
    ctx.body = await HeroApiHelper.getEvents();
  } catch (ex) {
    ctx.status = 500;
    ctx.body = {
      error: ex.message,
    };
    return;
  }
};
