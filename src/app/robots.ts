export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/invitations'],
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: 'https://boda.midominio.com/sitemap.xml',
  };
}
