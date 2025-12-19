#!/usr/bin/env bash
# Exit on error
set -o errexit

# Save the repo root directory (where the script is executed from)
REPO_ROOT=$(pwd)

STORAGE_DIR=/opt/render/project/.render

if [[ ! -d $STORAGE_DIR/nodejs ]]; then
  echo "...Downloading Node.js"
  mkdir -p $STORAGE_DIR/nodejs
  cd $STORAGE_DIR/nodejs
  curl -s https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz | tar xJf - --strip-components=1
else
  echo "...Using locally installed Node.js"
fi

# Add node to PATH
export PATH=$STORAGE_DIR/nodejs/bin:$PATH

# Verify node version
node -v
npm -v

echo "Installing Frontend Dependencies..."
cd "$REPO_ROOT/frontend"
npm install

echo "Building Frontend..."
# Render sets CI=true by default, which treats warnings as errors. We disable that for build.
CI=false npm run build

echo "Installing Backend Dependencies..."
cd "$REPO_ROOT/backend"
pip install -r requirements.txt
