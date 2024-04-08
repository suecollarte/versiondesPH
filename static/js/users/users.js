$(document).ready(function(){

	$('#tablaregs').DataTable({
		language: {url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-CL.json'},
		pagingType: 'full_numbers',
		bJQueryUI: 'true',
		iDisplayLength: '25',
		order: [[1, 'asc']],
		columnDefs: [
			{ orderable: false, targets: [0,5] }
		  ]
		});

	});

