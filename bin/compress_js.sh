#!/bin/bash

closure_compiler="/opt/closure-compiler/closure-compiler-v20190929.jar"

js_input_home="home/static/home/js/script.js"
js_output_home="home/static/home/js/script.min.js"

js_input_image_slider="home/static/home/js/image_slider.js"
js_output_image_slider="home/static/home/js/image_slider.min.js"

js_input_gallery="home/static/home/js/gallery.js"
js_output_gallery="home/static/home/js/gallery.min.js"

declare -a commands=(
  "java -jar $closure_compiler --js $js_input_home --js_output_file $js_output_home"
  # "java -jar $closure_compiler --js $js_input_image_slider --js_output_file $js_output_image_slider"
  # "java -jar $closure_compiler --js $js_input_gallery --js_output_file $js_output_gallery"
)

for i in "${commands[@]}"; do
  echo "$i"
  $i
done
