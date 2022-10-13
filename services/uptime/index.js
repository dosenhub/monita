import got from 'got';
import similarity from 'string-cosine-similarity';

const uptime = async (url, data = {body: '', statusCode: 200}) => {
  const { body, statusCode } = await got.get(url);
  let response = {};
  if (statusCode > data.statusCode) {
    return { uptime: false, body, statusCode, message: `${url} is down` };
  }
  if (statusCode <= data.statusCode) {
    data.score || (data.score = 0.94);
    if (data.body && similarity(body, data.body) < data.score) {
      return { uptime: true, defaced: true, body, statusCode, message: `${url} is defaced` };
    }
    if (statusCode < data.statusCode) {
      response = { ...response, message: `${url} has been recovered` };
    }
    return { uptime: true, body, statusCode, ...response };
  }
}

export default uptime;
