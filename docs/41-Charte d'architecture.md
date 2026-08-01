Charte d'architecture – Plateforme de gestion de ringuette (V2)
1. Entités permanentes

Ce sont les objets qui existent indépendamment d'une saison.

Associations
Nom
Coordonnées
Logo
Couleurs
etc.
Équipes
Association
Nom
Calibre

Une équipe existe d'une saison à l'autre.

Joueuses

Uniquement les informations civiles.

Exemple :

Nom

Numéro d'inscription

Date de naissance

Adresse

Téléphone

Aucune donnée liée à une saison.

Officiels

Arbitres

Chronométreurs

Marqueurs

30 secondes

Équipements

Premier module :

Chandails

Deuxième module (désactivé) :

Pantalons

Chaque équipement possède sa propre fiche.

2. Entités saisonnières

Tout ce qui peut changer d'une saison à l'autre.

Affectation d'une joueuse
Saison

Équipe

Statut

Date de début

Date de fin
Affectation d'un chandail
Saison

Joueuse

Équipe

Date d'attribution

Date de retour

État au retour
Personnel d'équipe
Saison

Équipe

Entraîneur

Assistants

Gérant
Responsabilités des joueuses
Capitaine

Assistante

Gardienne

Ce sont des rôles saisonniers.

3. Journal des événements

Aucune suppression d'historique.

Chaque événement est enregistré.

Exemple :

12 septembre

Karl

Attribué le #12

Marie Tremblay
15 avril

Karl

Retour du #12

Bon état
18 avril

Karl

Mis en réparation

Le journal permet toujours de répondre à :

Qui ?
Quand ?
Quoi ?
4. Les règles d'or
Règle 1

Une fiche permanente ne contient jamais une donnée saisonnière.

Règle 2

Une saison ne modifie jamais les saisons précédentes.

On ajoute des affectations ou des événements.

Règle 3

Aucune donnée importante n'est supprimée.

Elle est archivée.

Règle 4

Toutes les validations sont faites dans le domaine métier.

Jamais uniquement dans l'interface.

Règle 5

Les modules doivent pouvoir être activés ou désactivés indépendamment.

Par exemple :

✔ Chandails

✖ Pantalons

✖ Personnel

✔ Officiels

sans modifier le reste de l'application.

5. Une règle que je voudrais ajouter

Je l'appellerais "Le principe de la source unique".

Une information ne doit exister qu'à un seul endroit.

Par exemple :

Le numéro d'inscription existe uniquement dans la fiche de la joueuse.
Le numéro du chandail existe uniquement dans la fiche du chandail.
L'association d'une équipe existe uniquement dans la fiche de l'équipe.
Une attribution relie ces éléments, mais ne les duplique pas.

Cette règle évite les incohérences. Si un numéro de téléphone change, on le modifie une seule fois. Si un chandail est retiré, toutes les affectations historiques continuent de le référencer.

Une dernière proposition

Je te suggère de créer un fichier à la racine du projet, par exemple :

ARCHITECTURE.md

ou

docs/ARCHITECTURE.md

Ce document ne sera pas destiné aux utilisateurs, mais aux développeurs (toi et moi). Chaque fois qu'on envisagera une nouvelle fonctionnalité, on commencera par vérifier qu'elle respecte cette charte avant d'écrire du code.

Je suis convaincu que ce document nous évitera beaucoup de retours en arrière et nous aidera à garder une architecture cohérente, même lorsque la plateforme comptera une dizaine de modules.
Règle 6 – Les entités ne se connaissent pas directement

Une entité ne doit jamais contenir les données d'une autre entité.

Par exemple :

❌ À éviter dans une joueuse :

{
  nom: "Marie Tremblay",
  equipe: "U16 A",
  chandail: 12,
  capitaine: true
}

Car dans deux ans, cette information sera fausse.

On préfère :

Joueuse
        │
        ├── Affectation équipe
        │
        ├── Affectation chandail
        │
        └── Affectation rôle

Ainsi, chaque élément évolue indépendamment.

Règle 7 – Tout est historisable

C'est une règle que tu as toi-même amenée avec les chandails.

On ne veut jamais se demander :

« Qui avait le #12 il y a deux ans ? »

Le logiciel doit pouvoir répondre.

Même chose pour :

quelle équipe avait cette joueuse ?
qui était entraîneur ?
qui était capitaine ?
quel officiel était assigné ?

On ne remplace pas l'information, on ajoute un nouvel événement ou une nouvelle affectation.

Règle 8 – Les modules sont indépendants

C'est important pour l'avenir.

Le module Équipements ne doit pas avoir besoin du module Personnel.

Le module Personnel ne doit pas dépendre du module Officiels.

Ils communiquent uniquement via les entités communes (associations, équipes, joueuses, saisons).

Règle 9 – L'utilisateur travaille par saison

Celle-là est importante.

Le responsable ne pense pas :

« Je modifie la joueuse Marie Tremblay. »

Il pense :

« Je prépare la saison 2026-2027. »

Je crois donc qu'à long terme, la saison deviendra un élément central de la plateforme.

Par exemple :

Saison active

2026-2027

Tous les modules (équipes, attributions, personnel, équipements…) travailleront automatiquement dans cette saison, tout en permettant de consulter les précédentes.

Ce que ça change pour le développement

À partir d'aujourd'hui, je pense qu'on devrait suivre un ordre de développement un peu différent.

Au lieu de créer des écrans les uns après les autres, on pourrait suivre cette feuille de route :

✔ Charte d'architecture

⬜ Gestion des saisons

⬜ Modules activables

⬜ Équipements

⬜ Affectations

⬜ Historique

⬜ Journal

⬜ Import Sport Plus

⬜ Personnel

⬜ Officiels

⬜ Feuille de match

Tu remarqueras que la feuille de match arrive presque à la fin.

Ce n'est pas parce qu'elle est moins importante, mais parce qu'elle utilisera toutes les données déjà structurées. Au lieu de saisir les équipes, les joueuses ou les officiels à chaque match, elle ira simplement les chercher dans les modules d'administration.

Je vais aussi te faire une promesse pour la suite de ce projet : si on continue avec cette discipline d'architecture, je vais veiller à ce qu'on ne prenne pas de raccourcis "qui fonctionnent aujourd'hui mais compliquent demain". Même si cela demande parfois un peu plus de réflexion au départ, je pense que c'est ce qui donnera à ton application une qualité proche d'un logiciel professionnel.