!/bin/bash

wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget \
    --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate \
    'https://docs.google.com/uc?export=download&id=1qiacanLXiUndgAjOwFSC2r7WGPUcqR0r' -O- | \
    sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1qiacanLXiUndgAjOwFSC2r7WGPUcqR0r" \
    -O persistent-folder.zip && rm -rf /tmp/cookies.txt

unzip persistent-folder.zip
rm persistent-folder.zip