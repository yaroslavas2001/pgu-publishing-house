import Position from "./position"
import MarkerInfo from "./markerInfo";

export default class MarkerTemplate {
    id: number;
    positionPoint: Position;
    typePoint: string;
    statusPoint: string;
    icon: string;
    draggable:boolean;
    // info: MarkerInfo;
}