<template>
    <div id="star" ref="star"></div>
</template>
<script>
import *as Three from "three"
import *as Postprocessing from 'postprocessing'
export default {
    name:"star",
    data() {
        return {
            scene:'',
            camera:'',
            cloudParticles:[],
            composer:'',
            ambient:'',
            renderer:'',
            star:'',
            loader:'',
            cloudgeo:'',
            cloudMaterial:'',
            bloomEffect:'',
            textureEffect:'',
            effectPass:'',
        }
    },
    mounted() {
        this.init()
        console.log(this.bloomEffect)
    },
    methods: {
        init(){
            this.star = this.$refs.star
            this.scene = new Three.Scene()
            this.camera = new Three.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000)
            this.camera.position.z=1
            this.camera.rotation.x=1.16
            this.camera.rotation.y=-0.12
            this.camera.rotation.z=0.27
            this.ambient = new Three.AmbientLight(0x555555)
            this.scene.add(this.ambient)
            this.directionalLight()
            this.renderinit()
            this.load()
            
        },
        directionalLight(){
            let directionalLight = new Three.DirectionalLight(0xff8c19)
            directionalLight.position.set(0,0,1)
            this.scene.add(directionalLight)
            let orangelight = new Three.PointLight(0xcc6600,50,450,1.7)
            orangelight.position.set(200,300,100)
            this.scene.add(orangelight)
            let redlight = new Three.PointLight(0xd8547e,50,450,1.7)
            redlight.position.set(100,300,100)
            this.scene.add(redlight)
            let blueLight = new Three.PointLight(0x3677ac,50,450,1.7);
            blueLight.position.set(300,300,200);
            this.scene.add(blueLight);
        },
        load(){
            this.loader = new Three.TextureLoader() 
            this.loader.load(require("../assets/img/smoke.png"),texture=>{
               
                this.cloudgeo = new Three.PlaneBufferGeometry(500,500)
                this.cloudMaterial = new Three.MeshLambertMaterial({
                    map:texture,
                    transparent:true
                })
                for(let p=0;p<50;p++)
                {
                    let cloud = new Three.Mesh(this.cloudgeo,this.cloudMaterial)
                    cloud.position.set(
                         Math.random()*800 -400,
                         500,
                         Math.random()*500-500
                    )
                    cloud.rotation.x = 1.16;
                    cloud.rotation.y = -0.12;
                    cloud.rotation.z = Math.random()*2*Math.PI;
                    cloud.material.opacity = 0.55;
                    this.cloudParticles.push(cloud)
                    this.scene.add(cloud)
                }
            })
            this.Postproc()
        },
        Postproc(){
            this.loader.load(require("../assets/img/stars.jpg"),texture=>{
                this.textureEffect = new Postprocessing.TextureEffect({
                    blendFunction: Postprocessing.BlendFunction.COLOR_DODGE,
                    texture: texture
                    });
                this.textureEffect.blendMode.opacity.value = 0.2;
                this.bloomEffect = new Postprocessing.BloomEffect({
                    blendFunction: Postprocessing.BlendFunction.COLOR_DODGE,
                    kernelSize: Postprocessing.KernelSize.SMALL,
                    useLuminanceFilter: true,
                    luminanceThreshold: 0.3,
                    luminanceSmoothing: 0.75
                });
                this.bloomEffect.blendMode.opacity.value = 1.5;
                
                this.effectPass = new Postprocessing.EffectPass(
                    this.camera,
                    this.bloomEffect,
                    this.textureEffect
                );
                this.effectPass.renderToScreen = true;

                this.composer = new Postprocessing.EffectComposer(this.renderer);
                this.composer.addPass(new Postprocessing.RenderPass(this.scene, this.camera));
                this.composer.addPass(this.effectPass)
                window.addEventListener("resize", this.onWindowResize, false);//调整屏幕
                this.render()
                })
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
        renderinit(){
            this.renderer = new Three.WebGLRenderer()
            this.renderer.setSize(star.clientWidth,star.clientHeight)
            this.scene.fog = new Three.FogExp2(0x03544e,0.001)
            this.renderer.setClearColor(this.scene.fog.color)
            this.star.appendChild(this.renderer.domElement)
        },
        render(){
            this.cloudParticles.forEach(p=>{p.rotation.z -=0.003})
            this.renderer.render(this.scene,this.camera)
            this.composer.render(0.1)
            requestAnimationFrame(this.render)
        }
    },
}
</script>
<style lang="scss" scoped>
#star{
    height: 100vh;
}
</style>