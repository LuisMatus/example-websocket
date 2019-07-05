<template>
	<v-footer
		dark
		height="auto">
		<v-card class="flex" flat tile >

			<v-card-actions class="grey darken-3 justify-center">
				&copy;2019 — <strong>Coppel</strong>
			</v-card-actions>
		</v-card>
	</v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
  }
</script>