import React, { useMemo } from 'react';
import { Cascader } from 'antd';
import 'antd/dist/antd.css';
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';
import { copy } from 'copy-anything';

type ChinaDivisionType = {
  code?: string;
  name?: string;
  provinceCode?: string;
  cityCode?: string;
  label?: string;
  value?: string;
  children?: Array<ChinaDivisionType>;
};

type ProvinceType = {
  code?: string;
  name?: string;
  label?: string;
  value?: string;
  children?: Array<ProvinceType>;
};

type CityType = ProvinceType & {
  provinceCode?: string;
};

type AreaType = CityType & {
  cityCode?: string;
};

export interface ICascaderProps {
  /**
   * @description Cascader 级联选择
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述，使用 description 兜底
   * @default 参考 https://ant.design/components/cascader-cn/#API
   */
  cascaderProps?: any;
  /**
   * @description 是否显示区级
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述，使用 description 兜底
   * @default false
   */
  showArea?: boolean;
}

export default ({ cascaderProps, showArea = false }: ICascaderProps) => {
  const all_data = copy(provinces);
  const all_cities = copy(cities);
  const pc_data = copy(provinces);
  const pc_cities = copy(cities);

  const handleCitiesData = (provinces: ProvinceType[], cites: CityType[]) => {
    cites.forEach((city: ChinaDivisionType) => {
      const matchProvince: ChinaDivisionType = provinces.filter(
        (province: ProvinceType) => province.code === city.provinceCode,
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
  };

  const handleAreasData = (cities: CityType[], areas: AreaType[]) => {
    areas.forEach((area: ChinaDivisionType) => {
      const matchCity: ChinaDivisionType = cities.filter((city) => city.code === area.cityCode)[0];
      if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity.children.push({
          label: area.name,
          value: area.code,
        });
      }
    });
  };

  const getOptions = (provinces: ProvinceType[]) => {
    return provinces.map((province) => ({
      label: province.name,
      value: province.code,
      children: province.children,
    }));
  };

  const options = useMemo(() => {
    if (showArea) {
      handleAreasData(all_cities, areas);
      handleCitiesData(all_data, all_cities);
      return getOptions(all_data);
    } else {
      handleCitiesData(pc_data, pc_cities);
      return getOptions(pc_data);
    }
  }, [showArea]);

  return <Cascader options={options} showSearch placeholder="请选择地址" {...cascaderProps} />;
};
