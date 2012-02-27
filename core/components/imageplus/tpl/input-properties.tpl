<div id="tv-input-properties-form{$tv}"></div>
{literal}
<script type="text/javascript">
// <![CDATA[
var params = {
{/literal}{foreach from=$params key=k item=v name='p'}
 '{$k}': '{$v|escape:"javascript"}'{if NOT $smarty.foreach.p.last},{/if}
{/foreach}{literal}
};
var oc = {'change':{fn:function(){Ext.getCmp('modx-panel-tv').markDirty();},scope:this}};
MODx.load({
    xtype: 'panel'
    ,layout: 'form'
    ,autoHeight: true
    ,cls: 'form-with-labels'
    ,labelAlign: 'top'
    ,border: false
    ,items: [{
        xtype: 'textfield'
        ,fieldLabel: 'Width'
        ,name: 'inopt_targetWidth'
        ,id: 'inopt_targetWidth{/literal}{$tv}{literal}'
        ,value: params['targetWidth'] || ''
        ,width: 300
        ,listeners: oc
    },{
        xtype: MODx.expandHelp ? 'label' : 'hidden'
        ,forId: 'inopt_targetWidth{/literal}{$tv}{literal}'
        ,html: 'The width of the image'
        ,cls: 'desc-under'
    },{
        xtype: 'textfield'
        ,fieldLabel: 'Height'
        ,name: 'inopt_targetHeight'
        ,id: 'inopt_targetHeight{/literal}{$tv}{literal}'
        ,value: params['targetHeight'] || ''
        ,width: 300
        ,listeners: oc
    },{
        xtype: MODx.expandHelp ? 'label' : 'hidden'
        ,forId: 'inopt_targetHeight{/literal}{$tv}{literal}'
        ,html: 'The height of the image'
        ,cls: 'desc-under'
    }]
    ,renderTo: 'tv-input-properties-form{/literal}{$tv}{literal}'
});
// ]]>
</script>
{/literal}
