function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import React from 'react';
import { Cascader } from 'antd';
import 'antd/dist/antd.css';
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import { jsx as _jsx } from 'react/jsx-runtime';
// TODO: 如果需要区级，可以打开注释
// areas.forEach((area: ChidDivisionType) => {
//   const matchCity: ChidDivisionType = cities.filter(
//     (city) => city.code === area.cityCode
//   )[0];
//   if (matchCity) {
//     matchCity.children = matchCity.children || [];
//     matchCity.children.push({
//       label: area.name,
//       value: area.code,
//     });
//   }
// });
cities.forEach(function (city) {
  var matchProvince = provinces.filter(function (province) {
    return province.code === city.provinceCode;
  })[0];

  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children,
    });
  }
});
var options = provinces.map(function (province) {
  return {
    label: province.name,
    value: province.code,
    children: province.children,
  };
});
export default (function (_ref) {
  var cascaderProps = _ref.cascaderProps;
  return /*#__PURE__*/ _jsx(
    Cascader,
    _objectSpread(
      {
        options: options,
        showSearch: true,
        placeholder: '\u8BF7\u9009\u62E9\u5730\u5740',
        style: {
          width: 400,
        },
      },
      cascaderProps,
    ),
  );
});
