CREATE TABLE `users`(
    `id`BINARY(16) PRIMARY KEY COMMENT 'ユーザーID',
    `email`VARCHAR(255) NOT NULL COMMENT 'メールアドレス',
    `name`VARCHAR(255) NOT NULL COMMENT 'フルネーム',
    `created_at` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP COMMENT '作成日時',
    `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新日時'
);


CREATE TABLE `google_ids`(
    `id` VARCHAR(255) PRIMARY KEY COMMENT 'googleユーザーID',
    `user_id` BINARY(16) NOT NULL COMMENT 'ユーザーID',
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE `github_ids`(
    `id` VARCHAR(255) PRIMARY KEY COMMENT 'githubユーザーID',
    `user_id` BINARY(16) NOT NULL COMMENT 'ユーザーID',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

