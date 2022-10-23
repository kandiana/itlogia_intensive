#!/usr/bin/env bash

git branch -D ghpages
git checkout --orphan ghpages

ng build --deploy-url './' --base-href './'
mkdir docs
cp -r ./dist/agproject/* ./docs/

rm -rf dist
git rm -rf .

git add docs
git commit -m 'built project'
git push -uf origin ghpages

git switch master
