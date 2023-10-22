# fe-eln-editor

## overview
- 연구노트 프로젝트의 클라이언트를 서버없이 실행되도록 수정
- 에디터 부분만 작동함

# eln

NODE version is v14.17.0

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start -> on Electron
npm run serve -> for Webapp
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

###Commit Style
type(scope): subject

Here are some sample

```
git commit -am "docs(changelog): update changelog to beta.5"
git commit -am "fix(release): need to depend on latest rxjs and zone.js"
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#How to delete water mark on gojs.

files : /node_modules/.vite/gojs.js or /node_modules/gojs/go.js
Put the line below into the end of line of Qa function:
Note that you can easily patch it as 'npm run remove_water_mark_gojs' command. :)

```
var temp = [
          'GoJS 2.2 evaluation',
          '(c) 1998-2022 ',
          'Not for distri',
          'gojs.net'
        ];
        for(var i = 0; i < temp.length; i++) {
          if(f.indexOf(temp[i]) > -1) {
            return "";
          }
        }
```
