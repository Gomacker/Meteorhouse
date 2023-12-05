import axios from "axios";
import { Character, Equipment } from "@/anise/worldflipper/object";
import type { CharacterData } from "@/anise/worldflipper/object";
import type { PartyRelease } from "@/anise/worldflipper/party";
import type { TableProfile } from "@/components/table/table";

async function postResponse(endpoint: string): Promise<any> {
  try {
    const response = await axios.post(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface WorldflipperDataVersion {
  version: string;
}

interface WorldflipperBasicData extends WorldflipperDataVersion {
  character: { [key: string]: Character };
  equipment: { [key: string]: Equipment };
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
    return await postResponse("/api/v2/worldflipper/version");
  }

  async fetchBasicData(): Promise<WorldflipperBasicData> {
    const data: {
      version: string
      character: { [key: string]: CharacterData }
      equipment: { [key: string]: Equipment }
    } = await postResponse("/api/v2/worldflipper/data");
    const characters: { [key: string]: Character } = {};
    Object.keys(data["character"]).forEach((key) => {
      const characterData = data["character"][key];
      characters[key] = new Character({ ...characterData, id: key });
    });
    return {
      version: data.version,
      character: characters,
      equipment: data.equipment
    };
  }

  async updateParty(release: PartyRelease) {
    const response = await axios.post("/api/v1/party/upload/", release.dump(true));
    const d: { result: boolean; release_id: string } = response.data;
    return d;
  }

  async fetchPartyPage(pageIndex: number, searchText: string): Promise<[string, PartyRelease][]> {
    const response = await axios.post(
      "/api/v1/party/page/",
      {},
      {
        params: {
          page_index: pageIndex,
          search_text: searchText,
          ppp: 12
        }
      }
    );
    const data: { [key: string]: object } = response.data['parties'];

    console.log(response.data);
    return [];
  }

  async fetchTableList(): Promise<TableProfile[]> {
    const response = await axios.post('/api/v2/worldflipper/table/list')
    return response.data['tables']
    // return (response.data['tables'] as TableProfile[]).sort((a, b) => b.weight - a.weight)
  }

  async fetchTableData(table_id: string) {
    return (await axios.post(`/api/v2/worldflipper/table/get/${table_id}`)).data;
  }
}

export default new WorldflipperService();
