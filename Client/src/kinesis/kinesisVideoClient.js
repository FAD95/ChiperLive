import { KinesisVideo } from 'aws-sdk'

let videoClient = null

const kinesisVideoClient = (formValues) => {
  if (videoClient === null) {
    videoClient = new KinesisVideo({
      region: formValues.region,
      accessKeyId: formValues.accessKeyId,
      secretAccessKey: formValues.secretAccessKey,
      sessionToken: formValues.sessionToken,
      endpoint: formValues.endpoint,
    })
    return videoClient
  } else {
    return videoClient
  }
}

export default kinesisVideoClient
