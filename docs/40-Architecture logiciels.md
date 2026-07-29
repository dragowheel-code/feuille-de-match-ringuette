# Architecture logicielle

**Version du document :** 1.0
**Architecture :** V2

---

# Philosophie

Le projet est organisé par responsabilités.

Chaque module possède un rôle précis.

---

# Modules

Administration

Gestion des données permanentes.

---

Feuille de match

Gestion des rencontres.

---

Tournois

Organisation des compétitions.

---

# Domaine

Le dossier domain contient exclusivement les règles métier.

Aucune dépendance à React n'est autorisée.

---

# Services

Le dossier services contient :

- importation;
- exportation;
- stockage;
- synchronisation.

---

# Shared

Le dossier shared contient les composants réutilisables.

---

# Hooks

Les hooks orchestrent les composants.

Ils ne contiennent jamais les règles métier.

---

# Principe

Interface

↓

Hooks

↓

Domain

↓

Services