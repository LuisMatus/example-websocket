<template>
	<v-container grid-list-md text-xs-center>
		<v-layout  xs row wrap>
			<v-flex xs12>
				<v-card dark color="primary">
					<v-card-text class="px-0">12</v-card-text>
				</v-card>
			</v-flex>
			<v-flex v-for="i in 2" :key="`6${i}`" xs6>
				<v-card dark color="secondary">
				<v-card-text class="px-0">6</v-card-text>
				</v-card>
			</v-flex>
			<v-flex v-for="i in 3" :key="`4${i}`" xs4>
				<v-card dark color="primary">
				<v-card-text class="px-0">4</v-card-text>
				</v-card>
			</v-flex>
			<v-flex v-for="i in 4" :key="`3${i}`" xs3>
				<v-card dark color="secondary">
				<v-card-text class="px-0">3</v-card-text>
				</v-card>
			</v-flex>
			<v-flex v-for="i in 6" :key="`2${i}`" xs2>
				<v-card dark color="primary">
				<v-card-text class="px-0">2</v-card-text>
				</v-card>
			</v-flex>
			<v-flex v-for="i in 12" :key="`1${i}`" xs1>
				<v-card dark primary color="secondary">
				<v-card-text class="px-0">1</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-img
						src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
						aspect-ratio="2.75"
					></v-img>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">Kangaroo Valley Safari</h3>
							<div> {{ card_text }} </div>
						</div>
					</v-card-title>

					<v-card-actions>
						<v-btn flat color="pink darken-4">Share</v-btn>
						<v-btn flat color="orange">Explore</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
	
<script>
	export default {
		data () {
			return {
				card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
			}
		}
	}
</script>