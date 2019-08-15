import { fetch, fetchGet } from '@/api/index'
export default {
  companyDetail(params){
    return fetch('/company/detail',params);
  }
}