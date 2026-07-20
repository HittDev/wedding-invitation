export default function sitemap() {
  return [
    {
      url: 'https://boda.midominio.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];
}
