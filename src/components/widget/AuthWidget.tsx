import React from 'react';

type AuthWidgetProps = {
  children: (param: any) => React.ReactElement;
};

const AuthWidget = (props: AuthWidgetProps) => {
  const auth = {};
  return <div>{props.children(auth)}</div>;
};

export default AuthWidget;
