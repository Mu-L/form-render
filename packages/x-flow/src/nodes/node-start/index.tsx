import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';
import { getColorfulModeBackground } from '../../utils';

export default memo((props: any) => {
  const { onClick, type, data,id } = props;
  const { settingMap, widgets, iconFontUrl, globalConfig, openColorfulMode } =
    useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};
  const NodeWidget = widgets[nodeSetting?.nodeWidget] || undefined;
  const gradientHeight = nodeSetting?.gradientHeight;
  const nodeDescription = nodeSetting?.description || '';
  const hideDesc =
    nodeSetting?.nodePanel?.hideDesc ??
    globalConfig?.nodePanel?.hideDesc ??
    false;
  const hideTitleTips = globalConfig?.nodeView?.hideTitleTips ?? false;
  const SVGWidget = widgets[nodeSetting?.iconSvg]; // 自定义面板配置组件

  return (
    <NodeContainer
      className='custom-node-code'
      title={data?.title || nodeSetting?.title || '开始'}
      icon={{
        type: nodeSetting?.icon?.type || 'icon-start',
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#17B26A',
      }}
      onClick={onClick}
      hideDesc={hideDesc}
      desc={data?.desc}
      NodeWidget={NodeWidget ? <NodeWidget data={data} id={id} nodeType={type} /> : undefined}
      iconFontUrl={iconFontUrl}
      description={nodeDescription} // 不允许用户更改的节点描述
      iconSvg={SVGWidget ? <SVGWidget setting={nodeSetting} /> : false}
      hideTitleTips={hideTitleTips}
      nodeSettingTitle={nodeSetting?.title || '开始'}
      gradientHeight={gradientHeight}
      style={{...getColorfulModeBackground(nodeSetting?.icon?.bgColor, openColorfulMode)}}
    />
  );
});
