# get-git-config

Parses the .git/config file to extract information like remotes and branches

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
