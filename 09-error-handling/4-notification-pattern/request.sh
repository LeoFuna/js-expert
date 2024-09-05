echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST -d '{"name": "Vingador", "age": 80}' -H 'Content-Type: application/json'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST -d '{"name": "Vingador", "age": 18}' -H 'Content-Type: application/json'

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST -d '{"name": "V", "age": 30}' -H 'Content-Type: application/json'

echo $'\n\n[requesting: all invalid]'
curl -i localhost:3000 -X POST -d '{"name": "V", "age": 18}' -H 'Content-Type: application/json'