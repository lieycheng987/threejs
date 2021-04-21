<template>
  <div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script>
  import * as Three from 'three'

  export default {
    name: 'About',
    data () {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null
      }
    },
    methods: {
      init() {
        let container = this.$refs.container
        this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 10)
        this.camera.position.z = 1
        this.scene = new Three.Scene()
        let geometry = new Three.BoxGeometry(0.1, 0.1, 0.1)
        let material = new Three.MeshNormalMaterial()
        this.mesh = new Three.Mesh(geometry, material)
        this.scene.add(this.mesh)
        const planeGeometry = new Three.PlaneGeometry(60, 20)
      // 创建带颜色材质,更换为MeshLambertMaterial材质，去掉网格结构
        const planeMaterial = new Three.MeshLambertMaterial({ color: 0xcccccc })
        this.plane = new Three.Mesh(planeGeometry, planeMaterial)
      // 平面开启接收阴影效果
        this.plane.receiveShadow = true
      // 设置平面角度和位置
        this.plane.rotation.x = -0.5 * Math.PI
        this.plane.position.x = 15
        this.plane.position.y = 0
        this.plane.position.z = 0
      // 添加平面
        this.scene.add(this.plane)
        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(this.renderer.domElement)

      },
      animate () {
        requestAnimationFrame(this.animate)
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.02
        this.renderer.render(this.scene, this.camera)
      }
    },
    mounted () {
      this.init()
      this.animate()
    }
  }
</script>
<style scoped>
  #container {
    height: 100vh;
  }
</style>
