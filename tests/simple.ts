import assert from 'assert'
import { getGitConfig, getGitConfigSync, getRepoRoot } from '../src'

it('ready', () => {
    assert(true)
})

describe('get config', () => {
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
})

describe('root', () => {
    it('works', () => {
        let res = getRepoRoot()
        assert(res)
        // console.log(res)
    })
})
