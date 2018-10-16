<template>
<div>
  <GmapMap 
    :zoom="19" 
    :center="{lat: 33.985837, lng: -118.393461}" 
    map-type-id="roadmap"
    ref="mapRef"
    style="width: 100vw; height: 100vh">
  </GmapMap>
</div>
</template>


<script>

export default {
  name: 'mall-map',
  mounted: function() {
  	console.log('custom mounted')
  }
}

</script>


<style>
</style>
