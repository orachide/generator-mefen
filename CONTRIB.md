# Generator MEFEN

## Github repository

Le projet est hébergé sur GitHub à l'adresse: [https://github.com/orachide/generator-mefen](https://github.com/orachide/generator-mefen)

## Objectif

Le but de ce [projet](https://github.com/orachide/generator-mefen) est de mettre en place un outil permettant de bootstraper rapidement une application complète (backend, frontend, mobile).

L'idée est de faire quasiment la même chose que [jhipster](https://www.jhipster.tech/) sauf que **MEFEN** sera principalement basé sur la stack suivante:
- Backend:
    - NodeJS ([expressjs](http://expressjs.com/fr/))
        - Gestion de l'authentification (JWT, SESSION, OAUTH)
        - Gestion des utilisateurs (Inscription, Login, Droits)
- Frontend:
    - [Angular 6+](https://angular.io/)
    - [React](https://reactjs.org/)
    - [Vue JS](https://vuejs.org/)
- Base de données:
    - [mongodb](https://www.mongodb.com/)

Le generateur sera basé essentiellement sur [Yeoman](http://yeoman.io/)

L'idée est de mettre en place en OpenSource ce projet afin de le rendre visible et d'avoir potentiellement des contributions extérieures.

Un challenge sera également de maintenir le projet à jour par rapport aux différentes versions des framework qui vont évolués.

## Par où commencer ?

### [Jhipster](https://www.jhipster.tech/)

Je recommande pour comprendre exactement notre cible de commencer par tester [Jhipster](https://www.jhipster.tech/) (si vous ne savez pas du tout ce que c'est). Une fois l'application généré par **Jhipster**, vous comprendrez assez vite notre objectif.

### Savoir écrire un serveur **NodeJS** avec [expressjs](http://expressjs.com/fr/)

[expressjs](http://expressjs.com/fr/) est la solution Backend de **NodeJS**. Vous pouvez regarder les tutoriaux **ExpressJS** comme celui ci par exemple: [https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd).

Vous trouverez un exemple d'application assez complète ici [https://github.com/gothinkster/node-express-realworld-example-app](https://github.com/gothinkster/node-express-realworld-example-app)

### Savoir écrire une application frontend [Angular 6+](https://angular.io/)

Nous allons commencer par du frontend **Angular**. Je recommande le tutorial officiel d'Angular [https://angular.io/tutorial](https://angular.io/tutorial)


## La suite ?

Créer une application complète basé sur ce que nous avons appris qui permette à minima:
- De se Connecter avec un login/password
- De créer / supprimer des utilisateurs

## Pour finir ?

[Yeoman](http://yeoman.io/) est la solution defacto pour générer des applications basées sur des templates. Je recommande donc de se documenter sur cet outil.