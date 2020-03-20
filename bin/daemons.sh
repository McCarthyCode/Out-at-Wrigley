#!/bin/bash

scss_input_home="home/static/home/scss/base.scss"
scss_output_home="home/static/home/css/style.css"
scss_output_home_compressed="home/static/home/css/style.min.css"

declare -a foo=()
declare -a daemons=(
  "source env/bin/activate; python manage.py runserver 10.0.0.100:8080"
  "sass --watch $scss_input_home:$scss_output_home"
  "sass --watch --style=compressed $scss_input_home:$scss_output_home_compressed"
)

for i in "${daemons[@]}"; do
  foo+=(--tab -e "bash -c '$i; exec bash'")
done

gnome-terminal "${foo[@]}"
