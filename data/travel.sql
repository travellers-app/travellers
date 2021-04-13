DROP TABLE IF EXISTS trips;
CREATE TABLE trips(
    id SERIAL PRIMARY KEY,
    fromCity VARCHAR(255),
    city VARCHAR(255),
    lon VARCHAR(255),
    lat VARCHAR(255),
    hotel VARCHAR(255),
    contact VARCHAR(255),
    checkin VARCHAR(255),
    checkout VARCHAR(255),
    returant VARCHAR(255),
    resturantimg VARCHAR(255),
    resturanturl VARCHAR(255),
    touristic VARCHAR(255),
    touristicimg VARCHAR(255),
    discrp text,
);