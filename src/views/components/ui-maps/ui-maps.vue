<template>
  <div>
    <div class="map" ref="map"></div>
    <div ref="infoWindow" class="info-window">
      <template>
        <slot
          name="infowindow"
          class="boxInfo"
          v-for="item in markers"
          :item="item"
        ></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Position from "./position";
import MarkerTemplate from "./markerTemplate";
import * as json from "./googleMapstyle.json";
import MarkerInfo from "./markerInfo";
import Route from "./route";
import {} from "googlemaps";

import { Vue, Options } from "vue-class-component";

declare var google: any;

interface IMarkerData {
  id: number;
  marker: google.maps.Marker;
}
@Options<Maps>({
  props: {
    zoom: { default: 10, type: Number },
    center: { default: () => new Position(10, 10), type: Object },
    markers: { type: Array },
    keyMap: { default: "standart", type: String },
    travelModeOption: { default: "WALKING", type: String },
    onlyOneInfoWindowOpened: { default: true, type: Boolean },
  },
  watch: {
    center(value) {
      // //console.log('center changed', this.center);
      if (this.map) {
        // //console.log('center set @#@#: ', this.center);
        this.map.setCenter(this.center);
      }
    },
  },
})
export default class Maps extends Vue {
  // @Prop({ default: 10, type: Number }) zoom: number;
  // @Prop({ default: () => new Position(10, 10), type: Object }) center: Position;
  // @Prop({ type: Array }) markers: MarkerTemplate[];
  // @Prop({ type: Array, default: (): Route[] => [] }) route: Route[];
  // // @Prop({ type:Object, default:()=>new MarkerInfo}) info: MarkerInfo;
  // @Prop({ default: " ", type: String }) keyMap: string;
  // @Prop({ default: "standart", type: String }) theme: string;
  // @Prop({ default: "WALKING", type: String }) travelModeOption: string;
  // @Prop({ default: true, type: Boolean }) onlyOneInfoWindowOpened: boolean;

  readonly zoom = 10;
  readonly center = new Position(10, 10);
  readonly markers: MarkerTemplate[] = [];
  readonly keyMap: "standart";
  readonly travelModeOption: "WALKING";
  readonly onlyOneInfoWindowOpened: true;

  baseUrl: string = "https://maps.googleapis.com/maps/api/js?key=";

  innerMarkers: IMarkerData[] = [];
  routeData: google.maps.Polyline[] = [];
  contentTemplate: HTMLCollection;
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsService: google.maps.DirectionsService;

  observer: MutationObserver = null;
  zoomChange: number;

  arrInfoWindows: {
    id: number;
    opened: boolean;
    info: google.maps.InfoWindow;
  }[] = [];

  // @Watch("center")
  // onCenterChanged() {
  //   // //console.log('center changed', this.center);
  //   if (this.map) {
  //     // //console.log('center set @#@#: ', this.center);
  //     this.map.setCenter(this.center);
  //   }
  // }

  get currentStyle(): Object {
    return (json as any)[this.theme];
  }
  getUrlMapApi() {
    var baseUr = "https://maps.googleapis.com/maps/api/js?key=";
    return baseUr + this.keyMap + "&libraries=geometry&sensor=false";
  }

  isMarkerChanged(source: IMarkerData, target: MarkerTemplate): boolean {
    // debugger;
    return source.marker.getDraggable() != target.draggable;
  }

  @Watch("markers")
  OnMarkerChanged() {
    // debugger;
    // if (this.innerMarkers.length==0){
    //   return
    // }

    const markersToDelete = this.innerMarkers.filter(
      (x) => !this.markers.some((nm) => nm.id == x.id)
    );
    const isFit = markersToDelete.length === this.innerMarkers.length;
    const markersToCreate = this.markers.filter(
      (x) => !this.innerMarkers.some((om) => om.id == x.id)
    );
    const markersToEdit = this.innerMarkers.filter((x) =>
      this.markers.some((nm) => nm.id == x.id && this.isMarkerChanged(x, nm))
    );

    // this.arrInfoWindows = []; // todo - что-то плохое может произойти. Будьте начеку!!!

    // //console.log('getMarkers: ', this.arrInfoWindows.length);
    // this.paintMarkers();
    this.deleteMarkers(markersToDelete);
    this.addMarkers(markersToCreate);
    markersToEdit.forEach((x) =>
      this.changeMarker(
        x,
        this.markers.find((em) => em.id == x.id)
      )
    );
    // this.changeMarkers(markersToEdit);
    if (isFit) {
      this.fitByMarkers();
    }
  }

  changeMarker(innerMarker: IMarkerData, marker: MarkerTemplate): void {
    // debugger;
    if (!innerMarker || !marker) {
      console.error(
        "Нельзя изменить маркер. Исходный или данный маркер не определен"
      );
    }
    innerMarker.marker.setDraggable(marker.draggable);
    innerMarker.marker.setPosition({
      lat: marker.positionPoint.lat,
      lng: marker.positionPoint.lng,
    });
    // throw new Error("Method not implemented.");
  }
  // changeMarkers(markersToEdit: IMarkerData[]) {
  //   throw new Error("Method not implemented.");
  // }

  addMarkers(markersToCreate: MarkerTemplate[]) {
    const self = this;
    // //console.log('add marjjkerkerfsda: ', markersToCreate);
    this.innerMarkers = this.innerMarkers.concat(
      markersToCreate.map((el) => {
        if (el.draggable) {
          // //console.log('paintmarket draggavbel ; ', el);
        }
        var marker = new google.maps.Marker({
          position: { lat: el.positionPoint.lat, lng: el.positionPoint.lng },
          map: this.map,
          icon: el.icon,
          draggable: el.draggable,
        });
        const data: IMarkerData = { id: el.id, marker: marker };
        google.maps.event.addListener(marker, "dragend", function (event: any) {
          var point = marker.getPosition(); // новые координаты маркера: point.lat() и point.lng()
          self.$emit("dragend", data);
          // тут можно сделать ajax-запрос на сохранение новых координат маркера
          //
        });
        google.maps.event.addListener(marker, "click", () => {
          // //console.log('ui-maps. marker-click scope: ', this);
          this.onMarkerClick(el);
        });
        return data;
      })
    );
  }

  deleteMarkers(markersToDelete: IMarkerData[]) {
    markersToDelete.forEach((el) => {
      el.marker.setMap(null);
    });
    this.innerMarkers = this.innerMarkers.filter(
      (x) => !markersToDelete.some((dm) => dm.id == x.id)
    );
    this.arrInfoWindows = this.arrInfoWindows.filter(
      (aiw) => !markersToDelete.some((dm) => dm.id == aiw.id)
    );
  }

  // onEditCoordinat(id: number) {
  //   //console.log('111');
  // }

  onMarkerClick(data: MarkerTemplate) {
    // var currentMarker = this.innerMarkers.find(item => item.id == data.id);
    this.$emit("markerClick", data);
    var currentMarker = this.innerMarkers.find((item) => item.id == data.id);

    this.openInfoWindow(currentMarker);
  }

  GetHashCode(obj: string): number {
    var hash = 0,
      i,
      chr;
    if (obj.length === 0) return hash;
    for (i = 0; i < obj.length; i++) {
      chr = obj.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  openInfoWindow(currentMarker: { id: number; marker: google.maps.Marker }) {
    // setTimeout(() => {
    //закрыть предыдущее
    if (this.onlyOneInfoWindowOpened && this.arrInfoWindows.length > 0) {
      this.arrInfoWindows
        .filter((x) => x.opened)
        .forEach((x) => {
          x.opened = false;
          x.info.close();
        });
      // this.arrInfoWindows[0].info.close()
      // this.arrInfoWindows = [];
    }
    const idx = this.markers.findIndex((x) => x.id == currentMarker.id);
    let exist = this.arrInfoWindows.find((x) => x.id == currentMarker.id);
    const isNew = !exist;
    if (exist && exist.info && exist.opened) {
      exist.opened = false;
      exist.info.close();
      return;
      // exist.info.
      // exist.info.op // todo - zakrit'
    }
    exist = exist || {
      id: currentMarker.id,
      opened: false,
      info: new google.maps.InfoWindow({
        content:
          this.contentTemplate[idx] == null
            ? ""
            : this.contentTemplate[idx].outerHTML,
        maxWidth: 400,
      }),
    };
    exist.info.open(this.map, currentMarker.marker);
    exist.opened = true;
    const self = this;
    google.maps.event.addListener(exist.info, "domready", function () {
      self.$emit("infoWindowOpened", { marker: currentMarker });
    });
    if (isNew) {
      this.arrInfoWindows.push(exist);
    }
  }

  map: google.maps.Map;
  fitByMarkers() {
    let bounds = new google.maps.LatLngBounds();
    for (let index = 0; index < this.innerMarkers.length; index++) {
      const loc = new google.maps.LatLng(
        this.innerMarkers[index].marker.position.lat(),
        this.innerMarkers[index].marker.position.lng()
      );
      bounds.extend(loc);
    }
    // debugger
    this.map.fitBounds(bounds);
    this.map.panToBounds(bounds);
  }
  paintMarkers() {
    // //console.log('paintmarket');
    this.addMarkers(this.markers);
    this.fitByMarkers();
    // // debugger
  }

  allPoint: google.maps.Circle[] = [];

  @Watch("route")
  getRoute() {
    // //console.log('route chagned!!!!!!@@@@@@@@@@@@@@@');
    this.routeData.forEach((el) => {
      el.setMap(null);
    });
    this.allPoint.forEach((el) => {
      el.setMap(null);
    });
    this.routeData = [];
    this.clearInfoWindows();
    if (this.route.length > 0) this.paintRoute();
  }
  clearInfoWindows() {
    this.arrInfoWindows = [];
  }

  paintRoute() {
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();

    // this.calculateAndDisplayRoute(this.route[0].points);// если гугл правит точки платно // todo сервис платный

    this.route.forEach((route) => {
      var path = route.points;
      var poly = new google.maps.Polyline({
        path: path,
        editable: false,
        strokeColor: "#5FB951",
        strokeOpacity: 1,
        strokeWeight: 4,
      });

      this.routeData.push(poly);
      route.points.forEach((el, i) => {
        // el.pointRoute.forEach((el,i) => {
        this.allPoint[i] = new google.maps.Circle({
          strokeColor: "#5FB951",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "#5FB951",
          fillOpacity: 1,
          map: this.map,
          center: el,
          radius: 5,
        });
        this.allPoint[i].setMap(this.map);
        // });
      });
      path = poly.getPath();
      poly.setMap(this.map);

      // определяем расстояние
      let length = google.maps.geometry.spherical.computeLength(path);
      this.$emit("distance", length);
    });

    let bounds = new google.maps.LatLngBounds();

    for (let index = 0; index < this.route[0].points.length; index++) {
      const loc = new google.maps.LatLng(
        this.route[0].points[index].lat,
        this.route[0].points[index].lng
      );
      bounds.extend(loc);
    }

    this.map.fitBounds(bounds);
    this.map.panToBounds(bounds);
  }

  get infoWindows(): { id: number; info: any }[] {
    return this.markers.map((x, i): { id: number; info: any } => {
      return { id: x.id, info: this.contentTemplate[i] };
    });
  }

  //для правильного маршрута по дорогам и с правильным растоянием

  calculateAndDisplayRoute(waypoints: any[]) {
    let distance = 0;
    this.directionsRenderer.setMap(this.map);

    let way: any[] = [];
    let row1: any[] = [];
    let i = 0;
    waypoints.forEach((item, k) => {
      // //console.log('i=', k, waypoints.length);
      if (i < 10) {
        row1.push(item);
        i++;
      } else {
        way.push(row1);

        i = 0;
        row1 = [];
      }
      if (k == waypoints.length - 1) {
        way.push(row1);

        i = 0;
        row1 = [];
      }
    });
    // debugger;
    way.forEach((row) => {
      // //console.log('response', row);

      if (row.length > 2) {
        var start = new google.maps.LatLng(row[0].lat, row[0].lng);
        var end = new google.maps.LatLng(
          row[row.length - 1].lat,
          row[row.length - 1].lng
        );

        let waypts: any[] = [];
        row = row.splice(1, waypoints.length - 1);
        row.forEach((item) => {
          const stop = new google.maps.LatLng(item.lat, item.lng);
          waypts.push({
            location: stop,
            stopover: false,
          });
        });

        this.directionsService.route(
          {
            origin: {
              location: start,
            },
            destination: {
              location: end,
            },
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: waypts,
          },
          (
            response: google.maps.DirectionsResult,
            status: google.maps.DirectionsStatus
          ) => {
            if (status === "OK") {
              // //console.log(response);
              this.directionsRenderer.setDirections(response);
              distance += response.routes[0].legs[0].distance.value;
              this.$emit("distance", distance);
              // //console.log('response', response);
              // //console.log('distance', distance);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }
    });

    let waypts = [];
  }

  updateInfoWindows() {
    // //console.log('updateInfoWindows: ', this.arrInfoWindows.length);
    const existIWs = this.infoWindows;
    this.arrInfoWindows.forEach((iw) => {
      var f = existIWs.find((w) => w.id == iw.id);
      if (!f) {
        return;
      }
      // //console.log('nynyanya');
      if (iw.info.getContent() + "" != f.info.outerHTML + "") {
        iw.info.setContent(f.info.outerHTML);
      }
    });
  }
  private scriptId = "ui-maps-google-script";

  initMap() {
    this.map = new google.maps.Map(this.$refs.map, {
      zoom: this.zoom,
      center: this.center,
      disableDefaultUI: true,
      styles: this.currentStyle,
    });

    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });
    // if (this.markers!=null)
    // debugger
    const map = this.map;
    const self = this;
    google.maps.event.addListener(map, "click", function (event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      // populate yor box/field with lat, lng
      self.$emit("getCoord", { lat: lat, lng: lng });
      // alert("Lat=" + lat + "; Lng=" + lng);
    });

    if (this.markers.length > 0) this.paintMarkers();
    if (this.route.length > 0) this.paintRoute();
  }

  mounted() {
    var htmlTmp = (this.$refs.infoWindow as HTMLElement).children;
    this.contentTemplate = htmlTmp;
    // //console.log('mountedL!!@#WE');
    const self = this;
    this.observer = new MutationObserver(
      (mutations: MutationRecord[], observer: MutationObserver): void => {
        var htmlTmp = (this.$refs.infoWindow as HTMLElement).children;

        self.contentTemplate = htmlTmp;
        self.updateInfoWindows();
      }
    );
    this.observer.observe(this.$refs.infoWindow as HTMLElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    // const allScripts = document.getElementsByTagName( 'script' );

    // [].filter.call( allScripts, (scpt) => scpt.src.indexOf( 'key=googleAPIKEY' ) >= 0 )[ 0 ].remove();
    // window.google = {};
    // if (document.getElementById(this.scriptId)) {
    //   return;
    // }
    const exist = document.getElementById(this.scriptId) as HTMLScriptElement;
    let script = exist || document.createElement("script");
    script.setAttribute("id", this.scriptId);
    script.src = this.getUrlMapApi();
    document.head.append(script);
    script.onload = () => {
      this.initMap();
    };
    if (exist) {
      this.initMap();
    }
  }
  beforeDestroy() {
    this.observer.disconnect();
  }
}
</script>

<style lang="less">
.gm-style-iw {
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
  border-radius: 0 !important;
  width: 240px;
  // height: 265px;
}
&::after {
  content: none !important;
}
.map {
  width: 100%;
  height: 700px;
  margin: 0 auto;
}
.info-window {
  display: none;
}
.all {
  padding-bottom: 1rem;
}
.code {
  color: #1791fa;
  font-size: 15px;
  padding-bottom: 5px;
}
</style>
