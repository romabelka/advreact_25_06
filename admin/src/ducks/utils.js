import { List } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function fbToEntities(values, DataRecord, initailValues) {
  const newList = new List(
    Object.entries(values).map(
      ([uid, value]) => new DataRecord({ uid, ...value })
    )
  )

  if (initailValues) {
    return new List(initailValues).concat(newList)
  }

  return newList
}
