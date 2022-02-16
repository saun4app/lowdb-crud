# lowdb-crud

## Installation

    npm install lowdb-crud

or

    yarn add lowdb-crud

## import or require

    import { LowdbCrud } from 'lowdb-crud'

or

    const { LowdbCrud } = require('lowdb-crud')

## Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [LowdbCrud](#lowdbcrud)
    *   [Parameters](#parameters)
    *   [Examples](#examples)
    *   [create](#create)
        *   [Parameters](#parameters-1)
        *   [Examples](#examples-1)
    *   [read](#read)
        *   [Parameters](#parameters-2)
        *   [Examples](#examples-2)
    *   [update](#update)
        *   [Parameters](#parameters-3)
        *   [Examples](#examples-3)
    *   [upsert](#upsert)
        *   [Parameters](#parameters-4)
        *   [Examples](#examples-4)
    *   [delete](#delete)
        *   [Parameters](#parameters-5)
        *   [Examples](#examples-5)
    *   [list_table](#list_table)
        *   [Parameters](#parameters-6)
        *   [Examples](#examples-6)
    *   [delete_table](#delete_table)
        *   [Parameters](#parameters-7)
        *   [Examples](#examples-7)

### LowdbCrud

LowdbCrud provides create, read, update, delete (CRUD)
operations on a json data structure that resembles a database table.
LowdbCrud has 7 methods: <code style='color:blue'>create()</code>, <code style='color:blue'>read()</code>, <code style='color:blue'>update()</code>, <code style='color:blue'>upsert()</code>, <code style='color:blue'>delete()</code>, <code style='color:blue'>list_table()</code>, and <code style='color:blue'>delete_table()</code>.
LowdbCrud is a wrapper of <a href='https://github.com/typicode/lowdb' target='_blank'>lowdb</a> that stores all data in one json file that can represent multiple tables.
LowdbCrud uses a <span style='color:blue'>data object</span>
that stores all data (tables). Each <span style='color:blue'>key</span> of the object represents a table name.
The data of each table is stored in an <span style='color:blue'>array of objects</span>.
The <span style='color:blue'>table data structure</span> example below shows the data structure of 2 tables (<span style='color:blue'>person</span> and <span style='color:blue'>phone</span>).
Additionally, the <span style='color:blue'>database object</span>, <span style='color:blue'>data object</span>, and the <span style='color:blue'>table object</span> (see syntax example bellow) can be manipulated directly by using <a href='https://github.com/typicode/lowdb' target='_blank'>lowdb</a> and <a href='https://github.com/lodash/lodash' target='_blank'>lodash</a>.

#### Parameters

*   `param_obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {'db_file': 'full_path'}

#### Examples

```javascript
Sample data:
    const person_list = [{"name":"Alexa", "age": 35},
                         {"name":"Drew", "age": 21}]

    const phone_list =  [{"home":"234-567-8901", "cell":"234-567-8900"},
                         {"home":"234-789-8901", "cell":"234-789-8900"}]
```

```javascript
Instantiate a LowdbCrud object:
      import { LowdbCrud } from 'lowdb-crud'
      const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
```

```javascript
Adding data:

  let param_obj = {'table_name': 'person', 'row_obj_list': person_list}
  const person_uuid_list = my_obj.create(param_obj)

  param_obj = {'table_name': 'phone', 'row_obj_list': phone_list}
  const phone_uuid_list = my_obj.create(param_obj)
```

```javascript
my_obj.attr.db_obj.data has the following data:
    {
      "person":[{"uuid": "sUQT2zDUEGPEWMKxkbuKff", "name":"Alexa", "age": 35},
                {"uuid": "cTAA6KsiP4kjRvwDKZbMTL", "name":"Drew", "age": 21}],
      "phone":[{"uuid": "o3wFgSyu8XALCMDQCSu1x8", "home":"234-567-8901", "cell":"234-567-8900"},
               {"uuid": "hrFiDi8wdSqCfEHrcbmTJf","home":"234-789-8901", "cell":"234-789-8900"}]
     }
```

```javascript
my_obj.attr.db_obj.data['person'] has the following data:
     [{"uuid": "sUQT2zDUEGPEWMKxkbuKff", "name":"Alexa", "age": 35},
{"uuid": "cTAA6KsiP4kjRvwDKZbMTL", "name":"Drew", "age": 21}]

   my_obj.attr.db_obj.data['phone'] has the following data:
     [{"uuid": "o3wFgSyu8XALCMDQCSu1x8", "home":"234-567-8901", "cell":"234-567-8900"},
      {"uuid": "hrFiDi8wdSqCfEHrcbmTJf", "home":"234-789-8901", "cell":"234-789-8900"}]
```

```javascript
The database object and data object can be manipulated using lowdb and lodash:
      my_obj.attr.db_obj
      my_obj.attr.db_obj.data
```

#### create

The <code style='color:blue'>create()</code> method inserts one or more rows of object into a table.
This method returns an <code style='color:blue'>array</code> of <code style='color:blue'>uuid</code> automatically created for each inserted row.

##### Parameters

*   `param_obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {'table_name': 'string',
    'row_obj_list': array}

##### Examples

```javascript
const person_obj_list = [{"name":"Alexa", "age": 35},
                       {"name":"Drew", "age": 21}]

  const param_obj = {'table_name': 'person',
                     'row_obj_list': person_obj_list}

  const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
  const uuid_list = my_obj.create(param_obj)
  // Note: uuid_list looks like ["vXJUGH55tNo2iP91eUYLpk", "siysrj3q2PWn8EFX7rP5SL"}]
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** An uuid array of created rows.

#### read

The <code style='color:blue'>read()</code> method retrieves one or more rows of object from a table.
This method returns an <code style='color:blue'>array</code> of <code style='color:blue'>row objects</code> based on <code style='color:blue'>value_filter_obj</code> and <code style='color:blue'>col_select_list</code> parameters.
if <code style='color:blue'>value_filter_obj</code> is not given, all rows of the table are retrieved.
if <code style='color:blue'>col_select_list</code> is not given, all columns of each row is retrieved.

##### Parameters

*   `param_obj` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {'table_name': 'string',
    'value_filter_obj': object}
    'col_select_list': array}

##### Examples

```javascript
const param_obj = {'table_name': 'person',
                     'value_filter_obj': { 'age': 21 },
                     'col_select_list': ['name']}

  const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
  const row_obj_list = my_obj.read(param_obj)
  // Note: row_obj_list is [{"name":"Drew"}]
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** An row object array that looks like
\[{"name":"Drew", "age": 21}].

#### update

The <code style='color:blue'>update()</code> method changes the value(s) of selected row(s), base on <code style='color:blue'>value_filter_obj</code>, to the values of the <code style='color:blue'>update_obj</code> parameter.
This method returns an <code style='color:blue'>array</code> of <code style='color:blue'>uuid</code> of the updated row(s).

##### Parameters

*   `param_obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {'table_name': 'string',
    'row_obj_list': array}

##### Examples

```javascript
const param_obj = {'table_name': 'person',
                     'value_filter_obj': { 'name': 'Drew' },
                     'update_obj': { 'name': 'Andrew' }}

  const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
  const uuid_list = my_obj.update(param_obj)
  // Note: uuid_list looks like ["vXJUGH55tNo2iP91eUYLpk"}]
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** An uuid array of updated rows.

#### upsert

The <code style='color:blue'>upsert()</code> method calls <code style='color:blue'>update()</code> method.
If the target row is not found, it calls <code style='color:blue'>create()</code> method inserting the values of <code style='color:blue'>update_obj</code> parameter as a new row.
This method returns an <code style='color:blue'>array</code> of <code style='color:blue'>uuid</code> of the <span style='color:blue'>updated</span> or <span style='color:blue'>inserted</span> row(s).

##### Parameters

*   `param_obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {'table_name': 'string',
    'row_obj_list': array}

##### Examples

```javascript
const param_obj = {'table_name': 'person',
                     'value_filter_obj': { 'name': 'Drew' },
                     'update_obj': { 'name': 'Andrew' }}

  const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
  const uuid_list = my_obj.upsert(param_obj)
  // Note: uuid_list looks like ["vXJUGH55tNo2iP91eUYLpk"}]
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** An uuid array of updated or inserted rows.

#### delete

The <code style='color:blue'>delete()</code> method removes selected row(s) from a table base on <code style='color:blue'>value_filter_obj</code> parameter.
This method returns an <code style='color:blue'>array</code> of <code style='color:blue'>uuid</code> of the deleted row(s).
If the <code style='color:blue'>value_filter_obj</code> parameter is <span style='color:red'>not given</span> or <span style='color:red'>empty</span>, <span style='color:red'>all rows</span> of the table will be <span style='color:red'>deleted</span>.

##### Parameters

*   `param_obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {'table_name': 'string',
    'value_filter_obj': array}

##### Examples

```javascript
const param_obj = {'table_name': 'person',
                   'value_filter_obj': { 'name': 'Drew' }}

  const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
  const uuid_list = my_obj.delete(param_obj)
  // Note: uuid_list looks like ["vXJUGH55tNo2iP91eUYLpk"}]
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** An uuid array of deleted rows.

#### list_table

The <code style='color:blue'>list_table()</code> returns an array of exiting table names.

##### Parameters

*   `param_obj`  

##### Examples

```javascript
const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
  const uuid_list = my_obj.list_table()
  // Note: table names looks like ["person", "address"]
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** An array table names.

#### delete_table

The <code style='color:blue'>delete_table()</code> method removes selected table from the data object base on <code style='color:blue'>table_name</code> parameter.
This method returns the deleted <code style='color:blue'>table_name</code> or null if the table name does not exist.

##### Parameters

*   `param_obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {'table_name': 'string'}

##### Examples

```javascript
const param_obj = {'table_name': 'person'}
  const my_obj = new LowdbCrud({'db_file':'/home/my-app/data.json'})
  const table_name = my_obj.delete(param_obj)
  // Note: table_name is 'person'
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The deleted table name.
