
/**
 * ddns
 */
import Ip from '../ip'
import Log from '../utils/log'
import { describeSubDomainRecords, deleteSubDomainRecords, AddDomainRecord, UpdateDomainRecord } from './openapi'


const { TYPE } = process.env

export type Conf = {
  domainName: string;
  RR: string
}

export class DDns {
  private domainName: string = ''

  private RR: string = ''

  private type: 'A' | 'AAAA' = TYPE === 'A' ? 'A' : 'AAAA'

  private records (): Promise<{
    recordId: string
    value: string
  }[]> {
    const subDomain = `${ this.RR }.${ this.domainName }`
    return describeSubDomainRecords(
      subDomain
    ).then(
      r => (r!.record || []).filter(({ status }) => (status === 'ENABLE'))
    ) as any
  }

  constructor (conf: Conf) {

    const { domainName, RR } = conf || {}
    
    if (domainName) {
      this.domainName = domainName
    }

    if (RR && RR) {
      this.RR = RR
    }

    this.init()
  }

  private async init () {
    Ip.on(this.listener)

    Log('DDNS服务正在运行')
  }

  /**
   * 开启ddns
   */
  run () {
    Ip.start()
  }

  /**
   * 启动ddns监听
   */
  stop () {
    Ip.stop()
  }


  /**
   * listener
   */
  private listener = async (ip: string) => {
    const aliyunrecords = (
      await this.records()
    ).map(({ value }) => (value))

    if (aliyunrecords.includes(ip)) {
      return
    }

    await this.ddns(ip)

    Log(`解析结果IP:${ ip }`)
  }


  private async ddns (ip: string) {
    const records = await this.records()

    // 新增解析
    if (!records || !records.length) {
      Log('删除当前域名的所有解析.')
      await deleteSubDomainRecords(this.domainName, this.RR)
      Log('新增解析记录')
      await AddDomainRecord(this.domainName, this.RR, ip, this.type)
      return
    }

    // 变更解析
    records.forEach(async ({ recordId }) => {
      Log(`修改解析记录[${ recordId }]`)
      await UpdateDomainRecord(recordId, this.RR, ip, this.type)
    })
    
  }
  
}