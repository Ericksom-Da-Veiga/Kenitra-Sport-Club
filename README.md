# Gestion d'une Salle de Sport
Ce projet a pour objectif de fournir une plateforme de gestion complète pour une salle de sport.
## Objectif
Simplifier la gestion quotidienne d'une salle de sport, tout en offrant une solution intuitive pour gérer les adhérents, les abonnements, les coachs, et les paiements.
## Fonctionnalités principales
- **Gestion des adhérents** : possibilité d'ajouter, de supprimer et de modifier les informations des adhérents.
- **Gestion des Abonnements**:
	- Chaque abonnement peut inclure un ou plusieurs sports.
	- Les abonnements ont une durée et un prix fixe à payer.
- **Gestion des Coachs**:Attribution d'un ou plusieurs coachs à chaque sport proposé.
- **Gestion des Paiements**:
	- Enregistrement des paiements : Les utilisateurs peuvent enregistrer les paiements effectués par les adhérents.
	- Suivi des dettes : La plateforme permet d'identifier et de suivre les adhérents ayant des dettes ou des paiements en retard.
## Technologies utilisées
- **Frontend** : AngularJS
- **Backend** : Spring Boot
- **Base de données** : MySQL
  
## Comment Utiliser
Pour commencer à utiliser GestionTontine, suivez ces étapes simples :

1 . Clonez le Dépôt : Clonez le dépôt du projet sur votre machine locale en utilisant la commande git clone.

2 - Installez les Dépendances :

- Dans le repertoire **backend**:

		mvn clean install

- Dans le repertoire **dashboard**:

  		npm install

3 - Configuration de la Base de Données

4 - Lancez l'Application:

- Pour Lancer le backend:
  
		mvn spring-boot:run

- Pour lancer le frontend:

		ng serve

## Contribution

Les contributions sont les bienvenues. Si vous avez des idées d'amélioration, des bogues à signaler ou des fonctionnalités à ajouter, n'hésitez pas à ouvrir une issue ou à soumettre une pull request sur mon dépôt GitHub.

## Licence
Ce projet est sous licence MIT, ce qui signifie qu'il est ouvert à l'utilisation, la modification et la distribution par la communauté. Consultez le fichier LICENSE pour plus de détails.


