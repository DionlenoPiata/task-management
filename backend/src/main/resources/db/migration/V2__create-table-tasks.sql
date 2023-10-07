CREATE TABLE tasks (
    id uuid NOT NULL,
    name varchar(255) NOT NULL,
    status smallint,
    date_start timestamp(6) without time zone,
    date_end timestamp(6) without time zone,
    user_id uuid,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);