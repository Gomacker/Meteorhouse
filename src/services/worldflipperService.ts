import axios from 'axios'
import { Character, Equipment } from '@/anise/worldflipper/object'
import type { CharacterData } from '@/anise/worldflipper/object'
import type { PartyRelease } from '@/anise/worldflipper/party'

async function postResponse(endpoint: string): Promise<any> {
  try {
    const response = await axios.post(endpoint)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

interface WorldflipperDataVersion {
  version: string
}

interface WorldflipperBasicData extends WorldflipperDataVersion {
  character: { [key: string]: Character }
  equipment: { [key: string]: Equipment }
}

interface PostUpdatePartyRequestData {
  party: {
    party: object,
    params: object,
  }
}
class WorldflipperService {
  constructor() {}

  async fetchDataVersion(): Promise<WorldflipperDataVersion> {
    return await postResponse('/api/v2/worldflipper/version')
  }

  async fetchBasicData(): Promise<WorldflipperBasicData> {
    const data: {
      version: string
      character: { [key: string]: CharacterData }
      equipment: { [key: string]: Equipment }
    } = await postResponse('/api/v2/worldflipper/data')
    const characters: {[key: string]: Character} = {}
    Object.keys(data['character']).forEach((key) => {
      const characterData = data['character'][key]
      characters[key] = new Character({...characterData, id: key})
    })
    return {
      version: data.version,
      character: characters,
      equipment: data.equipment
    }
  }

  async updateParty(party: PartyRelease) {
    const request: PostUpdatePartyRequestData = {
      party: {
        party: party,
        params: {}
      }
    }
    const response = await axios.post('/api/v2/party', )
    const d: { result: boolean, release_id: string } = response.data
    return d
  }
}

export default new WorldflipperService()
