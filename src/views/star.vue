<template>
    <div id="star" ref="star">
        <div class="login-div">
            <div class="row">
                <div class="logo"></div>
            </div>
            <div class="row-center-align">
                <h3>登录</h3>
                <h5>使用官方账号进行登录</h5>
            </div>
            <div class="row">
                <div class="input-field-col1">
                    <label for="email_input">电子邮箱</label>
                    <input id="email_input" type="email" class="validate" 
                    placeholder="请输入电子邮箱">
                </div>
            </div>
            <div class="row">
                <div class="input-field-col2">
                    <label for="password_input">登录密码</label>
                    <input id="password_input" type="password" class="validate" placeholder="请输入登录密码">
                </div>
            </div>
            <div class="row">
                <div class="col s12">关于账号注册、修改密码问题 
                    <a href="#">
                        <b>了解更多</b>
                    </a>
                </div>
            </div>
            <div class="row"></div>
            <div class="row">
                <div class="col-s6"><a href="#">创建账户</a></div>
                <div class="col-s6-right-align">
                    <button >
                        <img class="loginx" src="../assets/img/微信图片_20210422170243.png" alt="">
                    </button>
                </div>
            </div>
        </div>
    </div>
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
.login-div {
  max-width: 430px;
  padding: 35px ;
  position: absolute;
  top: 25%;
  left: 38%;
  border: 1px solid #ddd;
  border-radius: 25px;
  text-align:left;
}
.logo {
  background-image: url("../assets/img/Logo.png");
  width:100px;
  height:100px;
  border-radius: 50%;
  margin:0 auto;
}
.row-center-align{
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
}
.input-field-col1 ,.input-field-col2{
    text-align: center;
    padding-bottom: 20px;
}
.input-field-col1 input,.input-field-col2 input{
    height: 30px;
}
.col-s6{
    text-align: center;
    padding-top:15px;
}
.col-s6-right-align{
    text-align: center;
    padding-top: 15px;
}
.loginx{
    width: 60px;
}
</style>