<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-emerald-50"
  >
    <Header class="sm:absolute sm:top-0 sm:left-0 bg-emerald-700" />
    <ArrowLeft
      @click="$emit('closePayment')"
      class="w-10 sm:absolute sm:top-24 sm:left-5 hover:opacity-75 cursor-pointer"
    />
    <div
      class="sm:absolute drop-shadow-xl sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-3/4 md:w-5/12 h-full bg-emerald-50 sm:h-fit sm:bg-gradient-to-b sm:from-emerald-500 sm:to-emerald-300 sm:rounded-2xl pt-20 sm:pt-0"
    >
      <div class="flex flex-col justify-between my-5 gap-y-2">
        <div class="flex justify-center gap-x-5">
          <img class="w-14" src="@/assets/cards/visa.jpg" alt="visa" />
          <img
            class="w-14"
            src="@/assets/cards/mastercard.jpg"
            alt="mastercard"
          />
          <img class="w-14" src="@/assets/cards/dankort.jpg" alt="dankort" />
        </div>

        <form class="flex flex-col gap-y-5 mx-5">
          <div class="flex flex-col gap-y-2">
            <label for="cardName" class="text-black sm:text-white">Navn på kortholder</label>
            <input
              id="name"
              class="p-1.5 border-2 rounded focus:outline-none text-gray-600"
              type="text"
              name="cardName"
              placeholder="John Doe"
              required
              v-model="nameOnCard"
              @input="checkName"
            />
            <p v-if="nameOnCardError" class="bg-red-500 w-fit p-1 rounded text-xs">
              Dette felt er påkrævet
            </p>
          </div>

          <div class="flex flex-col gap-y-2">
            <label for="cardNumber" class="text-black sm:text-white">Kortnummer</label>
            <input
              id="number"
              class="p-1.5 border-2 rounded focus:outline-none text-gray-600"
              type="text"
              name="cardNumber"
              placeholder="XXXX XXXX XXXX XXXX"
              minLength="19"
              maxLength="19"
              @keydown="formatNumber($event)"
              required
              v-model="cardNumber"
              @input="checkNumber"
            />
            <p v-if="cardNumberError" class="bg-red-500 w-fit p-1 rounded text-xs">
              Dette felt er påkrævet
            </p>
          </div>

          <div class="flex justify-between gap-x-2">
            <div class="flex gap-x-1 w-1/2">
              <div class="flex flex-col gap-y-2 w-1/2">
                <label for="expiryMonth" class="text-black sm:text-white">Udløbdato</label>
                <input
                  v-model="expiryMonth"
                  id="month"
                  class="p-1.5 border-2 rounded focus:outline-none text-gray-600"
                  type="text"
                  name="expiryMonth"
                  placeholder="MM"
                  @keydown="formatMonth"
                  @input="checkMonth"
                />
                <p v-if="expiryMonthError" class="bg-red-500 w-fit p-1 rounded text-xs">
                  Dette felt er påkrævet
                </p>
              </div>
              <div class="flex flex-col gap-y-2 w-1/2">
            <label for="expiryYear" class="invisible"> . </label>
                <input
                  v-model="expiryYear"
                  id="year"
                  class="p-1.5 border-2 rounded focus:outline-none text-gray-600"
                  type="text"
                  name="expiryYear"
                  placeholder="YY"
                  minlength="2"
                  maxlength="2"
                  @keydown="formatYear"
                  @input="checkYear"
                />
                <p v-if="expiryYearError" class="bg-red-500 w-fit p-1 rounded text-xs">
                  Dette felt er påkrævet
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-y-2 w-1/3">
              <label for="securityCode" class="text-black sm:text-white">CVV nr</label>
              <input
                v-model="securityCode"
                id="code"
                class="p-1.5 border-2 rounded focus:outline-none text-gray-600"
                type="text"
                name="securityCode"
                placeholder="XXX"
                minLength="3"
                maxLength="3"
                @input="checkCode"
              />
              
            </div>
          </div>
        </form>
      </div>
    </div>
    <button
      @click="pay"
      class="absolute left-1/2 -translate-x-1/2 rounded-xl font-medium hover:opacity-75 duration-200 bottom-14 p-1.5 bg-emerald-500"
    >
      Godkend betaling
    </button>
  </div>
  <ThankYou v-if="paymentValid" :restaurant="restaurant" :levering="levering" :deliveryDay="deliveryDay" :deliveryHour="deliveryHour" />
</template>

<script setup>
const nameOnCard = ref("");
const cardNumber = ref("");
const expiryMonth = ref("");
const expiryYear = ref("");
const securityCode = ref("");
const paymentValid = ref(false);

const props = defineProps({
  restaurant: Object,
  levering: Boolean,
  deliveryDay: String,
  deliveryHour: String,
});

function formatNumber(e) {
  e.target.value = e.target.value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatMonth() {
  if (expiryMonth.value > 1 && expiryMonth.value.length == 1) {
    expiryMonth.value = `0${expiryMonth.value}`;
    expiryMonthError.value = false;
    document.querySelector("#year").focus();
  } else if (expiryMonth.value.length == 2 && expiryMonth.value[1] <= 2) {
    document.querySelector("#year").focus();
  } else if (expiryMonth.value[1] > 2) {
    expiryMonthError.value = true;
  }
}

function formatYear() {
  if (expiryYear.value.length == 2) {
    document.querySelector("#code").focus();
  }
}

function checkName() {
    if (nameOnCard.value.length > 1 && document.querySelector("#name").classList.contains("border-red-500")) {
    document.querySelector("#name").classList.remove("border-red-500")
  } else if (nameOnCard.value.length < 1) {
    document.querySelector("#name").classList.add("border-red-500")
  }
}

function checkNumber() {
    if (cardNumber.value.length > 1 && document.querySelector("#number").classList.contains("border-red-500")) {
    document.querySelector("#number").classList.remove("border-red-500")
  } else if (cardNumber.value.length < 1) {
    document.querySelector("#number").classList.add("border-red-500")
  }
}

function checkMonth() {
    if (expiryMonth.value.length > 1 && document.querySelector("#month").classList.contains("border-red-500")) {
    document.querySelector("#month").classList.remove("border-red-500")
  } else if (expiryMonth.value.length < 1) {
    document.querySelector("#month").classList.add("border-red-500")
  }
}

function checkYear() {
    if (expiryYear.value.length > 1 && document.querySelector("#year").classList.contains("border-red-500")) {
    document.querySelector("#year").classList.remove("border-red-500")
  } else if (expiryYear.value.length < 1) {
    document.querySelector("#year").classList.add("border-red-500")
  }
}

function checkCode() {
    if (securityCode.value.length > 1 && document.querySelector("#code").classList.contains("border-red-500")) {
    document.querySelector("#code").classList.remove("border-red-500")
  } else if (securityCode.value.length < 1) {
    document.querySelector("#code").classList.add("border-red-500")
  }
}

function pay() {
  if (nameOnCard.value.length < 1) {
    document.querySelector("#name").classList.add("border-red-500")
  }
  if (cardNumber.value.length < 19) {
    document.querySelector("#number").classList.add("border-red-500")
  }
  if (expiryMonth.value.length < 2) {
    document.querySelector("#month").classList.add("border-red-500")
  }
  if (expiryYear.value.length < 2) {
    document.querySelector("#year").classList.add("border-red-500")
  }
  if (securityCode.value.length < 3) {
    document.querySelector("#code").classList.add("border-red-500")
  }
  if (nameOnCard.value.length > 1 && cardNumber.value.length === 19 && expiryMonth.value.length == 2 && expiryYear.value.length == 2 && securityCode.value.length === 3) {
      paymentValid.value = true;
  }
}
</script>
