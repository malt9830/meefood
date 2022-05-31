<template>
	<section class="py-10 md:py-28">
		<div class="relative grid grid-cols-10 grid-rows-4 md:hidden">
			<div class="bg-emerald-600 col-start-1 col-end-11 row-start-3 row-end-5" />
			<img class="px-2 sm:px-12 col-span-full row-start-1 row-end-5" src="/src/assets/download-app/app-mockup.webp" alt="image mock-up of the app on two different phones" />
		</div>
		<div class="bg-emerald-600 text-white px-4 pb-12 pt-6 md:pt-12">
			<div class="max-w-4xl mx-auto grid gap-4 md:grid-cols-[2fr_3fr]">
				<div>
					<p class="text-3xl font-semibold">Download vores app</p>
					<p class="mt-2">Få det hele er lige ved hånden - de restauranter og den mad, du elsker. Find det mad der passer til dit humør, og få den første bid til at vare ved. Download os.</p>
					<div class="flex gap-2 mt-4">
						<img class="h-10" src="/src/assets/download-app/app-store-badge.svg" alt="download app icon for Apple App Store"/>
						<img class="h-10" src="/src/assets/download-app/google-play-badge.svg" alt="download app icon for Google Play Store"/>
					</div>
				</div>
				<div class="relative hidden md:block">
					<img class="absolute top-1/2 left-0 w-full transform -translate-y-1/2" src="/src/assets/download-app/app-mockup.webp" alt="image mock-up of the app on two different phones" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup></script>
