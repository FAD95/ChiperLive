import videoClient from './kinesisVideoClient'

export default async function deleteSignalingChannel(channelName) {
  // Create KVS client
  const kinesisVideoClient = videoClient()

  const describeSignalingChannelResponse = await kinesisVideoClient
    .describeSignalingChannel({
      ChannelName: channelName,
    })
    .promise()

  const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN

  // Get signaling channel ARN
  const params = {
    ChannelARN: channelARN,
  }
  kinesisVideoClient.deleteSignalingChannel(params, (err, data) => {
    if (err) console.error(err)
    console.log(data)
  })
}
