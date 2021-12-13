
import dayjs from 'dayjs'

const { DOMAIN_NAME, RR } = process.env

export default (message: string) => {
  console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'), `DOMAIN: [${ RR }.${ DOMAIN_NAME }] -> ${ message.toString() }`)
}