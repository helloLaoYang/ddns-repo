// This file is auto-generated, don't edit it
import OpenApi, * as $OpenApi from '@alicloud/openapi-client'
import Client, * as $alidns from "@alicloud/alidns20150109"
import process from 'process'

const { ACCESS_KEY_ID, ACCESS_KEY_SECRET } = process.env

if (!(ACCESS_KEY_ID && ACCESS_KEY_SECRET)) {
  throw Error(
    `
      ALIYUN DDNS is uninitialized and option is not specified
      
      You need to specify one of the following:
        - ACCESS_KEY_ID
        - ACCESS_KEY_SECRET
    `
  )
}

const accessKeyId = ACCESS_KEY_ID 
const accessKeySecret = ACCESS_KEY_SECRET

export const config = new $OpenApi.Config({
  // 您的AccessKey ID
  accessKeyId,
  // 您的AccessKey Secret
  accessKeySecret,
})

config.endpoint = 'alidns.cn-hangzhou.aliyuncs.com'

export const client = new Client(config)

/**
 * 获取域名解析记录
 * 
 * @subDomain 需要
 * @returns DescribeSubDomainRecordsResponseBodyDomainRecords[]
 */
export const describeSubDomainRecords = async (subDomain: string): Promise<$alidns.DescribeSubDomainRecordsResponseBodyDomainRecords | undefined> => {
  const request = new $alidns.DescribeSubDomainRecordsRequest({
    subDomain,
  })
  const {
    domainRecords,
  } = await client.describeSubDomainRecords(request).then(r => r.body)
  return domainRecords
}

/**
 * 删除此域名的所有解析
 * @param domainName 顶级域名
 * @param rr 主机名
 */
export const deleteSubDomainRecords = async (domainName: string, RR: string) => {
  const request = new $alidns.DeleteSubDomainRecordsRequest({
    domainName,
    RR,
  })
  return client.deleteSubDomainRecords(request)
}


/**
 * 添加解析记录
 * @param domainName 
 * @param RR 
 * @param value 
 * @param type 
 * @returns 
 */
export const AddDomainRecord = async (domainName: string, RR: string, value: string, type: string = 'A') => {
  const request = new $alidns.AddDomainRecordRequest({
    domainName,
    RR,
    value,
    type,
  })

  return client.addDomainRecord(request)
}

/**
 * 修改记录
 * @param recordId 
 * @param RR 
 * @param value 
 * @param type 
 * @returns 
 */
export const UpdateDomainRecord = async (recordId: string, RR: string, value: string, type: string = 'A') => {
  const request  = new $alidns.UpdateDomainRecordRequest({
    recordId,
    RR,
    value,
    type,
  })

  return client.updateDomainRecord(request)
}