import { config } from '../config/jenkins-client';
const jenkinsapi = require('jenkins-api');

const url = `http://${config.JENKINS_USER}:${config.JENKINS_TOKEN}@${config.JENKINS_URL}`;

const jenkins = jenkinsapi.init(url);

export function buildJob(
  jobName = '',
  parameters = { env: 'test', type: 'upload' },
) {
  jenkins.build_with_params(jobName, parameters, function(err, data) {
    if (err) {
      console.log('~~~~~~~~构建错误~~~~~~~~~~', err);
    }
    console.log('~~~~~~~~构建信息~~~~~~~~~~', data);
  });
}
