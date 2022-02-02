# lowdb-crud

<div class="description">
    LowdbCrud provides create, read, update, delete (CRUD)
operations on a json data structure that resembles a database table.
LowdbCrud has 7 methods: <code style="color:blue">create()</code>, <code style="color:blue">read()</code>, <code style="color:blue">update()</code>, <code style="color:blue">upsert()</code>, <code style="color:blue">delete()</code>, <code style="color:blue">list_table()</code>, and <code style="color:blue">delete_table()</code>.
LowdbCrud is a wrapper of <a href="https://github.com/typicode/lowdb" target="_blank">lowdb</a> that stores all data in one json file that can represent multiple tables.
LowdbCrud uses a <span style="color:blue">data object</span>
that stores all data (tables). Each <span style="color:blue">key</span> of the object represents a table name.
The data of each table is stored in an <span style="color:blue">array of objects</span>.
The <span style="color:blue">table data structure</span> example below shows the data structure of 2 tables (<span style="color:blue">person</span> and <span style="color:blue">phone</span>).
Additionally, the <span style="color:blue">database object</span>, <span style="color:blue">data object</span>, and the <span style="color:blue">table object</span> (see syntax example bellow) can be manipulated directly by using <a href="https://github.com/typicode/lowdb" target="_blank">lowdb</a> and <a href="https://github.com/lodash/lodash" target="_blank">lodash</a>.
In terms of testing, <a href="https://github.com/jasmine/jasmine-npm" target="_blank">jasmine</a> can be used by default.  Other test frameworks may need additional configuration because <a href="https://github.com/typicode/lowdb" target="_blank">lowdb 3</a> is a pure ESM package.
</div>

## Installation
```
npm install lowdb-crud
```
or

```
yarn add lowdb-crud
```
