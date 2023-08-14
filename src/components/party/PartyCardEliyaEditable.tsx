import { defineComponent } from 'vue'
import { PartyRelease, Union } from '@/anise/worldflipper/party'
import './PartyCardEliya.css'
import { Element } from '@/anise/worldflipper/object'
import UnionComponent from '@/components/party/eliya/UnionComponent.vue'
interface Props {
  party: PartyRelease
}

const PartyCardEliyaEditable = defineComponent({
  props: {
    party: {
      type: PartyRelease,
      required: false,
      default: PartyRelease.empty()
    }
  },
  setup(props: Props) {
    function genUnion(union: Union, is_leader: boolean) {
      return <UnionComponent v-model={union} is_leader={is_leader}></UnionComponent>
    }
    return () => (
      <>

        <div class="party">
          {genUnion(props.party.party.union1, true)}
          {genUnion(props.party.party.union2, false)}
          {genUnion(props.party.party.union3, false)}
        </div>
        {JSON.stringify(props.party.dump())}
      </>
    )
  }
})

export default PartyCardEliyaEditable
