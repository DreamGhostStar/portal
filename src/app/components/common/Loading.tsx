import React from 'react'
import Loading2 from './Loading2';
import Page_404 from 'app/pages/Page_404'
const Loading = (props: {
  error: any;
  retry: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  timedOut: any;
  pastDelay: any;
}) => {
  if (props.error) {
    return (
      <Page_404 retry={props.retry} word='加载错误' />
    );
  } else if (props.timedOut) {
    return <Page_404 retry={props.retry} word='长时间未响应' />
  } else if (props.pastDelay) {
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <Loading2 />
    </div>;
  } else {
    return null;
  }
};

export default Loading;