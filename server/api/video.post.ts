import to from 'await-to-js';

const BEARER = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs=1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
const GUEST_TOKEN_URL = 'https://api.twitter.com/1.1/guest/activate.json';
const GET_TWEET_URL = id => `https://twitter.com/i/api/2/timeline/conversation/${id}.json?tweet_mode=extended`;

async function getData(tweet) {
    try {
        // Get last part before slash
        const tweetId = tweet.replace(/\?.*$/, '').split('/').slice(-1);

        let guestTokenResponse = await fetch(GUEST_TOKEN_URL, {
            method: 'POST',
            headers: {
                authorization: BEARER,
            },
        });
        const { guest_token } = await guestTokenResponse.json();

        if (!guest_token) return '';

        let response = await fetch(GET_TWEET_URL(tweetId), {
            method: 'GET',
            headers: {
                authorization: BEARER,
                'x-guest-token': guest_token,
            },
        });
        let data = await response.json();

        if (!data) return '';

        let videos = data?.globalObjects?.tweets[tweetId]?.extended_entities?.media[0]?.video_info?.variants;

        if (!videos) return '';

        videos = videos.filter(vid => vid.bitrate && vid.url);

        videos = videos.sort(vid => vid.bitrate * -1);

        let finalVideoUrl = videos[0].url;

        return finalVideoUrl;
    } catch (err) {
        return '';
    }
}

export default defineEventHandler(async event => {
    const body = await useBody(event);
    const tweetUrl = body.tweetUrl;
    const videoLink = await getData(tweetUrl);
    return videoLink;
});
