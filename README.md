# Copybase graphics

Esta aplicação servirá como base para mostrar meus conhecimentos em um teste prático utilizando Nest.JS e Vue.JS

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

É necessário possuir o docker instalado em sua máquina.

Para Linux:

```
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

Para windows será necessário baixar o Docker Desktop
Após a instalação, você pode verificar se o Docker foi instalado corretamente executando o seguinte comando no terminal:

```
docker --version
```

### 🔧 Instalação

Para executar o código localmente utilizando Docker

Entra na pasta raiz do projeto (copybase) e execute o comando:

```
docker-compose up --build
```

Sua aplicação estará rodando.

Caso queira rodar os projetos separadamente sem utilizar o docker você precisará ter o NodeJS instalado em sua máquina:

Entre na pasta raiz do back-end e execute o comando:

```
npm run start:dev
```
Desta forma seu back-end estará rodando na porta 3000


Entre na pasta raiz do front-end e execute o comando:

```
npm run serve
```
Desta forma seu front-end estará rodando na porta 8080  

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [NestJS](https://docs.nestjs.com/) - O framework para back-end utilizado
* [VueJS](https://vuejs.org/) -  O framework para front-end utilizado
* [Docker](https://www.docker.com/) - Para a virtualização e conteinerização do projeto


## ✒️ Autores

* **Thiago Santos** - *Desenvolvedor Full-Stack* - [Thiago Santos](https://github.com/thiiagosaantos)


## 🎁 Expressões de gratidão

* Gostaria de agradecer a oportunidade de participar do processo seletivo, em um ambiente tão competitivo, fico feliz de ter passado para a esta etapa de avaliação. Desde já, agradeço a oportunidade de mostrar o meu trabalho 🫂;



---
⌨️ com ❤️ por [Thiago Santos](https://github.com/thiiagosaantos) 😊
