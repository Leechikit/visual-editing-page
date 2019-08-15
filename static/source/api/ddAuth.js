import { fetch } from './index';

export default {
  getCorpId () {
    return fetch('corpId');
  },
  ddAuth (params) {
    return fetch('/ddAuth', params);
  }
};
