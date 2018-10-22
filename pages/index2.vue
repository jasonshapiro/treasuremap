<template>
<div id="app" class="container shadow flex-row w-screen max-w-full">
  <div class="mapWrap w-1/3">
    <h1> Map </h1>
    <GmapMap 
      :zoom="17.5" 
      :center="{lat: 33.98567, lng: -118.393361}"
      map-type-id="roadmap"
      ref="mapRef"
      style="width: 100%; height: 100vh"
      class="block">
    </GmapMap>
  </div>

  <div class="couponWrap w-1/3 overflow-y-scroll max-h-screen">
    <h1> Coupons </h1>
    <couponList v-bind:filtered-coupons='filteredCoupons'/>
  </div>

  <div class="prefWrap w-1/3">
    <h1> Preferences </h1>
    <preference-pallete v-bind:chosen-preferences='prefList'/>
  </div>

</div>
</template>

<script>
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import MallMap from '~/components/MallMap.vue'
import PreferencePallete from '~/components/PreferencePallete.vue'
import {gmapApi} from 'vue2-google-maps'
import axios from 'axios'
import CouponList from '~/components/CouponList.vue'
import offerData from 'static/offerData.js'
import prefs from 'static/availablePreferences.js'
import serverAPI from 'static/ClientAPI.js'


export default {
  components: {
    Logo,
    MallMap,
    CouponList,
    PreferencePallete
//    Coupon
  },

  data: function() {
    return {
      prefList: prefs.data.map(function(data) { return data.id }).filter(function(data) { return Math.round(Math.random()*0.6)}),
      filteredCoupons: [],
      coupons: [{
            imgSrc: 'westfield.jpg',
            progress: 0,
            progressGoal: 100,
            rewardLogo: 'money.jpg',
            couponText: 'Earn 25$ Westfield Credit after spending $100 at Westfield',
            rewardsText: 'Redeem',
            categories: [2,9, 14, 17,18,19,20,22],
            latlng: {lat: 33.986782, lng: -118.391749},
            icon: '/luxuryMapIcon.png',
            content: '<p> NECKLACES 999% OFF </p>',
            retailer: 'JC Penny'       
          },
          { imgSrc: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            progress: 256,
            progressGoal: 1000,
            rewardLogo: 'fuelband.jpg',
            couponText: 'Walk 1,000 steps in the Nike store and get 50% off a Nike FuelBand',
            rewardsText: 'Redeem',
            categories: [4, 7, 8, 10, 14],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'Adidas'
          },
          { imgSrc: 'target.png',
            progress: 0,
            progressGoal: 0,
            rewardLogo: 'money.jpg',
            couponText: '$10 off any purchase at Target',
            rewardsText: 'Redeem',
            categories: [0, 3, 4, 7, 9, 10, 12, 14, 15, 19, 21, 22],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'Adidas'
          },
          { imgSrc: 'jcpenny.png',
            progress: 0,
            progressGoal: 1,
            rewardLogo: 'jcpenny.png',
            couponText: 'Try on a outfit in our changing room and recieve 20% off your purchase!',
            rewardsText: 'Scan QR Code in Changing Room',
            categories: [0,1,8,9,14,19,20],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'Adidas'
          },
          { imgSrc: 'adidas.jpg',
            progress: 1111,
            progressGoal: 10000,
            rewardLogo: 'shoe.jpg',
            couponText: 'Walk 10,000 steps and get 25% off your next pair of Adidas',
            rewardsText: 'Walk 8889 more steps',
            categories: [4,9],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'JC Penny'
          },
          { imgSrc: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            progress: 0,
            progressGoal: 100,
            rewardLogo: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            couponText: 'Walk 10000 steps and get a free Nike Fitbit',
            rewardsText: 'Redeem your Fitbit',
            categories: [5,9],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'Adidas'
          },
          { imgSrc: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            progress: 0,
            progressGoal: 100,
            rewardLogo: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            couponText: 'Walk 10000 steps and get a free Nike Fitbit',
            rewardsText: 'Redeem your Fitbit',
            categories: [5,9],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'Adidas'
          },
          { imgSrc: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            progress: 0,
            progressGoal: 100,
            rewardLogo: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            couponText: 'Walk 10000 steps and get a free Nike Fitbit',
            rewardsText: 'Redeem your Fitbit',
            categories: [5,9],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'Adidas'
          },
          { imgSrc: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            progress: 0,
            progressGoal: 100,
            rewardLogo: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
            couponText: 'Walk 10000 steps and get a free Nike Fitbit',
            rewardsText: 'Redeem your Fitbit',
            categories: [5,9],
            latlng: {lat: 33.986066, lng: -118.392307},
            icon: '/shoeMapIcon.png',
            content: '<p> SHOES 999% OFF </p>',
            retailer: 'Adidas'
          }]
    }
  },

  asyncdata: function() {
    return {
      coupons: function() {
        return this.api.getRelevantCoupons(this.api.token)
      },
    }
  },

  created: function() {
    this.api = new serverAPI('localhost', 8080)
    this.token = this.api.loginShopper('riyad','123', function(token) {
      this.api.getRelevantCoupons(token, function(response) {
        console.log(response)
      })
    })
  },

  methods: {
    changePref: function(newList) {
      this.prefList = newList
      this.filteredCoupons = this.coupons.filter((coupon) => {
            for (let category of coupon.categories) {
              if (this.prefList.indexOf(parseInt(category, 10)) > -1) {
                return true
              }
            }
            return false
          })
    }
  },

//  watch: {
//    prefList: function(newList, oldList) {
//      this.changePref(newList)
//    }
//  },

  mounted: function() {

    var vm = this
    window.eventBus = new Vue()

    window.eventBus.$on('change-pref', (newList) => {
      vm.changePref(newList)
    })
    vm.changePref(this.prefList)

    let renderMap = function(map) {

      var opt = { minZoom: 17, maxZoom: 20, disableDefaultUI: true }
      
      map.setOptions(opt)

      offerData.markers.forEach(function(offer) {
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
    }

    this.$refs.mapRef.$mapPromise.then((mapPromise) => {
      renderMap(mapPromise)
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
