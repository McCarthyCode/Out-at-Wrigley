#!/bin/bash

scss_input_home="home/static/home/scss/base.scss"
scss_output_home="home/static/home/css/style.css"
scss_output_home_compressed="home/static/home/css/style.min.css"

declare -a args=(
  "$scss_input_home:$scss_output_home"
  "--style=compressed $scss_input_home:$scss_output_home_compressed"
)

for i in "${args[@]}"; do
  sass --watch $i &
done

clear
