echo "Switching to branch main"
git checkout main

echo "Building Be Better app ..."
npm run build

echo "Deploying files to server ..."
scp -P 22 -r dist/* root@154.12.244.95:/var/www/be_better/

echo "Deployment Complete!"