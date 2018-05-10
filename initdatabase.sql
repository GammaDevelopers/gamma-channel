/*

Run with: 
psql -d gamma < initdatabase.sql

CREATE DATABASE gamma;
*/
create user testuser;
alter user testuser with encrypted password 'qwerty';


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
    replycount     integer NOT NULL DEFAULT 0,
    created     timestamp NOT NULL DEFAULT current_timestamp,
    updated     timestamp NOT NULL DEFAULT current_timestamp
);


CREATE TABLE boards (
    name        varchar(20) PRIMARY KEY,
    abbreviation varchar(10) NOT NULL,
    description     varchar(1024) NOT NULL,
    rules         varchar(10000) NOT NULL 
);



CREATE TABLE banners (
    id        SERIAL PRIMARY KEY,
    image     varchar(128) NOT NULL,  
    weight    integer,
    submitter varchar(25)
);

CREATE TABLE news (
    created   timestamp PRIMARY KEY DEFAULT current_timestamp,
    title     varchar(50),
    image     varchar(128),
    content   varchar(10000),
);


grant all privileges on gamma to testuser;
alter table threads add foreign key (firstPost) REFERENCES posts(id);
alter table threads add foreign key (board) REFERENCES boards(name);



CREATE OR REPLACE FUNCTION update_thread_data() RETURNS TRIGGER AS $body$
    BEGIN
        UPDATE threads 
        SET replycount = replycount + 1,
            updated = current_timestamp
        WHERE firstPost = NEW.firstPostID;
        RETURN NEW;
    END;
$body$ LANGUAGE plpgsql;

CREATE TRIGGER update_reply_count  
BEFORE INSERT ON posts  
FOR EACH ROW EXECUTE PROCEDURE update_thread_data();

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO testuser;

CREATE FUNCTION recalculate_replies() RETURNS void AS '
    UPDATE threads as old
        set replycount = new.count
    FROM
        (select firstPostID, count(firstPostID) from posts group by firstPostID) as new
    where old.firstPost = new.firstPostID' LANGUAGE SQL;