# Trước khi deploy:
1.Chỉnh 3 biến số cho phù hợp ở file `deploy.sh`
```
PROJECT=
TOPIC=
REPOS=
```
2.Thay thế `SLACK_WEBHOOK_URL` ở file `index.js` bằng slack webhook phù hợp.


# Cách chạy:
Run file `deploy.sh`

Nếu chỉ muốn deploy lại function thì `npm run deploy` 

# Documents

- https://cloud.google.com/source-repositories/docs/configuring-notifications

- https://cloud.google.com/source-repositories/docs/pubsub-notifications
