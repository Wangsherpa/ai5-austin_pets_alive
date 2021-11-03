set -e

export IMAGE_NAME="homeless-pet-app-frontend-react-prod"

docker build -t $IMAGE_NAME -f Dockerfile .
docker run --rm --name $IMAGE_NAME -ti --mount type=bind,source="$(pwd)",target=/app -p 80:80 $IMAGE_NAME