import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function fbToEntities(values, DataRecord) {
  return Object.entries(values).reduce(
    (acc, [uid, value]) => acc.set(uid, new DataRecord({ uid, ...value })),
    new OrderedMap({})
  )
}
