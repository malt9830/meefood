<template>
	<section class="m-4 lg:grid lg:grid-cols-2">
		<div class="">
			<div class="flex flex-col">
				<div class="flex flex-row space-x-2 self-center lg:self-start">
					<h3>Har du allerede en bruger?</h3>

					<svg xmlns="http://www.w3.org/2000/svg" width="28.503" height="28.503" viewBox="0 0 28.503 28.503">
						<g id="user-outline" transform="translate(-20.15 -20.15)">
							<circle id="Ellipse_276" data-name="Ellipse 276" cx="14.252" cy="14.252" r="14.252" transform="translate(20.15 20.15)" fill="#10b981" />
							<g id="Group_394" data-name="Group 394" transform="translate(26.405 26.121)">
								<path id="Path_319" data-name="Path 319" d="M69.784,129.093H55.149a.665.665,0,0,1-.666-.7,7.979,7.979,0,0,1,15.933.034.635.635,0,0,1-.635.667Zm-7.333-7.737a7.5,7.5,0,0,0-7.482,7.063.175.175,0,0,0,.048.134.186.186,0,0,0,.134.057H69.779a.152.152,0,0,0,.111-.047.157.157,0,0,0,.041-.111A7.5,7.5,0,0,0,62.451,121.356Z" transform="translate(-54.482 -112.531)" fill="#fff" />
								<path id="Path_320" data-name="Path 320" d="M90.071,60.241a4.171,4.171,0,1,1,4.171-4.171A4.171,4.171,0,0,1,90.071,60.241Zm0-7.858a3.687,3.687,0,1,0,3.687,3.687A3.687,3.687,0,0,0,90.071,52.384Z" transform="translate(-82.102 -51.9)" fill="#fff" />
							</g>
						</g>
					</svg>
				</div>

				<a href="/#" class="bg-emerald-500 rounded-2xl py-2 px-6 text-white hover:opacity-75 self-center lg:self-start m-3">Log ind</a>

				<div class="inline-flex rounded-full border border-black focus:shadow-lg bg-white self-center lg:self-start m-3" role="group">
					<a href="/#" type="button" class="border-r border-black bg-emerald-500 rounded-2xl inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase hover:bg-emerald-500 hover:text-white focus:text-white focus:bg-emerald-500 focus:outline-none focus:ring-0 active:bg-emerald-600 transition duration-150 ease-in-out">Udbringning</a>

					<a href="/#" type="button" class="rounded-2xl inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase focus:text-white focus:bg-emerald-500 focus:outline-none focus:ring-0 active:bg-emerald-600 transition duration-150 ease-in-out">Hent selv</a>
				</div>
			</div>
			<div class="space-y-3">
				<h2>Leveringstid</h2>
				<div>
					<button id="dropdownDefault" data-dropdown-toggle="dropdown" class="inline-flex items-center rounded-lg bg-white border px-4 py-2.5 text-center text-gray-500 focus:outline-none focus:ring-4" type="button">
						Dropdown button <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
					</button>

					<div id="dropdown" class="z-10 hidden w-44 divide-y divide-emerald-100 rounded bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(391.2px, 681.6px, 0px)">
						<ul class="py-1 text-sm text-emerald-700 dark:text-emerald-200" aria-labelledby="dropdownDefault">
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">Hurtigst muligt</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">option 1</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">option 2</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">option 3</a>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<button id="dropdownDefault" data-dropdown-toggle="dropdown" class="inline-flex items-center rounded-lg bg-white border px-4 py-2.5 text-center text-gray-500 focus:outline-none focus:ring-4" type="button">
						Dropdown button <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
					</button>

					<div id="dropdown" class="z-10 hidden w-44 divide-y divide-emerald-100 rounded bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(391.2px, 681.6px, 0px)">
						<ul class="py-1 text-sm text-emerald-700 dark:text-emerald-200" aria-labelledby="dropdownDefault">
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">Hurtigst muligt</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">option 1</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">option 2</a>
							</li>
							<li>
								<a href="#" class="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-600 dark:hover:text-white">option 3</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="space-y-4">
				<h2>Leveringsadresse</h2>
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Fornavn" type="text" placeholder="Fornavn" />
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Efternavn" type="text" placeholder="Efternavn" />
				<div class="grid grid-cols-[auto_6rem] gap-2">
					<input class="mr-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Adresse" type="text" placeholder="Adresse" />
					<input class="w- shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="postnummer" type="text" placeholder="Post nr." />
				</div>
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="text" placeholder="Email" />
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Telefonnummer" type="text" placeholder="Telefonnummer" />
				<h2>Betalingsmetode</h2>
				<div class="flex space-x-2">
					<a href="">
						<img src="Image 18.png" alt="" />
					</a>
					<a href="">
						<img src="Image 19.png" alt="" />
					</a>
					<a href="">
						<img src="Image 20.png" alt="" />
					</a>
					<a href="">
						<img src="Image 21.png" alt="" />
					</a>
				</div>
			</div>
			<div class="pt-6">
				<a href="/#" class="bg-emerald-500 rounded-2xl py-2 px-6 text-white hover:opacity-75 self-center m-3"> log ind</a>
				<a href="/#" class="bg-emerald-500 rounded-2xl py-2 px-6 text-white hover:opacity-75 self-center m-3"> log ind</a>
			</div>
		</div>
	</section>
</template>
