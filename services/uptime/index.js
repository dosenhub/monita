import got from 'got';

const uptime = async (url, previousStatusCode) => {
    const {statusCode} = await got.get(url);
    if (statusCode !== previousStatusCode) {
        return { uptime: false, statusCode };
    } 
    return { uptime: true, statusCode };
}

export default uptime;