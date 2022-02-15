# lowdb-crud



## Testing
```
npx jasmine ./spec/lowdb-crud.test.js
npx jasmine ./spec/lowdb-crud-helper.test.js

npx jest ./__test__/lowdb-crud.test.js
npx jest ./__test__/lowdb-crud-helper.test.js
```

## Git
```
git add .
git commit -m "initial setup"
git push -u origin main
```


## lowdb
```
npx esbuild ./node_modules/lowdb/lib/index.js --bundle --platform=node --outfile=./src/lowdb-wrapper.js

npx esbuild ./src/index.js --bundle --platform=node --outfile=./dist/index.js

```

## node publishing
```
"publishConfig": {
  "registry":"https://npm.pkg.github.com"
},
```


## jsdoc
```
npx jsdoc src -r -d src-jsdoc
```


## documentation
```
npx documentation src -r -d src-jsdoc
npx documentation build src/lowdb-crud.js -f html --shallow -o src-docs
npx documentation build src/lowdb-crud.js -f md --shallow -o lowdb-crud-doc.md
npx documentation build src/lowdb-crud.js -f json --shallow -o lowdb-crud-doc.json

npx documentation readme src/lowdb-crud.js  --section=Documentation

```

## Resources
- https://github.com/documentationjs/
- https://github.com/documentationjs/documentation
