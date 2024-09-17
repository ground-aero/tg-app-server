# Part-2 (Server). Telegram Mini App 'Three-in-One'

### Имя Telegram Mini App: *@TgGroundBot*

##### Бэкэнд развернут на виртуальном сервере Nginx на Ubuntu



 в приложении Telegram найдите бота с именем: **@TgGroundBot**
 - запустите бота нажатием кнопки 'Start'
 - выйдет приветстве Вас по имени пользователя, а также появятся кнопки: "Инфо о приложении", "Открыть окно приложения"  
 - при нажатии на кнопку "Инфо о приложении" появится информация о доступных сервисах
 - при нажатии на кнопку "Открыть окно приложения" откроется окно приложения с возможностью выбора страниц 1-3 (1.Чат, 2.Погода, 3.Прогноз)   
 - дополнительно можно пользоваться альтернативным Меню в закрепе (в нижней панели/меню Телеграмма)

 ```
 Telegram Bot API: 'node-telegram-bot-api'  

 Weather service API address: https://api.weatherapi.com/  
 
 Endpoints:
 /api/weather - запрос текущей погоды  
 /api/forecast - запрос прогноза погоды
 
 ```


---
Дополнительно.  
Фронтэнд часть-1 приложения развернута по адресу: [ttps://tg-app-client.netlify.app/](ttps://tg-app-client.netlify.app/)  
Адрес репозитория: [https://github.com/ground-aero/tg-app-client](https://github.com/ground-aero/tg-app-client)  

---

##### Basic stack: NodeJS, Express, Websocket, Telegram App Library, REST API; DevOps: Nginx, SSL

---

![img-1](/images/startMenu.png)  

---

![img-3](/images/chatWindow.png)

---

![img-2](/images/weatherWindow.png)
