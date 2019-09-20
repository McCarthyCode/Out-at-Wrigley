#!/bin/bash

rm thumbnails_* -rf

for d in */; do
    mkdir -p "thumbnails_$d"
    for f in $d*; do
        convert $f -resize 300x250 thumbnails_$f
    done
done
