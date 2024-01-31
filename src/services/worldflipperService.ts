import axios from "axios"
import { Character, Equipment } from "@/anise/worldflipper/object"
import type { CharacterData } from "@/anise/worldflipper/object"
import type { PartyRelease } from "@/anise/worldflipper/party2"
import type { TableProfile } from "@/components/table/table"
import { PartyReleaseV1, PartyReleaseV2, type PartyReleaseV2Data } from "@/anise/worldflipper/party2"

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
  version: string;
}

interface WorldflipperBasicData extends WorldflipperDataVersion {
  character: { [key: string]: Character }
  equipment: { [key: string]: Equipment }
}

interface PostUpdatePartyRequestData {
  party: {
    party: object
    params: object
  };
}

class WorldflipperService {
  constructor() {
  }

  async fetchDataVersion(): Promise<WorldflipperDataVersion> {
    return await postResponse("/api/v2/worldflipper/version")
  }

  async fetchBasicData(): Promise<WorldflipperBasicData> {
    const data: {
      version: string
      character: { [key: string]: CharacterData }
      equipment: { [key: string]: Equipment }
    } = await postResponse("/api/v2/worldflipper/data")
    const characters: { [key: string]: Character } = {}
    Object.keys(data["character"]).forEach((key) => {
      const characterData = data["character"][key]
      characters[key] = new Character({ ...characterData, id: key })
    })
    return {
      version: data.version,
      character: characters,
      equipment: data.equipment,
    }
  }

  async fetchPartyPage(pageIndex: number, searchText: string): Promise<{
    parties: PartyRelease[]
    maxPage: number
  }> {
    const partyPrePage = 12
    const response = await axios.post(
      "/api/v1/party/page/",
      {},
      {
        params: {
          page_index: pageIndex,
          search_text: searchText,
          ppp: partyPrePage,
        },
      },
    )
    const data: { [key: string]: any } = response.data["parties"]
    const legacyParties = Object.keys(data).map((value) => data[value])
    return {
      parties: legacyParties.map(value => PartyReleaseV1.fromPartyRelease(value)),
      maxPage: Math.ceil(response.data['party_count'] / partyPrePage)
    }
  }

  async fetchPartyPageV2(pageIndex: number, searchText: string): Promise<PartyReleaseV2[]> {
    const response = await axios.get(
      "/api/v3/party/page",
      {
        params: {
          page: pageIndex,
          q: searchText,
        },
      },
    )

    const data: PartyReleaseV2Data[] = response.data["parties"]

    return data.map(value => new PartyReleaseV2(value))
  }

  async fetchTableList(): Promise<TableProfile[]> {
    const response = await axios.post("/api/v2/worldflipper/table/list")
    return response.data["tables"]
    // return (response.data['tables'] as TableProfile[]).sort((a, b) => b.weight - a.weight)
  }

  async fetchTableData(table_id: string) {
    return (await axios.post(`/api/v2/worldflipper/table/get/${table_id}`)).data
  }
}

export default new WorldflipperService()
