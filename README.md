# SneakerDrop Frontend

Клієнтська частина веб-додатку каталогу кросівок **SneakerDrop**. Проєкт демонструє підключення до REST API бекенду з обходом політики CORS, використовуючи HTML, CSS та jQuery.

## Технології

- HTML5, CSS3
- jQuery (`$.ajax()`)
- Python `http.server` для локального запуску

## Вимоги

- Python 3.12
- Git

## Запуск проєкту

Проєкт розділено на два незалежні репозиторії: бекенд (API) та фронтенд (клієнт). Для коректної роботи обидва сервери мають працювати одночасно на різних портах.

| Частина   | Адреса                  | Порт |
|-----------|-------------------------|------|
| Бекенд    | `http://localhost:8000` | 8000 |
| Фронтенд  | `http://localhost:3000` | 3000 |

### Етап 1. Запуск бекенду (API)

Без працюючого бекенду фронтенд не отримає дані для відображення.

1. Склонуйте репозиторій і перейдіть на потрібну гілку:

   ```bash
   git clone https://github.com/ArtemkoDi/SneakerDrop.git
   cd SneakerDrop
   git checkout feature/crud-api
   ```

2. Створіть та активуйте віртуальне середовище:

   ```bash
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # macOS / Linux
   source venv/bin/activate
   ```

3. Встановіть залежності:

   ```bash
   pip install -r requirements.txt
   ```

4. Застосуйте міграції:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Запустіть сервер:

   ```bash
   python manage.py runserver
   ```

### Етап 2. Запуск фронтенду

1. Склонуйте цей репозиторій:

   ```bash
   git clone https://github.com/ArtemkoDi/sneakerdrop-frontend.git
   cd sneakerdrop-frontend
   ```

2. Відкрийте **нове вікно термінала** в папці фронтенд-проєкту та запустіть локальний HTTP-сервер:

   ```bash
   python -m http.server 3000
   ```



### Етап 3. Перевірка роботи

1. Відкрийте браузер.
2. Перейдіть за адресою [http://localhost:3000](http://localhost:3000).
3. На сторінці відобразиться каталог кросівок. Дані автоматично завантажуються з локального бекенд-сервера за допомогою методу `$.ajax()`.

## Можливі проблеми

- **Порожня сторінка або помилка в консолі браузера.** Перевірте, що бекенд запущений на порту 8000.
- **Помилка CORS.** Переконайтеся, що ви використовуєте гілку `feature/crud-api`, де налаштовано CORS.