import React from "react";
import CSSMotion from 'rc-motion'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'

export interface LoadingIconProps {
  prefixCls?: string;
  existIcon?: boolean;
  loading?: boolean | object
}

const getCollapsedWidth = () => ({ width: 0, opacity: 0, transform: 'scale(0)'});

const getRealWidth = (node: HTMLElement) => {
  const width = node.scrollWidth;  
  return { width, opacity: 1, transform: 'scale(1)'};
};

const LoadingIcon: React.FC<LoadingIconProps> = ({ prefixCls, loading, existIcon}) => {
  const visible = !!loading;

  if(existIcon) {
    return (<span className={`${prefixCls}-loading-icon`}>
      <LoadingOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    </span>)
  }

  return (
    <CSSMotion 
      visible={visible}
      motionName={`${prefixCls}-loading-icon-motion`}
      removeOnLeave
      onAppearStart={getCollapsedWidth}
      onAppearActive={getRealWidth}
      onLeaveStart={getRealWidth}
      onLeaveActive={getCollapsedWidth}
      onEnterActive={getRealWidth}
      onEnterStart={getCollapsedWidth}
    >
      {({className, style}: {className?: string, style?: React.CSSProperties}, ref: any) => (
        <span className={`${prefixCls}-loading-icon`} style={style} ref={ref}>
          <LoadingOutlined  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className={className}/>
        </span>
      )}
    </CSSMotion>
  )
}

export default LoadingIcon
