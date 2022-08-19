#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run test:types
npm test
npm run clean
npm run licenses
npm run lint
npm run build
git add .
