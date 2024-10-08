IMAGE_URL="https://superprix.vteximg.com.br/arquivos/ids/175182-600-600/Coco-Seco--1-unidade-aprox.-500g-.png?v=636294181557230000"
BG_URL="https://img.freepik.com/free-photo/empty-sea-beach-background_74190-313.jpg?w=2000&t=st=1728392801~exp=1728393401~hmac=8329a237fd61ea3181f4b48e7512d243fc6057ef17d57c7e039b89984eb2c342"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BG_URL"
