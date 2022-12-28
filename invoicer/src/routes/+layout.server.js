
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const userId = cookies.get('userId');

  console.log(userId);

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