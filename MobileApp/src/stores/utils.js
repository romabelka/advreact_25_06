export function entitiesFromFB(data) {
    Object.entries(data).forEach(([key, value]) => value.uid = key)
    return data
}