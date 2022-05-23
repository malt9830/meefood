<template>
	<h2 class="flex flex-row gap-2 text-white text-3xl md:text-4xl font-bold mb-8">
		<span>Spis</span>
		<span :class="[wordHidden ? 'max-w-0' : 'max-w-[6rem]']" class="inline-block underline underline-offset-4 overflow-x-clip overflow-y-visible duration-[800ms]">{{ currentWord }}</span>
		<span>som helst</span>
	</h2>
</template>

<script setup>
const currentWord = ref("hvad");
const wordHidden = ref(false);

setInterval(() => {
	wordHidden.value = true;

	setTimeout(() => {
		wordHidden.value = false;

		if (currentWord.value === "hvad") {
			currentWord.value = "hvor";
		} else if (currentWord.value === "hvor") {
			currentWord.value = "når";
		} else if (currentWord.value === "når") {
			currentWord.value = "hvad";
		}
	}, 1000);
}, 2500);
</script>

<style scoped>
.shift-enter-active,
.shift-leave-active {
	transition: all 700ms ease-in-out;
}

.shift-enter-from {
	color: transparent;
	transform: translateY(-100%);
}
.shift-leave-to {
	color: transparent;
	transform: translateY(100%);
}
</style>
