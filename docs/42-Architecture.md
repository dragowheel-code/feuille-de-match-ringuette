# Architecture de la plateforme de gestion de ringuette

## 1. Objectif

La plateforme regroupe les fonctions permanentes et saisonnières nécessaires à la gestion d’une association de ringuette.

Les principaux modules sont :

- Associations
- Équipes
- Joueuses
- Saisons
- Équipements
- Personnel d’équipe
- Officiels
- Importation et exportation
- Feuille de match

---

## 2. Entités permanentes

Une entité permanente existe indépendamment d’une saison.

### Association

Une association contient notamment :

- son nom;
- ses coordonnées;
- son logo;
- ses couleurs.

### Équipe

Une équipe appartient à une association.

Elle contient notamment :

- son nom;
- son abréviation;
- son calibre.

### Joueuse

La fiche permanente d’une joueuse contient uniquement ses renseignements administratifs et personnels :

- nom complet;
- numéro d’inscription;
- adresse;
- ville;
- code postal;
- téléphone;
- sexe;
- date de naissance;
- âge.

Elle ne contient pas directement :

- son équipe saisonnière;
- son numéro de chandail;
- son rôle de capitaine;
- son rôle d’assistante;
- son rôle de gardienne.

### Officiel

Un officiel possède une fiche permanente et peut exercer un ou plusieurs rôles.

### Équipement

Un équipement représente un objet physique appartenant à une association.

Les modules prévus sont :

- Chandails : actif;
- Pantalons : en attente.

---

## 3. Entités saisonnières

Toute information pouvant changer d’une saison à l’autre doit être enregistrée dans une affectation.

### Saison

Une saison contient notamment :

- un identifiant;
- un nom;
- une date de début;
- une date de fin;
- un statut actif ou inactif;
- un statut verrouillé ou non verrouillé.

### Affectation d’une joueuse

Une affectation relie :

- une joueuse;
- une équipe;
- une saison.

### Affectation d’un équipement

Une affectation relie :

- un équipement;
- une joueuse;
- une équipe;
- une saison.

Elle conserve notamment :

- la date de réservation;
- la date d’attribution;
- la date de retour;
- l’état au départ;
- l’état au retour;
- les notes.

### Responsabilités saisonnières

Les rôles suivants appartiennent à une saison et à une équipe :

- capitaine;
- assistante;
- gardienne;
- personnel d’équipe.

---

## 4. Gestion des chandails

Chaque chandail est un objet physique distinct.

Il possède notamment :

- un numéro;
- une grandeur;
- une association propriétaire;
- un état;
- un statut;
- des notes;
- un historique d’attributions.

### Statuts possibles

- disponible;
- réservé;
- attribué;
- en réparation;
- perdu;
- retiré.

### États possibles

- bon;
- endommagé;
- brisé.

### Règle d’unicité du numéro

Deux joueuses d’une même équipe ne peuvent pas avoir le même numéro de chandail pendant la même saison, même si les chandails sont de grandeurs différentes.

La combinaison suivante doit être unique parmi les attributions actives :

- équipe;
- saison;
- numéro de chandail.

### Autres validations

Le système doit empêcher :

- l’attribution d’un même chandail physique à plusieurs joueuses;
- l’attribution de deux chandails actifs à une même joueuse dans la même équipe;
- l’attribution d’un chandail perdu;
- l’attribution d’un chandail en réparation;
- l’attribution d’un chandail réservé à une autre joueuse.

---

## 5. Historique

Les anciennes affectations ne doivent pas être remplacées ou supprimées.

Une nouvelle affectation est créée lorsqu’une information saisonnière change.

L’historique doit permettre de connaître :

- les anciennes équipes d’une joueuse;
- ses anciens numéros de chandail;
- les grandeurs utilisées;
- l’état d’un chandail à chaque retour;
- les anciennes attributions d’un chandail.

---

## 6. Journal des événements

Les opérations importantes doivent pouvoir être journalisées.

Un événement contient notamment :

- une date;
- un type;
- l’utilisateur responsable;
- l’entité concernée;
- une description;
- les données utiles à l’historique.

Exemples :

- attribution d’un chandail;
- réservation;
- retour;
- changement d’état;
- mise en réparation;
- déclaration de perte;
- retrait définitif.

---

## 7. Règles d’architecture

### Source unique

Une information ne doit être stockée qu’à un seul endroit.

Exemples :

- le numéro d’inscription appartient à la joueuse;
- le numéro du chandail appartient au chandail;
- l’association d’une équipe appartient à l’équipe;
- les affectations utilisent les identifiants de ces entités.

### Séparation permanent et saisonnier

Une fiche permanente ne contient jamais une donnée saisonnière.

### Conservation de l’historique

Une nouvelle saison ne modifie jamais les données des saisons précédentes.

### Domaine métier

Les validations doivent être réalisées dans le domaine métier, et non uniquement dans les composants React.

### Modules indépendants

Les modules doivent pouvoir être activés ou désactivés sans modifier leur architecture interne.

Configuration envisagée :

```javascript
export const MODULES = {
  associations: true,
  equipes: true,
  joueuses: true,
  saisons: true,

  equipements: {
    chandails: true,
    pantalons: false,
  },

  personnel: false,
  officiels: false,
};