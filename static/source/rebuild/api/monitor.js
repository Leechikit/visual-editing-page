import { fetch } from '@/api/index'

export default {
  getMonitorApp() {
    return fetch('/monitor/app')
  }
}
