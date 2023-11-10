# GroupVine Custom Build

## Create & Build custom fork

### Create custom fork

For custom build instructions, see [here](https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/quick-start-other.html#customizing-a-predefined-build)

Create a fork online from ckeditor5 repository:
- into "groupvine" account,
- append the date to the name (e.g., ckeditor5-7jun23),
- be sure to uncheck "copy master branch only".

### Clone and checkout stable branch

E.g.,

```
git clone git@github.com:groupvine/ckeditor5-v23.git
cd ckeditor5-v23.git
git branch    # on master branch initially
git checkout stable
git branch    # should now be on stable branch
```

### Work in build-classic branch

```
cd packages/ckeditor5-build-classic
npm install
npm run build
```

### Bring up test page

E.g., in browser, if in ~/gv/tmp/ckeditor5-7jun23, go
[here](file:///Users/dave/gv/tmp/ckeditor5-7jun23/packages/ckeditor5-build-classic/sample/index.html).


### Base package.json mods

Ignore ckeditor5-build-classic in eslint

```
  "eslintIgnore": [
     ...
    "packages/ckeditor5-build-classic/**"
  ],
```

Remove postinstall:

```
    "postinstall:old": "node ./scripts/postinstall.js",
```


## Environment requirements

### node

At least node.js version 16 is now needed (for CKEditor5 v38), so do
following (to also upgrade npm to latest supported version with this
version of node):

```
nvm install 16
nvm install-latest-npm
```

Then:

```
nvm use
```

(.nvmrc has been added for this version)

Then, on my OS-X laptop, also needed to move aside ~/.npmrc which was
pointing to a fixed, old version of npm!

### yarn

Yarn is also needed for building, so after switching to node 14.15.0:

```
npm install -g yarn
```

(May need to ensure that you're using the correct 'npm')


## Custom editor styles

Also, for some CSS tweaks (to save an external editor-styles.css
file), see the "Extracting CSS" section here [not needed?]:

https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html

Update ```gv-types/src/styles.ts``` with up-to-date styles
[here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/content-styles.html).


## Bringing Up-to-date

For bringing up to date with latest master, see:

https://philna.sh/blog/2018/08/21/git-commands-to-keep-a-fork-up-to-date/
https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork

(See note below when upstream repo was changed.)

### Commit any changes

Commit and push any local changes

### Fetch latest version

If haven't set upstream, then might first need:

```
 git remote add  upstream https://github.com/ckeditor/ckeditor5.git
```

Then:


```
git fetch upstream
git merge upstream/stable
git status
```
### Resolve conflicts

Manually edit to resolve conflicts.  For the build area, just mark the files as resolved by using 'git add', e.g.,

```
git add packages/ckeditor5-build-classic/build/ckeditor.js
```

For each of the new files:

```
git add <filename>
```

### Reinstall & build

Then reinstall & build

```
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Check content-styles.css

Also, check whether ckEditorContentStyling() styles need updating (in
gv-types/style.ts, and
[here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/content-styles.html)

For convenience, version currently in use is updated in
packages/ckeditor5-build-classic/build/contenty-styles.css.  When
updating, overwrite with current version there (if there were any
diffs).  Get latest version either from above page, or by doing "npm
run docs" to rebuild docs which includes the content-styles.css that
si put into ```ckeditor5/build/content-styles/content-styles.css```.

### Outdated

Old, outdated (now using stable branch):
```
  # git checkout master
  # git merge upstream/master
```


## Build notes

### 28May2022 - upgrading from v29 to v34

Added to package.json:

```
  "resolutions": {
    "postcss": "8"
  }
```

to resolve a bunch of build errors like:

```
ERROR in ./src/inp-attribute/theme/inp-attribute.css (../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/inp-attribute/theme/inp-attribute.css)
Module build failed (from ../../node_modules/postcss-loader/dist/cjs.js):
Error: PostCSS plugin postcss-import requires PostCSS 8.
Migration guide for end-users:
https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users
...
```



## Upstream repo location change

In April/May, 2020, the upstream repo was moved from

```
https://github.com/ckeditor/ckeditor5-build-classic.git
```

to:


```
https://github.com/ckeditor/ckeditor5/tree/master/packages/ckeditor5-build-classic
```

Refrencing
[this](https://help.github.com/en/github/using-git/changing-a-remotes-url),
I used the following to change this (in local .git/config):

```
git remote set-url upstream https://github.com/ckeditor/ckeditor5/tree/master/packages/ckeditor5-build-classic
```

