<template lang="pug">

ul(class='couponInterface border-2 list-reset' ref='couponList')
	li(v-for='coupon in coupons' class='couponItem w-full')
		coupon-item(v-bind:coupon-data="coupon")


</template>



<script>

import axios from 'axios'
import Coupon from '~/components/Coupon.vue'

export default {
	components: {'coupon-item': Coupon},
	data: function() {
		return {
					coupons: [{
						imgSrc: 'westfield.jpg',
						progress: 0,
						progressGoal: 100,
						rewardLogo: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
						couponText: 'Earn 25$ off after spending $100 at Westfield',
						rewardsText: '25$ off',				
					},{
						imgSrc: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
						progress: 0,
						progressGoal: 100,
						rewardLogo: 'https://qph.fs.quoracdn.net/main-qimg-18d801a88c5d4fefd289642da0d074d9',
						couponText: 'Walk 10000 steps and get a free Nike Fitbit',
						rewardsText: 'Redeem your Fitbit',
					}]
				}
	},
	asyncData: function({ request, params }) {
		return axios.post('riyadshauk.com:8080/shoppers/1').then(function(response) {
				return {
		
				}
		})
	}
}




</script>


<style>
</style>