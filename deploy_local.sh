
echo "Switching to branch main"
git checkout main

echo "Building Be Better app ..."
npm run build

echo "Moving files to server directory ..."

mv dist/* /var/www/be_better/

echo "Deployment Complete!"
