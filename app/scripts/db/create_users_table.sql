CREATE SEQUENCE users_seq_id;

CREATE TABLE IF NOT EXISTS users(
    id bigint DEFAULT nextval('users_seq_id') PRIMARY KEY,
    name varchar(60),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    lastUpdatedAttribute varchar(10)
);

ALTER SEQUENCE users_seq_id
OWNED BY users.id;

CREATE TRIGGER set_updatedAt_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_updatedAt_timestamp();