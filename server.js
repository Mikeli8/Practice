const WebSocket = require('ws');

const keywords = {
'ocean': ['https://image.shutterstock.com/image-photo/underwater-sea-deep-abyss-blue-260nw-2178017823.jpg', 
  'https://image.shutterstock.com/image-photo/spectacular-aerial-top-view-background-260nw-2285024411.jpg', 
  'https://image.shutterstock.com/image-photo/blue-ocean-waves-260nw-1166741512.jpg'],
'mountain': ['https://image.shutterstock.com/image-photo/mountain-rock-landscape-winding-road-260nw-2173079109.jpg', 
  'https://image.shutterstock.com/image-photo/3-mountain-peak-snow-winter-260nw-1850945110.jpg', 
  'https://image.shutterstock.com/image-photo/fantastic-evening-panorama-bachalp-lake-260nw-1216555750.jpg'],
'sky': ['https://image.shutterstock.com/image-photo/night-sky-picture-beautiful-digital-260nw-1542099218.jpg', 
  'https://image.shutterstock.com/image-photo/blue-sky-background-tiny-clouds-260nw-636311084.jpg', 
  'https://image.shutterstock.com/image-photo/morning-sky-looked-like-bright-260nw-1938508552.jpg']
};

let MaxThreadCount = 8; 
const server = new WebSocket.Server({ port: 5020 });
console.log("Сервер запущен. Порт 5020");

server.on('connection', (socket) => 
{
  console.log("Пользователь подключился");
  let threadCount = 0; 

  socket.on('message', (keyword) => 
  {
    console.log(`Получено ключевое слово: ${keyword}`);
    const urls = keywords[keyword];
    if (threadCount < MaxThreadCount) 
    {
      threadCount++;

      if (urls) 
      {
        socket.send(JSON.stringify(urls));
      } 
      else 
      {
        socket.send(JSON.stringify(new String('empty')));
      }

      console.log("Запуск потока");
    }
    else 
    {
      console.log('Занято максимальное количество потоков');
    }
  });

  socket.on('close', () => 
  {
    console.log('Пользователь отключился');
  });
});