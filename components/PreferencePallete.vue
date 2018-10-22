<template lang='pug'>
  div(class='flex flex-row flex-wrap items-center justify-center mt-4')
    div(class='preferences w-1/5 p-2 m-1 group' v-for='preference in availablePreferences' :key='preference.id')
      input(class='checkbox' v-model='chosenPreferences' v-on:change="changePreferences"
            type='checkbox' :id='"prefIcon" + preference.id' :value='preference.id')
      label(class='clickIcon hover:text-blue-light' :for='"prefIcon" + preference.id') 
        v-icon(:name='preference.icon ')
        p(class='text-xs font-sans text-grey-darkest pointer-events-none select-none') {{ preference.name }}

</template>

<script>

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

export default {
  name: 'preference-pallete',
  components: {'v-icon': Icon},
  props: ['chosenPreferences'],

  data() {
    return {
      availablePreferences: [
      { id: 0, name: 'Appliances', icon: 'blender'},
      { id: 1, name: 'Luggage', icon: 'briefcase'},
      { id: 2, name: 'Cafe', icon: 'coffee'},
      { id: 3, name: 'Stationery', icon: 'cut'},
      { id: 4, name: 'Games', icon: 'gamepad'},
      { id: 5, name: 'Instruments', icon: 'drum'},
      { id: 6, name: 'Science', icon: 'flask'},
      { id: 7, name: 'Sports', icon: 'futbol'},
      { id: 8, name: 'Jewlery', icon: 'gem'},
      { id: 9, name: 'Gifts', icon: 'gift'},
      { id: 10, name: 'Electronics', icon: 'headphones'},
      { id: 11, name: 'Antiques', icon: 'hourglass'},
      { id: 12, name: 'Consumables', icon: 'lightbulb'},
      { id: 13, name: 'Magic', icon: 'magic'},
      { id: 14, name: 'Cashback', icon: 'money-bill'},
      { id: 15, name: 'Pets', icon: 'paw'},
      { id: 16, name: 'Travel', icon: 'plane'},
      { id: 17, name: 'Charging Stations', icon: 'plug'},
      { id: 18, name: 'Repair', icon: 'screwdriver'},
      { id: 19, name: 'Department', icon: 'shopping-bag'},
      { id: 20, name: 'Specialty', icon: 'snowflake'},
      { id: 21, name: 'Outdoors', icon: 'tree'},
      { id: 22, name: 'Food', icon: 'utensils'},
      ],
    }
  },
  methods: {

    changePreferences: function(e, newList) {
      window.eventBus.$emit('change-pref', this.chosenPreferences)
      console.log(this.chosenPreferences)
    }

  }
}
</script>

<style>

.preferences svg {
  height: 40px;
  width: 40px;
}

.preferences {
  color: #3490dc;
}

input[type="checkbox"] {
  display: none;
}

.clickIcon {
  color: #eeeeee;
}

:checked + .clickIcon {
   color: #3490dc;
}

</style>