docker run \
    --name postgres \
    -e POSTGRES_USER=leofuna \
    -e POSTGRES_PASSWORD="123456" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username leofuna --dbname heroes

CREATE TABLE warriors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

SELECT * FROM warriors;


# MONGODB

docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=leofuna \
    -e MONGO_INITDB_ROOT_PASSWORD=123456 \
    -p 27017:27017 \
    -d \
    mongo:4

docker logs mongodb

docker exec -it mongodb \
    mongo --host localhost -u leofuna -p 123456 --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createCollection('warriors')"