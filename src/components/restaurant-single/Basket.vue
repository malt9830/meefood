<template>
  <div class="sticky top-0">
  <h2 class="text-xl text-center mt-5 font-semibold">Kurv</h2>
  <p v-if="basketStore.basket.length < 1" class="text-center mt-5">Din kurv er tom</p>
  <div
    v-for="dish in basketStore.basket"
    :key="dish.name"
    class="flex flex-col gap-y-2 mt-5 mx-4"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-md">{{ dish.amount }}x {{ dish.name }}</h3>
      <p class="text-sm">{{ dish.amount * dish.price }} kr</p>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-xs" v-if="dish.comment">"{{ dish.comment }}"</p>
      <p v-if="!dish.comment && !dish.options"></p>
      <p class="text-xs" v-if="dish.options">{{dish.picked}}</p>
      <div class="flex items-center justify-end">
        <Minus
          @click="basketStore.subtractAmount(dish)"
          :fill="`${restaurant.colorSecondary}`"
          class="h-5 cursor-pointer"
        />
        <Plus
          @click="basketStore.addAmount(dish)"
          :fill="`${restaurant.colorSecondary}`"
          class="h-5 cursor-pointer"
        />
      </div>
    </div>
  </div>

  <div class="text-sm mx-4">
    <hr :style="`border-top: 1px solid ${restaurant.colorSecondary}`" class="my-4"/>
    <div @click="showComment = !showComment" class="flex gap-2 items-center cursor-pointer hover:opacity-75 duration-200">
      <Comment class="h-6 w-auto" :fill="`${restaurant.colorSecondary}`"/>
      <p class="underline underline-offset-1 leading-none">{{ addedComment ? 'Redigér note' : 'Tilføj note' }}</p>
    </div>
    <p :class="{ 'italic' : addedComment }" class="mt-2 whitespace-pre-line">{{ addedComment ? addedComment : 'Ingen note tilføjet.' }}</p>
    <Transition name="slide" :duration="300">
      <div v-if="showComment" class="overflow-hidden mt-2 duration-300">
        <textarea v-model="orderComment" placeholder="Skriv din note her" :style="`border: 1px solid ${restaurant.colorSecondary}`" class="block w-full h-16 p-1 bg-white/80 text-black rounded resize-none focus:outline-none"></textarea>
        <div v-if="!addedComment" class="grid grid-cols-2 gap-2 mt-2">
          <button @click="cancelComment" :style="`border: 1px solid ${textColor}; color: ${textColor}`" class="py-1 px-2 hover:opacity-75 duration-200 rounded">Luk</button>
          <button @click="addComment" :style="`background-color: ${restaurant.colorSecondary}`" class="text-white py-1 px-2 hover:opacity-75 duration-200 rounded">Tilføj</button>
        </div>
        <div v-else class="grid grid-cols-2 gap-2 mt-2">
          <button @click="removeComment" :style="`border: 1px solid ${textColor}; color: ${textColor}`" class="py-1 px-2 hover:opacity-75 duration-200 rounded">Fjern</button>
          <button @click="addComment" :style="`background-color: ${restaurant.colorSecondary}`" class="text-white py-1 px-2 hover:opacity-75 duration-200 rounded">Opdatér</button>
        </div>
      </div>
    </Transition>
  </div>

  <div v-if="basketStore.basket.length > 0" class="flex flex-col gap-y-2 mx-4">
    <hr
    :style="`border-top: 1px solid ${restaurant.colorSecondary}`"
    class="my-4"
  />
    <div class="flex justify-between">
      <p class="font-medium">Subtotal</p>
      <p>{{ basketStore.totalPrice }} kr</p>
    </div>
    <div class="flex justify-between">
      <p class="font-medium">Levering</p>
      <p>{{ restaurant.deliveryCost }} kr</p>
    </div>
    <div class="flex justify-between">
      <p class="font-medium">Samlet</p>
      <p>{{ basketStore.totalPrice + restaurant.deliveryCost }} kr</p>
    </div>
    <div class="flex justify-center mt-5">
      <button
        @click="goToCheckout"
        :style="`background-color: ${restaurant.colorSecondary}`"
        :class="{'pointer-events-none opacity-50' : !basketStore.reachedMinimumPrice}"
        class="p-1.5 px-4 rounded text-white duration-200 hover:opacity-75"
      >
        Gå til kassen
      </button>
  </div>
  <p v-if="!basketStore.reachedMinimumPrice" class="text-xs text-center mt-5">Minimumspris: {{restaurant.minimumPrice}} kr.</p>
  </div>
  
  </div>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const router = useRouter()
const basketStore = useBasketStore()
const props = defineProps({
  restaurant: Object,
  textColor: String
});

const showComment = ref(false)
const orderComment = ref("")
const addedComment = ref("")

function cancelComment() {
  orderComment.value = ""
  showComment.value = false
}

function removeComment () {
  orderComment.value = ""
  addedComment.value = ""
  showComment.value = false
}

function addComment() {
  addedComment.value = orderComment.value
  showComment.value = false
}

function goToCheckout () {
  if (basketStore.reachedMinimumPrice) {
    basketStore.comment = addedComment.value
    router.push({path: `/checkout/${props.restaurant.slug}`})
  }
}

watch(addedComment, (comment) => {
  localStorage.setItem(`comment-${props.restaurant.slug}`, comment)
})

onMounted(() => {
  basketStore.$patch((state) => {
    state.comment = (localStorage.getItem(`comment-${props.restaurant.slug}`) || "")
    orderComment.value = state.comment
    addedComment.value = state.comment
  })
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  max-height: 8rem;
  transition-timing-function: ease-in;
  transition-duration: 300ms;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0rem;
  transition-timing-function: ease-in;
  transition-duration: 300ms;
}
</style>