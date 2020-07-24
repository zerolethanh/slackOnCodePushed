PROJECT=your-gcp-project
TOPIC=your-topic
REPOS=('classfunc-api' 'classfunc-functions' 'classfunc.com' 'dev.classfunc.com')
## step 1 : create topic
gcloud pubsub topics create $TOPIC --project=$PROJECT

## step 2: add topic to repo
for REPO in "${REPOS[@]}"; do
  gcloud source repos update "$REPO" \
    --add-topic=$TOPIC \
    --project=$PROJECT \
    --service-account=$PROJECT@appspot.gserviceaccount.com \
    --message-format=json
done

## step 3: deploy subscription function
gcloud functions deploy slackOnCodePushed \
  --runtime=nodejs12 \
  --project=$PROJECT \
  --trigger-topic=$TOPIC \
  --allow-unauthenticated
