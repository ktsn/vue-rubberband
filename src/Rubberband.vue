<template>
<div class="rubberband"
  @mousedown.prevent="onDragStart"
  @mousemove.prevent="onDragMove"
  @mouseup.prevent="onDragEnd"
  @mouseleave.prevent="onDragEnd">
  <slot></slot>
  <div class="rubberband-rect" v-show="show" :style="rubberBandStyles"></div>
</div>
</template>

<script>
function relativeMousePosition(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  return {
    left: event.clientX - rect.left,
    top: event.clientY - rect.top
  }
}

export default {
  name: 'rubberband',

  props: {
    min: {
      type: Number,
      default: 900
    }
  },

  data() {
    return {
      bounds: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      show: false,
      dragging: false
    }
  },

  methods: {
    onDragStart(event) {
      const mousePos = relativeMousePosition(event)
      const bounds = this.bounds

      this.show = this.dragging = true
      bounds.x1 = bounds.x2 = mousePos.left
      bounds.y1 = bounds.y2 = mousePos.top
    },

    onDragMove(event) {
      if (!this.dragging) return

      const mousePos = relativeMousePosition(event)
      const bounds = this.bounds

      bounds.x2 = mousePos.left
      bounds.y2 = mousePos.top
    },

    onDragEnd(event) {
      if (!this.dragging) return

      const mousePos = relativeMousePosition(event)
      const bounds = this.bounds

      bounds.x2 = mousePos.left
      bounds.y2 = mousePos.top

      this.show = this.dragging = false

      if (this.isValidLink) {
        this.emitAddEvent()
      }
    },

    emitAddEvent() {
      this.$emit('add', this.rubberBandRect)
    }
  },

  computed: {
    isValidLink() {
      const { width, height } = this.rubberBandRect
      return width * height >= this.min
    },

    rubberBandRect() {
      const { bounds } = this

      const x = Math.min(bounds.x1, bounds.x2)
      const y = Math.min(bounds.y1, bounds.y2)
      const width = Math.abs(bounds.x1 - bounds.x2)
      const height = Math.abs(bounds.y1 - bounds.y2)

      return { x, y, width, height }
    },

    rubberBandStyles() {
      const { x, y, width, height } = this.rubberBandRect

      return {
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`
      }
    }
  }
}
</script>

<style scoped>
.rubberband {
  position: relative;
  cursor: default;
}

.rubberband-rect {
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #65ff95;
}
</style>
