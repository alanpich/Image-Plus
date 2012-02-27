<input id="tv{$tv->id}" name="tv{$tv->id}"
	type="text"
	value="{$tv->get('value')|escape}"
	tvtype="{$tv->type}"
/>
<div id="imageplus{$tv->id}_imageSelect"></div>
<img src="{$tv->output}" id="imageplus{$tv->id}_preview" />
<script type="text/javascript">
{literal}Ext.onReady(function(){{/literal}
		imageplus{$tv->id} = new ImagePlus({$tv->id},{literal} { {/literal}
			connectorUrl: '{$tv->connector}',
			target: {literal}{{/literal}
				width: {$tv->targetWidth},
				height: {$tv->targetHeight}
			{literal}},{/literal}
			source: {literal}{{/literal}
//				src: '{$tv->sourceUrl}'
			{literal}},{/literal}

{literal} 
	});	
	});//
{/literal}
</script>

