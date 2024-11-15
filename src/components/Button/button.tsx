import React from 'react';
import cls from 'classnames';
import omit from 'rc-util/lib/omit';
import './style/index.less';

const ButtonTypes = ['primary', 'default', 'ghost','dashed', 'text', 'link'] as const;
type ButtonType = typeof ButtonTypes[number];

const shapeMap = ['circle', 'round'] as const;
type ShapeType = typeof shapeMap[number];

const sizeMap = ['small', 'default', 'large'] as const;
type SizeType = typeof sizeMap[number];

const HTMLTypes = ['submit', 'reset', 'button'] as const;
type HTMLType = typeof HTMLTypes[number];

export interface BaseButtonProps {
  type?: ButtonType,
  icon?: React.ReactNode,
  shape?: ShapeType,
  size?: SizeType,
  disabled?: boolean,
  loading?: boolean | { delay?: number },
  prefixCls?: string,
  className?: string,
  ghost?: boolean,
  danger?: boolean,
  block?: boolean,
  children?: React.ReactNode,
}

// 链接
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>

// 原生按钮
export type NativeButtonProps = {
  htmlType?: HTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;


export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

type Loading = number | boolean

const InternalButton: React.ForwardRefRenderFunction<unknown,ButtonProps> = (props, ref) => {
  const { loading = false,type = 'default', disabled: customDisabled, size: customizeSize, className,prefixCls, children, ...rest } = props;
  const buttonRef = ref as any || React.createRef<HTMLElement>();

  // ========================= Disabled ==========================
  const disabled = customDisabled; // TODO: 全局Disabled
  const mergeDisabled = customDisabled ?? disabled;


  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);

  const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any}, ['navigate']);
  // 点击事件
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;

    if(innerLoading || mergeDisabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  }

  // ========================= update Loading ==========================
  const loadingOrDelay = typeof loading === 'boolean' ? loading : loading?.delay || true

  React.useEffect(() => {
    let delayTimer: number | null = null;

    if(typeof loadingOrDelay === 'number') {
      delayTimer = window.setTimeout(() => {
        delayTimer = null;
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay)
    }

    return () => {
      if(delayTimer) {
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    }
  }, [loadingOrDelay])


  // className
  const classes = cls(
    prefixCls,
    'uDesign-btn',
    `uDesign-btn-${type}`,
    `uDesign-btn-${customizeSize}`,
    mergeDisabled && 'uDesign-btn--disabled',
    className,
  )

  const iconNode = <></>

  // 存在链接地址即为 a标签
  if (linkButtonRestProps.href !== undefined) {
    return (
      <a {...linkButtonRestProps} className={classes} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {children}
      </a>
    )
  }

  // 正常的按钮
  return (
    <button {...(rest as NativeButtonProps) } className={classes} onClick={handleClick} type='button' disabled={disabled} ref={buttonRef}>
      {iconNode}
      {children}
    </button>
  )
};

type CompoundedComponent = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<unknown>> & {
  // Group: typeof ButtonGroup;
  __ANT_BUTTON: boolean;
}

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent
export { Button }
