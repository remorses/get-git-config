# get-git-config

Parses the .git/config file to extract information like remotes and branches

Does not require the git command installed, searches the git config on parent directories and throws if does not find any

## Usage

```
npm i get-git-config
```

```js
import { getGitConfig, getGitConfigSync } from 'get-git-config'

getGitConfig().then(console.log)

// get the current origin url
console.log(getGitConfigSync().remote.origin.url)
```
