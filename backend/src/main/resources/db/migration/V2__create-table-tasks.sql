CREATE TABLE tasks (
    id uuid NOT NULL,
    name varchar(255) NOT NULL,
    status smallint,
    start_date timestamp(6) without time zone,
    end_date timestamp(6) without time zone,
    user_id uuid,
    task_id uuid,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);