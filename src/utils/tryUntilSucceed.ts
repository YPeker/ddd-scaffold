export async function tryUntilSucceed<T>(promiseFn:  () => Promise<T>, maxTries=3): Promise<T> {
    try {
        return await promiseFn()
    } catch (e) {
        if (maxTries > 0) {
            return tryUntilSucceed(promiseFn, maxTries - 1)
        }
        throw e
    }
}