import MapEmployeeItemResponse from "@/views/components/ui/maps/node_modules/@dataSource/api/RunPay/Admin/IServices/Models/Map/MapEmployeeItemResponse";

export default class MarkerInfo {
  id: number;
  code: string;
  typePoint: string;
  adress: string;
  tel: string;
  balans: number;
  employees: Array<MapEmployeeItemResponse>;
}
