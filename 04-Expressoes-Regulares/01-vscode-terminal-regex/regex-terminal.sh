# a partir da pasta raiz
find . -name "*.test.js"
find . -name "*.test.js" -not -path "*node_modules**" 

npm i -g ipt
find . -name "*.test.js" -not -path "*node_modules**" | ipt

# volta para a pasta do modulo
# para copiar isso para aqui
cp -r ../../01-Js-testing/aula06-tdd-project .

# uma maneira de adicionar o 'use strict;' em todos os arquivos .js
# de um projeto ao rodar esse comando

# xargs é um comando para pegar cada um dos itens que sao recebido e roda um comando
CONTENT="'use strict';"
find . -name "*.js" -not -path "*node_modules**" \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
# 1s => pega a primeira linha
# ^ => primeira coluna
# substitui o $CONTENT