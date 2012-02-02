

	ImagePlus = function(){
		
		this.targetWidth = 100;
		this.targetHeight = 100;
		this.thumbURL = MODx.config.connectors_url+'system/phpthumb.php?';	//?h=150&w=150&src='+data.url+'&wctx={$ctx}&source={$source};
		this.TV = '';
		this.preview = false;
		
		this.sourceImg = {
				src: ''
			};
		this.crop = {
				sX:	0,
				sY: 0,
				w: 0,
				h: 0
			};
		
		
		// Set settings ----------------------------------------------------------------------
		this.set = function(obj){
				for(i in obj){
					this[i] = obj[i];
				};
			};//
		
		
		
		// Get url for preview thumb -----------------------------------------------------------
		this.getImageThumb = function(){
				return '';
			};//
			
			
		// Source Image changed, update --------------------------------------------------------
		this.updateSourceImage = function(data){
				this.sourceImg.src = data.url;
				this.sourceImg.width = data.image_width;
				this.sourceImg.height = data.image_height;
				this.crop.w = data.image_width;
				this.crop.h = data.image_height;
				
				this.update();
			};//
			
			
		// Update the TV value ------------------------------------------------------------------
		this.update = function(){
				
				var TV = this.thumbURL;
					TV+= 'h='+this.targetHeight;
					TV+= '&w='+this.targetWidth;
					TV+= '&src='+this.sourceImg.src;
					TV+= '&sx='+this.crop.sX;		// Start Left crop
					TV+= '&sy='+this.crop.sY;		// Start Top crop
					TV+= '&sw='+this.crop.w;			// Crop width
					TV+= '&sh='+this.crop.h;			// Crop height
					// SAVING OUR OWN STUFF
					TV+= '&ipW='+this.sourceImg.width;
					TV+= '&ipH='+this.sourceImg.height;
					
				this.TV = TV;
				this.tvInput.value = TV;
				this.previewThumb();
				console.log("UPDATED",this);
			};//
			
		// Break TV into variables for use -------------------------------------------------------
		this.parseTV = function(){
				var TV = this.tvInput.value;
				this.TV = TV;
				
				if(TV==''){return;};
				
				var bits = TV.split('?');
				var vars = bits[1].split('&');
				
				for(var k=0;k<vars.length;k++){
					var bits = vars[k].split('=');
					var key = bits[0];
					var val = bits[1];
					switch(key){
						case 'src'	:	this.sourceImg.src = val;		break;
						case 'sx'	:	this.crop.sX = parseInt(val);	break;
						case 'sy'	:	this.crop.sY = parseInt(val);	break;
						case 'sw'	:	this.crop.w  = parseInt(val);	break;
						case 'sh'	:	this.crop.h  = parseInt(val);	break;
						case 'ipW'	:	this.sourceImg.width  = parseInt(val);	break;
						case 'ipH'	:	this.sourceImg.height  = parseInt(val);	break;
					};
				};	
				
			};//
			
			
		// Generate a preview thumbnail -------------------------------------------------------
		this.previewThumb = function(){
				this.preview.src = this.TV;
			};//
			
			
			
		// Opens the cropping window -----------------------------------------------------------
		this.showCropWindow = function(){
			
				this.cropWindow = new MODx.Window({
						 title: 'Image Crop'
						,width: this.sourceImg.width+"px"
						,height: this.sourceImg.height
						,resizable: false
						,cancelBtnText:	'Done'
						,saveBtnText:	''
						,beforeSubmit: function(){
								alert("SAVE");
								return false;
							}
						,html: '<img src="'+this.siteUrl+this.sourceImg.src+'" id="crop'+this.TVid+'" />'
						,allowDrop: false
						
						
					});
				
				console.log('this.cropWindow',this.cropWindow);
				this.cropWindow.buttons.pop();
				
				this.cropWindow.show();
				window.currentImagePlus = this;
				jQuery('#crop'+this.TVid).Jcrop({
						aspectRatio: this.targetWidth / this.targetHeight,
						minSize: [this.targetWidth, this.targetHeight],
						onSelect: function(c){
							console.log(window.currentImagePlus);
							window.currentImagePlus.crop.sX = c.x;
							window.currentImagePlus.crop.sY = c.y;
							window.currentImagePlus.crop.w = c.w;
							window.currentImagePlus.crop.h = c.h;
							window.currentImagePlus.update();
						}
					});
			
			
			};//
			
			
		
		
	};// END ImagePlus