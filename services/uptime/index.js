import got from 'got';

const uptime = async (url, previousStatusCode) => {
    const {statusCode} = await got.get(url);
    if (statusCode > previousStatusCode) {
        return { uptime: false, statusCode, message: `${url} is down` };
    }
    if (statusCode < previousStatusCode) {
        return { uptime: true, statusCode, message: `${url} has been recovered` };
    }
    return { uptime: (statusCode === 200), statusCode };
}

export default uptime;