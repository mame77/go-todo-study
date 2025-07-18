CREATE TABLE `todo` (
    `id` BINARY(16) PRIMARY KEY COMMENT 'Todo ID (UUID)',
    `user_id` BINARY (16) NOT NULL comment 'ユーザーID',
    `todo_title` VARCHAR(255) NOT NULL comment 'Todo-タイトル',
    `todo_content` VARCHAR(255) NOT NULL comment 'Todo-内容',
    `todo_finish` BOOLEAN NOT NULL DEFAULT FALSE comment 'Todo-完了',
    `todo_order` INT NOT NULL comment 'Todo-順番',
    FOREIGN KEY (user_id) REFERENCES users(id)
)

