# 一、react-three/postprocessing后期处理的库是什么
简而言之：包装效果
该库提供了一个 EffectPass，可自动组织和合并任何给定的效果组合。这最大限度地减少了渲染操作的数量，并且可以组合许多效果，而不会受到传统传递链接的性能损失。此外，每个效果都可以选择自己的混合功能。
后处理还支持开箱即用的 srgb 编码，以及 WebGL2 MSAA（多样本抗锯齿），这是 react-postprocessing 的默认设置，您可以获得高性能的清晰结果，而不会出现锯齿状边缘。
# 二、提供的组件
## `<EffectComposer>//...//</EffectComposer>`
效果处理器，包裹添加的效果组件，比如光照效果Light  景深组件等等
### 参数：
```js
<EffectComposer
  enabled?: boolean
  children: JSX.Element | JSX.Element[]
  depthBuffer?: boolean  /** 深度缓冲区 。深度缓冲区记录着屏幕对应的每个像素的深度值。
通过深度缓冲区，可以进行深度测试，从而确定像素的遮挡关系，保证渲染正确。这是深度缓冲最主要的作用。*/
  disableNormalPass?: boolean  /**是否禁用NormalPass，NormalPass可以在已经渲染出来的影像中中创建模拟反射环境光的效果 */
  stencilBuffer?: boolean //模板缓冲区
  autoClear?: boolean //自动clear
  multisampling?: number
  frameBufferType?: TextureDataType
  /** For effects that support DepthDownsamplingPass */
  resolutionScale?: number //分辨率尺cun
  renderPriority?: number  //渲染优先级
  camera?: THREE.Camera
  scene?: THREE.Scene
>
```


## `<DepthOfField />`景深效果组件
作用："景深"是指当焦距对准某一点时，其前后都仍可清晰的范围。拍照时景深越大，景深范围内所有画面的轮廓依然清晰，从近到远全部清晰，相反景深值小了清晰的单位就小，前景背景是模糊的
**贴两个对比图**

<img src="public\景深.jpg" style="zoom:50%;" />

### 参数
>官网示例：`<DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />`
- focusDistance:对焦距离
- focalLength: 焦距  ，关于对焦距离和焦距的区别看[这篇文章](https://blog.csdn.net/geekster/article/details/8724942)就好
-  bokehScale: 虚化比例
- height :高度
- width:宽度
- blur：number：模糊度
- depthTexture:{texture: Texture; packing: number;};：纹理

## `<Bloom />` 光晕效果组件
### 参数
>官网示例
> `<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />`
- luminanceThreshold： 亮度阈值 默认0.9 在[0,1]之间取值
- luminanceSmoothing：亮度平滑   默认00.025  在[0,1]之间取值
- height：高度
- width: 宽度
- intensity: 强度 默认是 1
- kernelSize: 内核大小 一般用不上
- opacity: 不透明度，指定了一个元素后面的背景的被覆盖程度。
## `<Noise />` 噪点效果组件
 >官网示例 `<Noise opacity={0.02} />`
作用：类似于“颗粒”效果，俗话说给一个图片降噪，就是设置这个组件并添加参数值
参数
- premultiply：boolean 默认false 噪点的预乘功能 噪声是否应与输入颜色相乘。  比如有了亮度 设置它为true，图片会更亮
- opacity: 不透明度，指定了一个元素后面的背景的被覆盖程度。
## `<Vignette />` 晕影，虚化效果组件
>官网示例
`Vignette eskil={false} offset={0.1} darkness={1.1} />`
### 参数
- eskil	Boolean	默认false  如果offset值大于1，那么这里必须设置为true，不然图片可能会有个黑洞
- blendFunction	BlendFunction	默认BlendFunction.NORMAL.
- offset	Number	默认0.5  偏移量
- darkness	Number	默认0.5	 好比一个图片，设置了虚化，这个值越大，图片的四个角的黑色越大
# `<ToneMapping/>` 一种色调映射效果组件
### 示例及参数：
```js
<ToneMapping
    //blendFunction={BlendFunction.NORMAL} // blend mode
    adaptive={true} // 切换自适应亮度图用法 默认为true
    resolution={256} // texture 亮度的分辨率。默认256。
    middleGrey={0.6} // 中间灰色值 默认0.6
    maxLuminance={16.0} // 最大亮度  默认16
    averageLuminance={1.0} // 平均亮度 默认1
    adaptationRate={1.0} // 亮度适应率  默认1
  />
  ```

#  `<HueSaturation />`色彩饱和度

示例：
```javascript
<HueSaturation hue={0} saturation={0}
  />
```
### 参数
- hue：色调，色调偏移，弧度 默认是0
- saturation： 饱和度数 饱和度值，单位为弧度，默认是0

#  `<Grid/>`网格效果组件
### 示例及参数
```js
<Grid
   // blendFunction={BlendFunction.OVERLAY} // blend mode
    scale={1.0} // 网格图案比例 默认1
    lineWidth={0.0} // 网格图案的线宽 默认0
    size={{ width, height }} // 覆盖默认的通道(pass)的宽度和高度 无默认
  />
```

# `<GodRays>`辐射线
### 示例及默认参数及参数默认值
```javascript
 <GodRays
    sun={sunRef} //光源。必须不写深度，并且必须被标记为透明。
    blendFunction={BlendFunction.Screen} // 这种效果的混合功能。
    samples={60} // 每个像素的样本数。
    density={0.96} //  光线的密度。
    decay={0.9} // 衰变 照明衰减系数
    weight={0.4} // 光线权重
    exposure={0.6} // 曝光  一个曝光系数。
    clampMax={1} // 整体效果的饱和度的上限。
    width={Resizer.AUTO_SIZE} // Render width.
    height={Resizer.AUTO_SIZE} // Render height.
    kernelSize={KernelSize.SMALL} // 模糊的内核大小。如果模糊功能被禁用，则没有影响。
    blur={true} // 雾化效果的光照是否应该被模糊化以减少伪影。
  />
```