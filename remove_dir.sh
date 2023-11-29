REMOVE_PATH=src/features/calendars
git filter-branch --tree-filter "rm -rf $REMOVE_PATH" --prune-empty HEAD
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
git commit -m "Removing $REMOVE_PATH from git history"
git gc
git push origin main --force