
import { DDns } from './ddns'
import process from 'process'

const { RR, DOMAIN_NAME } = process.env

if (!(RR || DOMAIN_NAME)) {
  throw Error(
    `
      DDNS is uninitialized and option is not specified
      
      You need to specify one of the following:
        - RR
        - DOMAIN_NAME
    `
  )
}


const ddns = new DDns({
  domainName: DOMAIN_NAME!,
  RR: RR!
})

ddns.run()
