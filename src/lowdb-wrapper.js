var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/lowdb/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  JSONFile: () => JSONFile,
  JSONFileSync: () => JSONFileSync,
  LocalStorage: () => LocalStorage,
  Low: () => Low,
  LowSync: () => LowSync,
  Memory: () => Memory,
  MemorySync: () => MemorySync,
  TextFile: () => TextFile,
  TextFileSync: () => TextFileSync
});

// node_modules/lowdb/lib/adapters/TextFile.js
var import_fs2 = __toESM(require("fs"), 1);

// node_modules/steno/lib/index.js
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Writer_instances;
var _Writer_filename;
var _Writer_tempFilename;
var _Writer_locked;
var _Writer_prev;
var _Writer_next;
var _Writer_nextPromise;
var _Writer_nextData;
var _Writer_add;
var _Writer_write;
function getTempFilename(file) {
  return import_path.default.join(import_path.default.dirname(file), "." + import_path.default.basename(file) + ".tmp");
}
var Writer = class {
  constructor(filename) {
    _Writer_instances.add(this);
    _Writer_filename.set(this, void 0);
    _Writer_tempFilename.set(this, void 0);
    _Writer_locked.set(this, false);
    _Writer_prev.set(this, null);
    _Writer_next.set(this, null);
    _Writer_nextPromise.set(this, null);
    _Writer_nextData.set(this, null);
    __classPrivateFieldSet(this, _Writer_filename, filename, "f");
    __classPrivateFieldSet(this, _Writer_tempFilename, getTempFilename(filename), "f");
  }
  async write(data) {
    return __classPrivateFieldGet(this, _Writer_locked, "f") ? __classPrivateFieldGet(this, _Writer_instances, "m", _Writer_add).call(this, data) : __classPrivateFieldGet(this, _Writer_instances, "m", _Writer_write).call(this, data);
  }
};
_Writer_filename = /* @__PURE__ */ new WeakMap(), _Writer_tempFilename = /* @__PURE__ */ new WeakMap(), _Writer_locked = /* @__PURE__ */ new WeakMap(), _Writer_prev = /* @__PURE__ */ new WeakMap(), _Writer_next = /* @__PURE__ */ new WeakMap(), _Writer_nextPromise = /* @__PURE__ */ new WeakMap(), _Writer_nextData = /* @__PURE__ */ new WeakMap(), _Writer_instances = /* @__PURE__ */ new WeakSet(), _Writer_add = function _Writer_add2(data) {
  __classPrivateFieldSet(this, _Writer_nextData, data, "f");
  __classPrivateFieldSet(this, _Writer_nextPromise, __classPrivateFieldGet(this, _Writer_nextPromise, "f") || new Promise((resolve, reject) => {
    __classPrivateFieldSet(this, _Writer_next, [resolve, reject], "f");
  }), "f");
  return new Promise((resolve, reject) => {
    var _a;
    (_a = __classPrivateFieldGet(this, _Writer_nextPromise, "f")) === null || _a === void 0 ? void 0 : _a.then(resolve).catch(reject);
  });
}, _Writer_write = async function _Writer_write2(data) {
  var _a, _b;
  __classPrivateFieldSet(this, _Writer_locked, true, "f");
  try {
    await import_fs.default.promises.writeFile(__classPrivateFieldGet(this, _Writer_tempFilename, "f"), data, "utf-8");
    await import_fs.default.promises.rename(__classPrivateFieldGet(this, _Writer_tempFilename, "f"), __classPrivateFieldGet(this, _Writer_filename, "f"));
    (_a = __classPrivateFieldGet(this, _Writer_prev, "f")) === null || _a === void 0 ? void 0 : _a[0]();
  } catch (err) {
    (_b = __classPrivateFieldGet(this, _Writer_prev, "f")) === null || _b === void 0 ? void 0 : _b[1](err);
    throw err;
  } finally {
    __classPrivateFieldSet(this, _Writer_locked, false, "f");
    __classPrivateFieldSet(this, _Writer_prev, __classPrivateFieldGet(this, _Writer_next, "f"), "f");
    __classPrivateFieldSet(this, _Writer_next, __classPrivateFieldSet(this, _Writer_nextPromise, null, "f"), "f");
    if (__classPrivateFieldGet(this, _Writer_nextData, "f") !== null) {
      const nextData = __classPrivateFieldGet(this, _Writer_nextData, "f");
      __classPrivateFieldSet(this, _Writer_nextData, null, "f");
      await this.write(nextData);
    }
  }
};

// node_modules/lowdb/lib/adapters/TextFile.js
var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextFile_filename;
var _TextFile_writer;
var TextFile = class {
  constructor(filename) {
    _TextFile_filename.set(this, void 0);
    _TextFile_writer.set(this, void 0);
    __classPrivateFieldSet2(this, _TextFile_filename, filename, "f");
    __classPrivateFieldSet2(this, _TextFile_writer, new Writer(filename), "f");
  }
  async read() {
    let data;
    try {
      data = await import_fs2.default.promises.readFile(__classPrivateFieldGet2(this, _TextFile_filename, "f"), "utf-8");
    } catch (e) {
      if (e.code === "ENOENT") {
        return null;
      }
      throw e;
    }
    return data;
  }
  write(str) {
    return __classPrivateFieldGet2(this, _TextFile_writer, "f").write(str);
  }
};
_TextFile_filename = /* @__PURE__ */ new WeakMap(), _TextFile_writer = /* @__PURE__ */ new WeakMap();

// node_modules/lowdb/lib/adapters/JSONFile.js
var __classPrivateFieldSet3 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JSONFile_adapter;
var JSONFile = class {
  constructor(filename) {
    _JSONFile_adapter.set(this, void 0);
    __classPrivateFieldSet3(this, _JSONFile_adapter, new TextFile(filename), "f");
  }
  async read() {
    const data = await __classPrivateFieldGet3(this, _JSONFile_adapter, "f").read();
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data);
    }
  }
  write(obj) {
    return __classPrivateFieldGet3(this, _JSONFile_adapter, "f").write(JSON.stringify(obj, null, 2));
  }
};
_JSONFile_adapter = /* @__PURE__ */ new WeakMap();

// node_modules/lowdb/lib/adapters/TextFileSync.js
var import_fs3 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var __classPrivateFieldSet4 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextFileSync_tempFilename;
var _TextFileSync_filename;
var TextFileSync = class {
  constructor(filename) {
    _TextFileSync_tempFilename.set(this, void 0);
    _TextFileSync_filename.set(this, void 0);
    __classPrivateFieldSet4(this, _TextFileSync_filename, filename, "f");
    __classPrivateFieldSet4(this, _TextFileSync_tempFilename, import_path2.default.join(import_path2.default.dirname(filename), `.${import_path2.default.basename(filename)}.tmp`), "f");
  }
  read() {
    let data;
    try {
      data = import_fs3.default.readFileSync(__classPrivateFieldGet4(this, _TextFileSync_filename, "f"), "utf-8");
    } catch (e) {
      if (e.code === "ENOENT") {
        return null;
      }
      throw e;
    }
    return data;
  }
  write(str) {
    import_fs3.default.writeFileSync(__classPrivateFieldGet4(this, _TextFileSync_tempFilename, "f"), str);
    import_fs3.default.renameSync(__classPrivateFieldGet4(this, _TextFileSync_tempFilename, "f"), __classPrivateFieldGet4(this, _TextFileSync_filename, "f"));
  }
};
_TextFileSync_tempFilename = /* @__PURE__ */ new WeakMap(), _TextFileSync_filename = /* @__PURE__ */ new WeakMap();

// node_modules/lowdb/lib/adapters/JSONFileSync.js
var __classPrivateFieldSet5 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet5 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JSONFileSync_adapter;
var JSONFileSync = class {
  constructor(filename) {
    _JSONFileSync_adapter.set(this, void 0);
    __classPrivateFieldSet5(this, _JSONFileSync_adapter, new TextFileSync(filename), "f");
  }
  read() {
    const data = __classPrivateFieldGet5(this, _JSONFileSync_adapter, "f").read();
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data);
    }
  }
  write(obj) {
    __classPrivateFieldGet5(this, _JSONFileSync_adapter, "f").write(JSON.stringify(obj, null, 2));
  }
};
_JSONFileSync_adapter = /* @__PURE__ */ new WeakMap();

// node_modules/lowdb/lib/adapters/LocalStorage.js
var __classPrivateFieldSet6 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet6 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LocalStorage_key;
var LocalStorage = class {
  constructor(key) {
    _LocalStorage_key.set(this, void 0);
    __classPrivateFieldSet6(this, _LocalStorage_key, key, "f");
  }
  read() {
    const value = localStorage.getItem(__classPrivateFieldGet6(this, _LocalStorage_key, "f"));
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  }
  write(obj) {
    localStorage.setItem(__classPrivateFieldGet6(this, _LocalStorage_key, "f"), JSON.stringify(obj));
  }
};
_LocalStorage_key = /* @__PURE__ */ new WeakMap();

// node_modules/lowdb/lib/adapters/Memory.js
var __classPrivateFieldGet7 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet7 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _Memory_data;
var Memory = class {
  constructor() {
    _Memory_data.set(this, null);
  }
  read() {
    return Promise.resolve(__classPrivateFieldGet7(this, _Memory_data, "f"));
  }
  write(obj) {
    __classPrivateFieldSet7(this, _Memory_data, obj, "f");
    return Promise.resolve();
  }
};
_Memory_data = /* @__PURE__ */ new WeakMap();

// node_modules/lowdb/lib/adapters/MemorySync.js
var __classPrivateFieldGet8 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet8 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _MemorySync_data;
var MemorySync = class {
  constructor() {
    _MemorySync_data.set(this, null);
  }
  read() {
    return __classPrivateFieldGet8(this, _MemorySync_data, "f") || null;
  }
  write(obj) {
    __classPrivateFieldSet8(this, _MemorySync_data, obj, "f");
  }
};
_MemorySync_data = /* @__PURE__ */ new WeakMap();

// node_modules/lowdb/lib/MissingAdapterError.js
var MissingAdapterError = class extends Error {
  constructor() {
    super();
    this.message = "Missing Adapter";
  }
};

// node_modules/lowdb/lib/Low.js
var Low = class {
  constructor(adapter) {
    Object.defineProperty(this, "adapter", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    if (adapter) {
      this.adapter = adapter;
    } else {
      throw new MissingAdapterError();
    }
  }
  async read() {
    this.data = await this.adapter.read();
  }
  async write() {
    if (this.data) {
      await this.adapter.write(this.data);
    }
  }
};

// node_modules/lowdb/lib/LowSync.js
var LowSync = class {
  constructor(adapter) {
    Object.defineProperty(this, "adapter", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    if (adapter) {
      this.adapter = adapter;
    } else {
      throw new MissingAdapterError();
    }
  }
  read() {
    this.data = this.adapter.read();
  }
  write() {
    if (this.data !== null) {
      this.adapter.write(this.data);
    }
  }
};
module.exports = __toCommonJS(lib_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JSONFile,
  JSONFileSync,
  LocalStorage,
  Low,
  LowSync,
  Memory,
  MemorySync,
  TextFile,
  TextFileSync
});
