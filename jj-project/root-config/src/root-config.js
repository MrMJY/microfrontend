import { registerApplication, start } from 'single-spa'
import isActive from './activity-functions'

const customProps = {
  systemName: 'test customProps systemName'
}

registerApplication('frame', () => System.import('frame'), isActive.frame, customProps)
registerApplication('gcjs', () => System.import('gcjs'), isActive.gcjs, customProps)
registerApplication('ghjh', () => System.import('ghjh'), isActive.ghjh, customProps)

start()
