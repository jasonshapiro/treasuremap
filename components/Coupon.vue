<template lang="pug">

div(class='couponItemDisplay h-auto w-full flex-row flex items-center justify-center border-2 rounded rounded-l-none hover:border-grey-darkest font-sans')
	img(class='couponCompanyLogo w-1/3 p-2' :src='couponData.imgSrc')
	div(class='displayProgress w-1/3 p-1')
		p(class='couponText p-1') {{couponData.couponText}}
		div(class='progressTextWrap border-t-2 border-grey-darkest')
			p(class='currentProgress mt-1') {{couponData.progress}} / {{couponData.progressGoal}}
	div(class='couponRewardsButton w-1/3')
		img(class='couponRewardsLogo' :src='couponData.rewardLogo')
		p(class='rewardsText') {{couponData.rewardsText}}

</template>


<script>

export default {
  name: 'couponItem',
  props: ['couponData'],
  data: function() {
  	return {

  	}
  }
}


</script>


<style>
</style> 