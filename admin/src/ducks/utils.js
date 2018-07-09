import { List } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function fbToEntities(values, DataRecord) {
  return new List(
    Object.entries(values).map(
      ([uid, value]) => new DataRecord({ uid, ...value })
    )
  )
}
