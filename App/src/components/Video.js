import React, { useEffect } from 'react';
import { Text } from 'react-native';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { RTCPeerConnection, RTCView } from 'react-native-webrtc';
import { SignalingClient, Role } from 'amazon-kinesis-video-streams-webrtc';

const Video = () => {
    const stream = null;
    const region = 'us-east-2';
    const accessKeyId = 'AKIAR24BALFBXEPPTCUN';
    const secretAccessKey = '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';

    useEffect(() => {
        const kinesisVideoClient = new AWS.KinesisVideo({
            region,
            accessKeyId,
            secretAccessKey,
            correctClockSkew: true
        })

        kinesisVideoClient.getSignalingChannelEndpoint({
            ChannelARN: channelARN,
            SingleMasterChannelEndpointConfiguration: {
                Protocols: ['WSS', 'HTTPS'],
                Role: Role.VIEWER,
            },
        })
        .then(getSignalingChannelEndpointResponse => {
            const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
                endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
                return endpoints;
            }, {});

            const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
                region,
                accessKeyId,
                secretAccessKey,
                endpoint: endpointsByProtocol.HTTPS,
                correctClockSkew: true,
            });

            kinesisVideoSignalingChannelsClient.getIceServerConfig({
                ChannelARN: channelARN,
            })
            .then(getIceServerConfigResponse => {
                const iceServers = [
                    { urls: `stun:stun.kinesisvideo.${region}.amazonaws.com:443` }
                ];
                
                getIceServerConfigResponse.IceServerList.forEach(iceServer => {
                    iceServers.push({
                        urls: iceServer.Uris,
                        username: iceServer.Username,
                        credential: iceServer.Password,
                    })
                })

                const peerConnection = new RTCPeerConnection({ iceServers });

                signalingClient = new SignalingClient({
                    channelARN,
                    channelEndpoint: endpointsByProtocol.WSS,
                    clientId,
                    role: Role.VIEWER,
                    region,
                    credentials: {
                        accessKeyId,
                        secretAccessKey,
                    },
                    systemClockOffset: kinesisVideoClient.config.systemClockOffset,
                })

                signalingClient.on('sdpAnswer', async answer => {
                    await peerConnection.setRemoteDescription(answer);
                });

                signalingClient.on('iceCandidate', candidate => {
                    peerConnection.addIceCandidate(candidate);
                });

                signalingClient.on('close', () => {
                    // Handle client closures
                });
                
                signalingClient.on('error', error => {
                    // Handle client errors
                });

                peerConnection.addEventListener('icecandidate', ({ candidate }) => {
                    if (candidate) {
                        signalingClient.sendIceCandidate(candidate);
                    } else {
                        // No more ICE candidates will be generated
                    }
                });

                peerConnection.addEventListener('track', event => {
                   stream = event.streams[0];
                });

                signalingClient.open();
            })
            .catch(err => {

            })
        })
        .catch(err => {

        })
    })

    return (
        stream
            ? <Text>Cargando...</Text>
            : <RTCView streamURL={stream.toURL()}/>
    )
}

export default Video;