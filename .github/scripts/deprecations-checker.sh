# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

# This script is meant to be sourced into the shell running in a Github
# workflow.

# Staticcheck uses static analysis to finds bugs and performance issues, offers simplifications, 
# and enforces style rules.
# Here, it is used to check if a deprecated function, variable, constant or field is used.

echo "Installing staticcheck"
go install honnef.co/go/tools/cmd/staticcheck@2023.1.2 #v0.4.2

# Run staticcheck 
echo "Performing Deprecations Check: Running Staticcheck"
staticcheck ./... | grep deprecated > staticcheckOutput.txt

# Get changed files names from the PR
changedFiles=$(git --no-pager diff --name-only HEAD "$(git merge-base HEAD "origin/${{ github.event.pull_request.base.ref }}")")

# Include deprecations details of only changed files in the PR
echo "Results:"

# deprecationsCount checks if any deprecations were found to fail later 
deprecationsCount=0

for fileName in ${changedFiles[@]}; do
if grep -q $fileName staticcheckOutput.txt; then

    # output deprecations in the file 
    grep $fileName staticcheckOutput.txt

    # deprecation found, increment count
    deprecationsCount=$((deprecationsCount+1))
fi
done

# Cleanup deprecations file
rm -rf staticcheckOutput.txt  

if [ "$deprecationsCount" -ne "0" ]
then
    echo "Deprecations check failed. This check examines the entire file included in the PR for any deprecated functions, variables, constants, or fields. Please review your changes to ensure that you have not included any deprecated elements."
    exit 1 
else
    echo "No deprecated functions, variables, constants, or fields were found in the PR!"
fi
