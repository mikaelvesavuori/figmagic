#!/bin/bash

REPORT_FOLDER="reports"

rm $REPORT_FOLDER/syft_sbom.txt && syft packages dir:. > $REPORT_FOLDER/syft_sbom.txt

gitleaks --path=. -v --no-git