<template>
    <div id="context" ref="container"></div>
</template>
<script>
import *as THREE from 'three'
export default {
    data() {
        return {
            scene:'',
            camera:'',
            mesh:'',
            renderer:'',
        }
    },
    methods: {
        init(){
            this.scene = new THREE.Scene()
            let geometry = new THREE.TorusGeometry(10,3,16,100)
            let meterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
            this.mesh = new THREE.Mesh(geometry, meterial)
            this.scene.add( this.mesh)
            var point = new THREE.PointLight(0xffffff)
            point.position.set(400, 200, 300); //点光源位置
            this.scene.add(point)
            var ambient = new THREE.AmbientLight(0x444444);
            this.scene.add(ambient);
            let container = this.$refs.container
            let k = container.clientWidth / container.clientHeight
            this.camera = new THREE.OrthographicCamera(-200*k,200*k,200,-200,1,1000)
            this.camera.position.set(200,300,200)
            this.camera.lookAt(this.scene.position)
            this.renderer = new THREE.WebGLRenderer()
            this.renderer.setSize(container.clientWidth,container.clientHeight)
            this.renderer.setClearColor(0xb9d3ff, 1)
            container.appendChild( this.renderer.domElement)
            this.renderer.render(this.scene, this.camera);
        },
        animate () {
        requestAnimationFrame(this.animate)
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.02
        this.renderer.render(this.scene, this.camera)
      }
    },
    mounted() {
        this.init()
        this.animate()
    },
}
</script>
<style lang="scss" scoped>
#context{
    height: 100vh;
}
</style>