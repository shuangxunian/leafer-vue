import { defineComponent } from 'vue'
import type { Geometry } from './types'
import { createGeometry } from './createGeometry'
import { useCreateEvents, useEffectUpdate, useGetContainer, useGetPropsAndEventByAttrs } from '@/composables'

export function lfGeometry(geometryName: Geometry) {
  return defineComponent({
    name: `lg${geometryName}`,
    inheritAttrs: false,
    props: {
      config: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props, { attrs }) {
      const { events, config } = useGetPropsAndEventByAttrs(attrs)
      const instance = createGeometry(geometryName, { ...props.config, ...config })
      const container = useGetContainer()
      container.add(instance)

      useEffectUpdate(props, attrs, instance)
      useCreateEvents(events, instance)

      return () => null
    },
  })
}
