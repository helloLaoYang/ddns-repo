

/**
 * ip client
 */
import publicip from 'public-ip'
import Log from '../utils/log'
import schedule from 'node-schedule'

const { TYPE } = process.env

export default class Ip {
  private static events: Function[] = []

  private static job?: schedule.Job

  private static createScheduleJob () {
    /**
     * 每分钟检测一次ip
     */
    this.job = schedule.scheduleJob('*/30 * * * * *', async () => {
      Log('开始检测当前IP')
      const ip = await publicip[
        TYPE=== 'A'
        ? 'v4'
        : 'v6'
      ]()

      Log(ip)

      this.run(ip)
    })
  }

  // 添加change事件
  static on (callback: (ip: string) => void) {
    if (!(callback instanceof Function)) {
      return
    }

    this.events.push(callback)

    return this
  }

  // 移除事件监听
  static off (callback: (ip?: string) => void) {
    if (!(callback instanceof Function)) {
      return
    }
    const index = this.events.indexOf(callback)
    this.events.splice(index, 0)
  }

  private static run (ip: string) {
    this.events.forEach(fn => fn(ip))
  }

  static start () {
    this.createScheduleJob()
  }

  /**
   * 停止监听
   */
  static stop () {
    if (this.job) {
      this.job.cancel()
      this.job = undefined
    }
  }
}
