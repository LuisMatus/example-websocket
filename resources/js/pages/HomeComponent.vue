<template lang="pug">
	.secction-home(data-app)
		v-container( grid-list-md text-xs-center)
			v-layout( row wrap)
				v-flex( xs12)
					h1.primary Update Transaccions

					v-toolbar( flat color="white")
						v-toolbar-title Transaccions
						v-divider( class="mx-5" inset vertical)
						v-spacer

						v-dialog( v-model="dialog" max-width="500px")
							template( v-slot:activator="{ on }")
							//<v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
							v-card
								v-card-title
									span( class="headline") {{ formTitle }}
							v-card-text
								v-container( grid-list-md)
									v-layout(wrap)
										v-flex( xs12 sm6)
											v-text-field( v-model="editedItem.cliente.name" label="Nombre")
								
										v-flex( xs12 sm6 )
											v-text-field( v-model="editedItem.cliente.email" label="Email")
										
										v-flex( xs12 sm6 md4)
										<v-text-field( v-model="editedItem.cliente.tel" label="Tel")

										v-card-text( v-for="(item, key) in editedItem.info_form")
											<p><b>{{key+': '}}</b> {{item}}</p>
										
							

							v-card-actions
								v-spacer
								v-btn( color="blue darken-1" flat @click="close") Cancel
							


					v-data-table( :headers="headers"  :items="transactions" class="elevation-1")
						template( v-slot:items="props")
							td {{ props.item.type }}</td>
							td( class="text-xs-left") {{ props.item.agency }} 
							td( class="text-xs-left") {{ props.item.email_agency }} 
							td( class="text-xs-left") {{ props.item.agency }} 
							td( class="text-xs-left") {{ props.item.cliente.email }} 
							td( class="justify-cente)  layout px-0")
								v-icon( medium class="mr-2 md-18 "   @click="showData(props.item)") remove_red_eye
								v-icon(  medium				 @click="deleteItem(props.item)") archive
		
</template>


<script>
	var Axios = require('axios');
	export default {
		data(){
			return {
				dialog: false,
				headers: [
					{
						text: 'Departamento ',
						align: 'left',
						sortable: false,
						value: ''
					},
					{ text: 'Agencia ', 		value: '' },
					{ text: 'Email de Agencia', value: '' },
					{ text: 'Email Consumidor', value: '' },
					
					{ text: 'Status ',  		value: '' },
					
					{ text: 'Actions', value: 'name', sortable: false }
				],
				//desserts: [],
				editedIndex: -1,
				editedItem: {
					agency:	'',
					cliente:	{},
					email_agency:	'',
					info_form:	'',
					status:	'',
					type:	'',
				},
				defaultItem: {
					agency:	'',
					cliente:	{},
					email_agency:	'',
					info_form:	'',
					status:	'',
					type:	'',
				},
				transactions :[]
				//matus
			}

		},
		computed: {
			formTitle () {
				return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
			}
		},

		watch: {
			dialog (val) {
				val || this.close()
			}
		},

		created () {

			//this.initialize();
			this.fetchData();
		},

		methods: {

			fetchData(){
				Axios.post('/api/v1/get-data')
				.then( (response)=>{
					// handle success
					//this.correos = response.data;
					console.log(response.data);
					//this.reInit();
				})
				.catch(function (error) {
					// handle error
					//console.log(error);
				})
				.then(function () {
					// always executed
				});
			},
			updateTransactions(_id){
				Axios.put('/dashboard/seguimiento/'+_id)
				.then( (response)=>{
					// handle success
					//this.reInit();
				})
				.catch(function (error) {
					// handle error
					//console.log(error);
				})
				.then(function () {
					// always executed
				});
			},
			initialize () {
				this.desserts = [
					{
						name: 'Frozen Yogurt',
						calories: 159,
						fat: 6.0,
						carbs: 24,
						protein: 4.0
					},
					{
						name: 'Ice cream sandwich',
						calories: 237,
						fat: 9.0,
						carbs: 37,
						protein: 4.3
					},
					{
						name: 'Eclair',
						calories: 262,
						fat: 16.0,
						carbs: 23,
						protein: 6.0
					},
					{
						name: 'Cupcake',
						calories: 305,
						fat: 3.7,
						carbs: 67,
						protein: 4.3
					},
					{
						name: 'Gingerbread',
						calories: 356,
						fat: 16.0,
						carbs: 49,
						protein: 3.9
					},
					{
						name: 'Jelly bean',
						calories: 375,
						fat: 0.0,
						carbs: 94,
						protein: 0.0
					},
					{
						name: 'Lollipop',
						calories: 392,
						fat: 0.2,
						carbs: 98,
						protein: 0
					},
					{
						name: 'Honeycomb',
						calories: 408,
						fat: 3.2,
						carbs: 87,
						protein: 6.5
					},
					{
						name: 'Donut',
						calories: 452,
						fat: 25.0,
						carbs: 51,
						protein: 4.9
					},
					{
						name: 'KitKat',
						calories: 518,
						fat: 26.0,
						carbs: 65,
						protein: 7
					}
				];
			},

			showData (item) {
				console.log(item)
				this.editedIndex = this.transactions.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem (item) {


				const index = this.transactions.indexOf(item)
				let status= confirm('Are you sure you want to delete this item?')
				if(status){
					this.transactions.splice(index, 1); 
					this.updateTransactions(item._id);

				} 
			},

			close () {
				this.dialog = false;
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			save () {
				/*if (this.editedIndex > -1) {
				Object.assign(this.correos[this.editedIndex], this.editedItem)
				} else {
				this.correos.push(this.editedItem)
				}*/
				this.close()
			}
		}
	}
</script>