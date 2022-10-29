#!/bin/bash

# This is a simplehelper script for
# opening an interactive Bash shell
# inside a container

# Example Usage:
# $ ./bash api
# (opens bash inside api container)

docker compose exec -it $1 bash