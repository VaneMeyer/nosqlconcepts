#!/bin/bash

echo "Waiting for Neo4j to become available..."


for i in {1..60}; do
  if cypher-shell -a "$NEO_SERVER" -u "$NEO_USER" -p "$NEO_PASSWORD2" "RETURN 1" >/dev/null 2>&1; then
    echo "Neo4j is up!"
    break
  fi
  echo "Neo4j not ready yet... ($i)"
  sleep 2
done


if ! cypher-shell -a "$NEO_SERVER" -u "$NEO_USER" -p "$NEO_PASSWORD2" "RETURN 1" >/dev/null 2>&1; then
  echo "Neo4j did not start in time. Aborting init."
  exit 1
fi


echo "Checking if Neo4j has already been initialized..."
USER_COUNT=$(cypher-shell -a "$NEO_SERVER" -u "$NEO_USER" -p "$NEO_PASSWORD2" "MATCH (u:User) RETURN count(u) AS count" | tail -n 1)

if [ "$USER_COUNT" -eq "0" ]; then
  echo "No users found – running init.cypher..."
  cypher-shell -a "$NEO_SERVER" -u "$NEO_USER" -p "$NEO_PASSWORD2" < /init/init.cypher
  echo "Neo4j init completed."
else
  echo "Neo4j already initialized with $USER_COUNT users. Skipping init.cypher."
fi
