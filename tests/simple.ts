import assert from 'assert'
import { getGitConfig, getGitConfigSync } from '../src'

it('ready', () => {
    assert(true)
})
it('async works', async () => {
    let res = await getGitConfig()
    assert(res.remote.origin.url)
})
it('sync works', async () => {
    let res = getGitConfigSync()
    assert(res.remote.origin.url)
})
it('sync works with nested dir', async () => {
    let res = getGitConfigSync('./github/workspaces')
    assert(res.remote.origin.url)
})
