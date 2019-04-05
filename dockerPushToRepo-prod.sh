#!/bin/sh
# Build script
# set -o errexit
e () {
    echo $( echo ${1} | jq ".${2}" | sed 's/\"//g')
}
m=$(./src/app/metadata.sh)

org=$(e "${m}" "org")
hubuser=$(e "${m}" "hubuser")
name=$(e "${m}" "name")
version=$(e "${m}" "version")

artifactLabel=${ARTIFACT_LABEL:-gold}
docker tag ${org}/${name}:${version}-silver ${org}/${name}:${version}-${artifactLabel}

#docker login -u "${hubuser}" -p$dock-pass
echo $artifactLabel
docker push ${org}/${name}:${version}-${artifactLabel}
docker logout