<!-- IMAGE FINDER BIT -->
<div id="imageplusbrowser{$tv->id}"></div>
<img id="imagepluspreview{$tv->id}" width="{$tv->targetWidth}" height="{$tv->targetHeight}" />
<div id="imageplusbutton{$tv->id}"></div>
<input id="tv{$tv->id}" name="tv{$tv->id}"
	type="hidden" class="textfield"
	value="{$tv->get('value')|escape}"
	{$style}
	tvtype="{$tv->type}"
/>
<script type="text/javascript" src="{$tv->assetsUrl}js/jCrop/js/jquery.min.js"></script>
<script type="text/javascript" src="{$tv->assetsUrl}js/jCrop/js/jquery.Jcrop.min.js"></script>
<link rel="stylesheet" type="text/css" href="{$tv->assetsUrl}js/jCrop/css/jquery.Jcrop.css" />
<script type="text/javascript" src="{$tv->assetsUrl}js/ImagePlus.js"></script>
<script type="text/javascript">
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
    	
    
     var btn{/literal}{$tv->id}{literal} = new Ext.Button({
     	applyTo:'imageplusbutton{/literal}{$tv->id}{literal}'
     	,text:'Edit Image'
     	,handler: function(){
     			{/literal}IP{$tv->id}.showCropWindow();{literal}
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
	});
	ImagePlusReady{$tv->id}();
});
</script>

