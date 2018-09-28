#!/bin/bash

if [ -f $FILE ]; then
  rm realfloridaman.zip
fi

zip -rq realfloridaman.zip . -x "*.git*" -x "*realfloridaman.zip*" -x "*package.sh*"

echo "Zip package built"
