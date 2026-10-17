// Sistemde hazır gelen makaleler. Kullanıcı bunları uygulamadan değiştiremez/silemez;
// yalnızca burada, kod tarafında eklenir/düzenlenir.
//
// Alanlar:
//   id        – benzersiz, "b-" ile başlamalı
//   title     – düz string VEYA { tk: '...', ru: '...' }
//   content   – HTML string VEYA { tk: '<p>..</p>', ru: '<p>..</p>' }
//   image     – (opsiyonel) URL veya /public altındaki yol
//   category  – (opsiyonel) { tk: '...', ru: '...' } rozet olarak gösterilir
export const builtinArticles = [
  {
    id: 'b-1',
    builtin: true,
    title: { tk: 'Hoş geldiňiz', ru: 'Добро пожаловать' },
    category: { tk: 'Umumy', ru: 'Общее' },
    content: {
      tk: '<p>Bu <strong>kod tarapyndan</strong> goşulan taýýar makala. Ony programmadan üýtgedip bolmaýar.</p>',
      ru: '<p>Это готовая статья, добавленная <strong>из кода</strong>. Изменить её из приложения нельзя.</p>',
    },
  },
  {
    id: 'b-2',
    builtin: true,
    title: { tk: 'Programmany nädip ulanmaly', ru: 'Как пользоваться приложением' },
    category: { tk: 'Umumy', ru: 'Общее' },
    content: {
      tk: '<p>Baş sahypadaky <em>+</em> düwmesi bilen täze makala goşuň. Kategoriýalary çep tarapdaky menýudan dolandyryp bilersiňiz.</p>',
      ru: '<p>Нажмите <em>+</em> на главной, чтобы добавить статью. Категориями можно управлять в боковом меню.</p>',
    },
  },
]
