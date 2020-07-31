// git config

import fs from 'fs'
import ini from 'ini'
import path from 'path'
import merge from 'lodash/fp/merge'

export type GitConfigType = {
    // TODO check these types are right
    submodule?: { active?: string }
    core?: {
        repositoryformatversion?: string
        filemode?: boolean
        bare?: boolean
        logallrefupdates?: boolean
        ignorecase?: boolean
        precomposeunicode?: boolean
    }
    remote?: {
        [k: string]: {
            url?: string
            fetch?: string
        }
        origin?: {
            url?: string
            fetch?: string
        }
    }
    branch?: {
        [k: string]: {
            // remote name
            remote?: string
            // can be a ref, for example refs/heads/master
            merge?: string
        }
    }
}

export async function getGitConfig(
    dir: string = '.',
    options: { gitDir?: string } = {},
): Promise<GitConfigType> {
    const config = findGitSync(dir, options)
    if (!config) throw new Error('no gitconfig to be found at ' + dir)
    const data = await fs.promises.readFile(config)
    var formatted = format(ini.parse(data.toString()))
    return formatted
}

export function getGitConfigSync(
    dir: string = '.',
    options: { gitDir?: string } = {},
): GitConfigType {
    const config = findGitSync(dir, options)
    if (!config) throw new Error('no gitconfig to be found at ' + dir)
    const data = fs.readFileSync(config)
    var formatted = format(ini.parse(data.toString()))
    return formatted
}

function format(data) {
    var out = {}
    Object.keys(data).forEach(function (k) {
        if (k.indexOf('"') > -1) {
            var parts = k.split('"')
            var parentKey = parts.shift().trim()
            var childKey = parts.shift().trim()
            if (!out[parentKey]) out[parentKey] = {}
            out[parentKey][childKey] = data[k]
        } else {
            out[k] = merge(out[k], data[k])
            // cant start using these without bumping the major
            //out[k] = {...out[k], ...data[k]};
        }
    })
    return out
}

function findGitSync(dir, options) {
    var folder = path.resolve(
        dir,
        options.gitDir || process.env.GIT_DIR || '.git',
        'config',
    )
    const exists = fs.existsSync(folder)
    if (exists) return folder
    if (dir === path.resolve(dir, '..')) return false
    return findGitSync(path.resolve(dir, '..'), options)
}
