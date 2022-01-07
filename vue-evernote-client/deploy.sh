rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M main &&
git remote add origin git@github.com:czc2222/CloudNote-Webside.git &&
git push -f origin main &&
cd ..
