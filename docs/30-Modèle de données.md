# Modèle de données

**Version du document :** 1.0
**Architecture :** V2

---

# Association

L'association est l'entité principale.

Elle possède :

- son nom;
- sa ville;
- son courriel;
- son logo;
- ses couleurs officielles;
- ses équipes;
- ses officiels.

---

# Équipe

Une équipe appartient à une seule association.

Elle possède :

- ses joueuses;
- son personnel d'équipe.

---

# Joueuse

Une joueuse appartient à une association.

Elle est affectée à une équipe.

---

# Personnel d'équipe

Le personnel appartient à une équipe.

---

# Officiel

Un officiel appartient à une seule association.

Il peut être affecté temporairement à une rencontre organisée par une autre association.

---

# Match

Une rencontre référence :

- l'association hôte;
- l'association visiteuse;
- les équipes;
- les joueuses;
- les officiels.

Elle ne modifie jamais les données permanentes.

---

# Tournoi

Un tournoi référence :

- plusieurs associations;
- plusieurs équipes;
- plusieurs officiels;
- plusieurs rencontres.

Le tournoi ne devient jamais propriétaire des données.