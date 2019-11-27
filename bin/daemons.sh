#!/bin/bash

sass_input_home="home/static/home/sass/base.sass"
sass_output_home="home/static/home/css/style.css"
sass_output_home_compressed="home/static/home/css/style.min.css"

closure_compiler="/opt/closure-compiler/closure-compiler-v20190929.jar"

js_input_home="home/static/home/js/script.js"
js_output_home="home/static/home/js/script.min.js"

js_input_image_slider="home/static/home/js/image_slider.js"
js_output_image_slider="home/static/home/js/image_slider.min.js"

js_input_gallery="home/static/home/js/gallery.js"
js_output_gallery="home/static/home/js/gallery.min.js"

declare -a foo=()
declare -a daemons=(
  "source env/bin/activate; python manage.py runserver 10.0.0.100:8080"
  "sass --watch $sass_input_home:$sass_output_home"
  "sass --watch --style=compressed $sass_input_home:$sass_output_home_compressed"
  "sass --watch $sass_input_events:$sass_output_events"
  "sass --watch --style=compressed $sass_input_events:$sass_output_events_compressed"
  "watch java -jar $closure_compiler --js $js_input_home --js_output_file $js_output_home"
  "watch java -jar $closure_compiler --js $js_input_image_slider --js_output_file $js_output_image_slider"
  "watch java -jar $closure_compiler --js $js_input_gallery --js_output_file $js_output_gallery"
)

for i in "${daemons[@]}"; do
  foo+=(--tab -e "bash -c '$i; exec bash'")
done

gnome-terminal "${foo[@]}"
