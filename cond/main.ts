Deno.serve(async (req) => {
  const url = new URL(req.url);
  let filePath = url.pathname;

  // Если запрашивают корень сайта, отдаём главную страницу
  if (filePath === "/") {
    filePath = "/mainpro.html";
  }

  try {
    // Пытаемся прочитать запрошенный файл из репозитория
    const file = await Deno.readFile(`.${filePath}`);

    // Определяем тип контента (для HTML, CSS, картинок)
    const contentType = filePath.endsWith('.html') ? 'text/html' :
                        filePath.endsWith('.css') ? 'text/css' :
                        filePath.endsWith('.js') ? 'application/javascript' :
                        filePath.endsWith('.png') ? 'image/png' :
                        filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') ? 'image/jpeg' :
                        'application/octet-stream';

    return new Response(file, {
      headers: { "content-type": contentType },
    });
  } catch (error) {
    // Если файл не найден, возвращаем 404
    return new Response("File not found", { status: 404 });
  }
});