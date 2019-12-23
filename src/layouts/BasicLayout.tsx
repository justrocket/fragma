import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConnectState } from '@/models/connect';
import style from './BasicLayout.less';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return localItem;
  });

const footerRender: BasicLayoutProps['footerRender'] = (_, defaultDom) => {
  return (<p style={{
    fontSize: 10,
    letterSpacing: '3px',
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  }}> JUSTROCKET © {new Date().getFullYear()}</p >);
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'login/refreshToken',
      });
      dispatch({
        type: 'account/fetchAccountData',
      });
    }
  })

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    <>
      <ProLayout
        logo={false}
        layout="topmenu"
        className={style.normal}
        contentWidth="Fixed"
        title={formatMessage({ id: 'layout.title' })}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        {...props}
      >
        {children}
      </ProLayout>
    </>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(BasicLayout);
