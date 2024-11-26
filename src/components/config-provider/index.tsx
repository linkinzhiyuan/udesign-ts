import React from 'react';
import { 
  ConfigConsumer,
  ConfigConsumerProps,
  ConfigContext 
} from './context';
export interface ConfigProviderProps {
  prefixCls?: string;
  iconPrefixCls?: string;
  children?: React.ReactNode;
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigProviderProps
}

let globalPrefixCls: string;
let globalIconPrefixCls: string;
const setGlobalConfig = ({
  prefixCls,
  iconPrefixCls,
  theme,
}: Pick<ConfigProviderProps, 'prefixCls' | 'iconPrefixCls'> & { theme?: string }) => {
  if(prefixCls !== undefined) {
    globalPrefixCls = prefixCls
  }
  if(iconPrefixCls !== undefined) {
    globalIconPrefixCls = iconPrefixCls
  }
  if(theme) {
    console.log('theme', theme)
  }
}

const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
  return <>{props.children}</>
}

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext
  // SizeContext: React.Context<ConfigProviderProps>;
  config: typeof setGlobalConfig
} = (props) => {
  return (
    <ProviderChildren {...props} parentContext={props} />
  )
}

ConfigProvider.ConfigContext = ConfigContext
// ConfigProvider.SizeContext = React.createContext<ConfigProviderProps>({})
ConfigProvider.config = setGlobalConfig

export default ConfigProvider
