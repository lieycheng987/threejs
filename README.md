> ## 周期行渲染
    每执行一次渲染器对象WebGLRenderer的渲染方法.render()，浏览器就会渲染出一帧图像并显示在Web页面上，这就是说你按照一定的周期不停地调用渲染方法.render()就可以不停地生成新的图像覆盖原来的图像。这也就是说只要一边旋转立方体，一边执行渲染方法.render()重新渲染，就可以实现立方体的旋转效果。
    为了实现周期性渲染可以通过浏览器全局对象window对象的一个方法setInterval(),可以通过window对象调用该方法window.setInterval()，也可以直接以函数形式调用setInterval()。
