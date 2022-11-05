import React from 'react';
import { Cascader } from 'antd';
import 'antd/dist/antd.css';
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';

type ChinaDivisionType = {
  code?: string;
  name?: string;
  provinceCode?: string;
  cityCode?: string;
  label?: string;
  value?: string;
  children?: Array<ChinaDivisionType>;
};
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

cities.forEach((city: ChinaDivisionType) => {
  const matchProvince: ChinaDivisionType = provinces.filter(
    (province: ChinaDivisionType) => province.code === city.provinceCode,
  )[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children,
    });
  }
});

const options = provinces.map((province: ChinaDivisionType) => ({
  label: province.name,
  value: province.code,
  children: province.children,
}));

export default ({ cascaderProps }: { cascaderProps?: any }) => (
  <Cascader options={options} showSearch placeholder="请选择地址" {...cascaderProps} />
);
