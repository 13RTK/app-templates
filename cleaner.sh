# Find all node_modules and pnpm-lock.yaml and delete them
find . -name "node_modules" -type d -exec rm -rf {} \;
find . -name "pnpm-lock.yaml" -type f -exec rm -rf {} \;
