> ## 周期行渲染
    1.每执行一次渲染器对象WebGLRenderer的渲染方法.render()，浏览器就会渲染出一帧图像并显示在Web页面上，这就是说你按照一定的周期不停地调用渲染方法.render()就可以不停地生成新的图像覆盖原来的图像。这也就是说只要一边旋转立方体，一边执行渲染方法.render()重新渲染，就可以实现立方体的旋转效果。
    为了实现周期性渲染可以通过浏览器全局对象window对象的一个方法setInterval(),可以通过window对象调用该方法window.setInterval()，也可以直接以函数形式调用setInterval()。
 `JavaScript`
 `` function render() {
    renderer.render(scene,camera);//执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
} ``
  上面代码定义了一个渲染函数render()，函数中定义了三个语句，通过setInterval("render()",20);可以实现m每间隔20毫秒调用一次函数render()，每次调用渲染函数的时候，执行renderer.render(scene,camera);渲染出一帧图像，执行mesh.rotateY(0.01);语句使立方体网格模型绕y轴旋转0.01弧度。
  requestAnimationFrame()参数是将要被调用函数的函数名，requestAnimationFrame()调用一个函数不是立即调用而是向浏览器发起一个执行某函数的请求， 什么时候会执行由浏览器决定，一般默认保持60FPS的频率，大约每16.7ms调用一次requestAnimationFrame()方法指定的函数，60FPS是理想的情况下，如果渲染的场景比较复杂或者说硬件性能有限可能会低于这个频率
  `javascript`
  `` function render() {
        renderer.render(scene,camera);//执行渲染操作
        mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(render);//请求再次执行渲染函数render
    }
render(); ``
## 均匀选装
    在实际执行程序的时候，可能requestAnimationFrame(render)请求的函数并不一定能按照理想的60FPS频率执行，两次执行渲染函数的时间间隔也不一定相同，如果执行旋转命令的rotateY的时间间隔不同，旋转运动就不均匀，为了解决这个问题需要记录两次执行绘制函数的时间间隔。
使用下面的渲染函数替换原来的渲染函数即可，rotateY()的参数是0.001*t，也意味着两次调用渲染函数执行渲染操作的间隔t毫秒时间内，立方体旋转了0.001*t弧度，很显然立方体的角速度是0.001弧度每毫秒(0.0001 rad/ms = 1 rad/s = 180度/s)。CPU和GPU执行一条指令时间是纳秒ns级，相比毫秒ms低了6个数量级，所以一般不用考虑渲染函数中几个计时语句占用的时间，除非你编写的是要精确到纳秒ns的级别的标准时钟程序。
