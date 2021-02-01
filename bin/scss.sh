#!/bin/bash

project_dir="$HOME/Repositories/Out-at-Wrigley"

scss_input_home="home/static/home/scss/base.scss"
scss_output_home="home/static/home/css/style.css"
scss_output_home_compressed="home/static/home/css/style.min.css"

declare -a args=(
  "$scss_input_home:$scss_output_home"
  "--style=compressed $scss_input_home:$scss_output_home_compressed"
)

declare -a path=(
  "home/static/home/scss"
)

includes=$(printf -- " -I $project_dir/%s" ${path[@]})
includes=${includes:1}

cd $project_dir

for i in "${args[@]}"; do
  cmd="sass --watch $includes $i"

  echo $cmd >&2
  $cmd &
done

trap 'echo -e "\nExiting…" >&2; pkill $$' SIGINT

wait
