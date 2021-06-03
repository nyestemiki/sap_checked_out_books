sap.ui.define(
	[
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/FilterType',
		'sap/ui/model/FilterOperator',
		'../model/formatter',
		'sap/m/MessageToast'
	],
	(Controller, Filter, FilterType, FilterOperator, formatter, MessageToast) => {
		'use strict'

		return Controller.extend('library.controller.BookList', {
			formatter,
			onSearchBooks(oEvent) {
				const filters = []

				if (this.getView().byId('cb_title').mProperties.selected) {
					filters.push(
						new Filter(
							'Title',
							FilterOperator.Contains,
							`${oEvent.getParameter('query')}` ?? ''
						)
					)
				}
				if (this.getView().byId('cb_first').mProperties.selected) {
					filters.push(
						new Filter(
							'FirstName',
							FilterOperator.Contains,
							`${oEvent.getParameter('query')}` ?? ''
						)
					)
				}
				if (this.getView().byId('cb_last').mProperties.selected) {
					filers.push(
						new Filter(
							'LastName',
							FilterOperator.Contains,
							`${oEvent.getParameter('query')}` ?? ''
						)
					)
				}
				if (this.getView().byId('cb_author').mProperties.selected) {
					filters.push(
						new Filter(
							'Author',
							FilterOperator.Contains,
							`${oEvent.getParameter('query')}` ?? ''
						)
					)
				}

				if (filters.length === 0) {
					MessageToast.show('Please select at least a filter')
					return
				}

				this.getView()
					.byId('idBooksTable')
					.getBinding('rows')
					.filter(
						new Filter({
							filters,
							and: true
						}),
						FilterType.Application
					)
			}
		})
	}
)
