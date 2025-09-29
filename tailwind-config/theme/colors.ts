import defaultColors from 'tailwindcss/colors'
import tailwindConfig from '../../tailwind.config'

const colors = {
  ...defaultColors,
  ...(tailwindConfig.theme?.extend?.colors ?? {})
}

export default colors
