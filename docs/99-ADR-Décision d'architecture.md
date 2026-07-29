# Décisions importantes

## 2026-07-18

Décision :

Les joueuses appartiennent à une association.

Elles sont affectées à une équipe pour une saison.

Pourquoi ?

Une joueuse peut changer d'équipe sans perdre son historique.

---

## 2026-07-18

Décision :

Les remplaçantes ne sont jamais enregistrées dans la base officielle.

Pourquoi ?

Une remplaçante est liée à une seule partie et ne modifie pas les effectifs permanents.

---

## 2026-07-18

Décision :

Les parties sont des instantanés de la base officielle.

Pourquoi ?

Une modification future des équipes ou des joueuses ne doit jamais modifier une feuille de match déjà jouée.

ADR-008

Sujet

Une association est une unité administrative autonome.

Décision

Chaque association possède l'ensemble de ses données permanentes.

Conséquences

Une association peut être :

créée;
exportée;
importée;
sauvegardée;
publiée;
synchronisée;

sans dépendre des autres associations présentes dans la plateforme.

ADR-009
Sujet

Les entités métier utilisent un modèle référencé.

Décision

Les entités principales de la plateforme sont indépendantes les unes des autres.

Elles sont reliées entre elles par des identifiants (id), et non par une imbrication d'objets.

Pourquoi

Ce modèle permet :

le transfert d'une joueuse d'une équipe à une autre;
le changement d'association;
la conservation de l'historique;
l'absence de duplication des données;
une meilleure évolutivité de la plateforme.
Conséquences

Une équipe ne contient plus directement ses joueuses.

Une association ne contient plus directement ses équipes.

Les relations sont établies par des références (associationId, equipeId, etc.).

ADR-010 — Les équipes sont saisonnières

Une équipe représente l’effectif d’une association pour une saison déterminée. Elle est recréée à chaque saison et possède son propre identifiant. Les équipes des saisons précédentes sont archivées plutôt que réutilisées ou écrasées.

ADR-011 — Les saisons appartiennent aux associations

Chaque association gère ses propres saisons. Une saison est une entité référencée par associationId. Les équipes sont liées à une saison par saisonId. Les saisons historiques sont archivées et conservées.

La décision à valider est donc :

Chaque association possède-t-elle ses propres saisons, avec une seule saison active à la fois?

ADR-012 — Les catégories possèdent un code normalisé et une appellation locale

La catégorie sportive est identifiée par un code normalisé indépendant de son appellation d’affichage. Chaque association peut définir une appellation personnalisée pour chaque catégorie. Les équipes référencent toujours la catégorie normalisée.

Il faudra appliquer le même principe aux classes : la valeur métier reste A, B, C, etc., tandis qu’un libellé personnalisé pourra éventuellement être ajouté sans remplacer la valeur officielle.

Les catégories sont définies par un référentiel réglementaire versionné. L’âge est calculé au 31 décembre de l’année de référence. Pour les catégories dont les plages d’âge se chevauchent, le système calcule plusieurs catégories admissibles plutôt qu’une catégorie automatique unique. L’affectation à une équipe détermine la catégorie effectivement jouée.

Une joueuse peut recevoir une dérogation vers une catégorie supérieure ou inférieure selon ses aptitudes et ses capacités.

Une joueuse peut être autorisée à évoluer dans une catégorie supérieure ou inférieure à son admissibilité normale. Cette autorisation est représentée par une entité de dérogation distincte, liée à une saison et à une catégorie précise. Une dérogation ne modifie jamais les données permanentes de la joueuse et doit être conservée dans l’historique.

ADR proposée — Importation contrôlée des joueuses

Les fichiers .xls, .xlsx et .csv sont traités par un pipeline d’importation distinct du domaine Joueuse. Toute importation comprend une correspondance des colonnes, une normalisation, une détection des doublons, une validation et un aperçu avant confirmation. Les identifiants provenant de plateformes externes ne remplacent jamais l’identifiant interne de la joueuse.

Décision proposée — ADR-013

L’importation et l’exportation sont deux sous-systèmes indépendants. Les exports sont générés à partir d’un modèle de rapport commun, puis convertis vers les formats PDF, DOCX ou RTF. Le format DOCX est privilégié au format historique DOC pour garantir une génération fiable et une compatibilité moderne.

Le besoin fonctionnel devient donc :

Entrées prises en charge
.xls
.xlsx
.csv

Sorties prises en charge
.pdf
.docx
.rtf

Et nous pourrons conserver .doc comme appellation visible « Word » dans l’interface, tout en générant techniquement un véritable fichier .docx.