<template lang="pug">
	.secction-home
		v-container( grid-list-md text-xs-center)
			v-layout( row wrap)
				v-flex( xs12)
					h1 Update Transaccions

					v-toolbar( flat color="white")
						v-toolbar-title Transaccions
						v-divider( class="mx-5" inset vertical)
						v-spacer

						v-dialog( v-model="dialog" max-width="500px")
							template( v-slot:activator="{ on }")
							//<v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
							v-card
								v-card-title
									span( class="headline") ID_TRASACCION  {{ editedItem.ID_TRASACCION }}
								v-card-text
									v-container( grid-list-md)
										v-layout(wrap)
											v-flex( xs12 sm6 )
												p ID_CLIENTE:   {{editedItem.ID_CLIENTE}}
											
											v-flex( xs12 sm6 md4)
												v-text-field( v-model="editedItem.ID_ARTICULO" label="ID_ARTICULO")
											v-flex( xs12 sm6 md4)
												v-text-field( v-model="editedItem.PRECIO" label="PRECIO")
											v-flex( xs12 sm6 md4)
												v-text-field( v-model="editedItem.CANTIDAD" label="CANTIDAD")
											v-flex( xs12 sm6 md4)
												v-text-field( v-model="editedItem.COSTO" label="COSTO")
											v-flex( xs12 sm6 md4)
												v-date-picker( v-model="editedItem.FECHA"  label="FECHA")
								

									v-card-actions
										v-spacer
										v-btn( color="blue darken-1" flat @click="close") Cancel 
										v-btn( color="blue darken-1" flat @click="save") Save

								


					v-data-table( :headers="headers"  :items="transactions" :rowsPerPageItems="rowsPerPage" class="elevation-1")
						template( v-slot:items="props")
							td( class="text-xs-left") {{ props.item.ID_TRASACCION }} 
							td( class="text-xs-left") {{ props.item.ID_CLIENTE }} 
							td( class="text-xs-left") {{ props.item.ID_ARTICULO }} 
							td( class="text-xs-left") {{ props.item.PRECIO }} 
							td( class="text-xs-left") {{ props.item.CANTIDAD }} 
							td( class="text-xs-left") {{ props.item.COSTO }}
							td( class="text-xs-left") {{ props.item.FECHA.substring(0, 10 ) }}  

							td( class="justify-center  layout px-0")
								v-icon( medium class="mr-2 md-18 "   @click="showData(props.item)") edit
								//v-icon(  medium				 @click="deleteItem(props.item)") delete
		
</template>


<script>
	var Axios = require('axios');
	export default {
		data(){
			return {
				dialog: false,
				headers: [
					{ text: 'ID_TRASACCION ', value: '', sortable: false },
					{ text: 'ID_CLIENTE ', 		value: '', sortable: false  },
					{ text: 'ID_ARTICULO', value: '', sortable: false  },
					{ text: 'PRECIO', value: '', sortable: false  },
					{ text: 'CANTIDAD', value: 'name', sortable: false },
					{ text: 'COSTO', value: 'name',sortable: false },
					{ text: 'FECHA ',  		value: '',  sortable: false},
					{text: 'Actions', value: 'name', sortable: false}
				],
				//desserts: [],
				editedIndex: -1,
				editedItem: {
					ID_TRASACCION:	'',
					ID_CLIENTE:	'',
					ID_ARTICULO:	'',
					PRECIO:	'',
					CANTIDAD:	'',
					COSTO:	'',
					FECHA:	'',

				},
				defaultItem: {
					ID_TRASACCION:	'',
					ID_CLIENTE: '',
					ID_ARTICULO:	'',
					PRECIO:	'',
					CANTIDAD:	'',
					COSTO:	'',
					FECHA:	'',
				},
				transactions :[],
				rowsPerPage: [50, 500,1000],
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

			this.fetchData();
		},

		methods: {

			fetchData(){
				Axios.post('/api/v1/get-data')
				.then( (response)=>{
					// handle success
					this.transactions = response.data.transactions;
					//console.log(response.data);
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
			showData (item) {
				this.editedIndex = this.transactions.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			/*deleteItem (item) {


				const index = this.transactions.indexOf(item)
				let status= confirm('Are you sure you want to delete this item?')
				if(status){
					this.transactions.splice(index, 1); 
					this.updateTransactions(item._id);

				} 
			},*/

			close () {
				this.dialog = false;
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				}, 300)
			},

			save () {
				if (this.editedIndex > -1) {
					Object.assign(this.transactions[this.editedIndex], this.editedItem);
				
					this.saveData(this.editedItem);
				} else {
					this.transactions.push(this.editedItem)
				}

				this.close()
			},
			saveData(data){

				console.log(data);

				Axios.put('/api/v1/transactions/'+data.ID_TRASACCION, data)
				.then( (response)=>{
					// handle success
					//this.transactions = response.data.transactions;
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

			}
		}
	}
</script>