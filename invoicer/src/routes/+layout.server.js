// import { getFirms } from '$lib/api/server/firm';
// import { setCookie } from '$lib/helpers/cookies';

import { getFirm } from '$lib/api/server/firm';

export const ssr = false;
export const prerender = false;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const userId = cookies.get('userId');

  let currentLang = cookies.get('currentLand');
  if (!currentLang) {
    currentLang = 'en';
    cookies.set('currentLang', currentLang);
  }
  let langData;
  if (currentLang == 'en') {
    langData = await import('../translations/en.json');
  } else {
    langData = await import('../translations/ua.json');
  }

  return {
    userId: userId,
    t: JSON.stringify(langData),
  };
}