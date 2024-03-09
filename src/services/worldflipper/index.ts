import { AniseConstructor, AniseData } from '../types/object.ts'

/**
 * CharacterData
 * Unit data for Worldflipper Character
 * @interface CharacterData
 */
interface CharacterData extends AniseData {
  resource_id: string
  names: string[]
  rarity: number
  element: number
  type: number
  race: string
  gender: string
  status_data: { [key in 1 | 10 | 80 | 100]: [number, number] }
  leader_ability: {
    name: string
    description: string
  }
  skill: {
    name: string
    weight: number
    description: string
  }
  abilities: string[6]
  cv: string
  description: string
  obtain: string
  tags: string[]
  server: string
}

export const Character =
  AniseConstructor<CharacterData>('Character').bindProps({
    method: {
      f: () => 3
    }
  })
