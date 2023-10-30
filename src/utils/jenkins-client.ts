import * as jenkins from 'jenkins';
import { config } from '../config/jenkins-client';

const url = `http://${config.JENKINS_USER}:${config.JENKINS_TOKEN}@${config.JENKINS_URL}`;

/**
 * Jenkins连接
 * @param type
 */
const getJenkins = function() {
  const jenkinsConfig = {
    baseUrl: url,
    crumbIssuer: true,
  };
  return new jenkins(jenkinsConfig);
};

const JENKINS = getJenkins();

const buildJob = async (
  jobName = '',
  parameters = { env: 'test', type: 'upload' },
) => {
  const result = await JENKINS.job.build(jobName, parameters);
  return { buildNum: result };
};

/**
 * @description: 获取当前节点信息
 */
const getQueuedInfo = async ({ queueId }) => {
  const result: any = await JENKINS.queue.item(queueId);
  return result;
};
/**
 * @description: 获取当前构建信息
 */
const getJenkinsInfo = async ({ job, buildNumber }) => {
  console.log(job, buildNumber);
  const result: any = await JENKINS.build.get(job, buildNumber);

  const { statusCode } = result;
  if (result && statusCode !== 404) {
    return result;
  } else {
    return result;
  }
};
/**
 * @description: 获取jenkins console.log 信息
 */
const getJenkinsConsole = async ({ job, buildId }) => {
  const jenkinsCallback: any = await new Promise(resolve => {
    JENKINS.build.log(job, buildId, (err: any, data: any) => {
      if (err) {
        return console.log('err---->', err);
      }
      resolve(data);
    });
  });
  return { data: jenkinsCallback };
};

export { buildJob, getQueuedInfo, getJenkinsInfo, getJenkinsConsole };
