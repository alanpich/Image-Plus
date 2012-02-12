ImagePlusArray = new Array();

ImagePlus = function( TVid, opts){ //===============================================================|

	this.TVid = TVid;
	
	
	// Set defaults
	var phpThumb = MODx.config.connectors_url+'system/phpthumb.php?';	//?h=150&w=150&src='+data.url+'&wctx={$ctx}&source={$source};
	this.TV = '';
	this.buttonText = 'Crop Image';
	
	// Override defaults
	for(i in opts){this[i]=opts[i]};
	
	if(this.targetWidth==''){this.targetWidth=0};
	this.targetWidth = parseInt(this.targetWidth);
	if(this.targetHeight==''){this.targetHeight=0};
	this.targetHeight = parseInt(this.targetHeight);
	
	
	// Private non-settable
	this.crop = { x:0, y:0, w:0, h:0 };
	this.img = {
			src: '',
			width: 0,
			height: 0
		};

	
	
	// Startup functions ----------------------------------------------------------------------------
	this.init = function(){
	
			// Add this to global parent
			ImagePlusArray[this.TVid] = this;
			
			// Gather bits
			this.tvInput = document.getElementById(this.tvInputId);
			
			// Parse TV for existing values
			this.parseTV();
			
			// Create Ext Image Browser
			this.setImageBrowser();
			
			// Create Image Preview
			this.setImagePreview();
			
			// Create Cropper window
			this.setCropper();
			
		};//
		
		
	// Parse TV for existing values ----------------------------------------------------------------
	this.parseTV = function(){
			var value = this.TV;
						
			if(value==''){return;};					// stop trying if no tv set
			value = value.replace(phpThumb,'');		// strip out phpThumb url
			
			var vars = value.split('&');
			for(var k=0;k<vars.length;k++){
				var bits = vars[k].split('=');
				var key = bits[0];
				var val = bits[1];
				switch(key){					
					case 'sx'	:	this.crop.x = parseInt(val);	break;
					case 'sy'	:	this.crop.y = parseInt(val);	break;
					case 'sw'	:	this.crop.w  = parseInt(val);	break;
					case 'sh'	:	this.crop.h  = parseInt(val);	break;
					case 'ipW'	:	this.img.width  = parseInt(val);	break;
					case 'ipH'	:	this.img.height  = parseInt(val);	break;			
					case 'src'	:	this.img.src = val.replace(this.baseUrl,'');		break;
				};
			};
		};//	
		

	// Set up Image Browser ------------------------------------------------------------------------
	this.setImageBrowser = function(){	
			this.browser = MODx.load({			
				xtype: 'modx-panel-tv-image'
				,renderTo: this.browserId
				,tv: this.TVid
				,value: this.img.src
				,relativeValue: this.img.src
				,width: '97%'
				,allowBlank: true
				,wctx: 'mgr'
				,openTo: this.getOpenTo()
				,source: this.mediaSourceId
				,msgTarget: 'under'
				,imagePlus: this
				,listeners: {
				    'select': {fn:function(data) {
				        MODx.fireResourceFormChange();
				        this.imagePlus.updateSourceImage(data);
				       
				    }}
				}
			});			
		};//
		
		
	// Get the path to open image browser to -------------------------------------------------------
	this.getOpenTo = function(){
			if(this.img.src==''){return ''};
			
			var bits = this.img.src.split('/');
			bits.pop();
			return bits.join('/');
		};
		
	// Updates imagePlus on source change ----------------------------------------------------------
	this.updateSourceImage = function(data){
			this.img.src 	= data.url;
			this.img.width 	= data.image_width;
			this.img.height = data.image_height;
			this.crop.w 	= data.image_width;
			this.crop.h 	= data.image_height;
			
			this.update();
		};//



	// Set up Image Preview ------------------------------------------------------------------------
	this.setImagePreview = function(){	
			document.getElementById(this.previewId).src = this.getImagePreviewSrc();
		};//
		
	// Get url src for preview thumbnail -----------------------------------------------------------
	this.getImagePreviewSrc = function(){
			return this.TV;
		};//



	// Set up crop window --------------------------------------------------------------------------
	this.setCropper = function(){
			this.cropButton = new Ext.Button({
				  renderTo: this.buttonId,
				  text: this.buttonText,
				  imagePlusId: this.TVid,
				  handler: function() {
						ImagePlusArray[this.imagePlusId].launchCropWindow();
					}
				});	
		};//
		
	// Launch cropper window ----------------------------------------------------------------------
	this.launchCropWindow = function(){
			this.window = new Extamples.CropWindow({
				imageUrl: this.baseUrl+encodeURIComponent(this.img.src),
				listeners:{
				save: function(){
				  // handler if a crop was successfull, and the window was closed
				  console.log('save!');
				},
				scope: this
				}
			});
			this.window.imagePlusId = this.TVid;
			this.window.show();
		};//
	
	
	// Crop selection saved, update ----------------------------------------------------------------
	this.onCropSave = function(data){
			this.crop.x = data.x;
			this.crop.y = data.y;
			this.crop.w = data.width;	
			this.crop.h = data.height;
			this.update();
			Ext.getCmp('modx-panel-resource').markDirty(); // Enable save button

		};//


	// Update the TV value ------------------------------------------------------------------
	this.update = function(){
		
			// Check for freeform
			var tW = (this.targetWidth==-1)? this.crop.w : this.targetWidth;
			var tH = (this.targetHeight==-1)? this.crop.h : this.targetHeight;
			
			var TV = phpThumb+'';
				TV+= 'h='+tH;
				TV+= '&w='+tW;
				TV+= '&src='+this.baseUrl+this.img.src;
				TV+= '&sx='+this.crop.x;		// Start Left crop
				TV+= '&sy='+this.crop.y;		// Start Top crop
				TV+= '&sw='+this.crop.w;			// Crop width
				TV+= '&sh='+this.crop.h;			// Crop height
				// SAVING OUR OWN STUFF
				TV+= '&ipW='+this.img.width;
				TV+= '&ipH='+this.img.height;
				
			this.TV = TV;
			this.tvInput.value = TV;
			this.setImagePreview();
		};//	
	
	
}// end ImagePlus object ============================================================================|
