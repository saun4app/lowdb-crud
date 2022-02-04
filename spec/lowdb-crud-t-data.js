import * as path from 'node:path'
import {fileURLToPath} from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dummyjson from 'dummy-json';


class LowdbCrudTestData {
  static get_class_param() {
    const data_dir = path.resolve([__dirname, 'data-dir'].join(path.sep))
    const db_file = 'db_data.json'
    const param_obj = {
      'db_file': [data_dir, db_file].join(path.sep)}

    return param_obj
  }

  // LowdbCrudTestData.get_person_item_list()
  static get_person_item_list() {
    const person_list_tmpl = `
    [{{#repeat 20}}
      {
        "id": {{@index}},
        "name": "{{firstName}}",
        "age": {{int 18 65}}
      }
    {{/repeat}}]
    `
    const json_str =  dummyjson.parse(person_list_tmpl);
    const item_list =  JSON.parse(json_str);

    return item_list
  }
}

export { LowdbCrudTestData }
