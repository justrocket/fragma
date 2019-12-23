import { Avatar, Icon, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { ConnectProps, ConnectState, AuthState } from '@/models/connect';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends ConnectProps {
  login: AuthState;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }
  };

  render(): React.ReactNode {
    const { user: currentUser, menu } = this.props.login;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.sub ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} alt="avatar" >
            <Icon type="user" />
          </Avatar>
          <span className={styles.name}>{currentUser.sub}</span>
        </span>
      </HeaderDropdown>
    ) : (
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      );
  }
}
export default connect(({ login }: ConnectState) => ({
  login,
}))(AvatarDropdown);
