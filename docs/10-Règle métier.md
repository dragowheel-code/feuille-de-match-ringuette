# Règles métier

**Version du document :** 1.0
**Architecture :** V2
**Statut :** Officiel
**Dernière mise à jour :** 2026-07-27

---

# Objectif

Les règles métier décrivent le fonctionnement de la plateforme.

Elles sont indépendantes de toute technologie.

Le code doit toujours respecter ces règles.

---

# Les associations

## RM-001

Une association est l'entité principale de la plateforme.

---

## RM-002

Une association est propriétaire :

- de ses équipes;
- de ses officiels;
- de son logo;
- de ses couleurs officielles;
- de ses coordonnées.

---

## RM-003

Une équipe appartient toujours à une seule association.

---

## RM-004

Une joueuse appartient toujours à une seule association.

Elle est affectée à une équipe pour une saison.

---

## RM-005

Un officiel appartient toujours à une seule association.

---

# Les rencontres

## RM-100

Une rencontre est indépendante des données permanentes.

---

## RM-101

Une rencontre est un instantané des données officielles.

---

## RM-102

Une rencontre ne modifie jamais :

- une association;
- une équipe;
- une joueuse;
- un officiel.

---

## RM-103

Une rencontre possède un type :

- Match local
- Match inter-association
- Tournoi

---

## RM-104

Dans un match local, les deux équipes appartiennent à l'association hôte.

---

## RM-105

Dans un match inter-association, chaque équipe appartient à son association.

---

## RM-106

L'association hôte fournit les officiels par défaut.

---

## RM-107

Des officiels provenant d'autres associations peuvent être affectés temporairement à une rencontre.

Cette affectation ne modifie jamais leur association d'appartenance.

---

# Les données

## RM-200

Les données permanentes sont créées uniquement par le module Administration.

---

## RM-201

Le module Feuille de match consulte les données permanentes.

Il ne les modifie jamais.

---

## RM-202

Chaque association possède un dossier autonome.

---

## RM-203

Les données d'une association peuvent être :

- importées;
- exportées;
- publiées;
- synchronisées.

---

## RM-204

Chaque objet possède un identifiant permanent.

Cet identifiant ne change jamais.