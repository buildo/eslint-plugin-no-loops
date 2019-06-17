#!/bin/sh

set -e

yarn install --no-progress
yarn test
