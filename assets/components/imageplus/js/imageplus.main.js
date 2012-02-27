
ImagePlus = function( TVid, opts){

	this.tvID = TVid;
	this.tv = document.getElementById('tv'+TVid);
	
	this.browserId = 'imageplus'+TVid+'_imageSelect'; 
	this.target = {
		width: false,
		height: false
	};
	this.source = {
		url: '',
		width: false,
		height: false
	};
	this.crop = {
		x: 0,
		y: 0,
		minWidth:  0,
		minHeight: 0,
		maxWidth:  0,
		maxHeight: 0,
		constrainProportions: false
	};

	// Expand options
	for(i in opts){	this[i] = opts[i];	};



	// Check constraints
	if(this.target.width>-1 && this.target.height>-1){
		this.crop.constrainProportions = true;
	};

//-----------------------------------------------------------------------
this.init = function(){

		
		// Create Ext Image Browser
		this.setImageBrowser();
		
	}//
	
	
	
	//----------------------------------------------------------------------------
	this.setImageBrowser = function(){
		this.preview = document.getElementById('imageplus'+this.tvID+'_preview');
		this.browser = MODx.load({			
						xtype: 'modx-panel-tv-image'
						,renderTo: this.browserId
					//	,tv: this.tvID
						,value: ''//this.img.src
						,relativeValue: ''//this.img.src
						,width: '97%'
						,allowBlank: true
						,wctx: 'mgr'
				//		,openTo: this.getOpenTo()
				//		,source: this.mediaSourceId
						,msgTarget: 'under'
						,imageplus: this
						,listeners: {
							'select': {fn:function(data) {
								MODx.fireResourceFormChange();
								this.imageplus.update(data,this);

							}}
						}
					});	
	}//
	
	
	
	
	
	
	//----------------------------------------------------------------------------
	this.update = function(data,fileBrowser){
		
		this.source.url = data.fullRelativeUrl;
		this.source.width = data.image_width;
		this.source.height = data.image_height;
		
		if(this.target.width!=false){
			this.crop.minWidth = (this.target.width<this.source.width)? this.target.width : this.source.width;
		};
		if(this.target.height!=false){
			this.crop.minHeight = (this.target.height<this.source.height)? this.target.height : this.source.height;
		};
	
		console.log(fileBrowser);
		
		var str = Array(this.source.url,this.target.width,this.target.height).join('|');
		
		this.source.root = data.thumb.split('connectors/system')[0];
		
		this.tvUpdate();
		
		
	}//
	
	
	//--------------------------------------------------------------------------------
	this.tvUpdate = function(){
	
		var thumbOpts = {
			src : 	this.source.root+this.source.url,
			w: 		this.target.width,
			h: 		this.target.height,
			sx: 	0,
			sy: 	0,
			sw: 	1280,
			sh: 	320,
			type:	'initial'
			};
		this.connector(thumbOpts);
	
	};//
	
	
	this.receiveTVupdate = function(value){
		this.preview.src = value;
		this.tv.value = value;
	};



	// Hit Connector to get a thumb url ---------------------------------------------------------------------
	this.connector = function(opts,iptype){
		Ext.Ajax.request({
			url : this.connectorUrl , 
			params : opts,
			method: 'GET',
			imageplus: this,
			iptype: iptype || 'normal',
			success: function ( result, request ) { 
				request.imageplus.connectorResponse(result,request);
			},
			failure: function ( result, request) { 
				requests.imageplus.connectorResponse(result,request,true);
			} 
		});
	};
	
	// Handles response from connector ------------------------------------------------------------------------
	this.connectorResponse = function(result,request,error){
		if(error!=null){alert('error');return;};

		console.log(result.responseText);
		if(request.iptype == 'normal'){
			this.connector({src: result.responseText,w:300},'mgr');
			this.tv.value = result.responseText;
		} else {
			this.preview.src = result.responseText;
		};
				
	};

	
	
	
	// AUTOSTART
	this.init();

};// end ImagePlus



