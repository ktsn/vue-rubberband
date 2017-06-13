import { play } from 'vue-play'
import Rubberband from '../src/Rubberband.vue'

play(Rubberband)
  .add('Normal', {
    template: `
      <rubberband :min="min" @add="$log">
        <h1>Hello Rubberband</h1>
        <p>You can drag &amp; drop on this area to draw a rubberband.</p>
      </rubberband>
    `,
    props: {
      min: {
        type: Number,
        default: 900
      }
    }
  })
