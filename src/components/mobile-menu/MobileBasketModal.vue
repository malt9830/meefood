<template>
  <Teleport to="body">
    <Transition name="slide" :duration="400">
      <div v-if="showBasket" class="fixed left-0 bottom-0 z-40 w-full flex justify-end pb-16">
        <aside class="w-full z-10 bg-white p-4 rounded-t-2xl shadow-top">
          <p class="text-2xl text-gray-500 font-semibold">Kurv</p>
          <p v-if="basketStore.basket.length === 0">Din kurv er tom</p>
          <div v-for="dish in basketStore.basket" :key="dish.name" class="flex flex-col" >
            <hr class="my-2 border-gray-300">
            <div class="flex justify-between items-center text-md">
              <h3 >{{ dish.amount }}x {{ dish.name }}</h3>
              <p >{{ dish.amount * dish.price }} kr</p>
            </div>
            <div class="flex justify-between items-center text-sm">
              <p class="text-xs" v-if="dish.comment">"{{ dish.comment }}"</p>
              <!-- <p v-if="!dish.comment && !dish.options" class="text-emerald-500 underline underline-offset-1">Tilføj note</p> -->
              <p class="text-xs" v-if="dish.options">{{dish.picked}}</p>
              <div class="flex items-center ml-auto">
                <Minus @click="basketStore.subtractAmount(dish)" class="h-6 fill-emerald-500 cursor-pointer"/>
                <Plus @click="basketStore.addAmount(dish)" class="h-6 fill-emerald-500 cursor-pointer"/>
              </div>
            </div>
          </div>
          <hr class="my-4 border-emerald-500">
          <div>
            <div @click="showComment = !showComment" class="flex gap-2 items-center cursor-pointer duration-200">
              <Comment class="fill-emerald-500 h-6 w-auto"/>
              <p class="underline underline-offset-1 leading-none">{{ addedComment ? 'Redigér note' : 'Tilføj note' }}</p>
            </div>
            <Transition name="comment" :duration="300">
              <div v-if="showComment" class="overflow-hidden mt-2 duration-300">
                <textarea v-model="orderComment" placeholder="Skriv din note her" class="block w-full h-16 p-1 border border-emerald-500 text-black rounded resize-none focus:outline-none"></textarea>
                <div v-if="!addedComment" class="grid grid-cols-2 gap-2 mt-2">
                  <button @click="cancelComment" class="bg-emerald-200 text-emerald-900 py-1 px-2 hover:opacity-75 duration-200 rounded">Luk</button>
                  <button @click="addComment" class="bg-emerald-500 text-white py-1 px-2 hover:opacity-75 duration-200 rounded">Tilføj</button>
                </div>
                <div v-else class="grid grid-cols-2 gap-2 mt-2">
                  <button @click="removeComment" class="bg-emerald-200 text-emerald-900 py-1 px-2 hover:opacity-75 duration-200 rounded">Fjern</button>
                  <button @click="addComment" class="bg-emerald-500 text-white py-1 px-2 hover:opacity-75 duration-200 rounded">Opdatér</button>
                </div>
              </div>
            </Transition>
          </div>

          <hr class="my-4 border-emerald-500">
          <div v-if="basketStore.basket.length > 0" class="mb-4">
            <div class="flex justify-between">
              <p class="font-medium">Subtotal</p>
              <p>{{ basketStore.totalPrice }} kr</p>
            </div>
            <div class="flex justify-between">
              <p class="font-medium">Levering</p>
              <p>{{ 30 }} kr</p>
            </div>
            <div class="flex justify-between">
              <p class="font-medium">Samlet</p>
              <p>{{ basketStore.totalPrice + 30 }} kr</p>
            </div>
          </div>
          <button @click="goToCheckout" :class="{ 'brightness-50 pointer-events-none' : basketStore.basket.length === 0 || !basketStore.reachedMinimumPrice}" class="block text-center w-full bg-emerald-500 text-white font-semibold rounded-xl py-4 transform duration-200 hover:bg-emerald-600 active:scale-95">Gå til kassen</button>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useBasketStore } from "/src/stores/basketStore";

const props = defineProps(['showBasket'])
const emits = defineEmits(['closeBasket'])
const basketStore = useBasketStore();
const router = useRouter()
const route = useRoute()

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
    emits('closeBasket')
    basketStore.comment = addedComment.value
    router.push({path: `/checkout/${route.params.id}`})
  }
}

watch(addedComment, (comment) => {
  localStorage.setItem(`comment-${route.params.id}`, comment)
})

watch(props, () => {
  basketStore.comment = (localStorage.getItem(`comment-${route.params.id}`) || "")
  orderComment.value = basketStore.comment
  addedComment.value = basketStore.comment
})

// onMounted(() => {
//   basketStore.$patch((state) => {
//     state.comment = (localStorage.getItem(`comment-${route.params.id}`) || "")
//     orderComment.value = state.comment
//     addedComment.value = state.comment
//   })
// })
</script>

<style scoped>
.slide-enter-active aside,
.slide-leave-active aside {
  transform: translateY(0%);
  transition-duration: 400ms;
}

.slide-enter-from aside,
.slide-leave-to aside {
  transform: translateY(100%);
  transition-duration: 400ms;
}
.comment-enter-active,
.comment-leave-active {
  max-height: 8rem;
  transition-timing-function: ease-in;
  transition-duration: 300ms;
}

.comment-enter-from,
.comment-leave-to {
  max-height: 0rem;
  transition-timing-function: ease-in;
  transition-duration: 300ms;
}
</style>