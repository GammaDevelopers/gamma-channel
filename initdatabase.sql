/*

Run with: 
psql -d gamma < initdatabase.sql

CREATE DATABASE gamma;
*/
create user testuser;
alter user testuser with encrypted password 'qwerty';
grant all privileges on gamma to testuser;


CREATE TABLE posts (
    id          SERIAL PRIMARY KEY,
    title       varchar(50) NOT NULL,
    name        varchar(25) NOT NULL,
    options     varchar(25) NOT NULL DEFAULT '',
    mediaURL    varchar(128) NOT NULL DEFAULT '',
    content     varchar(1024) NOT NULL,
    firstPostID integer,
    created     timestamp DEFAULT current_timestamp
);


CREATE TABLE threads (
    firstPost   integer,
    board       varchar(20), 
    created     timestamp DEFAULT current_timestamp,
    updated     timestamp DEFAULT current_timestamp
);


CREATE TABLE boards (
    name        varchar(20) PRIMARY KEY,
    abbreviation varchar(10) NOT NULL,
    rules         varchar(10000) NOT NULL 
);

alter table threads add foreign key (firstPost) REFERENCES posts(id);
alter table threads add foreign key (board) REFERENCES boards(name);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO testuser;
