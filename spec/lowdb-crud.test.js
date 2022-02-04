import * as path from 'path'
import * as assert from 'assert'
import lodash from 'lodash'

import { LowdbCrud } from '../src/index.js'
import { LowdbCrudTestData } from './lowdb-crud-t-data.js'

const person_list = LowdbCrudTestData.get_person_item_list()
// console.log(person_list)

const class_param_obj = LowdbCrudTestData.get_class_param()
const main_obj = new LowdbCrud(class_param_obj)
const test_table = 'first_person_list'

describe('LowdbCrud', () => {
  test_class()
  test_main_object(main_obj)

  test_create(main_obj, person_list)
  test_read(main_obj, person_list)
  test_update(main_obj, person_list)
  test_upsert(main_obj, person_list)
  test_delete(main_obj, person_list)
  test_list_table(main_obj, person_list)
})

function test_class() {
  it('LowdbCrud defined', () => {
    expect(LowdbCrud).toBeDefined();
  })
}

function test_main_object(main_obj) {
  it('LowdbCrud object created', () => {
    expect(typeof main_obj == LowdbCrud)
    expect(typeof main_obj.attr == typeof {})
  })
}

function test_create(main_obj, person_list) {
  const param_obj = {
    "table_name": test_table,
    "row_obj_list": person_list
  }
  const uuid_list = main_obj.create(param_obj)

  it('LowdbCrud create_multi() call', () => {
    expect(typeof uuid_list === typeof ['a'])
    expect(3 == uuid_list.length)
  })
}

function test_read(main_obj, person_list) {
  const param_obj = { "table_name": test_table }
  param_obj['value_filter_obj'] = lodash.pick(person_list[2], ['age', 'name'])
  param_obj['col_select_list'] = ['name', 'age']

  const result_list = main_obj.read(param_obj)
  console.log(result_list)

  it('LowdbCrud read() call', () => {
    expect(typeof result_list === typeof [{ 'a': 'b' }])
    expect(1 == result_list.lenght)
  })
}

function test_update(main_obj, person_list) {
  const param_obj = { "table_name": test_table }
  param_obj['value_filter_obj'] = lodash.pick(person_list[3], ['id', 'age'])
  param_obj['update_obj'] = { 'name': 'Joslyn' }

  const uuid_list = main_obj.update(param_obj)
  console.log(uuid_list)

  it('LowdbCrud update() call', () => {
    expect(typeof uuid_list === typeof ['a'])
    expect(uuid_list.lenght > 0)
  })

}

function test_upsert(main_obj, person_list) {
  const param_obj = { "table_name": test_table }
  param_obj['value_filter_obj'] = lodash.pick(person_list[4], ['id', 'age'])
  param_obj['update_obj'] = { 'name': 'Jane' }

  const result_obj = main_obj.upsert(param_obj)
  console.log(result_obj)

  it('LowdbCrud upsert() call', () => {
    expect(typeof result_obj === typeof { 'a': 'b' })
    expect(Object.keys(result_obj).lenght > 0)
  })

}

function test_delete(main_obj, person_list) {
  const param_obj = { "table_name": test_table }
  param_obj['value_filter_obj'] = lodash.pick(person_list[5], ['id', 'age'])

  const uuid_list = main_obj.delete(param_obj)
  console.log(uuid_list)

  it('LowdbCrud delete() call', () => {
    expect(typeof uuid_list === typeof [])
  })
}

function test_list_table(main_obj) {
  const param_obj = {}
  const table_list = main_obj.list_table(param_obj)
  console.log(table_list)

  it('LowdbCrud test_list_table() call', () => {
    expect(typeof table_list == typeof [])
    expect(table_list.length > 0)
  })
}

function test_delete_table(main_obj) {
  const param_obj = { "table_name": test_table }
  const table_name = main_obj.delete_table(param_obj)
  console.log(table_name)

  it('LowdbCrud delete_table() call', () => {
    expect(typeof table_name == typeof 'str')
  })
}

function test_pass() {
  it("LowdbCrud pass", () => {
    expect(true)
  })
}

/*
npx jasmine ./spec/lowdb-crud.test.js
*/
