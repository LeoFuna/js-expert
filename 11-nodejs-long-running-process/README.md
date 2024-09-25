### Processo
É um programa que tem fatia de memoria reservada, faz chamada ao OS para sobreviver e podem ter uma seria de threads.

## Thread
Uma thread é uma ou mais pequenas unidades de processamento dentro de um processo, compartilham memória e são geralmente usadas para executar uma tarefa e morrer em seguida. 

## No Contexto do NodeJS
Agora trazendo para o Node.js, temos as Child Processes e as Worker Threads. 

O seu programa Node.js é o processo pai e ele pode agendar novos processos para o sistema operacional executar outros programas em paralelo.
Geralmente são usadas para tudo que for assíncrono, como um agendamento de uma pesquisa no banco, escrita em arquivos, bater em APIs externas e etc.

Já as Worker Threads são threads agendadas pelo seu programa, que é o processo pai, usadas para executar tarefas que demandam processamento em memória, o que chamamos de CPU-intensive operations. 

## Ferramentas
- HTOP = instalada para olhar no terminal processos de maneira mais interativa

## Links úteis

https://afteracademy.com/blog/what-is-a-process-in-operating-system-and-what-are-the-different-states-of-a-process

https://betterprogramming.pub/learn-node-js-under-the-hood-37966a20e127

https://betterprogramming.pub/is-node-js-really-single-threaded-7ea59bcc8d64

https://www.guru99.com/difference-between-process-and-thread.html

https://stackoverflow.com/questions/56312692/what-is-the-difference-between-child-process-and-worker-threads

https://en.wikipedia.org/wiki/Input/output

https://stackoverflow.com/questions/10300251/what-does-the-concept-of-worker-mean-in-programming

https://stackoverflow.com/questions/15341551/what-counts-as-cpu-intensive-tasks-eg-sorting-searching-etc

https://nodejs.org/api/worker_threads.html

https://node.dev/post/understanding-worker-threads-in-node-js

https://nodejs.org/en/docs/guides/dont-block-the-event-loop

https://rclayton.silvrback.com/speaking-intelligently-about-java-vs-node-performance#:~:text=Java%20will%20almost%20always%20be,development%20than%20the%20V8%20runtime.
