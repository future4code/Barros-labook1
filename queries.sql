-- Active: 1674753776608@@35.226.146.116@3306@jbl-4416257-giovana-vieira
CREATE TABLE IF NOT EXISTS labook_users(
    id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS labook_posts(
    id VARCHAR(255) PRIMARY KEY,
    photo VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type ENUM("normal","event") DEFAULT "normal",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES labook_users (id)
);

CREATE TABLE IF NOT EXISTS labook_friendships(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    friend_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES labook_users (id),
    FOREIGN KEY (friend_id) REFERENCES labook_users (id)
);

CREATE TABLE IF NOT EXISTS labook_posts_likes(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    liked ENUM("yes","no"),
    FOREIGN KEY (user_id) REFERENCES labook_users (id),
    FOREIGN KEY (post_id) REFERENCES labook_posts (id)
);

CREATE TABLE IF NOT EXISTS labook_posts_comments(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    comment TEXT,
    FOREIGN KEY (user_id) REFERENCES labook_users (id),
    FOREIGN KEY (post_id) REFERENCES labook_posts (id)
);

