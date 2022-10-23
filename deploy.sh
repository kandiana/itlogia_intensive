#!/usr/bin/env bash

git branch -D ghpages
git checkout --orphan ghpages

ng build --deploy-url '/itlogia_intensive/' --base-href '/itlogia_intensive/'
mkdir deploy
cp -r ./dist/agproject/* ./deploy/

git rm -rf .
git add deploy
git commit -m 'built project'
git push -uf origin ghpages

git switch master
