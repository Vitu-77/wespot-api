import { ListSpotsDto } from "src/modules/workspaces/spots/services/list-spots/list-spots.dto";

export type SpotRepositoryListParams = Omit<ListSpotsDto, "workspaceId"> & {
  workspaceId?: string;
  ids?: string[];
};
