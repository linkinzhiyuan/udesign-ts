import React from 'react';
import cls from 'classnames';
import omit from 'rc-util/lib/omit';
import LoadingIcon from './LoadingIcon';
import './style/index.less';

const ButtonTypes = ['primary', 'default', 'ghost','dashed', 'text', 'link'] as const;
type ButtonType = typeof ButtonTypes[number];

const shapeMap = ['circle', 'round', 'default'] as const;
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

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

export const getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string = defaultGetPrefixCls

const InternalButton: React.ForwardRefRenderFunction<unknown,ButtonProps> = (props, ref) => {
  const { 
    loading = false,
    type = 'default', 
    disabled: customDisabled, 
    size: customizeSize, 
    className, 
    prefixCls: customPrefixCls, 
    icon, 
    block = false,
    ghost = false,
    danger,
    shape = 'default',
    children, 
    ...rest 
  } = props;
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


  const prefixCls = getPrefixCls('btn', customPrefixCls)
  const iconType = innerLoading ? 'loading' : icon;
  // className
  const classes = cls(
    prefixCls,
    mergeDisabled && 'ud-btn-disabled',
    {
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-danger`]: danger,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-${customizeSize}`]: customizeSize,
      [`${prefixCls}-${shape}`]: shape,
    },
    className,
  )

  const iconNode = icon && !innerLoading ? (
    icon
  ) : (
    <LoadingIcon
      existIcon={!!icon}
      prefixCls={prefixCls}
      loading={!!innerLoading}
    />
  )


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

Button.__ANT_BUTTON = true

export { Button }
