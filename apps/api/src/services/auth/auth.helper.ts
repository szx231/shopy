import { COOKIES } from 'app.constants';
import { AppKoaContext } from 'types';

export const setTokenCookies = ({ ctx, accessToken }: { ctx: AppKoaContext; accessToken: string }) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
  });
};

export const unsetTokenCookies = (ctx: AppKoaContext) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
};

export default {
  setTokenCookies,
  unsetTokenCookies,
};
