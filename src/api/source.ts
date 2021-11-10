import axios from 'axios';
import { VideosType, ClassType } from 'src/redux/movie';
import { formatXMLClass, ClassInput, DetailsInput, formatXMLDetails } from 'src/utils/xmlUtils';
import xml2json from 'xmltojson';

const getSourceApi = (function () {
  let _address: string;
  let _listMap: Array<ClassType>;

  const getClassList = async (address: string): Promise<Array<ClassType>> => {
    if (address === _address) {
      return _listMap;
    }
    const res = await axios(`http://127.0.0.1:3001?add=${address}&ac=list`);

    if (typeof res.data === 'string' && res.data.includes('<?xml')) {
      _address = address;
      const resultJSON = xml2json.parseString(res.data, { xmlns: false });
      _listMap = formatXMLClass(resultJSON as ClassInput);

      return _listMap;
    }
    throw 'get list error';
  };

  const getClassDetail = async (address: string): Promise<VideosType> => {
    const res = await axios(`http://127.0.0.1:3001?ac=detail&add=${address}`);

    if (typeof res.data === 'string' && res.data.includes('<?xml')) {
      const resultJSON = xml2json.parseString(res.data, { xmlns: false });
      return formatXMLDetails(resultJSON as DetailsInput);
    }
    throw 'get detail error';
  };

  return { getClassList, getClassDetail };
})();

export default getSourceApi;
