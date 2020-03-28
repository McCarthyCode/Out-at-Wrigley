#!/bin/bash

closure_compiler="/opt/closure-compiler/closure-compiler-v20190929.jar"

js_input_global="home/static/home/js/global.js"
js_output_global="home/static/home/js/global.min.js"

js_input_gallery="home/static/home/js/gallery.js"
js_output_gallery="home/static/home/js/gallery.min.js"

js_input_image_slider="home/static/home/js/image_slider.js"
js_output_image_slider="home/static/home/js/image_slider.min.js"

declare -a commands=(
  # "java -jar $closure_compiler --js $js_input_global --js_output_file $js_output_global"
  # "java -jar $closure_compiler --js $js_input_gallery --js_output_file $js_output_gallery"
  # "java -jar $closure_compiler --js $js_input_image_slider --js_output_file $js_output_image_slider"
)

for i in "${commands[@]}"; do
  echo "$i"
  $i
done
