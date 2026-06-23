# Révision Controlling 3ème — quiz

Site statique (GitHub Pages) hébergeant des quiz interactifs pour l'examen Controlling 3ème (HES-SO Valais, août 2026) : TVA + Finance (consolidation / Swiss GAAP RPC).

URL publique : https://vouillozromain-web.github.io/revision-controlling/

## Structure
- `index.html` : page d'accueil qui liste les quiz.
- `assets/quiz.css` + `assets/quiz.js` : moteur partagé (rendu, correction instantanée, score). Ne pas dupliquer.
- `quiz/AAAA-MM-JJ-theme.html` : une page par quiz. Elle ne contient QUE les données.

## Ajouter un quiz (procédure de la tâche quotidienne)
1. Créer `quiz/AAAA-MM-JJ-<theme>.html` en copiant la structure de `quiz/2026-06-23-lieu-des-prestations.html` et en remplaçant l'objet `window.QUIZ`.
2. Schéma des données :
   ```js
   window.QUIZ = {
     title: "Titre du thème",
     subtitle: "Bases légales · matière",
     questions: [
       { type:"choice", q:"…",
         options:[ {t:"…", ok:true}, {t:"…", ok:false} ],
         explain:"Correction + article (ex. art. 8 al. 2 let. c LTVA)." },
       { type:"num", q:"…", answer:240000,
         explain:"Explication du calcul + article." }
     ]
   };
   ```
   - `type:"choice"` = QCM (une seule option `ok:true`). `type:"num"` = réponse chiffrée (comparée à `answer`, arrondie).
   - Pour la TVA, `explain` doit citer l'article (barème HES-SO).
3. Ajouter une ligne `<li>` en tête de la liste dans `index.html`.
4. `git add -A && git commit -m "Quiz du JJ.MM" && git push`.
5. Le lien du quiz du jour : `https://vouillozromain-web.github.io/revision-controlling/quiz/<nom-du-fichier>.html`.

## Thèmes
TVA : assujettissement & CAD, lieu (art. 7-8), soumis/exonéré/exclu (21/23), option (22), impôt préalable & CORDIP, acquisitions (45), changement d'affectation/PASM (31), facture (26).
Finance : périmètre & méthodes (IG/IP/MEE), % contrôle vs intérêt, écritures de consolidation, goodwill/badwill, bénéfices internes, PIM, ajustements BC1→BC2, vrai/faux.
