const IncomingWebhook = require('@slack/webhook').IncomingWebhook;
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/xxx/yyy/zzz';

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

exports.slackOnCodePushed = (pubSubEvent, callback) => {
    const commit = eventToCommit(pubSubEvent.data);
    // Send message to Slack.
    const message = createSlackMessage(commit);
    (async () => {
        try {
            const reply = await webhook.send(message);

            // Use result
            console.log(reply);
        } catch (error) {
            // Handle error
            console.log(error);
        }
    })();
    callback();
};

const eventToCommit = (data) => {
    return JSON.parse(Buffer.from(data, 'base64').toString());
};

// createSlackMessage create a message from a build object.
const createSlackMessage = (commit) => {
    const {refUpdates, email} = commit.refUpdateEvent;
    const info = Object.keys(refUpdates).map(key => {
        return refUpdates[key];
    });
    const updateType = info[0].updateType.toLowerCase().split('_')[0];
    const branch = info[0].refName.split('refs/heads/')[1];
    const commitId = info[0].newId;
    let severityEmoji = ' :+1: ';
    let commit_link = commitId ? `/+/${commitId}`:'';
    let text, title;
    if (commitId) {
        // create , update
        text = `\`${email}\` ${updateType} branch \`${branch}\``;
        title = `${commit.name.split('/repos/')[1]} / ${branch} / ${commitId}  ${severityEmoji}`;
    } else {
        text = `\`${email}\` ${updateType} branch \`${branch}\``;
        title = `${commit.name.split('/repos/')[1]} / ${branch}  ${severityEmoji}`;
    }

    return {
        text,
        mrkdwn: true,
        username: commit.name.split('/repos/')[1],
        attachments: [
            {
                title,
                title_link: commit.url + commit_link,
                color: 'good',
                // fields: [{
                //     title: 'Status',
                //     value: typeof commit === "object" ? JSON.stringify(commit,null , 2) : commit
                // }]
            },
        ],
    };
};



