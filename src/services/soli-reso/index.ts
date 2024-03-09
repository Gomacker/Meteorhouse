import { AniseConstructor } from '../types/object.ts'

enum CardColor {
  RED,
  BLUE,
  GREEN,
  YELLOW,
  BLACK,
  PURPLE
}
interface Card {
  color: CardColor

}

interface Effect {}

interface CharacterData {}
interface EquipmentData {}
interface Goods {}

// type GoodsId = string

const Station = AniseConstructor<{
  id: string
  name: string
  goods: string[]
}>('Station').bindProps({
  method: {
    test() {
      
    }
  }
})
