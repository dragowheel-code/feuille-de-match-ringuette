Les 10 lois de la Plateforme
Loi 1 — Le domaine est le cœur

Le dossier domain contient toute la logique métier.

Aucun composant React ne doit contenir une règle métier.

Loi 2 — Les services ne décident rien

Le dossier services lit et écrit les données.

Il ne prend jamais de décision métier.

Loi 3 — Les hooks orchestrent

Les hooks coordonnent les appels entre :

domain
services
composants

Ils ne remplacent jamais le domaine métier.

Loi 4 — Les composants affichent

Les composants React affichent des données.

Ils ne savent pas comment fonctionne la ringuette.

Loi 5 — Une responsabilité par dossier

Chaque dossier représente un domaine fonctionnel.

Exemple :

domain/
    association/
    equipe/
    joueuse/
    officiel/
    match/
Loi 6 — Les dépendances vont toujours dans le même sens
Interface
      ↓
Hooks
      ↓
Domain
      ↓
Services

Jamais l'inverse.

Loi 7 — Une donnée possède un propriétaire

Exemples :

Association → propriétaire des équipes
Association → propriétaire des officiels
Équipe → propriétaire du personnel
Match → propriétaire des événements

Cette règle évite les ambiguïtés.

Loi 8 — Les matchs sont des instantanés

Une feuille de match ne dépend jamais d'une modification future de la base.

Une rencontre est figée une fois créée.

Loi 9 — Rien n'est codé avant d'être compris

Avant d'écrire du code :

discussion;
règles métier;
modèle de données;
puis seulement développement.
Loi 10 — Une régression est un bogue

Une nouvelle fonctionnalité ne doit jamais dégrader une fonctionnalité existante.

Règle 11

Une entité ne possède que ce qui lui appartient réellement.

Par exemple :

une équipe ne possède pas une joueuse;
une saison ne possède pas une association;
un match ne possède pas une équipe;
une affectation représente une relation, pas une personne.

Ça peut sembler évident, mais c'est exactement ce qui nous a conduits au modèle référencé. C'est une règle simple qui pourra nous guider chaque fois que nous aurons un doute sur l'emplacement d'une donnée.