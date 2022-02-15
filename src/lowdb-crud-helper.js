import FastestValidator from 'fastest-validator'
import ShortUuid from 'short-uuid'

import lodash from 'lodash'
import { LowSync, JSONFileSync } from './lowdb-wrapper.js'

class ParamUtil {
  // ParamUtil.is_valid(schema_key, data_obj)
  static is_valid(schema_key, data_obj) {
    const schema_obj = ParamUtil[schema_key]
    const validator_obj = new FastestValidator();
    const check_obj = validator_obj.compile(schema_obj)
    return check_obj(data_obj)
  }

  static class_param = {
    db_file: { type: 'string' }
  }

  static create_one = {
    table_name: { type: 'string' },
    row_obj: { type: 'object' }
  }

  static create_multi = {
    table_name: { type: 'string' },
    row_obj_list: { type: 'array', items: 'object' }
  }

  static read_one = {
    table_name: { type: 'string' },
    value_filter_obj: { type: 'object' },
    col_select_list: { type: 'array', optional: true }
  }

  static read_multi = {
    table_name: { type: 'string' },
    value_filter_obj: { type: 'object', optional: true },
    col_select_list: { type: 'array', optional: true }
  }

  static update_one = {
    table_name: { type: 'string' },
    value_filter_obj: { type: 'object' },
    update_obj: { type: 'object' }
  }

  static delete_table = {
    table_name: { type: 'string' }
  }
}

class LowdbCrudHelper {
  static init_attr(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('class_param', param_obj)
    if (true == is_valid) {
      self.attr = Object.assign({}, param_obj)
    } else {
      const err_obj = { 'error': 'Invalid class_param', 'param_obj': param_obj }
      console.error(err_obj)
    }
  }

  static init_db(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('class_param', param_obj)
    if (true == is_valid) {
      _init_db(param_obj)
    } else {
      const err_obj = { 'error': 'Invalid class_param', 'param_obj': param_obj }
      console.error(err_obj)
    }

    ////
    function _init_db(param_obj) {
      try {
        self.attr.db_obj = new LowSync(new JSONFileSync(self.attr.db_file))
        self.attr.db_obj.read()
      } catch (err) {
        const err_obj = { 'error': err, 'param_obj': param_obj }
        console.error(err_obj)
      }
    }
  }

  // LowdbCrudHelper._get_db_obj()
  static _get_db_obj(self) {
    return self.attr.db_obj
  }

  // LowdbCrudHelper._get_db_data(self)
  static _get_db_data(self) {
    return self.attr.db_obj.data
  }

  // LowdbCrudHelper._has_table_name(self, _table_name)
  static _has_table_name(self, _table_name) {
    let has_key = true
    has_key = (null !== self.attr.db_obj.data) && has_key
    has_key = Object.keys(self.attr.db_obj.data).includes(_table_name) && has_key

    return has_key
  }

  // LowdbCrudHelper._refresh_row_obj_list(self, _table_name)
  static _refresh_row_obj_list(self, _table_name) {
    if (null === self.attr.db_obj.data) {
      self.attr.db_obj.data = {}
      self.attr.db_obj.data[_table_name] = []
      self.attr.db_obj.write()
    } else if (!LowdbCrudHelper._has_table_name(self, _table_name)) {
      self.attr.db_obj.data[_table_name] = []
      self.attr.db_obj.write()
    }
  }

  // LowdbCrudHelper._get_uuid()
  static _get_uuid() {
    const translator = ShortUuid() // Defaults to flickrBase58
    return translator.new()
  }

  // LowdbCrudHelper.create_one(this, param_obj)
  static create_one(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('create_one', param_obj)
    let result_uuid = null

    if (true == is_valid) {
      const uuid = LowdbCrudHelper._get_uuid()
      const _table_name = param_obj['table_name']
      LowdbCrudHelper._refresh_row_obj_list(self, _table_name)
      const item = Object.assign({}, { 'uuid': uuid }, param_obj['row_obj'])
      self.attr.db_obj.data[_table_name].push(item)
      self.attr.db_obj.write()
      result_uuid = uuid
    } else {
      const error_obj = { 'error': is_valid, 'param_obj': param_obj }
      console.error(error_obj)
    }

    return result_uuid
  }

  // LowdbCrudHelper.create_multi(this, param_obj)
  static create_multi(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('create_multi', param_obj)
    let row_uuid_list = []

    if (true == is_valid) {
      for (let item of param_obj['row_obj_list']) {
        param_obj['row_obj'] = item
        const row_uuid = LowdbCrudHelper.create_one(self, param_obj)
        if (typeof row_uuid === typeof 'string') {
          row_uuid_list.push(row_uuid)
        }
      }
    } else {
      const err_obj = { 'error': is_valid, 'param_obj': param_obj }
      console.error(err_obj)
    }

    return row_uuid_list
  }

  // LowdbCrudHelper.read_one(this, param_obj)
  static read_one(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('read_one', param_obj)

    let result_obj = null
    if (true === is_valid) {
      result_obj = _read_one(param_obj)
    }

    return result_obj

    ////
    function _read_one(param_obj) {
      let result_obj = null
      const _table_name = param_obj['table_name']
      const filter_obj = param_obj['value_filter_obj']
      const col_list = lodash.has(param_obj, 'col_select_list') ? param_obj['col_select_list'] : []

      if (LowdbCrudHelper._has_table_name(self, _table_name)) {
        const item = lodash.find(self.attr.db_obj.data[_table_name], filter_obj);
        result_obj = item
        if (col_list.length > 0) {
          result_obj = lodash.pick(item, col_list);
        }
      }
      return result_obj
    }
  }

  // LowdbCrudHelper.read_multi(this, param_obj)
  static read_multi(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('read_multi', param_obj)
    let row_obj_list = []

    if (true === is_valid) {
      row_obj_list = _get_row_obj_list(param_obj)
    }

    return row_obj_list

    ////
    function _get_row_obj_list(param_obj) {
      let result_list = []

      const _table_name = param_obj['table_name']
      if (LowdbCrudHelper._has_table_name(self, _table_name)) {
        const filter_obj = lodash.has(param_obj, 'value_filter_obj') ? param_obj['value_filter_obj'] : {}
        const selected_col_list = lodash.has(param_obj, 'col_select_list') ? param_obj['col_select_list'] : []

        const row_obj_list = lodash.filter(self.attr.db_obj.data[_table_name], filter_obj);
        if (selected_col_list.length > 0) {
          result_list = _get_selected_col_obj_list(row_obj_list, selected_col_list)
        } else {
          result_list = row_obj_list
        }
      }

      return result_list
    }

    function _get_selected_col_obj_list(row_obj_list, col_list) {
      return row_obj_list.map((row_obj) => {
        return lodash.pick(row_obj, col_list);
      })
    }
  }

  // LowdbCrudHelper.update_one(this, param_obj)
  static update_one(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('update_one', param_obj)
    let result_uuid = null

    if (true === is_valid) {
      result_uuid = _update_one(param_obj)
    }

    return result_uuid

    ////
    function _update_one(param_obj) {
      const _table_name = param_obj['table_name']
      const filter_obj = param_obj['value_filter_obj']
      const update_obj = param_obj['update_obj']

      let result_uuid = null
      if (LowdbCrudHelper._has_table_name(self, _table_name)) {
        const item = lodash.find(self.attr.db_obj.data[_table_name], filter_obj)
        if (typeof item === typeof { 'a': 'b' }) {
          for (const [key, value] of Object.entries(update_obj)) {
            item[key] = value
          }
          self.attr.db_obj.write()
          result_uuid = item['uuid']
        }
      }

      return result_uuid
    }
  }

  // LowdbCrudHelper.update_multi(this, param_obj)
  static update_multi(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('update_one', param_obj)
    let uuid_list = []

    if (true === is_valid) {
      const update_method = _get_update_method(param_obj)
      const row_obj_list = LowdbCrudHelper.read_multi(self, param_obj)

      for (const item of row_obj_list) {
        param_obj['value_filter_obj'] = lodash.pick(item, ['uuid'])
        const row_uuid = LowdbCrudHelper[update_method](self, param_obj)
        if (null !== row_uuid) {
          uuid_list.push(row_uuid)
        }
      }
    }

    return uuid_list

    ////
    function _get_update_method(param_obj) {
      let method_str = 'update_one'

      if (typeof param_obj['update_method'] === typeof 'str') {
        method_str = param_obj['update_method']
      }
      return method_str
    }
  }

  // LowdbCrudHelper.upsert_one(this, param_obj)
  static upsert_one(self, param_obj = {}) {
    const is_valid = ParamUtil.is_valid('update_one', param_obj)
    let result_uuid = null
    if (true === is_valid) {
      const target_item = LowdbCrudHelper.read_one(self, param_obj)
      if (typeof target_item === typeof { 'a': 'b' }) {
        result_uuid = LowdbCrudHelper.update_one(self, param_obj)
      } else {
        param_obj['row_obj'] = param_obj['update_obj']
        result_uuid = LowdbCrudHelper.create_one(self, param_obj)
      }
    }
    return result_uuid
  }

  // LowdbCrudHelper.upsert_multi(this, param_obj)
  static upsert_multi(self, param_obj = {}) {
    param_obj['update_method'] = 'upsert_one'
    return LowdbCrudHelper.update_multi(self, param_obj)
  }

  // LowdbCrudHelper.delete_one(this, param_obj)
  static delete_one(self, param_obj = {}) {
    const row_obj = LowdbCrudHelper.read_one(self, param_obj)
    const target_uuid = row_obj['uuid']
    console.log(row_obj)
    let row_uuid = null

    if (typeof target_uuid === typeof 'str') {
      row_uuid = _remove_one(target_uuid, param_obj)
    }

    return row_uuid

    ////
    function _remove_one(target_uuid, param_obj) {
      const _table_name = param_obj['table_name']

      if (LowdbCrudHelper._has_table_name(self, _table_name)) {
        lodash.remove(self.attr.db_obj.data[_table_name], (row_obj) => {
          return row_obj['uuid'] == target_uuid
        })
        self.attr.db_obj.write()
      }

      return target_uuid
    }
  }

  // LowdbCrudHelper.delete_multi(this, param_obj)
  static delete_multi(self, param_obj = {}) {
    const row_obj_list = LowdbCrudHelper.read_multi(self, param_obj)
    let out_param = lodash.pick(param_obj, ['table_name']);

    let uuid_list = []
    for (let row_obj of row_obj_list) {
      out_param['value_filter_obj'] = lodash.pick(row_obj, ['uuid'])
      const row_uuid = LowdbCrudHelper.delete_one(self, out_param)
      uuid_list.push(row_uuid)
    }

    return uuid_list
  }

  // LowdbCrudHelper.delete_table(this, param_obj)
  static delete_table(self, param_obj = {}) {
    const _table_name = param_obj['table_name']
    const is_valid = ParamUtil.is_valid('delete_table', param_obj)
    const has_table = LowdbCrudHelper._has_table_name(self, _table_name)

    let deleted_table = null
    if(true === is_valid && true === has_table) {
      self.attr.db_obj.data = lodash.omit(self.attr.db_obj.data, [_table_name])
      self.attr.db_obj.write()
      deleted_table = _table_name
    }
    return deleted_table
  }
}

export { LowdbCrudHelper }

/*
import { LowdbCrudHelper } from './lowdb-crud-helper.js'
*/
