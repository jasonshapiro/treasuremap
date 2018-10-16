<template>
<div id="app">

  <GmapMap 
    :zoom="19" 
    :center="{lat: 33.98567, lng: -118.393361}" 
    map-type-id="roadmap"
    ref="mapRef"
    style="width: 100vw; height: 100vh">
  </GmapMap>

  <div class="couponInterface" ref="couponList">
    <ul id="couponList">
    </ul>
  </div>

</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import MallMap from '~/components/MallMap.vue'
import {gmapApi} from 'vue2-google-maps'
import axios from 'axios'
import offerData from 'static/offerData.js'

export default {
  components: {
    Logo,
    MallMap,
//    CouponList,
//    Coupon
  },
  data: function() {
    return {
      coupons: {},
      preferences: {}

    }
  },
//  asyncData: function() {
//    return axios.get('apiENDPOINT').then(function(res){
//      return { markerData: res.schema.markerData } // TODO: create actual schema 
//    })
//  },


  mounted: function() {
    this.$refs.mapRef.$mapPromise.then((map) => {

      var opt = { minZoom: 17, maxZoom: 20 }

      map.setOptions(opt)

      offerData.markers.forEach(function(offer) {




        document.getElementById("couponList").innerHTML += '<li class="couponItem">' + offer.retailer + '</li>' 

        var infowindow = new google.maps.InfoWindow({
          content: offer.content
        })

        var myLatlng = new google.maps.LatLng(offer.latlng.lat, offer.latlng.lng);

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          label: offer.retailer,
          title: 'Coupon Offer',
          icon: {
            url: offer.icon,
            scaledSize: new google.maps.Size(64, 64),
            labelOrigin: new google.maps.Point(32,0)
          },
          animation: google.maps.Animation.DROP,
        })

       marker.addListener('click', function(){
        infowindow.open(map,marker)
       })

       marker.setMap(map)


     })



    var styles = {
      default: null,
      hide: [
        {
          featureType: 'poi.business',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        }
      ]
    };
 
    map.setOptions({styles: styles['hide']})

   })

  },
  computed: {
    google: gmapApi
  }
}

</script>

<style>

/* Sample `apply` at-rules with Tailwind CSS
.container
{
  @apply min-h-screen flex justify-center items-center text-center;
}
*/

.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}

[title="Coupon Offer"] {
  box-shadow: 2px 2px 5px black;
}

</style>
