## Установка и запуск проекта
### 1. Установить пакеты
#### `npm install`
### 2. Создать БД, запустить миграцию, заполнить тестовыми данными из сидов (используется PostgreSQL; настройка: `config/config.json`)
#### `npx sequelize-cli db:create`
#### `npx sequelize-cli db:migrate`
#### `npx sequelize-cli db:seed:all`
### 3. Запустить приложение
#### `npm start`
или 
#### `npm run dev`

По умолчанию приложение запускается по адресу `http://localhost:3000`.