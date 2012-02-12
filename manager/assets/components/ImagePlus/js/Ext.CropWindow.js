/**
 * Licence:
 * You can use the Code as you like, only the URL http//www.thomas-lauria/ has to be in the used Files / Code 
 * @author Thomas Lauria
 * http://www.thomas-lauria.de
 */
 
/** MODIFIED BY ALAN PICH FOR IMAGEPLUS **/
 
 
Ext.ns('Extamples');
Extamples = {};
Extamples.CropWindowUi = Ext.extend(Ext.Window, {
  title: 'Image Crop Utility',
  width: 660,
  height: 510,
  modal: true,
  initComponent: function() {
    this.fbar = {
      xtype: 'toolbar',
      items: [
        {
          xtype: 'button',
          text: 'cancel',
          ref: '../buttonCancel'
        },
        {
          xtype: 'button',
          text: 'save',
          ref: '../buttonSave'
        }
      ]
    };
    Extamples.CropWindowUi.superclass.initComponent.call(this);
  }
});

//=============================================================================================
//=============================================================================================
//=============================================================================================

Extamples.CropWindow = Ext.extend(Extamples.CropWindowUi, {
  cropData: null,
  imageUrl: '',
  initComponent: function() {
    
    Extamples.CropWindow.superclass.initComponent.call(this);
    
    var imgLoad = new Image();
    imgLoad.onload = (function(){
		var IP = ImagePlusArray[this.imagePlusId];
		this.setSize(imgLoad.width + 20, imgLoad.height + 100);
		
		var crop = new Ext.ux.ImageCrop({
			imageUrl: this.imageUrl,
			initialWidth: imgLoad.width,
			initialHeight: imgLoad.height,
			minWidth: IP.targetWidth,
			minHeight: IP.targetHeight,
			cropStartH: IP.targetHeight,
			cropStartW: IP.targetWidth,
			//       quadratic: true
			});     
			
      	this.cropData = crop.getCropData();
      	crop.on('change', function(foo,x) {this.cropData = x;}, this);
      	this.add(crop);
    }).createDelegate(this);
    imgLoad.src = this.imageUrl;
    
    // handler for the buttons
    this.buttonCancel.on('click', this.close, this);
    this.buttonSave.on('click', this.saveCrop, this);
  },
  saveCrop: function() {
    ImagePlusArray[this.imagePlusId].onCropSave(this.cropData);	//ALAN
    this.close();
    if(this.fireEvent('save', this) === false){
      return this;
    }
  
  }
});


//=============================================================================================
//=============================================================================================
//=============================================================================================


Ext.ns('Ext.ux');
Ext.ux.ImageCrop = Ext.extend(Ext.Component, {
  quadratic: false,
  minWidth: 50,
  minHeight: 50,
  preserveRatio: true,
  cropData: {
    x: 0,
    y: 0,
    height: 0,
    width:0
  },
  initComponent: function() {
    this.preserveRatio = this.quadratic || this.preserveRatio;
    Ext.ux.ImageCrop.superclass.initComponent.call(this);
  },
  onRender : function(ct, position){
  
    var c = {};
    if(this.quadratic) {
      c.height = c.width = Math.min(this.initialWidth, this.initialHeight);
      this.maxWidth = this.maxHeight = c.height;
    }
    else {
      c.height = this.cropStartH;
      c.width = this.cropStartW;
      this.maxWidth = this.initialWidth;
      this.maxHeight = this.initialHeight;
    }
    this.cropData.height = c.height;
    this.cropData.width = c.width;
    Ext.ux.ImageCrop.superclass.onRender.call(this, ct, position);
    
    this.el.setStyle({
      position: 'relative'
    }).setSize(this.initialWidth,this.initialHeight);
    
    this.cropWrapper = this.el.insertFirst().setSize(this.initialWidth,this.initialHeight);
    this.cropWrapped = this.cropWrapper.insertFirst().setSize(c.width, c.height);
    this.cropWrapped.insertFirst({tag: "img", src: Ext.BLANK_IMAGE_URL, width: c.width, height: c.height});
    this.cropBgBox = this.el.insertFirst().setStyle({
      background: 'url('+this.imageUrl+') no-repeat left top',
      position: 'absolute',
      left: 0,
      top: 0
    }).setSize(this.initialWidth,this.initialHeight).setOpacity(0.5);
    this.initWrapper();
  },
  getCropData: function() {
    return this.cropData;
  },
  initWrapper: function() {
    var parentBox = this;
    var cropBgBox = this.cropBgBox;
    var imageUrl = this.imageUrl;
    var result = this.cropData;
    var wrapped = new Ext.Resizable(this.cropWrapped, {
      wrap: true,
      pinned: true,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      draggable:true,
      preserveRatio: this.preserveRatio,
      handles: 'all',
      constrainTo: this.cropWrapper,
      listeners: {
        'resize': function (box, w, h) {
          box.imageOffset = [box.el.getBox().x - cropBgBox.getX(), box.el.getBox().y - cropBgBox.getY()];
          result.width = w;
          result.height = h;
          result.x = box.imageOffset[0];
          result.y = box.imageOffset[1];
          box.el.setStyle({
            'background-image':'url('+imageUrl+')',
            'background-position':(-box.imageOffset[0])+'px '+(-box.imageOffset[1])+'px'
          });
          if(parentBox.fireEvent('change', parentBox, result) === false){
            return parentBox;
          }
        },
        'beforeresize': function () {
          this.getEl().setStyle({background:'transparent'});
        }
      },
      dynamic:true
    });
    //wrapped.getResizedChild().setStyle({background:'url(../images/hochschule-reutlingen_medium.jpg)'});
    wrapped.getEl().setStyle({background:'url('+imageUrl+')'});
    wrapped.imageOffset = [0,0];
    wrapped.dd.endDrag = function(){
      wrapped.imageOffset = [wrapped.getEl().getBox().x - cropBgBox.getX(), wrapped.getEl().getBox().y - cropBgBox.getY()];
      result.x = wrapped.imageOffset[0];
      result.y = wrapped.imageOffset[1];
      wrapped.getEl().setStyle({
        'background-image':'url('+imageUrl+')',
        'background-position':(-wrapped.imageOffset[0])+'px '+(-wrapped.imageOffset[1])+'px'
      });
      if(parentBox.fireEvent('change', parentBox, result) === false){
        return parentBox;
      }
    };
    wrapped.dd.startDrag = function(e){
      wrapped.getEl().setStyle({
        'background':'transparent'
      });
    };
  }
});




