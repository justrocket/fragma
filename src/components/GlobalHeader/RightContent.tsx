import React from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
// import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import AvatarDropdown from './AvatarDropdown';
export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <AvatarDropdown menu />
    </div>
  );
};

export default GlobalHeaderRight;