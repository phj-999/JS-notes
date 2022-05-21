# 材质和模型的对应关系

> - 点材质 ---  点模型Points
>
> - 线材质 ---  线条类型模型  ---  Line，LineLoop，LineSegments 
> - 网格材质  ---  网格模型  ---  Mesh
>  ​                 ---  骨骼网格模型  ---  SkinnedMesh
> - 精灵材质  ---  精灵模型 ---  Sprite
>
### 高光网格材质   <meshPhongMaterial />
除了和MeshLambertMaterial一样可以实现光源和网格表面的漫反射光照计算，还可以产生高光效果(镜面反射)。

### `<axesHelper />` 坐标轴
### OrbitControls轨道控制器
1. 可以像使用其他three objects一样来使用OrbitControls和react
2. 可以鼠标控制3维立体 缩放 放大 转动功能
```javascript
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls }); //现在可以像使用其他three objects一样来使用OrbitControls和react
const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};
export default Orbit;
// use ->  <Orbit /> 轨道控制 可以鼠标控制3维立体 缩放 放大 转动功能
```
### `<ambientLight> ` 环境光
intensity 光照的强度 color 颜色的rgb数值  `<ambientLight intensity={0.2}/>`

###  `<pointLight />` 光源设置-点光源
`<pointLight castShadow />` 
#### 阴影
Object3D中  .castShadow : Boolean  对象是否被渲染到阴影贴图中。默认值为false。
receiveshadow 是接收阴影  也就是阴影存在哪个面

### BufferGeometry
BoxBufferGeometry、PlaneBufferGeometry、sphereBufferGeometry等几何体类的基类是BufferGeometry
比如创建一个灯泡💡

```js
 <mesh>
        <sphereBufferGeometry />
        <meshPhongMaterial emissive={'yellow'}/>
 </mesh>
```

### <fog /> 雾属性
材质上面的雾属性决定例如它是否受到雾的影响
比如  设置雾属性，在前面加上标签
```js
 <Canvas shadowMap >
   <fog attach={'fog'} args={['white', 1, 10]}/>
  // ...
```
但是此时缩放 ，盒子会变雾  为了不让某个材质受影响 比如在3d盒子的材质上设置fog为false 这样缩放起来就不会变雾
` <meshBasicMaterial color={"blue"} fog={'false'}/>`
### 添加纹理（给盒子上加外部图片）
```javascript
//图片在public/threebox里面
  const texture = useLoader(THREE.TextureLoader, '/threebox/wood.jpg')
  //然后在需要添加纹理的3维物体材质上添加属性
    <mesh  ref={ref} {...props}  castShadow  >
      <boxBufferGeometry />
      <meshBasicMaterial map={texture}/>
    </mesh>
```
此时是一个方形3维盒子加了外部纹理，把`<boxBufferGeometry />`换成`<sphereBufferGeometry />`就是一个球型3维物体加了纹理
[图片](./public/mdgif/sphereBufferGeometry-TextureLoader.gif)

![图片](./public/mdgif/sphereBufferGeometry-TextureLoader.gif)

### 给整体添加背景
#### 一
```javascript
const Background = () => {
    const texture = useLoader(THREE.TextureLoader, '/threebox/sky.jpg')
  return ( <primitive attach='background' object={texture} />)
}
export default Background
// ...
//Cavans中
 <Canvas shadows={true} camera={{ position: [3,3,3] }} style={{ background: "red" }}>
       <fog attach={'fog'} args={['white', 1, 10]}/>
         ...
    <Suspense fallback={null}>
       <BoxTwo position={[0, 1, 0]} />
    </Suspense>
    <Suspense fallback={null}>
      <Background />
    </Suspense>
      <Floor position={[0,-0.5,0]}/>
</Canvas>
```
![给整体添加背景](./public/mdgif/background.gif)

#### 二 
创建渲染器的目标对象
把上面代码换成
```javascript
const Background = () => {
    const {gl} = useThree()
    const texture = useLoader(THREE.TextureLoader, '/threebox/sky.jpg')
    const formatted = new THREE.WebGLCubeRenderTarget(texture.image.height).fromEquirectangularTexture(gl,texture)
    return  <primitive attach='background' object={formatted}/>
}
export default Background
```
### 三维向量（Vector3）
构造函数
Vector3( x : Float, y : Float, z : Float )
x - 向量的x值，默认为0。y - 向量的y值，默认为0。 z - 向量的z值，默认为0。
.set ( x : Float, y : Float, z : Float ) 设置该向量的x、y 和 z 分量。
#### 随意移动相机，3D对象的地板承载都会弹回原来的位置
```javascript
import React from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import state from '../../state'

const CameraControls = (props) => {
    const vec = new THREE.Vector3()
    useFrame(({camera,scene})=>{
        //.lerp ( v : Vector3, alpha : Float ) : this
        //v - 朝着进行插值的Vector3。
        //alpha - 插值因数，其范围在[0, 1]闭区间。
        camera.position.lerp(vec.set(...state.cameraPos),0.1)
        scene.orbitControls.update()
    })

  return (
     null
  )
}

export default CameraControls
```

### 拖动
<Dragable transformGroup>。。。</Dragable> transformGroup字段不传，拖动的时候肢解对象，比如拖动单个轮胎，车门等，加上就是整个拖动

### `<directionalLight />`定向光
### 3Dobject外面 添加网格
`<mesh visible设置true或false></mesh>`
### 远看模糊 近看清晰 背景模糊等景深效果
`npm i @react-three/postprocessing`
文档地址 https://docs.pmnd.rs/react-postprocessing/effects/grid

////coderbeliver //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