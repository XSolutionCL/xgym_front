
echo "Switching to branch main"
git checkout main

echo "Building Be Better app ..."
npm run build

echo "Deploying files to server ..."

scp -i ~/.ssh/id_rsa -r dist/* admin@18.212.191.137:/var/www/be_better/

echo "Deployment Complete!"

