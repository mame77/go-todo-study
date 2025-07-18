CREATE TABLE `profile`(
    `user_id` BINARY(16) PRIMARY KEY COMMENT 'ユーザーID',
    `image_url` VARCHAR(255) NOT NULL COMMENT 'アイコンURL',
    FOREIGN KEY (user_id) REFERENCES users(id)
)
