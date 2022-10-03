<script setup lang="ts">
const getCanvas = () => {
  const canvas: any = document.getElementById('myCanvas')
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  const ctx = canvas.getContext('2d')
  // 创建小球的构造函数
  function Ball() {
    this.x = randomNum(3, canvas.width - 3)
    this.y = randomNum(3, canvas.height - 3)
    this.r = randomNum(1, 3)
    this.color = '#e3e3e3'
    this.speedX = randomNum(-3, 3) * 0.1
    this.speedY = randomNum(-3, 3) * 0.1
  }
  Ball.prototype = {
    // 绘制小球
    draw() {
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fill()
    },
    // 小球移动
    move() {
      this.x += this.speedX
      this.y += this.speedY
      // 为了合理性,设置极限值
      if (this.x <= 3 || this.x > canvas.width - 3)
        this.speedX *= -1

      if (this.y <= 3 || this.y >= canvas.height - 3)
        this.speedY *= -1
    },
  }
  // 存储所有的小球
  const balls = []
  // 创建200个小球
  for (let i = 0; i < 150; i++) {
    const ball = new Ball()
    balls.push(ball)
  }

  // 添加鼠标移动事件
  // 记录鼠标移动时的mouseX坐标
  let mouseX
  let mouseY

  main()

  function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 鼠标移动绘制线
    // mouseLine()
    // 小球与小球之间自动画线
    drawLine()
    // 使用关键帧动画，不断的绘制和清除
    window.requestAnimationFrame(main)
  }

  canvas.onmousemove = function (e: any) {
    const ev = event || e
    mouseX = ev.offsetX
    mouseY = ev.offsetY
  }
  // 判断是否划线

  function drawLine() {
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw()
      balls[i].move()
      for (let j = 0; j < balls.length; j++) {
        if (i !== j) {
          if (
            Math.sqrt(
              (balls[i].x - balls[j].x) ** 2 + (balls[i].y - balls[j].y) ** 2,
            ) < 80
          ) {
            ctx.beginPath()
            ctx.moveTo(balls[i].x, balls[i].y)
            ctx.lineTo(balls[j].x, balls[j].y)
            ctx.strokeStyle = '#e3e3e3'
            ctx.globalAlpha = 0.2
            ctx.stroke()
          }
        }
      }
    }
  }

  // 随机函数
  function randomNum(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m)
  }
}
onMounted(() => {
  getCanvas()
})
</script>

<template>
  <div class="main">
    <Nav />
    <div>
      <canvas id="myCanvas" class="canvas" />
    </div>
    <div class="main_content">
      <slot />
    </div>
    <div class="flex-x _blank">
      <div class="flex-x item">
        <a
          target="_blank"
          href="https://beian.miit.gov.cn/"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
        ><img src="@/assets/image/beian.png" style="float: left">
          <p
            style="
              float: left;
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
              color: #939393;
            "
          >
            粤ICP备***
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.canvas {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
._blank {
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;

  .item {
    width: 300px;
    align-items: center;
  }
}
</style>
