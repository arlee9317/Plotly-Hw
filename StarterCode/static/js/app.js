//reading data from json file

d3.json('samples.json').then((data) => {
	var sample = data.samples
	var identifiers = data.names
	var metadata = data.metadata
	
	// creating an array of the id values to diplay in the drop down menu
	var sel = document.getElementById('selDataset');
		for(var i = 0; i < identifiers.length; i++){
			var opt = document.createElement('option');
			opt.innerHTML = identifiers[i];
			opt.value = identifiers[i];
			sel.appendChild(opt);
		}
	
	// getting first value when loading page
	let firstID = d3.select('#selDataset').node().value;
	

		// grab drop down menu value on each change
	document.getElementById('selDataset').addEventListener('change', function() {
		var dropdownMenuID = this.value
		//console.log(dropdownMenuID) checking to see what ID value I'm getting from the dropdown menu

		
		var selectedID = sample.filter(filteredID)[0];
		//console.log(selectedID); Seeing if all the values associated with the key are called
		
		//moving data values into variables to display in bar chart
		var yaxis = selectedID.otu_ids;
		var xaxis = selectedID.sample_values;
		var Labels = selectedID.otu_labels;
		
		// displaying bar graph
		var update = [{
			x: xaxis.slice(0,9),
			y: yaxis.slice(0.9),
			type: 'bar',
			orientation: 'h',
			width:[0.8]
			
		}];

		var layout = {
			title:'Top 10 Bacteria Cultures Found',
			xaxis:{
				title: 'Sample Numbers',
				tickmode: 'array',
				//tickvals: xaxis.slice(0,9)
				
			},
			yaxis:{
				Title: 'OTU Labels',
				tickmode: 'array',
				tickvals: yaxis.slice(0.9),
				ticktext: 'OTU' + yaxis.slice(0,9)
			}
		
		};

		Plotly.newPlot('bar', update, layout);

		// Bubble Graph
		var bubblegraph = [{
			x: yaxis,
			y: xaxis,
			text: Labels,
			mode: 'markers',
			marker: { color: yaxis, size: xaxis}
		}]

		Plotly.newPlot('bubble', bubblegraph)

		// information for demographic
		
		var idInfo = metafilter(metadata);

		// grabbing info for each ID selected
		var demoInfo = "";
		idInfo.forEach((element) => {
			Object.entries(element).forEach(([key,value])=>{
				demoInfo = demoInfo +(`${key}: ${value} <br>`);
			})
						
		});

		// creating gauge for belly button washing frequency

		var gaugegraph = [{

			domain:{x: [0,1], y:[0,1]},
				value: idInfo[0].wfreq,
				title: {text: 'Number of Belly Button Washes'},
				type: "indicator",
				mode: "gauge+number",
				gauge: {axis:{range: [null, 9]}}
			}]
		
		Plotly.newPlot('gauge', gaugegraph);

		panelInfo();
		function panelInfo(){
			document.getElementById("sample-metadata").innerHTML = demoInfo;
		}

		function filteredID(menuID){
			return menuID.id.includes(dropdownMenuID);
		}

		 function metafilter(metaID){
			return metaID.filter(md => md.id == dropdownMenuID);
		}

	
	});	
	
	StartUp();
	function StartUp(){
		var dropdownMenuID = firstID;
		//console.log(dropdownMenuID) checking to see what ID value I'm getting from the dropdown menu

		
		var selectedID = sample.filter(filteredID)[0];
		//console.log(selectedID); Seeing if all the values associated with the key are called
		
		//moving data values into variables to display in bar chart
		var yaxis = selectedID.otu_ids;
		var xaxis = selectedID.sample_values;
		var Labels = selectedID.otu_labels;
		
		// displaying bar graph
		var update = [{
			x: xaxis.slice(0,9),
			y: yaxis.slice(0.9),
			type: 'bar',
			orientation: 'h',
			width:[0.8]
			
		}];

		var layout = {
			title:'Top 10 Bacteria Cultures Found',
			xaxis:{
				title: 'Sample Numbers',
				tickmode: 'array',
				//tickvals: xaxis.slice(0,9)
				
			},
			yaxis:{
				Title: 'OTU Labels',
				tickmode: 'array',
				tickvals: yaxis.slice(0.9),
				ticktext: 'OTU' + yaxis.slice(0,9)
			}
		
		};

		Plotly.newPlot('bar', update, layout);

		// Bubble Graph
		var bubblegraph = [{
			x: yaxis,
			y: xaxis,
			text: Labels,
			mode: 'markers',
			marker: { color: yaxis, size: xaxis}
		}]

		Plotly.newPlot('bubble', bubblegraph)

		// information for demographic
		
		var idInfo = metafilter(metadata);

		// grabbing info for each ID selected
		var demoInfo = "";
		idInfo.forEach((element) => {
			Object.entries(element).forEach(([key,value])=>{
				demoInfo = demoInfo +(`${key}: ${value} <br>`);
			})
						
		});

		// creating gauge for belly button washing frequency

		var gaugegraph = [{

			domain:{x: [0,1], y:[0,1]},
				value: idInfo[0].wfreq,
				title: {text: 'Number of Belly Button Washes'},
				type: "indicator",
				mode: "gauge+number",
				gauge: {axis:{range: [null, 9]}}
			}]
		
		Plotly.newPlot('gauge', gaugegraph);

		panelInfo();
		function panelInfo(){
			document.getElementById("sample-metadata").innerHTML = demoInfo;
		}

		function filteredID(menuID){
			return menuID.id.includes(dropdownMenuID);
		}

		 function metafilter(metaID){
			return metaID.filter(md => md.id == dropdownMenuID);
		}



	}
	
})
