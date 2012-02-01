<!-- IMAGE FINDER BIT -->
<div id="imageplusbrowser{$tv->id}"></div>
<img id="imagepluspreview{$tv->id}" />
<div id="imageplusbutton{$tv->id}"></div>
<script type="text/javascript" src="{$_config.assets_url}components/ImagePlus/js/ImagePlus.js"></script>
<script type="text/javascript">
Ext.onReady(function() {
	IP{$tv->id} = new ImagePlus({$tv->id});
	IP{$tv->id}.set({
		targetWidth: {$tv->targetWidth},
		targetHeight: {$tv->targetHeight},
		siteUrl: '{$_config.site_url}',
		preview: document.getElementById('imagepluspreview{$tv->id}')
	});
	console.log(IP{$tv->id});
});
</script>
<script type="text/javascript">
// <![CDATA[
{literal}
Ext.onReady(function() {
    var fld{/literal}{$tv->id}{literal} = MODx.load({
    {/literal}
        xtype: 'modx-panel-tv-image'
        ,renderTo: 'imageplusbrowser{$tv->id}'
        ,tv: '{$tv->id}'
        ,value: '{$tv->value|escape}'
        ,relativeValue: '{$tv->value|escape}'
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
                 {/literal}IP{$tv->id}{literal}.updateImageSrc(data);
               
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
    	
    	console.log(IP{/literal}{$tv->id}{literal}.getImageThumb());
    
     var btn{/literal}{$tv->id}{literal} = new Ext.Button({
     	applyTo:'imageplusbutton{/literal}{$tv->id}{literal}'
     	,text:'Edit Image'
     	,handler: function(){
     			{/literal}IP{$tv->id}.showCropWindow();{literal}
     		}
     });
   
    
    
    
});
{/literal}
// ]]>
</script>
<!-- END IMAGE FINDER BIT -->

<input id="tv{$tv->id}" name="tv{$tv->id}"
	type="text" class="textfield"
	value="{$tv->get('value')|escape}"
	{$style}
	tvtype="{$tv->type}"
/>

<script type="text/javascript">
// <![CDATA[
{literal}
Ext.onReady(function() {
    var fld = MODx.load({
    {/literal}
        xtype: 'textfield'
        ,applyTo: 'tv{$tv->id}'
        ,width: '99%'
        ,enableKeyEvents: true
        ,msgTarget: 'under'
        ,allowBlank: {if $params.allowBlank == 1 || $params.allowBlank == 'true'}true{else}false{/if}
        {if $params.maxLength},maxLength: {$params.maxLength}{/if}
        {if $params.minLength},minLength: {$params.minLength}{/if}
    {literal}
        ,listeners: { 'keydown': { fn:MODx.fireResourceFormChange, scope:this}}
    });
    Ext.getCmp('modx-panel-resource').getForm().add(fld);
    MODx.makeDroppable(fld);
});
{/literal}
// ]]>
</script>
