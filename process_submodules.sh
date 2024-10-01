#!/bin/bash

# Check if a PAT is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <PAT>"
  exit 1
fi

PAT=$1

# Locate the .gitmodules file, assuming it's in the root of the repository
GITMODULES_FILE="$(git rev-parse --show-toplevel)/.gitmodules"

# Check if the .gitmodules file exists
if [ ! -f "$GITMODULES_FILE" ]; then
  echo ".gitmodules file not found in the root of the repository."
  exit 1
fi

# Function to parse the .gitmodules file and extract the submodule path and URL
parse_gitmodules() {
  paths=()
  urls=()
  while IFS= read -r line; do
    if [[ $line == path* ]]; then
      paths+=("$(echo $line | cut -d'=' -f2 | xargs)")
    elif [[ $line == url* ]]; then
      url="$(echo $line | cut -d'=' -f2 | xargs)"
      # Inject the PAT into the URL
      url_with_pat=$(echo "$url" | sed -E "s#https://#https://$PAT@#")
      urls+=("$url_with_pat")
    fi
  done < "$GITMODULES_FILE"
}

# Function to delete the .git folder in the submodule directory
delete_git_folder() {
  local path=$1
  local git_folder="$path/.git"
  if [ -d "$git_folder" ]; then
    rm -rf "$git_folder"
    echo "Deleted .git folder in: $path"
  else
    echo ".git folder not found in: $path"
  fi
}

# Function to initialize, update, and de-submodule the components
process_submodules() {
  parse_gitmodules

  for i in "${!paths[@]}"; do
    submodule_path="${paths[$i]}"
    submodule_url="${urls[$i]}"

    # Step 1: Initialize the submodule if it's not already initialized
    if [ ! -d "$submodule_path" ]; then
      echo "Initializing submodule: $submodule_path"
      git clone "$submodule_url" "$submodule_path"
    else
      echo "Submodule already cloned: $submodule_path"
    fi

    # Step 2: Remove the submodule's .git directory to convert it into a normal folder
    delete_git_folder "$submodule_path"
  done
}

# Execute the main function
process_submodules
