CREATE SEQUENCE IF NOT EXISTS assets_seq_id;
CREATE SEQUENCE IF NOT EXISTS assets_sales_seq_id;
CREATE SEQUENCE IF NOT EXISTS assets_purchases_seq_id;
CREATE SEQUENCE IF NOT EXISTS assets_dividends_seq_id;


CREATE TABLE IF NOT EXISTS assets(
    id integer DEFAULT nextval('assets_seq_id') PRIMARY KEY,
    user_id integer,
    ticker varchar(6) NOT NULL UNIQUE,
    name varchar(40),
    units integer,
    cnpj varchar(16),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
      ON DELETE CASCADE
);

ALTER SEQUENCE assets_seq_id
OWNED BY assets.id;

CREATE TRIGGER set_updatedAt_timestamp
BEFORE UPDATE ON assets
FOR EACH ROW
EXECUTE FUNCTION trigger_set_updatedAt_timestamp();

CREATE TABLE IF NOT EXISTS assets_sales(
    id integer DEFAULT nextval('assets_sales_seq_id') PRIMARY KEY,
    asset_id integer,
    sell_date DATE,
    units integer,
    sell_value NUMERIC(5,2),
    CONSTRAINT fk_asset_to_sale
      FOREIGN KEY(asset_id) 
	  REFERENCES assets(id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assets_purchases(
    id integer DEFAULT nextval('assets_purchases_seq_id') PRIMARY KEY,
    asset_id integer,
    purchase_date DATE,
    units integer,
    purchase_value NUMERIC(5,2),
    CONSTRAINT fk_asset_to_purchase
      FOREIGN KEY(asset_id) 
	  REFERENCES assets(id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assets_dividends(
    id integer DEFAULT nextval('assets_dividends_seq_id') PRIMARY KEY,
    asset_id integer,
    amount_received NUMERIC(5,2),
    received_date DATE,
    CONSTRAINT fk_asset_to_dividend
      FOREIGN KEY(asset_id) 
	  REFERENCES assets(id)
      ON DELETE CASCADE
);