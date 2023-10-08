-- Insere task sem usuário
INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('ad6b5a77-3c67-4ba4-82fe-7703fb98f51f', 'Task 1', '1',  '2023-10-01 00:00:00', '2023-10-02 00:00:00', NULL, NULL);

-- Insere task com usuário
INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('f5074442-13b3-4843-9049-ddf200cb6876', 'Task 2', '0', '2023-10-01 00:00:00', '2023-10-02 00:00:00', '745effa1-f939-4d9f-9af2-30075d52494c', NULL);

-- Insere task sem status
INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('c0cdcaf6-930f-4390-8ee5-0294dbdfd646', 'Task 3', NULL, NULL, NULL, NULL, NULL);

-- Insere task sem startDate e endDate
INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('21942ca3-d23b-46a5-b1ee-ebf2dadedc39', 'Task 4', '2', NULL, NULL, NULL, NULL);

-- Insere task só com startDate
INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('0bd5d289-012a-4999-9e00-511b7632badf', 'Task 5', '2', '2023-10-01 00:00:00', NULL, NULL, NULL);

-- Insere task só com endDate
INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('52611208-964f-45f0-a19f-6739799ebed9', 'Task 6', '1', NULL, '2023-10-02 00:00:00', NULL, NULL);

-- Insere subtasks em uma task
INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('5fe81757-9075-483d-baf4-8457cc9e37ce', 'SubTask 1', NULL, NULL, NULL, NULL, 'ad6b5a77-3c67-4ba4-82fe-7703fb98f51f');

INSERT INTO tasks (id, name, status, start_date, end_date, user_id, task_id)
VALUES('7a167da4-7555-47cb-8a37-717eb705aa93', 'SubTask 2', NULL, NULL, NULL, NULL, 'ad6b5a77-3c67-4ba4-82fe-7703fb98f51f');

