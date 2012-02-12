<!-- IMAGE FINDER BIT -->
<div id="imageplusbrowser{$tv->id}"></div>
<img id="imagepluspreview{$tv->id}" />
<div id="imageplusbutton{$tv->id}"></div>
<input id="tv{$tv->id}" name="tv{$tv->id}"
	type="hidden" class="textfield"
	value="{$tv->get('value')|escape}"
	{$style}
	tvtype="{$tv->type}"
/>
<!-- <pre style="border:1px dashed #ddd; width:580px; padding:10px; font-size:10px; font-family:mono;">
	TV Value:          {$tv->value} 
	Media Source path: {$tv->base}
	Image Src File:    {$tv->src}
</pre> -->
<script type="text/javascript" src="{$tv->assetsUrl}js/Ext.CropWindow.js"></script>
<script type="text/javascript" src="{$tv->assetsUrl}js/ImagePlus.js"></script>
<script type="text/javascript">

// Invoke a new ImagePlus object =========================================================
IP{$tv->id} = new ImagePlus({$tv->id},{literal} { {/literal}

		tvInputId: 'tv{$tv->id}',
		previewId: 'imagepluspreview{$tv->id}',
		buttonId: 'imageplusbutton{$tv->id}',
		browserId: 'imageplusbrowser{$tv->id}',
		
		targetWidth: '{$tv->targetWidth}',
		targetHeight: '{$tv->targetHeight}',	
		
		baseUrl: '{$tv->base}' ,
		mediaSourceId: '{$tv->source}',
		
		TV: '{$tv->value}'

{literal} });
Ext.onReady(function(){ {/literal}
	IP{$tv->id}.init();
{literal} }); {/literal}
/*

function ImagePlusReady{$tv->id}() {
	
	IP{$tv->id}.parseTV();

    IP{$tv->id}.browser{literal} = MODx.load({
    {/literal}
        xtype: 'modx-panel-tv-image'
        ,renderTo: 'imageplusbrowser{$tv->id}'
        ,tv: '{$tv->id}'
        ,value: IP{$tv->id}.sourceImg.src
        ,relativeValue: IP{$tv->id}.sourceImg.src
        ,width: '97%'
        ,allowBlank: {if $params.allowBlank == 1 || $params.allowBlank == 'true'}true{else}false{/if}
        ,wctx: '{if $params.wctx}{$params.wctx}{else}web{/if}'
        {if $params.openTo},openTo: '{$params.openTo}'{/if}
        ,source: '{$source}'
    {literal}
        ,msgTarget: 'under'
        ,listeners: {
            'select': {fn:function(data) {
                MODx.fireResourceFormChange();
                 {/literal}IP{$tv->id}{literal}.updateSourceImage(data);
               
            }}
        }
    });
    MODx.makeDroppable(Ext.get('tv-image-{/literal}{$tv->id}{literal}'),function(v) {
        var cb = Ext.getCmp('tvbrowser{/literal}{$tv->id}{literal}');
        if (cb) {
            cb.setValue(v);
            cb.fireEvent('select',{relativeUrl:v});
        }
        return '';
    });
    
    
    var preview{/literal}{$tv->id}{literal} = new Ext.BoxComponent({
      	applyTo:'imagepluspreview{/literal}{$tv->id}{literal}',
	   	autoEl: {
    		tag: 'img',
    		src: IP{/literal}{$tv->id}{literal}.getImageThumb()
    	}});
    	
    
 // Button to launch crop window   =========================================================
    new Ext.Button({   {/literal}
          renderTo: 'imageplusbutton{$tv->id}',
          text: 'Crop Image!', {literal}
          handler: function() {
            //getting the image URL from whereever you want
 {/literal} var imageURL = IP{$tv->id}.baseUrl+IP{$tv->id}.sourceImg.src;		{literal}
            var cw = new Extamples.CropWindow({
              imageUrl: imageURL,
              listeners:{
                save: function(){
                  // handler if a crop was successfull, and the window was closed
                  console.log('save!');
                },
                scope: this
              }
            });
            cw.show();
          }
        });
    	

	 
	 {/literal}
	 
	IP{$tv->id}.previewThumb();

	{literal}
};// end ImagePlusReady
	
Ext.onReady(function(){{/literal}
	IP{$tv->id} = new ImagePlus({$tv->id});
	IP{$tv->id}{literal}.set({ {/literal}
		targetWidth: '{$tv->targetWidth}',
		targetHeight: '{$tv->targetHeight}',
		siteUrl: '{$_config.site_url}',
		preview: document.getElementById('imagepluspreview{$tv->id}'),
		tvInput: document.getElementById('tv{$tv->id}'),
		baseUrl: '{$tv->base}' ,
		buttonId: 'imageplusbutton{$tv->id}'
{literal} }); {/literal}
	ImagePlusReady{$tv->id}();
	
});

*/
</script>

