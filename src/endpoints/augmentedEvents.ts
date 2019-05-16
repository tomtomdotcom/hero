import * as Router from 'koa-router';
import { HeroApiHelper } from '../ApiHelper';

export const handler: Router.IMiddleware = async (ctx): Promise<void> => {
  try {
    const res = await HeroApiHelper.getAugmentedEvents();
    ctx.body = res;
  } catch (ex) {
    ctx.status = 500;
    ctx.body = {
      error: ex.message,
    };
    return;
  }
};
