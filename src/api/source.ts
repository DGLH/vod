import axios from 'axios';
import xml2json from 'xmltojson';

const getSourceApi = (function () {
  const getClassList = async (address: string) => {
    const res = await axios(`${address}?ac=list`);

    const resultJSON = xml2json.parseString(res.data, { xmlns: false });
    console.log('🚀 ~ file: source.ts ~ line 9 ~ getList ~ resultJSON', resultJSON);
    return resultJSON;
  };

  return { getClassList };
})();

export default getSourceApi;
