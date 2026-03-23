# Projet Frontend - Guide de contribution

## ✅ Objectif
Ce README explique à l'équipe comment :
- cloner le dépôt,
- créer une branche pour chaque fonctionnalité,
- mettre à jour la branche `main` avant de lancer le dev,
- faire des commits et `pull request` vers `main`,
- tester et lancer l'application localement.

## 1) Cloner le projet
1. Ouvrir un terminal (PowerShell, Git Bash, etc.)
2. Aller dans le dossier parent souhaité :
   ```powershell
   cd C:\chemin\vers\ton\workspace
   ```
3. Cloner le dépôt :
   ```powershell
   git clone <URL_DU_REPO>
   cd ProjetFinCycle/Frontend
   ```
4. Vérifier les branches :
   ```powershell
   git branch -a
   ```

## 2) Créer une branche pour chaque fonctionnalité
1. Toujours partir de `main` à jour :
   ```powershell
   git checkout main
   git pull origin main
   ```
2. Créer une branche de travail :
   ```powershell
   git checkout -b feature/<ton-nom>-<description>
   ```
   Exemples :
   - `feature/asma-login` 
   - `feature/ghita-add-filter`
3. Travailler dans cette branche, faire des commits clairs :
   ```powershell
   git add .
   git commit -m "feat: ajout de la page de connexion"
   ```
4. Pousser la branche sur le remote :
   ```powershell
   git push -u origin feature/<ton-nom>-<description>
   ```

## 3) Mettre à jour la branche de travail (sync)
Avant chaque nouveau travail ou PR :
1. Revenir sur `main` puis pull :
   ```powershell
   git checkout main
   git pull origin main
   ```
2. Rebaser ou merger ta branche de fonctionnalité :
   ```powershell
   git checkout feature/<ton-nom>-<description>
   git rebase main
   # ou git merge main
   ```
3. Résoudre les conflits s’il y en a, puis push :
   ```powershell
   git push --force-with-lease
   ```

## 4) Ouvrir une Pull Request (PR)
1. Aller sur la plateforme (GitHub/GitLab/Bitbucket).
2. Créer une PR de `feature/<...>` vers `main`.
3. Titre/description clairs (ex : "feat: ajout du composant Filtre")
4. Ajouter des reviewers de l’équipe.
5. Vérifier : tests, lint, build.
6. Une fois validée, merger dans `main` (généralement via `Squash and merge` ou `Merge commit`).

## 5) Lancer le projet en local
1. Installer les dépendances (une fois ou après changement package) :
   ```powershell
   npm install
   ```
2. Lancer le serveur de dev :
   ```powershell
   npm run dev
   ```
3. Ouvrir `http://localhost:5173` (ou URL donnée par Vite).
4. Refaire un build de test :
   ```powershell
   npm run build
   ```

## 6) Workflow Git recommandé
- `main` : branche stable (toujours review + tests)
- `feature/<...>` : nouvelle fonctionnalité
- `bugfix/<...>` : correctif
- `hotfix/<...>` : urgent production

## 7) Bonnes pratiques de commits
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `chore:` maintenance
- `docs:` documentation

Exemple :
```powershell
git commit -m "fix: correction affichage mobile sur la page profil"
```

## 8) Ajouter des éléments (UI / fonctionnalité)
Pour ajouter une nouvelle fonctionnalité:
1. créer la branche
2. développer et tester
3. commit et push
4. PR vers `main`
5. après merge, se mettre à jour :
   ```powershell
   git checkout main
   git pull origin main
   ```

## 9) Notes spécifiques pour l’équipe
- Si vous avez des doutes, créez une issue avant la PR.
- Toujours documenter le comportement attendu et le test effectué.
- Respecter les conventions de nommage (camelCase, etc.).

---
*Ce README doit être utilisé comme guide de base. Adapter si besoin selon le process de l’équipe et l’intégration continue (CI).* 
