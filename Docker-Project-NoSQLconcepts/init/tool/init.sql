CREATE SCHEMA IF NOT EXISTS private 
AUTHORIZATION tooluser;

CREATE SCHEMA IF NOT EXISTS tool 
AUTHORIZATION tooluser;


-- Table: private.users

DROP TABLE IF EXISTS private.users;

CREATE TABLE IF NOT EXISTS private.users
(
    user_name text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default", -- better use hashed password
    email_id text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    CONSTRAINT user_name_uniq UNIQUE (user_name)
);

-- first tool admin user: after login create new admin user and login with new admin to delete test admin user
INSERT INTO private.users( 
 user_name, password, email_id, role) 
 VALUES ('test', '1234', 'example', 'admin'); --TODO env?

-- Table: tool.task_areas

 DROP TABLE IF EXISTS tool.task_areas;

CREATE TABLE IF NOT EXISTS tool.task_areas
(
    area_id integer NOT NULL,
    area_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descr character varying COLLATE pg_catalog."default",
    link character varying COLLATE pg_catalog."default",
    endpoint character varying COLLATE pg_catalog."default",
    is_active boolean,
    feedback_on boolean,
    CONSTRAINT task_areas_pkey PRIMARY KEY (area_id)
);

-- Table: tool.task_statements

DROP TABLE IF EXISTS tool.task_statements;

CREATE TABLE IF NOT EXISTS tool.task_statements
(
    statement_id integer NOT NULL,
    area_id integer NOT NULL,
    statement_text text COLLATE pg_catalog."default" NOT NULL,
    solution_query text COLLATE pg_catalog."default",
    topic text COLLATE pg_catalog."default",
    subtasknumber text COLLATE pg_catalog."default",
    maxtime text COLLATE pg_catalog."default",
    hint text COLLATE pg_catalog."default",
    tasknumber text COLLATE pg_catalog."default",
    CONSTRAINT task_statements_pkey PRIMARY KEY (statement_id, area_id),
    CONSTRAINT task_statements_area_id_fkey FOREIGN KEY (area_id)
        REFERENCES tool.task_areas (area_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: tool.user_task_data

DROP TABLE IF EXISTS tool.user_task_data;
CREATE SEQUENCE IF NOT EXISTS tool.user_task_data_data_id_seq;
CREATE TABLE IF NOT EXISTS tool.user_task_data
(
    data_id integer NOT NULL DEFAULT nextval('tool.user_task_data_data_id_seq'::regclass),
    username character varying(255) COLLATE pg_catalog."default",
    statement_id integer,
    task_area_id integer,
    query_text text COLLATE pg_catalog."default" NOT NULL,
    is_executable character varying COLLATE pg_catalog."default",
    result_size integer,
    is_correct character varying COLLATE pg_catalog."default",
    partial_solution text COLLATE pg_catalog."default",
    difficulty_level character varying(255) COLLATE pg_catalog."default",
    processing_time integer,
    is_finished boolean,
    CONSTRAINT user_task_data_pkey PRIMARY KEY (data_id),
    CONSTRAINT user_task_data_task_area_id_fkey FOREIGN KEY (task_area_id)
        REFERENCES tool.task_areas (area_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



-- Table: tool.query_history

DROP TABLE IF EXISTS tool.query_history;
CREATE SEQUENCE IF NOT EXISTS tool.query_history_history_id_seq;
CREATE TABLE IF NOT EXISTS tool.query_history
(
    history_id integer NOT NULL DEFAULT nextval('tool.query_history_history_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default",
    statement_id integer,
    task_area_id integer,
    query_text text COLLATE pg_catalog."default" NOT NULL,
    is_executable character varying COLLATE pg_catalog."default",
    result_size integer,
    is_correct character varying COLLATE pg_catalog."default",
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT query_history_pkey PRIMARY KEY (history_id),
    CONSTRAINT query_history_task_area_id_fkey FOREIGN KEY (task_area_id)
        REFERENCES tool.task_areas (area_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


