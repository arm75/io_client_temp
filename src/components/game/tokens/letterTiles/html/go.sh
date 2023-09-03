#!/bin/bash

# Loop through the English alphabet
for letter in {a..z}; do
  # Create a .tsx file with the desired name
  touch "${letter}Tile.tsx"
done

