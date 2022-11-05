## React + Ts 实现中国省市级联选择器

仅展示`省市`的级联:

```tsx
import React from 'react';
import { AddressCascader } from 'react-china-division';

export default () => <AddressCascader key="1" />;
```

展示`省市区`的级联:

```tsx
import React from 'react';
import { AddressCascader } from 'react-china-division';

export default () => <AddressCascader showArea key="2" />;
```

<API></API>
