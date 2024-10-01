#!/bin/bash

# Check if a PAT is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <PAT>"
  exit 1
fi

PAT=$1

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
  done < .gitmodules
}

# Function to delete the submodule path
delete_path() {
  local path=$1
  if [ -d "$path" ]; then
    rm -rf "$path"
    echo "Deleted: $path"
  else
    echo "Path not found: $path"
  fi
}

# Function to clone the repository with the PAT
clone_repo() {
  local url=$1
  local path=$2
  git clone "$url" "$path"
  if [ $? -eq 0 ]; then
    echo "Cloned: $url into $path"
  else
    echo "Failed to clone: $url"
  fi
}

# Function to delete the .git folder
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

# Main process
main() {
  parse_gitmodules

  for i in "${!paths[@]}"; do
    submodule_path="${paths[$i]}"
    submodule_url="${urls[$i]}"

    # Step 1: Delete the submodule path if it exists
    delete_path "$submodule_path"

    # Step 2: Clone the repository using the PAT into the submodule path
    clone_repo "$submodule_url" "$submodule_path"

    # Step 3: Delete the .git folder in the submodule to convert it to a normal folder
    delete_git_folder "$submodule_path"
  done
}

# Execute the main function
main
