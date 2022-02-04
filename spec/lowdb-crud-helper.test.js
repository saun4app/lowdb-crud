import * as path from 'path'
import * as assert from 'assert'
import lodash from 'lodash'

import { LowdbCrud } from '../src/index.js'
import { LowdbCrudHelper } from '../src/lowdb-crud-helper.js'
import { LowdbCrudTestData } from './lowdb-crud-t-data.js'

const class_param_obj = LowdbCrudTestData.get_class_param()
const person_list = LowdbCrudTestData.get_person_item_list()

const main_obj = new LowdbCrud(class_param_obj)

describe('LowdbCrud', () => {
  test_class()
  test_main_object(main_obj)

  test_create_one(main_obj, person_list)
  test_create_multi(main_obj, person_list)
  test_read_one(main_obj, person_list)
  test_read_multi(main_obj, person_list)
  test_update_one(main_obj, person_list)
  test_update_multi(main_obj, person_list)
  test_upsert_one(main_obj, person_list)
  test_upsert_multi(main_obj, person_list)
  test_delete_one(main_obj, person_list)
  test_delete_multi(main_obj, person_list)
})

function test_class() {
  it('LowdbCrud defined', () => {
    expect(LowdbCrud).toBeDefined();
    expect(LowdbCrudHelper).toBeDefined();
  })
}

function test_main_object(main_obj) {
  it('LowdbCrud object created', () => {
    expect(typeof main_obj == LowdbCrud)
    expect(typeof main_obj.attr == typeof {})
  })
}

function test_create_one(main_obj, person_list) {
  const param_obj = {
    'table_name': 'first_person_list',
    'row_obj': person_list[1]
  }
  const result_uuid = LowdbCrudHelper.create_one(main_obj, param_obj)

  it('LowdbCrud create_one() call', () => {
    expect(null !== result_uuid)
    expect(typeof result_uuid === typeof 'string')
  })
}

function test_create_multi(main_obj, person_list) {
  const param_obj = {
    'table_name': 'first_person_list',
    'row_obj_list': person_list
  }
  const uuid_list = LowdbCrudHelper.create_multi(main_obj, param_obj)

  it('LowdbCrud create_multi() call', () => {
    expect(typeof uuid_list === typeof ['a', 'b'])
    expect(3 == uuid_list.length)
  })
}

function test_read_one(main_obj, person_list) {
  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[2], ['age', 'name']) // must be uniue value
  param_obj['col_select_list'] = ['name', 'age']

  const result_obj = LowdbCrudHelper.read_one(main_obj, param_obj)
  console.log(result_obj)

  it('LowdbCrud read_one() call', () => {
    expect(typeof result_obj === typeof { 'a': 'b' })
    expect(Object.keys(result_obj).lenght > 0)
  })
}

function test_read_multi(main_obj, person_list) {
  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[3], ['age', 'name'])
  param_obj['col_select_list'] = ['name', 'age']

  const result_list = LowdbCrudHelper.read_multi(main_obj, param_obj)
  console.log(result_list)

  it('LowdbCrud read_multi() call', () => {
    expect(typeof result_list === typeof [{ 'a': 'b' }])
    expect(1 == result_list.lenght)
  })
}

function test_update_one(main_obj, person_list) {
  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[4], ['age', 'name'])
  param_obj['update_obj'] = { 'name': 'Joslyn' }

  const result_obj = LowdbCrudHelper.update_one(main_obj, param_obj)
  console.log(result_obj)

  it('LowdbCrud update_one() call', () => {
    expect(typeof result_obj === typeof { 'a': 'b' })
    expect(Object.keys(result_obj).lenght > 0)
  })
}

function test_upsert_one(main_obj, person_list) {
  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[5], ['age', 'name'])
  param_obj['update_obj'] = { 'id': 4, 'name': 'Firstname', 'age': 47 }

  const result_obj = LowdbCrudHelper.upsert_one(main_obj, param_obj)
  console.log(result_obj)

  it('LowdbCrud upsert_one() call', () => {
    expect(typeof result_obj === typeof { 'a': 'b' })
    expect(Object.keys(result_obj).lenght > 0)
  })
}

function test_update_multi(main_obj, person_list) {
  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[6], ['age', 'name'])
  param_obj['update_obj'] = { 'name': 'Joslyn' }

  const result_obj = LowdbCrudHelper.update_multi(main_obj, param_obj)
  console.log(result_obj)

  it('LowdbCrud update_multi() call', () => {
    expect(typeof result_obj === typeof { 'a': 'b' })
    expect(Object.keys(result_obj).lenght > 0)
  })

}

function test_upsert_multi(main_obj, person_list) {
  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[7], ['age', 'name'])
  param_obj['update_obj'] = { 'name': 'Joslyn' }

  const result_obj = LowdbCrudHelper.upsert_multi(main_obj, param_obj)
  console.log(result_obj)

  it('LowdbCrud upsert_multi() call', () => {
    expect(typeof result_obj === typeof { 'a': 'b' })
    expect(Object.keys(result_obj).lenght > 0)
  })

}

function test_delete_one(main_obj, person_list) {
  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[8], ['age', 'name']) // must be uniue value

  const result_uuid = LowdbCrudHelper.delete_one(main_obj, param_obj)
  console.log(result_uuid)

  it('LowdbCrud delete_one() call', () => {
    expect(typeof result_uuid === typeof 'str')
  })
}

function test_delete_multi(main_obj, person_list) {

  const param_obj = { 'table_name': 'first_person_list' }
  param_obj['value_filter_obj'] = lodash.pick(person_list[9], ['age', 'name'])

  const uuid_list = LowdbCrudHelper.delete_multi(main_obj, param_obj)
  console.log(uuid_list)

  it('LowdbCrud delete_multi() call', () => {
    expect(typeof uuid_list === typeof [])
  })
}

function test_pass() {
  it('LowdbCrud pass', () => {
    expect(true)
  })
}

/*
npx jasmine ./spec/lowdb-crud-helper.test.js
*/
