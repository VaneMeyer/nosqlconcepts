#!/bin/bash

until printf "" 2>>/dev/null >>/dev/tcp/cassandra/9042; do
    sleep 5;
    echo "Waiting for cassandra...";
done

echo "Creating keyspace"
cqlsh cassandra -u cassandra -p cassandra -e "CREATE KEYSPACE IF NOT EXISTS mykeyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}; USE mykeyspace;
CREATE TABLE users (id UUID PRIMARY KEY, name text);
INSERT INTO users (id, name) VALUES (uuid(), 'Alice');
INSERT INTO users (id, name) VALUES (uuid(), 'Bob');"
