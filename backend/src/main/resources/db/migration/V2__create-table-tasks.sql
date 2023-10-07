CREATE TABLE tasks (
    id uuid NOT NULL,
    name varchar(255) NOT NULL,
    status smallint,
    dateStart timestamp(6) without time zone,
    dateEnd timestamp(6) without time zone,
    userID uuid NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES users(id)
);